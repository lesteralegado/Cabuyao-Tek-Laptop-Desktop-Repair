-- Repair Management Sprint
-- Migration for repair notes and secure status updates

-- 1. Create repair_notes table
create table if not exists repair_notes (
  id uuid primary key default gen_random_uuid(),
  repair_request_id uuid not null references repair_requests(id) on delete cascade,
  staff_id uuid not null references auth.users(id),
  note text not null,
  created_at timestamptz not null default now()
);

-- 2. Create index for repair notes
create index if not exists idx_repair_notes_repair_id on repair_notes(repair_request_id);

-- 3. RLS for repair_notes
alter table repair_notes enable row level security;

create policy "Staff can read repair notes"
  on repair_notes for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('staff', 'admin')
    )
  );

create policy "Staff can insert repair notes"
  on repair_notes for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('staff', 'admin')
    )
  );

-- 4. Secure Status Update RPC
create or replace function update_repair_status(repair_id uuid, new_status text)
returns repair_requests
language plpgsql
security definer
as $$
declare
  current_status text;
  user_role text;
  v_repair repair_requests;
begin
  -- Get current status
  select status into current_status from repair_requests where id = repair_id;
  if not found then
    raise exception 'Repair not found';
  end if;

  -- Check user role
  select role into user_role from profiles where id = auth.uid();
  if user_role not in ('staff', 'admin') then
    raise exception 'Unauthorized: Only staff can update repair status';
  end if;

  -- Validate transition
  if new_status = 'cancelled' then
    if current_status in ('completed', 'cancelled') then
      raise exception 'Cannot cancel a repair that is already completed or cancelled';
    end if;
  elsif current_status = 'requested' and new_status != 'received' then
    raise exception 'Invalid transition from requested to %', new_status;
  elsif current_status = 'received' and new_status != 'inspection' then
    raise exception 'Invalid transition from received to %', new_status;
  elsif current_status = 'inspection' and new_status != 'diagnosis' then
    raise exception 'Invalid transition from inspection to %', new_status;
  elsif current_status = 'diagnosis' and new_status != 'waiting_approval' then
    raise exception 'Invalid transition from diagnosis to %', new_status;
  elsif current_status = 'waiting_approval' and new_status != 'repairing' then
    raise exception 'Invalid transition from waiting_approval to %', new_status;
  elsif current_status = 'repairing' and new_status != 'ready_for_pickup' then
    raise exception 'Invalid transition from repairing to %', new_status;
  elsif current_status = 'ready_for_pickup' and new_status != 'completed' then
    raise exception 'Invalid transition from ready_for_pickup to %', new_status;
  elsif current_status in ('completed', 'cancelled') then
    raise exception 'Cannot update status of a terminal repair';
  end if;

  -- Update the repair status
  update repair_requests
  set status = new_status, updated_at = now()
  where id = repair_id;

  -- Insert history record
  insert into repair_history (repair_request_id, staff_id, previous_status, new_status)
  values (repair_id, auth.uid(), current_status, new_status);

  -- Return the updated record
  select * into v_repair from repair_requests where id = repair_id;
  return v_repair;
end;
$$;
