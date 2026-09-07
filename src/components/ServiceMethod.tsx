import React from 'react';
import FormField from './FormField';

interface ServiceMethodProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  errors: any;
}

const ServiceMethod: React.FC<ServiceMethodProps> = ({ formData, updateField, errors }) => {
  const options = [
    { id: 'shop', label: 'Bring Device to Shop', desc: 'Bring your device directly to Cabuyao Tek.' },
    { id: 'meetup', label: 'Meet-up', desc: 'Arrange a convenient meet-up for your device service.' },
    { id: 'home_service', label: 'Home Service', desc: 'Request technical assistance at your location for applicable services.' },
  ];

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">How Would You Like the Service?</h3>
      <FormField label="Select Service Method" required error={errors.serviceMethod}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((opt) => (
            <label
              key={opt.id}
              className={`relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                formData.serviceMethod === opt.id
                  ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="serviceMethod"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  value={opt.id}
                  checked={formData.serviceMethod === opt.id}
                  onChange={(e) => updateField('serviceMethod', e.target.value)}
                />
                <span className={`ml-2 font-bold ${formData.serviceMethod === opt.id ? 'text-blue-700' : 'text-gray-700'}`}>
                  {opt.label}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3 italic">Availability may depend on the type of service required.</p>
      </FormField>
    </div>
  );
};

export default ServiceMethod;
