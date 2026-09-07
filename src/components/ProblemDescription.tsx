import React from 'react';
import FormField from './FormField';

interface ProblemDescriptionProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  errors: any;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ formData, updateField, errors }) => {
  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Describe the Problem</h3>

      <FormField label="Problem Description" required error={errors.problemDescription}>
        <textarea
          rows={4}
          placeholder="Example: My laptop turns on but the screen stays black. It started happening yesterday."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={formData.problemDescription}
          onChange={(e) => updateField('problemDescription', e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-2">Please describe what happened, what the device is doing, and when the problem started.</p>
      </FormField>

      <FormField label="Additional Notes">
        <textarea
          rows={3}
          placeholder="Add anything else you think we should know (e.g. previous repairs, recent changes)..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={formData.additionalNotes}
          onChange={(e) => updateField('additionalNotes', e.target.value)}
        />
      </FormField>
    </div>
  );
};

export default ProblemDescription;
