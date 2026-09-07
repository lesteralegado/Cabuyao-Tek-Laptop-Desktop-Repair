-- =============================================================================
-- CABUYAO TEK: DATABASE SCHEMA
-- =============================================================================

-- 1. Create sequence for reference number generation
CREATE SEQUENCE IF NOT EXISTS repair_reference_seq;

-- 2. Create the repair_requests table
CREATE TABLE IF NOT EXISTS repair_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    preferred_contact_method TEXT NOT NULL,
    device_type TEXT NOT NULL,
    device_brand TEXT NOT NULL,
    device_model TEXT,
    serial_number TEXT,
    service TEXT NOT NULL,
    problem_description TEXT NOT NULL,
    additional_notes TEXT,
    service_method TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'requested',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTz DEFAULT now(),

    -- Constraints for data integrity
    CONSTRAINT check_contact_method CHECK (preferred_contact_method IN ('phone', 'sms', 'email')),
    CONSTRAINT check_device_type CHECK (device_type IN ('computer', 'laptop', 'cellphone', 'tablet', 'other')),
    CONSTRAINT check_service_method CHECK (service_method IN ('shop', 'meetup', 'home_service')),
    CONSTRAINT check_status CHECK (status IN (
        'requested', 'received', 'inspection', 'diagnosis',
        'waiting_approval', 'repairing', 'ready_for_pickup', 'completed', 'cancelled'
    ))
);

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_repair_requests_ref_num ON repair_requests(reference_number);
CREATE INDEX IF NOT EXISTS idx_repair_requests_status ON repair_requests(status);
CREATE INDEX IF NOT EXISTS idx_repair_requests_created_at ON repair_requests(created_at);

-- 4. Row Level Security (RLS)
ALTER TABLE repair_requests ENABLE ROW LEVEL SECURITY;

-- Note: We do NOT create any SELECT, UPDATE, or DELETE policies for anonymous users.
-- Only the RPC function will be used for submission.

-- 5. Database function for secure request creation (RPC)
-- This function is SECURITY DEFINER so it can bypass RLS to insert the request
CREATE OR REPLACE FUNCTION create_repair_request(
    p_customer_name TEXT,
    p_customer_phone TEXT,
    p_customer_email TEXT,
    p_preferred_contact_method TEXT,
    p_device_type TEXT,
    p_device_brand TEXT,
    p_device_model TEXT,
    p_serial_number TEXT,
    p_service TEXT,
    p_problem_description TEXT,
    p_additional_notes TEXT,
    p_service_method TEXT
) RETURNS JSON AS $$
DECLARE
    v_ref_num TEXT;
    v_id UUID;
    v_year TEXT;
BEGIN
    -- 1. Generate Reference Number: FR-YYYY-NNNNN
    v_year := to_char(now(), 'YYYY');
    v_ref_num := 'FR-' || v_year || '-' || lpad(nextval('repair_reference_seq')::text, 5, '0');

    -- 2. Insert the request
    INSERT INTO repair_requests (
        reference_number,
        customer_name,
        customer_phone,
        customer_email,
        preferred_contact_method,
        device_type,
        device_brand,
        device_model,
        serial_number,
        service,
        problem_description,
        additional_notes,
        service_method
    ) VALUES (
        v_ref_num,
        p_customer_name,
        p_customer_phone,
        p_customer_email,
        p_preferred_contact_method,
        p_device_type,
        p_device_brand,
        p_device_model,
        p_serial_number,
        p_service,
        p_problem_description,
        p_additional_notes,
        p_service_method
    ) RETURNING id INTO v_id;

    -- 3. Create initial history record
    INSERT INTO repair_history (repair_request_id, staff_id, previous_status, new_status)
    VALUES (v_id, NULL, NULL, 'requested');

    -- 4. Return only safe data
    RETURN json_build_object(
        'reference_number', v_ref_num,
        'id', v_id,
        'status', 'requested',
        'created_at', now()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
