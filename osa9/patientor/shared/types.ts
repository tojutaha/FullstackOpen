export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender?: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;