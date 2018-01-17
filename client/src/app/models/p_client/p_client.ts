import { Address, Phone } from '../contact/contactinfo.ts';
import { BasicHealth } from '../health/healthinfo.ts';

export class p_Client {
  // MongoDB ID
  _id: number;

  // PII
  first_name:      string;
  middile_initial: string;
  last_name:       string;
  dob:             Date;
  ssn:             string;

  // Calculated
  age: Date;

  // Contacts
  addresses: Address[];
  phones:    Phone[];
  email:     string[];
  // Indexes of primary contact
  primary_address: number;
  primary_phone:   number;
  primary_email:   number;

  // Health
  basic_health: BasicHealth;
};
