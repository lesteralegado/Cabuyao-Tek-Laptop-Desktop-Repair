import { supabase } from '../lib/supabase';
import type { RepairRequestForm } from '../types/repair';

export interface CreateRepairRequestResult {
  reference_number: string;
  id: string;
  status: string;
  created_at: string;
}

export async function createRepairRequest(data: RepairRequestForm): Promise<CreateRepairRequestResult> {
  // We use the RPC function created in the database to ensure secure reference number generation
  // and a single atomic transaction for insertion.

  const { data: result, error } = await supabase.rpc('create_repair_request', {
    p_customer_name: data.customerName.trim(),
    p_customer_phone: data.phone.trim(),
    p_customer_email: data.email?.trim() || null,
    p_preferred_contact_method: data.contactMethod.toLowerCase(),
    p_device_type: data.deviceType.toLowerCase(),
    p_device_brand: data.brand.trim(),
    p_device_model: data.model?.trim() || null,
    p_serial_number: data.serialNumber?.trim() || null,
    p_service: data.service.trim(),
    p_problem_description: data.problemDescription.trim(),
    p_additional_notes: data.additionalNotes?.trim() || null,
    p_service_method: data.serviceMethod.toLowerCase(),
  });

  if (error) {
    console.error('Supabase RPC Error:', error);
    throw new Error(error.message || 'An unexpected error occurred while creating the repair request.');
  }

  if (!result) {
    throw new Error('The server did not return a reference number.');
  }

  return result as CreateRepairRequestResult;
}
