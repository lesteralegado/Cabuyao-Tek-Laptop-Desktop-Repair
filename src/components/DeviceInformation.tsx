import React from 'react';
import FormField from './FormField';

interface DeviceInformationProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  errors: any;
}

const DeviceInformation: React.FC<DeviceInformationProps> = ({ formData, updateField, errors }) => {
  const deviceTypes = ["Computer", "Laptop", "Cellphone", "Tablet", "Other"];
  const brands = ["ASUS", "Acer", "Lenovo", "HP", "Dell", "MSI", "Apple", "Samsung", "Other"];

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Device Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Device Type" required error={errors.deviceType}>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            value={formData.deviceType}
            onChange={(e) => updateField('deviceType', e.target.value)}
          >
            <option value="">Select device...</option>
            {deviceTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </FormField>

        <FormField label="Brand" required error={errors.brand}>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            value={formData.brand}
            onChange={(e) => updateField('brand', e.target.value)}
          >
            <option value="">Select brand...</option>
            {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </select>
        </FormField>

        <FormField label="Model">
          <input
            type="text"
            placeholder="Example: ASUS VivoBook 15"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.model}
            onChange={(e) => updateField('model', e.target.value)}
          />
        </FormField>

        <FormField label="Serial Number">
          <div className="flex flex-col space-y-1">
            <input
              type="text"
              placeholder="Enter serial number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.serialNumber}
              onChange={(e) => updateField('serialNumber', e.target.value)}
            />
            <span className="text-xs text-gray-500">If available, you can provide the device serial number.</span>
          </div>
        </FormField>
      </div>
    </div>
  );
};

export default DeviceInformation;
