const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface CreatePortfolioRequest {
  name: string;
}

export interface Portfolio {
  id?: number;
  name: string;
}

export interface TransactionRequestDto {
  instrumentId: string; // UUID
  tradeDate: string; // ISO date (YYYY-MM-DD)
  price: number;
  operationType: string;
  quantity: number;
}

export interface AssetDto {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  costBasis: number;
  currentPrice: number;
  currentValue: number;
  dividendPerShare: number;
  dividendsTotal: number;
  dividendYieldRate: number;
  dividendYieldOnCostRate: number;
  totalProfit: number;
  totalProfitRate: number;
}

export interface PortfolioDetailsDto {
  id: string;
  name: string;
  assetDtos: AssetDto[];
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

export const createTransaction = async (
  portfolioId: string,
  payload: TransactionRequestDto,
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolios/${portfolioId}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create transaction: ${response.status} ${errorText}`);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Cannot connect to backend server. Please make sure the backend is running on http://localhost:8080'
      );
    }
    throw error;
  }
};

export const getPortfolioDetails = async (id: string): Promise<PortfolioDetailsDto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolios/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch portfolio details: ${response.status} ${errorText}`);
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

export const getMyPortfolios = async (): Promise<Portfolio[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolios/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch portfolios: ${response.status} ${errorText}`);
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

