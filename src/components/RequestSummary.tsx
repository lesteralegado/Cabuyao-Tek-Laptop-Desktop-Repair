import React from 'react';
import type { RepairRequestForm } from '../types/repair';

interface RequestSummaryProps {
  formData: RepairRequestForm;
}

const RequestSummary: React.FC<RequestSummaryProps> = ({ formData }) => {
  return (
    <div className="bg-[#f5f8f4] rounded-2xl p-5 sm:p-7 border border-[#dce7df] space-y-6">
      <h3 className="text-lg font-bold text-[#142825]">Review your request</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 font-medium">Customer</span>
          <span className="text-gray-900 font-bold">{formData.customerName || 'Not provided'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Contact</span>
          <span className="text-gray-900 font-bold">{formData.phone || 'Not provided'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Preferred contact</span>
          <span className="text-gray-900 font-bold">{formData.contactMethod}{formData.email ? ` · ${formData.email}` : ''}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Device</span>
          <span className="text-gray-900 font-bold">
            {formData.deviceType} — {formData.brand} {formData.model ? `— ${formData.model}` : ''}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Service</span>
          <span className="text-gray-900 font-bold">{formData.service || 'Not provided'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Service Method</span>
          <span className="text-gray-900 font-bold">
            {formData.serviceMethod === 'shop' ? 'Bring to Shop' :
             formData.serviceMethod === 'meetup' ? 'Meet-up' : 'Home Service'}
          </span>
        </div>
        <div className="flex flex-col sm:col-span-2">
          <span className="text-gray-500 font-medium">Problem</span>
          <span className="text-gray-900 font-medium whitespace-pre-wrap">{formData.problemDescription}</span>
        </div>
        {formData.additionalNotes && <div className="flex flex-col sm:col-span-2"><span className="text-gray-500 font-medium">Additional notes</span><span className="text-gray-900 whitespace-pre-wrap">{formData.additionalNotes}</span></div>}
      </div>
    </div>
  );
};

export default RequestSummary;
