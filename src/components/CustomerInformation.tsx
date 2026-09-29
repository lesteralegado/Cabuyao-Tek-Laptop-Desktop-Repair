import React from 'react';
import FormField from './FormField';

interface CustomerInformationProps {
  formData: any; // Will use RepairRequestForm in the main form
  updateField: (field: string, value: any) => void;
  errors: any;
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({ formData, updateField, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Your Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField id="customerName" label="Full Name" required error={errors.customerName}>
          <input
            type="text"
            placeholder="Juan Dela Cruz"
            className="field-control"
            autoComplete="name"
            value={formData.customerName}
            onChange={(e) => updateField('customerName', e.target.value)}
          />
        </FormField>

        <FormField id="phone" label="Phone Number" required error={errors.phone}>
          <input
            type="tel"
            placeholder="09XXXXXXXXX"
            className="field-control"
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </FormField>

        <FormField id="email" label="Email Address" error={errors.email}>
          <input
            type="email"
            placeholder="you@example.com"
            className="field-control"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </FormField>

        <FormField id="contactMethod" label="Preferred Contact Method" required error={errors.contactMethod}>
          <select
            className="field-control"
            value={formData.contactMethod}
            onChange={(e) => updateField('contactMethod', e.target.value)}
          >
            <option value="">Select method...</option>
            <option value="Phone">Phone</option>
            <option value="SMS">SMS</option>
            <option value="Email">Email</option>
          </select>
        </FormField>
      </div>
    </div>
  );
};

export default CustomerInformation;
