import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TaxInformationInterface {
  id?: string;
  tax_due_date: any;
  tax_amount: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface TaxInformationGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
