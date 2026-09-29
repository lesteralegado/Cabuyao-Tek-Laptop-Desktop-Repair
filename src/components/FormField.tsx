import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, error, hint, required, children }) => {
  const isControl = React.isValidElement(children) && typeof children.type === 'string' && ['input', 'select', 'textarea'].includes(children.type);
  const control = isControl
    ? React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
        id,
        'aria-invalid': Boolean(error),
        'aria-required': required || undefined,
        'aria-describedby': [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined,
      })
    : children;
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={isControl ? id : undefined} id={!isControl ? `${id}-label` : undefined} className="text-sm font-semibold text-[#30433e]">
        {label}
        {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
      </label>
      {control}
      {hint && <p id={`${id}-hint`} className="text-sm text-[#718077]">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700 mt-1" role="alert">{error}</p>
      )}
    </div>
  );
};

export default FormField;
