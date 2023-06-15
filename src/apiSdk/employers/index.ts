import axios from 'axios';
import queryString from 'query-string';
import { EmployerInterface, EmployerGetQueryInterface } from 'interfaces/employer';
import { GetQueryInterface } from '../../interfaces';

export const getEmployers = async (query?: EmployerGetQueryInterface) => {
  const response = await axios.get(`/api/employers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEmployer = async (employer: EmployerInterface) => {
  const response = await axios.post('/api/employers', employer);
  return response.data;
};

export const updateEmployerById = async (id: string, employer: EmployerInterface) => {
  const response = await axios.put(`/api/employers/${id}`, employer);
  return response.data;
};

export const getEmployerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/employers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEmployerById = async (id: string) => {
  const response = await axios.delete(`/api/employers/${id}`);
  return response.data;
};
