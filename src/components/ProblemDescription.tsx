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

      <FormField id="problemDescription" label="Problem Description" required error={errors.problemDescription} hint="What happened, what is the device doing, and when did it start?">
        <textarea
          rows={4}
          placeholder="Example: My laptop turns on but the screen stays black. It started happening yesterday."
          className="field-control min-h-32"
          value={formData.problemDescription}
          onChange={(e) => updateField('problemDescription', e.target.value)}
        />
      </FormField>

      <FormField id="additionalNotes" label="Additional Notes">
        <textarea
          rows={3}
          placeholder="Add anything else you think we should know (e.g. previous repairs, recent changes)..."
          className="field-control min-h-24"
          value={formData.additionalNotes}
          onChange={(e) => updateField('additionalNotes', e.target.value)}
        />
      </FormField>
    </div>
  );
};

export default ProblemDescription;
