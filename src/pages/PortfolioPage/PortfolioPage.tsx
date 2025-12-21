import './PortfolioPage.scss';

export const PortfolioPage = () => {
  return (
    <main className="PortfolioPage">
      {/* Portfolio Header Section */}
      <section className="PortfolioPage__header">
        <div className="container">
          <div className="PortfolioPage__header-content">
            <div>
              <div className="PortfolioPage__title-row">
                <h1 className="PortfolioPage__title">Main Dividend Portfolio</h1>
                <span className="PortfolioPage__badge">Active</span>
              </div>
              <p className="PortfolioPage__subtitle">
                Created on Nov 25, 2023 · Cash available: <span className="PortfolioPage__cash">$2,450.00</span>
              </p>
            </div>
            <div className="PortfolioPage__actions">
              <button className="PortfolioPage__btn PortfolioPage__btn--secondary">
                Analytics
              </button>
              <button className="PortfolioPage__btn PortfolioPage__btn--primary">
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
              <p className="PortfolioPage__stat-value">$42,590.25</p>
              <p className="PortfolioPage__stat-description">Cash + Holdings</p>
            </div>

            <div className="PortfolioPage__stat-card">
              <p className="PortfolioPage__stat-label">Day Change</p>
              <div className="PortfolioPage__stat-change-row">
                <p className="PortfolioPage__stat-value PortfolioPage__stat-value--positive">+$624.10</p>
                <span className="PortfolioPage__stat-badge PortfolioPage__stat-badge--positive">+1.48%</span>
              </div>
            </div>

            <div className="PortfolioPage__stat-card">
              <p className="PortfolioPage__stat-label">Total Profit/Loss</p>
              <div className="PortfolioPage__stat-change-row">
                <p className="PortfolioPage__stat-value PortfolioPage__stat-value--positive">+$8,120.00</p>
                <span className="PortfolioPage__stat-percent PortfolioPage__stat-percent--positive">+23.5%</span>
              </div>
            </div>

            <div className="PortfolioPage__stat-card">
              <p className="PortfolioPage__stat-label">Dividend Yield (Avg)</p>
              <div className="PortfolioPage__stat-change-row">
                <p className="PortfolioPage__stat-value">3.42%</p>
                <span className="PortfolioPage__stat-description">~$1,450 / yr</span>
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
                  <tr>
                    <td>
                      <div className="PortfolioPage__ticker-cell">
                        <div className="PortfolioPage__ticker-icon">AP</div>
                        <div>
                          <a href="#" className="PortfolioPage__ticker-link">AAPL</a>
                          <div className="PortfolioPage__ticker-name">Apple Inc.</div>
                        </div>
                      </div>
                    </td>
                    <td className="PortfolioPage__table-right">
                      <span className="PortfolioPage__table-price">$212.45</span>
                      <span className="PortfolioPage__table-change PortfolioPage__table-change--positive">+1.32%</span>
                    </td>
                    <td className="PortfolioPage__table-right">45</td>
                    <td className="PortfolioPage__table-right">$172.10</td>
                    <td className="PortfolioPage__table-right PortfolioPage__table-value">$9,560.25</td>
                    <td className="PortfolioPage__table-right">
                      <div className="PortfolioPage__table-return PortfolioPage__table-return--positive">+$1,825.80</div>
                      <span className="PortfolioPage__table-badge PortfolioPage__table-badge--positive">+23.6%</span>
                    </td>
                    <td className="PortfolioPage__table-center">
                      <button className="PortfolioPage__action-btn">•••</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="PortfolioPage__ticker-cell">
                        <div className="PortfolioPage__ticker-icon">MS</div>
                        <div>
                          <a href="#" className="PortfolioPage__ticker-link">MSFT</a>
                          <div className="PortfolioPage__ticker-name">Microsoft Corp</div>
                        </div>
                      </div>
                    </td>
                    <td className="PortfolioPage__table-right">
                      <span className="PortfolioPage__table-price">$415.00</span>
                      <span className="PortfolioPage__table-change PortfolioPage__table-change--negative">-0.45%</span>
                    </td>
                    <td className="PortfolioPage__table-right">20</td>
                    <td className="PortfolioPage__table-right">$350.00</td>
                    <td className="PortfolioPage__table-right PortfolioPage__table-value">$8,300.00</td>
                    <td className="PortfolioPage__table-right">
                      <div className="PortfolioPage__table-return PortfolioPage__table-return--positive">+$1,300.00</div>
                      <span className="PortfolioPage__table-badge PortfolioPage__table-badge--positive">+18.5%</span>
                    </td>
                    <td className="PortfolioPage__table-center">
                      <button className="PortfolioPage__action-btn">•••</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="PortfolioPage__ticker-cell">
                        <div className="PortfolioPage__ticker-icon">O</div>
                        <div>
                          <a href="#" className="PortfolioPage__ticker-link">O</a>
                          <div className="PortfolioPage__ticker-name">Realty Income</div>
                        </div>
                      </div>
                    </td>
                    <td className="PortfolioPage__table-right">
                      <span className="PortfolioPage__table-price">$58.20</span>
                      <span className="PortfolioPage__table-change">0.00%</span>
                    </td>
                    <td className="PortfolioPage__table-right">100</td>
                    <td className="PortfolioPage__table-right">$60.50</td>
                    <td className="PortfolioPage__table-right PortfolioPage__table-value">$5,820.00</td>
                    <td className="PortfolioPage__table-right">
                      <div className="PortfolioPage__table-return PortfolioPage__table-return--negative">-$230.00</div>
                      <span className="PortfolioPage__table-badge PortfolioPage__table-badge--negative">-3.8%</span>
                    </td>
                    <td className="PortfolioPage__table-center">
                      <button className="PortfolioPage__action-btn">•••</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="PortfolioPage__holdings-footer">
              <span>Showing 3 of 12 holdings</span>
              <div className="PortfolioPage__pagination">
                <button className="PortfolioPage__pagination-btn" disabled>Previous</button>
                <button className="PortfolioPage__pagination-btn">Next</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

