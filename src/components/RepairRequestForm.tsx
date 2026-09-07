import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RepairRequestForm as FormType } from '../types/repair';
import CustomerInformation from './CustomerInformation';
import DeviceInformation from './DeviceInformation';
import ServiceSelection from './ServiceSelection';
import ProblemDescription from './ProblemDescription';
import ServiceMethod from './ServiceMethod';
import RequestSummary from './RequestSummary';
import { Loader2 } from 'lucide-react';
import { createRepairRequest } from '../services/repairRequestService';



const RepairRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormType>({
    customerName: '',
    phone: '',
    email: '',
    contactMethod: '' as any,
    deviceType: '' as any,
    brand: '',
    model: '',
    serialNumber: '',
    service: '',
    problemDescription: '',
    additionalNotes: '',
    serviceMethod: '' as any,
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user updates it
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) newErrors.customerName = 'Full name is required.';
    if (formData.customerName.trim().length < 2) newErrors.customerName = 'Please enter a valid name.';

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^(09)\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid Philippine mobile number (e.g., 09XXXXXXXXX).';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.contactMethod) {
      newErrors.contactMethod = 'Preferred contact method is required.';
    } else if (formData.contactMethod === 'Email' && !formData.email) {
      newErrors.contactMethod = 'Please provide an email address if you prefer email contact.';
    }

    if (!formData.deviceType) newErrors.deviceType = 'Device type is required.';
    if (!formData.brand) newErrors.brand = 'Brand is required.';
    if (!formData.service) newErrors.service = 'Please select a service.';
    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = 'Please describe the problem.';
    } else if (formData.problemDescription.trim().length < 10) {
      newErrors.problemDescription = 'Please provide a more detailed description.';
    }
    if (!formData.serviceMethod) newErrors.serviceMethod = 'Please select a service method.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await createRepairRequest(formData);

      // Pass the real reference number to the success page via React Router state
      navigate('/request/success', {
        state: {
          referenceNumber: result.reference_number
        }
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong while submitting your request. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {!showSummary ? (
        <div className="space-y-12">
          <CustomerInformation formData={formData} updateField={updateField} errors={errors} />
          <DeviceInformation formData={formData} updateField={updateField} errors={errors} />
          <ServiceSelection formData={formData} updateField={updateField} errors={errors} />
          <ProblemDescription formData={formData} updateField={updateField} errors={errors} />
          <ServiceMethod formData={formData} updateField={updateField} errors={errors} />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (validateForm()) setShowSummary(true);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              Review Request
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <RequestSummary formData={formData} />

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowSummary(false)}
              className="text-gray-600 font-semibold hover:text-gray-900 transition-colors"
            >
              ← Edit Information
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-blue-400 flex items-center space-x-2"
            >
              {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
              <span>{isSubmitting ? 'Submitting...' : 'Submit Repair Request'}</span>
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default RepairRequestForm;
