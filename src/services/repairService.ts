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
  const { data, error } = await supabase
    .from('repair_requests')
    .select('status');

  if (error) {
    console.error('Error fetching stats:', error);
    throw new Error('Unable to load statistics.');
  }

  const stats: RepairStatistics = {
    total: data.length,
    requested: 0,
    inProgress: 0,
    readyForPickup: 0,
    completed: 0,
  };

  const inProgressStatuses: RepairStatus[] = ['received', 'inspection', 'diagnosis', 'waiting_approval', 'repairing'];

  data.forEach(req => {
    if (req.status === 'requested') stats.requested++;
    else if (inProgressStatuses.includes(req.status)) stats.inProgress++;
    else if (req.status === 'ready_for_pickup') stats.readyForPickup++;
    else if (req.status === 'completed') stats.completed++;
  });

  return stats;
}

export async function getRecentRepairRequests(
  searchQuery?: string,
  statusFilter?: RepairStatus
): Promise<RepairRequest[]> {
  let query = supabase
    .from('repair_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (statusFilter) {
    query = query.eq('status', statusFilter);
  }

  if (searchQuery) {
    const q = `%${searchQuery.trim().toLowerCase()}%`;
    query = query.or(`customer_name.ilike.${q}, reference_number.ilike.${q}, device_brand.ilike.${q}, device_model.ilike.${q}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching requests:', error);
    throw new Error('Unable to load repair requests.');
  }

  return data as RepairRequest[];
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
