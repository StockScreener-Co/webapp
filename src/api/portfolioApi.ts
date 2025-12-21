const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface CreatePortfolioRequest {
  name: string;
}

export interface Portfolio {
  id?: number;
  name: string;
}

export const createPortfolio = async (name: string): Promise<Portfolio> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name } as CreatePortfolioRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create portfolio: ${response.status} ${errorText}`);
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

