export type DeviceType =
  | "Computer"
  | "Laptop"
  | "Cellphone"
  | "Tablet"
  | "Other";

export type ContactMethod =
  | "Phone"
  | "SMS"
  | "Email";

export type ServiceMethod =
  | "shop"
  | "meetup"
  | "home_service";

export type RepairStatus =
  | "requested"
  | "received"
  | "inspection"
  | "diagnosis"
  | "waiting_approval"
  | "repairing"
  | "ready_for_pickup"
  | "completed"
  | "cancelled";

export interface RepairRequestForm {
  customerName: string;
  phone: string;
  email?: string;
  contactMethod: ContactMethod;
  deviceType: DeviceType;
  brand: string;
  model?: string;
  serialNumber?: string;
  service: string;
  problemDescription: string;
  additionalNotes?: string;
  serviceMethod: ServiceMethod;
}

export interface RepairRequest {
  id: string;
  reference_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  preferred_contact_method: ContactMethod;
  device_type: DeviceType;
  device_brand: string;
  device_model: string | null;
  serial_number: string | null;
  service: string;
  problem_description: string;
  additional_notes: string | null;
  service_method: ServiceMethod;
  status: RepairStatus;
  created_at: string;
  updated_at: string;
}

export interface RepairNote {
  id: string;
  repair_request_id: string;
  staff_id: string;
  note: string;
  created_at: string;
}

export interface RepairHistoryEntry {
  id: string;
  repair_request_id: string;
  staff_id: string | null;
  previous_status: RepairStatus | null;
  new_status: RepairStatus;
  created_at: string;
  staff_name?: string;
}

export const allowedTransitions: Record<RepairStatus, RepairStatus[]> = {
  requested: ["received", "cancelled"],
  received: ["inspection", "cancelled"],
  inspection: ["diagnosis", "cancelled"],
  diagnosis: ["waiting_approval", "cancelled"],
  waiting_approval: ["repairing", "cancelled"],
  repairing: ["ready_for_pickup", "cancelled"],
  ready_for_pickup: ["completed"],
  completed: [],
  cancelled: [],
};

export interface PublicRepairStatus {
  reference_number: string;
  device_type: DeviceType;
  device_brand: string;
  device_model?: string;
  service: string;
  status: RepairStatus;
  created_at: string;
  updated_at: string;
}

export interface RepairRequestSubmission {
  id: string;
  formData: RepairRequestForm;
  submittedAt: string;
  status: "pending" | "processing" | "completed";
}
