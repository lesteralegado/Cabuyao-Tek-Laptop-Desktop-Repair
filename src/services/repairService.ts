import { supabase } from '../lib/supabase';
import type { RepairRequest, RepairStatus, RepairNote, RepairHistoryEntry } from '../types/repair';

export interface RepairStatistics {
  total: number;
  requested: number;
  inProgress: number;
  readyForPickup: number;
  completed: number;
}

export async function getRepairStatistics(): Promise<RepairStatistics> {
  const statuses: RepairStatus[] = ['received', 'inspection', 'diagnosis', 'waiting_approval', 'repairing'];
  const [total, requested, inProgress, readyForPickup, completed] = await Promise.all([
    supabase.from('repair_requests').select('id', { count: 'exact', head: true }),
    supabase.from('repair_requests').select('id', { count: 'exact', head: true }).eq('status', 'requested'),
    supabase.from('repair_requests').select('id', { count: 'exact', head: true }).in('status', statuses),
    supabase.from('repair_requests').select('id', { count: 'exact', head: true }).eq('status', 'ready_for_pickup'),
    supabase.from('repair_requests').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
  ]);
  if ([total, requested, inProgress, readyForPickup, completed].some(result => result.error)) {
    throw new Error('Unable to load statistics.');
  }
  return {
    total: total.count ?? 0,
    requested: requested.count ?? 0,
    inProgress: inProgress.count ?? 0,
    readyForPickup: readyForPickup.count ?? 0,
    completed: completed.count ?? 0,
  };
}

function applyRepairFilters(query: any, searchQuery?: string, statusFilter?: RepairStatus) {
  if (statusFilter) query = query.eq('status', statusFilter);
  if (searchQuery?.trim()) {
    const escaped = searchQuery.trim().replace(/[\\"]/g, '\\$&');
    query = query.or(`customer_name.ilike."%${escaped}%",reference_number.ilike."%${escaped}%",device_brand.ilike."%${escaped}%",device_model.ilike."%${escaped}%"`);
  }
  return query;
}

export async function getRecentRepairRequests(
  searchQuery?: string,
  statusFilter?: RepairStatus
): Promise<RepairRequest[]> {
  const query = applyRepairFilters(supabase
    .from('repair_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20), searchQuery, statusFilter);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching requests:', error);
    throw new Error('Unable to load repair requests.');
  }

  return data as RepairRequest[];
}

export async function getRepairRequestsPage(searchQuery = '', statusFilter?: RepairStatus, page = 0, pageSize = 20) {
  const query = applyRepairFilters(supabase.from('repair_requests')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1), searchQuery, statusFilter);
  const { data, count, error } = await query;
  if (error) throw new Error('Unable to load repair requests.');
  return { repairs: data as RepairRequest[], total: count ?? 0 };
}

export async function getRepairRequestById(id: string): Promise<RepairRequest | null> {
  const { data, error } = await supabase
    .from('repair_requests')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching repair detail:', error);
    throw new Error('Unable to load repair details.');
  }

  return data as RepairRequest;
}

export async function updateRepairStatus(
  repairId: string,
  newStatus: RepairStatus
): Promise<RepairRequest> {
  const { data, error } = await supabase.rpc('update_repair_status', {
    repair_id: repairId,
    new_status: newStatus,
  });

  if (error) {
    console.error('Error updating repair status:', error);
    throw new Error(error.message);
  }

  return data as RepairRequest;
}

export async function addRepairNote(
  repairId: string,
  staffId: string,
  note: string
): Promise<RepairNote> {
  const { data, error } = await supabase
    .from('repair_notes')
    .insert({
      repair_request_id: repairId,
      staff_id: staffId,
      note: note,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding repair note:', error);
    throw new Error('Unable to add repair note. Please try again.');
  }

  return data as RepairNote;
}

export async function getRepairNotes(repairId: string): Promise<RepairNote[]> {
  const { data, error } = await supabase
    .from('repair_notes')
    .select('*')
    .eq('repair_request_id', repairId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching repair notes:', error);
    throw new Error('Unable to load repair notes.');
  }

  return data as RepairNote[];
}

export async function getRepairHistory(repairId: string): Promise<RepairHistoryEntry[]> {
  const { data, error } = await supabase
    .from('repair_history')
    .select(`
      *,
      profiles (name)
    `)
    .eq('repair_request_id', repairId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching repair history:', error);
    throw new Error('Unable to load repair history.');
  }

  return data.map((entry: any) => ({
    ...entry,
    staff_name: entry.profiles?.name || null,
  })) as RepairHistoryEntry[];
}
