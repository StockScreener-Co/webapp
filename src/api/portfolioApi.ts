import { apiFetch } from './apiClient';

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
  dailyProfit: number;
  dailyProfitRate: number;
}

export interface PortfolioDetailsDto {
  id: string;
  name: string;
  assetDtos: AssetDto[];
}

export const createPortfolio = async (name: string): Promise<Portfolio> => {
  const response = await apiFetch('/portfolios', {
    method: 'POST',
    body: JSON.stringify({ name } as CreatePortfolioRequest),
  });

  return response.json();
};

export const createTransaction = async (
  portfolioId: string,
  payload: TransactionRequestDto,
): Promise<void> => {
  await apiFetch(`/portfolios/${portfolioId}/transactions`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const getPortfolioDetails = async (id: string): Promise<PortfolioDetailsDto> => {
  const response = await apiFetch(`/portfolios/${id}`, {
    method: 'GET',
  });

  return response.json();
};

export const getMyPortfolios = async (): Promise<Portfolio[]> => {
  const response = await apiFetch('/portfolios/my', {
    method: 'GET',
  });

  return response.json();
};

export const deleteAsset = async (portfolioId: string, assetId: string): Promise<void> => {
  await apiFetch(`/portfolios/${portfolioId}/asset/${assetId}`, {
    method: 'DELETE',
  });
};

