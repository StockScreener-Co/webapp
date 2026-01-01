const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface Instrument {
  id: string; // UUID
  ticker: string;
  name: string;
}

export const searchInstruments = async (query: string, limit: number = 10): Promise<Instrument[]> => {
  if (!query?.trim()) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/instruments/search?query=${encodeURIComponent(query)}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to search instruments: ${response.status} ${errorText}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Cannot connect to backend server. Please make sure the backend is running on http://localhost:8080'
      );
    }
    throw error;
  }
};

export const getInstrumentPrice = async (instrumentId: string, date: string): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/instruments/${instrumentId}/price?date=${encodeURIComponent(date)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch instrument price: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data; // Предполагаем, что API возвращает число напрямую или объект с ценой
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Cannot connect to backend server. Please make sure the backend is running on http://localhost:8080'
      );
    }
    throw error;
  }
};
