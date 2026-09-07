import { supabase } from '../lib/supabase';
import type { PublicRepairStatus } from '../types/repair';

export async function getRepairStatus(referenceNumber: string): Promise<PublicRepairStatus | null> {
  // Normalize the reference number before searching
  const normalizedRef = referenceNumber.trim().toUpperCase();

  if (!normalizedRef) return null;

  const { data, error } = await supabase.rpc('get_public_repair_status', {
    p_reference_number: normalizedRef,
  });

  if (error) {
    console.error('Supabase Tracking Error:', error);
    throw new Error("We couldn't check your repair status right now. Please try again.");
  }

  return data as PublicRepairStatus | null;
}
