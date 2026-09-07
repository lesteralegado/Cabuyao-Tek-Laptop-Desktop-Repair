-- =============================================================================
-- CABUYAO TEK: PUBLIC TRACKING RPC
-- =============================================================================

-- This function allows anonymous users to check the status of a repair
-- without exposing private customer information.

CREATE OR REPLACE FUNCTION get_public_repair_status(p_reference_number TEXT)
RETURNS JSON AS $$
DECLARE
    v_result JSON;
BEGIN
    -- Normalize input to uppercase and trim
    -- Search for the repair request
    SELECT json_build_object(
        'reference_number', reference_number,
        'device_type', device_type,
        'device_brand', device_brand,
        'device_model', device_model,
        'service', service,
        'status', status,
        'created_at', created_at,
        'updated_at', updated_at
    )
    INTO v_result
    FROM repair_requests
    WHERE UPPER(reference_number) = UPPER(trim(p_reference_number))
    LIMIT 1;

    -- Return null if not found, otherwise return the safe result
    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
