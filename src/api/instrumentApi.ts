import { apiFetch } from './apiClient';

export interface Instrument {
  id: string; // UUID
  ticker: string;
  name: string;
}

export const searchInstruments = async (query: string, limit: number = 10): Promise<Instrument[]> => {
  if (!query?.trim()) return [];

  const response = await apiFetch(`/instruments/search?query=${encodeURIComponent(query)}&limit=${limit}`, {
    method: 'GET',
  });

  return response.json();
};

export const getInstrumentPrice = async (instrumentId: string, date: string): Promise<number> => {
  const response = await apiFetch(`/instruments/${instrumentId}/price?date=${encodeURIComponent(date)}`, {
    method: 'GET',
  });

  const data = await response.json();
  return data;
};
