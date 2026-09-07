import type {
  ServiceCategory,
  SpecializedService,
  Brand,
  Step,
  WhyChooseUsItem,
  ContactInfo
} from '../types';

export const businessInfo: ContactInfo = {
  phone: '09473019217',
  email: 'johncomshop01@gmail.com',
  location: 'Cabuyao, Laguna',
  options: 'Meet-up & Home Service Available',
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'comp-sw',
    title: 'Computer & Software Services',
    description: "From everyday software problems to hardware repairs and technical installations, we've got you covered.",
    icon: 'Monitor',
    services: [
      { id: 's1', name: 'Computer Troubleshooting' },
      { id: 's2', name: 'Computer Reformat' },
      { id: 's3', name: 'Installation of Operating System' },
      { id: 's4', name: 'Installation of Applications' },
      { id: 's5', name: 'Windows Online Activation' },
      { id: 's6', name: 'Windows Update' },
      { id: 's7', name: 'Windows Backup' },
      { id: 's8', name: 'File Recovery' },
    ],
  },
  {
    id: 'hw-repair',
    title: 'Hardware & Repair Services',
    description: "Professional hardware maintenance and physical repairs for your devices.",
    icon: 'Cpu',
    services: [
      { id: 'h1', name: 'Hardware Replacement' },
      { id: 'h2', name: 'Laptop Cleaning' },
      { id: 'h3', name: 'Desktop Cleaning' },
      { id: 'h4', name: 'System Unit Assembly' },
      { id: 'h5', name: 'Board Repair' },
      { id: 'h6', name: 'Reflow & Reballing' },
    ],
  },
  {
    id: 'phone-services',
    title: 'Smartphone Services',
    description: "Reliable troubleshooting and repair for all major smartphone brands.",
    icon: 'Smartphone',
    services: [
      { id: 'p1', name: 'Smartphone Repair' },
      { id: 'p2', name: 'Smartphone Troubleshooting' },
    ],
  },
];

export const specializedServices: SpecializedService[] = [
  {
    id: 'net-setup',
    title: 'Network Setup & Troubleshooting',
    description: 'Setup and troubleshooting for home and small-business networks, including connectivity and configuration issues.',
    icon: 'Wifi',
  },
  {
    id: 'cctv-install',
    title: 'CCTV Installation',
    description: 'CCTV installation and setup with live viewing configuration for convenient monitoring.',
    icon: 'Video',
  },
];

export const brands: Brand[] = [
  { id: 'b1', name: 'ASUS', logoUrl: '/brands/asus.png' },
  { id: 'b2', name: 'Acer', logoUrl: '/brands/acer.png' },
  { id: 'b3', name: 'Lenovo', logoUrl: '/brands/lenovo.png' },
  { id: 'b4', name: 'HP', logoUrl: '/brands/hp.png' },
  { id: 'b5', name: 'Dell', logoUrl: '/brands/dell.png' },
  { id: 'b6', name: 'MSI', logoUrl: '/brands/msi.png' },
  { id: 'b7', name: 'Apple', logoUrl: '/brands/apple.png' },
  { id: 'b8', name: 'Samsung', logoUrl: '/brands/samsung.png' },
];

export const howItWorks: Step[] = [
  {
    id: '1',
    title: 'Submit a Request',
    description: 'Tell us about your device and the problem you\'re experiencing.',
  },
  {
    id: '2',
    title: 'Receive Your Reference Number',
    description: 'After submitting your request, you\'ll receive a unique reference number.',
  },
  {
    id: '3',
    title: 'Track Your Repair',
    description: 'Use your reference number to check the status of your repair.',
  },
  {
    id: '4',
    title: 'Get Your Device Back',
    description: 'We\'ll update you when your device is ready.',
  },
];

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    id: 'w1',
    title: 'Convenient Service',
    description: 'Meet-up and home service options are available.',
  },
  {
    id: 'w2',
    title: 'Wide Range of Services',
    description: 'Computer, laptop, smartphone, networking, CCTV, software, and hardware services.',
  },
  {
    id: 'w3',
    title: 'Clear Repair Tracking',
    description: 'Customers can use a reference number to follow their repair status.',
  },
  {
    id: 'w4',
    title: 'Local Service',
    description: 'Technology assistance for customers in and around Cabuyao.',
  },
];
