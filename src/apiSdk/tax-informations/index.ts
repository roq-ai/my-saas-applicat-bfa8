import axios from 'axios';
import queryString from 'query-string';
import { TaxInformationInterface, TaxInformationGetQueryInterface } from 'interfaces/tax-information';
import { GetQueryInterface } from '../../interfaces';

export const getTaxInformations = async (query?: TaxInformationGetQueryInterface) => {
  const response = await axios.get(`/api/tax-informations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTaxInformation = async (taxInformation: TaxInformationInterface) => {
  const response = await axios.post('/api/tax-informations', taxInformation);
  return response.data;
};

export const updateTaxInformationById = async (id: string, taxInformation: TaxInformationInterface) => {
  const response = await axios.put(`/api/tax-informations/${id}`, taxInformation);
  return response.data;
};

export const getTaxInformationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tax-informations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTaxInformationById = async (id: string) => {
  const response = await axios.delete(`/api/tax-informations/${id}`);
  return response.data;
};
