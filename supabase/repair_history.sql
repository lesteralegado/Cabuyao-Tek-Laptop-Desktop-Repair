-- Repair History & Audit Trail
-- Migration for repair history tracking

-- 1. Create repair_history table
create table if not exists repair_history (
  id uuid primary key default gen_random_uuid(),
  repair_request_id uuid not null references repair_requests(id) on delete cascade,
  staff_id uuid references auth.users(id), -- Nullable for "System" events
  previous_status text,
  new_status text not null,
  created_at timestamptz not null default now()
);

-- 2. Create indexes
create index if not exists idx_repair_history_repair_id on repair_history(repair_request_id);
create index if not exists idx_repair_history_created_at on repair_history(created_at);

-- 3. RLS for repair_history
alter table repair_history enable row level security;

create policy "Staff can view repair history"
  on repair_history for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('staff', 'admin')
    )
  );

-- No update or delete policies = Append-only
