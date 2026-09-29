import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import type { RepairRequestForm as FormType } from '../types/repair';
import CustomerInformation from './CustomerInformation';
import DeviceInformation from './DeviceInformation';
import ServiceSelection from './ServiceSelection';
import ProblemDescription from './ProblemDescription';
import ServiceMethod from './ServiceMethod';
import RequestSummary from './RequestSummary';
import { createRepairRequest } from '../services/repairRequestService';

const steps = ['Your details', 'The repair', 'Review'];
const firstStepFields = new Set(['customerName', 'phone', 'email', 'contactMethod', 'deviceType', 'brand']);

export default function RepairRequestForm() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormType>({
    customerName: '', phone: '', email: '', contactMethod: '' as FormType['contactMethod'],
    deviceType: '' as FormType['deviceType'], brand: '', model: '', serialNumber: '',
    service: '', problemDescription: '', additionalNotes: '', serviceMethod: '' as FormType['serviceMethod'],
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (scope: 'first' | 'all'): boolean => {
    const next: Record<string, string> = {};
    if (!formData.customerName.trim()) next.customerName = 'Full name is required.';
    else if (formData.customerName.trim().length < 2) next.customerName = 'Please enter your full name.';
    if (!/^(09)\d{9}$/.test(formData.phone.trim())) next.phone = 'Enter an 11-digit mobile number starting with 09.';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Enter a valid email address.';
    if (!formData.contactMethod) next.contactMethod = 'Choose how we should contact you.';
    else if (formData.contactMethod === 'Email' && !formData.email) next.email = 'Enter an email address to use email contact.';
    if (!formData.deviceType) next.deviceType = 'Choose a device type.';
    if (!formData.brand) next.brand = 'Choose a brand.';
    if (scope === 'all') {
      if (!formData.service) next.service = 'Choose a service.';
      if (!formData.problemDescription.trim()) next.problemDescription = 'Describe the problem.';
      else if (formData.problemDescription.trim().length < 10) next.problemDescription = 'Add a little more detail about the problem.';
      if (!formData.serviceMethod) next.serviceMethod = 'Choose a service method.';
    }
    const relevant = scope === 'first' ? Object.fromEntries(Object.entries(next).filter(([key]) => firstStepFields.has(key))) : next;
    setErrors(relevant);
    const first = Object.keys(relevant)[0];
    if (first) {
      if (step === 2) setStep(firstStepFields.has(first) ? 0 : 1);
      window.setTimeout(() => document.getElementById(first)?.focus(), 0);
    }
    return !first;
  };

  const goToStep = (next: number) => {
    setStep(next);
    setErrors({});
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    formRef.current?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
  };

  const handleContinue = () => {
    if (validate(step === 0 ? 'first' : 'all')) goToStep(step + 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== 2 || isSubmitting) return;
    if (!validate('all')) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await createRepairRequest(formData);
      navigate('/request/success', { state: { referenceNumber: result.reference_number } });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Your request could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 scroll-mt-28" noValidate>
      <ol className="grid grid-cols-3 gap-2" aria-label="Request progress">
        {steps.map((label, index) => (
          <li key={label} aria-current={step === index ? 'step' : undefined} className={`border-t-[3px] pt-3 text-xs sm:text-sm font-semibold ${index <= step ? 'border-blue-600 text-[#143c39]' : 'border-[#d7e0d9] text-[#89958e]'}`}>
            <span className="font-mono mr-1">0{index + 1}</span> {label}
          </li>
        ))}
      </ol>

      <div>
        <p className="eyebrow mb-2">Step {step + 1} of 3</p>
        <h2 className="section-heading text-2xl sm:text-3xl font-extrabold text-[#142825]">{steps[step]}</h2>
        <p className="text-[#61726b] mt-2 text-sm">{step === 0 ? 'How can we reach you, and what device needs help?' : step === 1 ? 'Tell us what needs attention and how you prefer the service.' : 'Check the details before you send your request.'}</p>
      </div>

      {step === 0 && <div className="space-y-10"><CustomerInformation formData={formData} updateField={updateField} errors={errors} /><DeviceInformation formData={formData} updateField={updateField} errors={errors} /></div>}
      {step === 1 && <div className="space-y-10"><ServiceSelection formData={formData} updateField={updateField} errors={errors} /><ProblemDescription formData={formData} updateField={updateField} errors={errors} /><ServiceMethod formData={formData} updateField={updateField} errors={errors} /></div>}
      {step === 2 && <RequestSummary formData={formData} />}

      {submitError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{submitError}</div>}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-[#e2e9e4] pt-6">
        {step > 0 ? <button type="button" onClick={() => goToStep(step - 1)} className="btn-secondary w-full sm:w-auto"><ArrowLeft className="w-4 h-4" /> Back</button> : <p className="text-sm text-[#718077]">Fields marked * are required.</p>}
        {step < 2 ? <button type="button" onClick={handleContinue} className="btn-primary w-full sm:w-auto">Continue <ArrowRight className="w-4 h-4" /></button> : <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">{isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} {isSubmitting ? 'Submitting...' : 'Submit request'}</button>}
      </div>
    </form>
  );
}
