export interface ServiceItem {
  id: string;
  name: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  services: ServiceItem[];
}

export interface SpecializedService {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Step {
  id: string;
  title: string;
  description: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  options: string;
}
