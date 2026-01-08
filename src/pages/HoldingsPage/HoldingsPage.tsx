import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import './PortfolioPage.scss';
import { AddTransactionModal, AddTransactionForm } from '../../components/AddTransactionModal/AddTransactionModal';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { createTransaction, getPortfolioDetails, PortfolioDetailsDto, deleteAsset } from '../../api/portfolioApi';

export const HoldingsPage = () => {
  const { id: portfolioId } = useParams<{ id: string }>();

  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isTxLoading, setIsTxLoading] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [txSuccess, setTxSuccess] = useState<string | null>(null);

  const [portfolioDetails, setPortfolioDetails] = useState<PortfolioDetailsDto | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const [activeAssetMenu, setActiveAssetMenu] = useState<string | null>(null);
  const [assetToDelete, setAssetToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeAssetMenu && !(event.target as Element).closest('.PortfolioPage__action-container')) {
        setActiveAssetMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeAssetMenu]);

  const openTxModal = () => {
    setTxError(null);
    setTxSuccess(null);
    setIsTxModalOpen(true);
  };

  const closeTxModal = () => {
    if (isTxLoading) return;
    setIsTxModalOpen(false);
  };

  const toggleAssetMenu = (assetId: string) => {
    setActiveAssetMenu(activeAssetMenu === assetId ? null : assetId);
  };

  const handleDeleteAsset = async () => {
    if (!portfolioId || !assetToDelete) return;

    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteAsset(portfolioId, assetToDelete);
      setAssetToDelete(null);
      loadPortfolioDetails();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete asset');
    } finally {
      setIsDeleting(false);
    }
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

  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'Loading...';
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatPercent = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'Loading...';
    return (value * 100).toFixed(2) + '%';
  };

  const totalNetWorth = portfolioDetails?.assetDtos.reduce((sum, asset) => sum + (asset.currentValue ?? 0), 0) || 0;
  const totalCostBasis = portfolioDetails?.assetDtos.reduce((sum, asset) => sum + (asset.costBasis ?? 0), 0) || 0;
  const totalProfit = portfolioDetails?.assetDtos.reduce((sum, asset) => sum + (asset.totalProfit ?? 0), 0) || 0;
  const totalProfitRate = totalCostBasis > 0 ? (totalProfit / totalCostBasis) : 0;

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
              <p className="PortfolioPage__stat-value">${formatCurrency(totalNetWorth)}</p>
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
                  {totalProfit >= 0 ? '+' : ''}${formatCurrency(totalProfit)}
                </p>
                <span className={`PortfolioPage__stat-percent ${totalProfitRate >= 0 ? 'PortfolioPage__stat-percent--positive' : 'PortfolioPage__stat-percent--negative'}`}>
                  {totalProfitRate >= 0 ? '+' : ''}{formatPercent(totalProfitRate)}
                </span>
              </div>
            </div>

            <div className="PortfolioPage__stat-card">
              <p className="PortfolioPage__stat-label">Total Dividends</p>
              <div className="PortfolioPage__stat-change-row">
                <p className="PortfolioPage__stat-value">
                  ${formatCurrency(portfolioDetails?.assetDtos.reduce((sum, asset) => sum + (asset.dividendsTotal ?? 0), 0) || 0)}
                </p>
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
                        <span className="PortfolioPage__table-price">${formatCurrency(asset.currentPrice)}</span>
                        {/* <span className="PortfolioPage__table-change PortfolioPage__table-change--positive">+1.32%</span> */}
                      </td>
                      <td className="PortfolioPage__table-right">{asset.quantity}</td>
                      <td className="PortfolioPage__table-right">${formatCurrency(asset.averagePrice)}</td>
                      <td className="PortfolioPage__table-right PortfolioPage__table-value">${formatCurrency(asset.currentValue)}</td>
                      <td className="PortfolioPage__table-right">
                        <div className={`PortfolioPage__table-return ${asset.totalProfit >= 0 ? 'PortfolioPage__table-return--positive' : 'PortfolioPage__table-return--negative'}`}>
                          {asset.totalProfit >= 0 ? '+' : ''}${formatCurrency(asset.totalProfit)}
                        </div>
                        <span className={`PortfolioPage__table-badge ${asset.totalProfitRate >= 0 ? 'PortfolioPage__table-badge--positive' : 'PortfolioPage__table-badge--negative'}`}>
                          {asset.totalProfitRate >= 0 ? '+' : ''}{formatPercent(asset.totalProfitRate)}
                        </span>
                      </td>
                      <td className="PortfolioPage__table-center">
                        <div className="PortfolioPage__action-container">
                          <button
                            className="PortfolioPage__action-btn"
                            onClick={() => toggleAssetMenu(asset.id)}
                          >
                            •••
                          </button>
                          {activeAssetMenu === asset.id && (
                            <div className="PortfolioPage__dropdown">
                              <button
                                className="PortfolioPage__dropdown-item"
                                onClick={() => {
                                  openTxModal();
                                  setActiveAssetMenu(null);
                                }}
                              >
                                Add transaction
                              </button>
                              <button
                                className="PortfolioPage__dropdown-item"
                                onClick={() => {
                                  console.log('Edit asset', asset.id);
                                  setActiveAssetMenu(null);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="PortfolioPage__dropdown-item PortfolioPage__dropdown-item--danger"
                                onClick={() => {
                                  setAssetToDelete(asset.id);
                                  setActiveAssetMenu(null);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
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

      {deleteError && (
        <div className="PortfolioPage__toast PortfolioPage__toast--error">
          {deleteError}
        </div>
      )}

      <AddTransactionModal
        isOpen={isTxModalOpen}
        onClose={closeTxModal}
        onSubmit={handleSubmitTransaction}
        isLoading={isTxLoading}
        error={txError}
      />

      <ConfirmationModal
        isOpen={!!assetToDelete}
        onClose={() => setAssetToDelete(null)}
        onConfirm={handleDeleteAsset}
        title="Delete Position"
        message="Are you sure you want to delete this position? This action cannot be undone."
        confirmText="Delete"
        isLoading={isDeleting}
        isDanger={true}
      />
    </main>
  );
};

