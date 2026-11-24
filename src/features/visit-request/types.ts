export type VisitRequestPayload = {
  name: string;
  email: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipcode: string;
  preferredContactMethod: string;
  contactInfo: string;
  referralSource?: string;
  ssn?: string;

  isPolicyHolderSameAsPatient: boolean;
  policyHolderName: string;
  healthInsurancePlan: string;
  healthInsuranceNumber: string;
  groupNumber?: string;

  doctorId?: number;
  doctorName: string;
  doctorSpecialty: string;
  preferredAppointmentTime: string;
  urgency: string;
  reasonForVisit: string;
};