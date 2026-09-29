-- Apply after the original schema scripts. This script is safe to re-run.
-- Applied to the configured CabuyaoTek project on 2026-09-29.
begin;

-- The browser needs to read its own profile, never to update its own role.
revoke all on table public.profiles from public, anon, authenticated;
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
grant select on table public.profiles to authenticated;

create or replace function public.create_repair_request(
  p_customer_name text, p_customer_phone text, p_customer_email text,
  p_preferred_contact_method text, p_device_type text, p_device_brand text,
  p_device_model text, p_serial_number text, p_service text,
  p_problem_description text, p_additional_notes text, p_service_method text
) returns json
language plpgsql security definer set search_path = ''
as $$
declare
  v_reference text;
  v_id uuid;
  v_email text := nullif(btrim(coalesce(p_customer_email, '')), '');
  v_attempt integer;
begin
  if length(btrim(coalesce(p_customer_name, ''))) not between 2 and 120 then
    raise exception 'Enter a full name between 2 and 120 characters';
  end if;
  if btrim(coalesce(p_customer_phone, '')) !~ '^09[0-9]{9}$' then
    raise exception 'Enter an 11-digit mobile number beginning with 09';
  end if;
  if v_email is not null and
     (length(v_email) > 254 or v_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') then
    raise exception 'Enter a valid email address';
  end if;
  if p_preferred_contact_method not in ('phone', 'sms', 'email') or p_preferred_contact_method is null then
    raise exception 'Choose a valid contact method';
  end if;
  if p_preferred_contact_method = 'email' and v_email is null then
    raise exception 'An email address is required for email contact';
  end if;
  if p_device_type not in ('computer', 'laptop', 'cellphone', 'tablet', 'other') or p_device_type is null then
    raise exception 'Choose a valid device type';
  end if;
  if length(btrim(coalesce(p_device_brand, ''))) not between 1 and 80 or
     length(coalesce(p_device_model, '')) > 120 or
     length(coalesce(p_serial_number, '')) > 160 then
    raise exception 'Device details are too long or incomplete';
  end if;
  if length(btrim(coalesce(p_service, ''))) not between 1 and 160 then
    raise exception 'Choose a valid service';
  end if;
  if length(btrim(coalesce(p_problem_description, ''))) not between 10 and 3000 or
     length(coalesce(p_additional_notes, '')) > 3000 then
    raise exception 'Problem details must be between 10 and 3000 characters';
  end if;
  if p_service_method not in ('shop', 'meetup', 'home_service') or p_service_method is null then
    raise exception 'Choose a valid service method';
  end if;

  for v_attempt in 1..5 loop
    v_reference := 'FR-' || to_char(now(), 'YYYY') || '-' ||
      upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12));
    begin
      insert into public.repair_requests (
        reference_number, customer_name, customer_phone, customer_email,
        preferred_contact_method, device_type, device_brand, device_model,
        serial_number, service, problem_description, additional_notes, service_method
      ) values (
        v_reference, btrim(p_customer_name), btrim(p_customer_phone), v_email,
        p_preferred_contact_method, p_device_type, btrim(p_device_brand),
        nullif(btrim(coalesce(p_device_model, '')), ''),
        nullif(btrim(coalesce(p_serial_number, '')), ''), btrim(p_service),
        btrim(p_problem_description), nullif(btrim(coalesce(p_additional_notes, '')), ''),
        p_service_method
      ) returning id into v_id;
      exit;
    exception when unique_violation then
      if v_attempt = 5 then raise; end if;
    end;
  end loop;

  insert into public.repair_history (repair_request_id, staff_id, previous_status, new_status)
  values (v_id, null, null, 'requested');

  return json_build_object(
    'reference_number', v_reference, 'id', v_id,
    'status', 'requested', 'created_at', now()
  );
end;
$$;

create or replace function public.get_public_repair_status(p_reference_number text)
returns json
language plpgsql security definer set search_path = ''
as $$
declare
  v_reference text := upper(btrim(coalesce(p_reference_number, '')));
  v_result json;
begin
  if length(v_reference) > 40 or v_reference !~ '^FR-[0-9]{4}-[A-F0-9]{5,20}$' then
    return null;
  end if;
  select json_build_object(
    'reference_number', reference_number, 'device_type', device_type,
    'device_brand', device_brand, 'device_model', device_model,
    'service', service, 'status', status,
    'created_at', created_at, 'updated_at', updated_at
  ) into v_result
  from public.repair_requests
  where reference_number = v_reference
  limit 1;
  return v_result;
end;
$$;

create or replace function public.update_repair_status(repair_id uuid, new_status text)
returns public.repair_requests
language plpgsql security definer set search_path = ''
as $$
declare
  v_current_status text;
  v_user_role text;
  v_repair public.repair_requests;
begin
  select role into v_user_role from public.profiles where id = auth.uid();
  if coalesce(v_user_role, '') not in ('staff', 'admin') then
    raise exception 'Unauthorized: only staff can update repair status';
  end if;

  select status into v_current_status from public.repair_requests
  where id = repair_id for update;
  if not found then raise exception 'Repair not found'; end if;

  if new_status is null then
    raise exception 'Choose a valid repair status';
  elsif new_status = 'cancelled' then
    if v_current_status in ('ready_for_pickup', 'completed', 'cancelled') then
      raise exception 'This repair can no longer be cancelled';
    end if;
  elsif not (
    (v_current_status = 'requested' and new_status = 'received') or
    (v_current_status = 'received' and new_status = 'inspection') or
    (v_current_status = 'inspection' and new_status = 'diagnosis') or
    (v_current_status = 'diagnosis' and new_status = 'waiting_approval') or
    (v_current_status = 'waiting_approval' and new_status = 'repairing') or
    (v_current_status = 'repairing' and new_status = 'ready_for_pickup') or
    (v_current_status = 'ready_for_pickup' and new_status = 'completed')
  ) then
    raise exception 'Invalid repair status transition';
  end if;

  update public.repair_requests set status = new_status, updated_at = now()
  where id = repair_id returning * into v_repair;
  insert into public.repair_history (repair_request_id, staff_id, previous_status, new_status)
  values (repair_id, auth.uid(), v_current_status, new_status);
  return v_repair;
end;
$$;

alter function public.handle_new_user() set search_path = '';
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.create_repair_request(
  text, text, text, text, text, text, text, text, text, text, text, text
) from public, anon, authenticated;
grant execute on function public.create_repair_request(
  text, text, text, text, text, text, text, text, text, text, text, text
) to anon, authenticated;
revoke execute on function public.get_public_repair_status(text) from public, anon, authenticated;
grant execute on function public.get_public_repair_status(text) to anon, authenticated;
revoke execute on function public.update_repair_status(uuid, text) from public, anon, authenticated;
grant execute on function public.update_repair_status(uuid, text) to authenticated;

commit;
