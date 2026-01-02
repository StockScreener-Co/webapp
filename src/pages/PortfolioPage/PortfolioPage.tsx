import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import './PortfolioPage.scss';
import { AddTransactionModal, AddTransactionForm } from '../../components/AddTransactionModal/AddTransactionModal';
import { createTransaction, getPortfolioDetails, PortfolioDetailsDto } from '../../api/portfolioApi';

export const PortfolioPage = () => {
  const { id: portfolioId } = useParams<{ id: string }>();

  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [txSuccess, setTxSuccess] = useState<string | null>(null);

  const [portfolioDetails, setPortfolioDetails] = useState<PortfolioDetailsDto | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const loadPortfolioDetails = useCallback(async () => {
    if (!portfolioId) return;

    setIsLoadingDetails(true);
    setDetailsError(null);
    try {
      const data = await getPortfolioDetails(portfolioId);
      setPortfolioDetails(data);
    } catch (err) {
      setDetailsError(err instanceof Error ? err.message : 'Failed to load portfolio details');
    } finally {
      setIsLoadingDetails(false);
    }
  }, [portfolioId]);

  useEffect(() => {
    loadPortfolioDetails();
  }, [loadPortfolioDetails]);

  const openTxModal = () => {
    setTxError(null);
    setTxSuccess(null);
    setIsTxModalOpen(true);
  };

  const closeTxModal = () => {
    if (isTxLoading) return;
    setIsTxModalOpen(false);
  };

  const handleSubmitTransaction = async (form: AddTransactionForm) => {
    if (!portfolioId) {
      setTxError('Portfolio ID is missing.');
      return;
    }

    setIsTxLoading(true);
    setTxError(null);
    setTxSuccess(null);

    try {
      const payload = {
        instrumentId: form.instrumentId.trim(),
        tradeDate: form.tradeDate,
        price: Number(form.price),
        operationType: form.operationType,
        quantity: Number(form.quantity),
      };

      console.log('Submitting transaction:', payload);

      await createTransaction(portfolioId, payload);

      setTxSuccess('Transaction created successfully');
      setIsTxModalOpen(false);
      // Перезапрашиваем данные портфеля после создания транзакции
      loadPortfolioDetails();
    } catch (err) {
      setTxError(err instanceof Error ? err.message : 'Failed to create transaction');
    } finally {
      setIsTxLoading(false);
    }
  };

  if (isLoadingDetails && !portfolioDetails) {
    return (
      <main className="PortfolioPage">
        <div className="container">
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading portfolio details...</div>
        </div>
      </main>
    );
  }

  if (detailsError && !portfolioDetails) {
    return (
      <main className="PortfolioPage">
        <div className="container">
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--error-color)' }}>
            Error: {detailsError}
          </div>
        </div>
      </main>
    );
  }

  const totalNetWorth = portfolioDetails?.assetDtos.reduce((sum, asset) => sum + asset.currentValue, 0) || 0;
  const totalCostBasis = portfolioDetails?.assetDtos.reduce((sum, asset) => sum + asset.costBasis, 0) || 0;
  const totalProfit = portfolioDetails?.assetDtos.reduce((sum, asset) => sum + asset.totalProfit, 0) || 0;
  const totalProfitRate = totalCostBasis > 0 ? (totalProfit / totalCostBasis) * 100 : 0;

  return (
    <main className="PortfolioPage">
      {/* Portfolio Header Section */}
      <section className="PortfolioPage__header">
        <div className="container">
          <div className="PortfolioPage__header-content">
            <div>
              <div className="PortfolioPage__title-row">
                <h1 className="PortfolioPage__title">{portfolioDetails?.name || 'Portfolio'}</h1>
                <span className="PortfolioPage__badge">Active</span>
              </div>
              <p className="PortfolioPage__subtitle">
                ID: {portfolioId} · Holdings: {portfolioDetails?.assetDtos.length || 0}
              </p>
            </div>
            <div className="PortfolioPage__actions">
              <button className="PortfolioPage__btn PortfolioPage__btn--secondary">
                Analytics
              </button>
              <button className="PortfolioPage__btn PortfolioPage__btn--primary" onClick={openTxModal}>
                + Add Transaction
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="PortfolioPage__stats">
        <div className="container">
          <div className="PortfolioPage__stats-grid">
            <div className="PortfolioPage__stat-card">
              <p className="PortfolioPage__stat-label">Net Worth</p>
              <p className="PortfolioPage__stat-value">${totalNetWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="PortfolioPage__stat-description">Holdings Value</p>
            </div>

            <div className="PortfolioPage__stat-card">
              <p className="PortfolioPage__stat-label">Day Change</p>
              <div className="PortfolioPage__stat-change-row">
                <p className="PortfolioPage__stat-value">---</p>
                <span className="PortfolioPage__stat-badge">0.00%</span>
              </div>
            </div>

            <div className="PortfolioPage__stat-card">
              <p className="PortfolioPage__stat-label">Total Profit/Loss</p>
              <div className="PortfolioPage__stat-change-row">
                <p className={`PortfolioPage__stat-value ${totalProfit >= 0 ? 'PortfolioPage__stat-value--positive' : 'PortfolioPage__stat-value--negative'}`}>
                  {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <span className={`PortfolioPage__stat-percent ${totalProfitRate >= 0 ? 'PortfolioPage__stat-percent--positive' : 'PortfolioPage__stat-percent--negative'}`}>
                  {totalProfitRate >= 0 ? '+' : ''}{totalProfitRate.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="PortfolioPage__stat-card">
              <p className="PortfolioPage__stat-label">Total Dividends</p>
              <div className="PortfolioPage__stat-change-row">
                <p className="PortfolioPage__stat-value">
                  ${(portfolioDetails?.assetDtos.reduce((sum, asset) => sum + asset.dividendsTotal, 0) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="PortfolioPage__charts">
        <div className="container">
          <div className="PortfolioPage__charts-grid">
            <div className="PortfolioPage__chart-card PortfolioPage__chart-card--large">
              <div className="PortfolioPage__chart-header">
                <h3 className="PortfolioPage__chart-title">Portfolio Performance</h3>
                <div className="PortfolioPage__chart-tabs">
                  <button className="PortfolioPage__tab">1M</button>
                  <button className="PortfolioPage__tab PortfolioPage__tab--active">6M</button>
                  <button className="PortfolioPage__tab">1Y</button>
                  <button className="PortfolioPage__tab">ALL</button>
                </div>
              </div>
              <div className="PortfolioPage__chart-placeholder">
                <svg className="PortfolioPage__chart-bg" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 20 L0 15 L10 12 L20 16 L30 10 L40 14 L50 8 L60 12 L70 6 L80 10 L90 5 L100 2 L100 20 Z" />
                </svg>
                <svg className="PortfolioPage__chart-line" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path vectorEffect="non-scaling-stroke" d="M0 15 L10 12 L20 16 L30 10 L40 14 L50 8 L60 12 L70 6 L80 10 L90 5 L100 2" />
                </svg>
                <span className="PortfolioPage__chart-text">[Chart: Portfolio Value vs SPY]</span>
              </div>
            </div>

            <div className="PortfolioPage__chart-card">
              <h3 className="PortfolioPage__chart-title">Allocation by Sector</h3>
              <div className="PortfolioPage__allocation">
                <div className="PortfolioPage__pie-chart">
                  <div className="PortfolioPage__pie-center">
                    <span className="PortfolioPage__pie-label">Top</span>
                    <span className="PortfolioPage__pie-value">Tech</span>
                  </div>
                </div>
                <div className="PortfolioPage__allocation-list">
                  <div className="PortfolioPage__allocation-item">
                    <div className="PortfolioPage__allocation-info">
                      <span className="PortfolioPage__allocation-dot PortfolioPage__allocation-dot--indigo"></span>
                      <span>Technology</span>
                    </div>
                    <span className="PortfolioPage__allocation-percent">45%</span>
                  </div>
                  <div className="PortfolioPage__allocation-item">
                    <div className="PortfolioPage__allocation-info">
                      <span className="PortfolioPage__allocation-dot PortfolioPage__allocation-dot--emerald"></span>
                      <span>Real Estate</span>
                    </div>
                    <span className="PortfolioPage__allocation-percent">25%</span>
                  </div>
                  <div className="PortfolioPage__allocation-item">
                    <div className="PortfolioPage__allocation-info">
                      <span className="PortfolioPage__allocation-dot PortfolioPage__allocation-dot--sky"></span>
                      <span>Finance</span>
                    </div>
                    <span className="PortfolioPage__allocation-percent">20%</span>
                  </div>
                  <div className="PortfolioPage__allocation-item">
                    <div className="PortfolioPage__allocation-info">
                      <span className="PortfolioPage__allocation-dot PortfolioPage__allocation-dot--slate"></span>
                      <span>Other</span>
                    </div>
                    <span className="PortfolioPage__allocation-percent">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Holdings Section */}
      <section className="PortfolioPage__holdings">
        <div className="container">
          <div className="PortfolioPage__holdings-card">
            <div className="PortfolioPage__holdings-header">
              <h3 className="PortfolioPage__holdings-title">Holdings</h3>
              <input
                type="text"
                placeholder="Filter ticker..."
                className="PortfolioPage__filter-input"
              />
            </div>

            <div className="PortfolioPage__table-wrapper">
              <table className="PortfolioPage__table">
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th className="PortfolioPage__table-right">Price</th>
                    <th className="PortfolioPage__table-right">Qty</th>
                    <th className="PortfolioPage__table-right">Avg Cost</th>
                    <th className="PortfolioPage__table-right">Total Value</th>
                    <th className="PortfolioPage__table-right">Total Return</th>
                    <th className="PortfolioPage__table-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(portfolioDetails?.assetDtos || []).map((asset) => (
                    <tr key={asset.id}>
                      <td>
                        <div className="PortfolioPage__ticker-cell">
                          <div className="PortfolioPage__ticker-icon">{asset.symbol.slice(0, 2).toUpperCase()}</div>
                          <div>
                            <a href="#" className="PortfolioPage__ticker-link">{asset.symbol}</a>
                            <div className="PortfolioPage__ticker-name">{asset.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="PortfolioPage__table-right">
                        <span className="PortfolioPage__table-price">${asset.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        {/* <span className="PortfolioPage__table-change PortfolioPage__table-change--positive">+1.32%</span> */}
                      </td>
                      <td className="PortfolioPage__table-right">{asset.quantity}</td>
                      <td className="PortfolioPage__table-right">${asset.averagePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="PortfolioPage__table-right PortfolioPage__table-value">${asset.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="PortfolioPage__table-right">
                        <div className={`PortfolioPage__table-return ${asset.totalProfit >= 0 ? 'PortfolioPage__table-return--positive' : 'PortfolioPage__table-return--negative'}`}>
                          {asset.totalProfit >= 0 ? '+' : ''}${asset.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <span className={`PortfolioPage__table-badge ${asset.totalProfitRate >= 0 ? 'PortfolioPage__table-badge--positive' : 'PortfolioPage__table-badge--negative'}`}>
                          {asset.totalProfitRate >= 0 ? '+' : ''}{asset.totalProfitRate.toFixed(2)}%
                        </span>
                      </td>
                      <td className="PortfolioPage__table-center">
                        <button className="PortfolioPage__action-btn">•••</button>
                      </td>
                    </tr>
                  ))}
                  {(!portfolioDetails || portfolioDetails.assetDtos.length === 0) && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                        No holdings yet. Add a transaction to see your assets.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="PortfolioPage__holdings-footer">
              <span>Showing {portfolioDetails?.assetDtos.length || 0} holdings</span>
              <div className="PortfolioPage__pagination">
                <button className="PortfolioPage__pagination-btn" disabled>Previous</button>
                <button className="PortfolioPage__pagination-btn" disabled>Next</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {txSuccess && (
        <div className="PortfolioPage__toast PortfolioPage__toast--success">
          {txSuccess}
        </div>
      )}
      {txError && (
        <div className="PortfolioPage__toast PortfolioPage__toast--error">
          {txError}
        </div>
      )}

      <AddTransactionModal
        isOpen={isTxModalOpen}
        onClose={closeTxModal}
        onSubmit={handleSubmitTransaction}
        isLoading={isTxLoading}
        error={txError}
      />
    </main>
  );
};

