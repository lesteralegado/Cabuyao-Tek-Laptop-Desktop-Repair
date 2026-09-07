import React from 'react';
import FormField from './FormField';
import { repairServices } from '../data/services';

interface ServiceSelectionProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  errors: any;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ formData, updateField, errors }) => {
  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">What Do You Need Help With?</h3>
      <FormField label="Select Service" required error={errors.service}>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          value={formData.service}
          onChange={(e) => updateField('service', e.target.value)}
        >
          <option value="">Select a service...</option>
          {repairServices.map((cat) => (
            <optgroup key={cat.category} label={cat.category}>
              {cat.services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </FormField>
    </div>
  );
};

export default ServiceSelection;
