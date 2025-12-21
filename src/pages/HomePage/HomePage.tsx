import './HomePage.scss';

export const HomePage = () => {
  return (
    <main className="HomePage">
      {/* Hero Section */}
      <section className="HomePage__hero">
        <div className="container">
          <div className="HomePage__hero-content">
            <div className="HomePage__hero-text">
              <p className="HomePage__badge">
                New · Portfolio & ticker analytics
              </p>
              <h1 className="HomePage__title">
                Control your portfolio.<br />
                Understand every ticker.
              </h1>
              <p className="HomePage__description">
                StockScreener хранит ваши портфели, анализирует тикеры и показывает реальную доходность
                с учётом дивидендов, комиссий и валюты. Один дашборд для всех ваших брокеров.
              </p>
              <div className="HomePage__buttons">
                <button className="HomePage__btn HomePage__btn--primary">
                  Get started — it's free
                </button>
                <button className="HomePage__btn HomePage__btn--secondary">
                  View demo dashboard
                </button>
              </div>
              <p className="HomePage__note">
                No credit card required · Works with stocks & ETFs
              </p>
            </div>

            {/* Hero dashboard preview */}
            <div className="HomePage__dashboard-preview">
              <div className="HomePage__dashboard-header">
                <div>
                  <p className="HomePage__dashboard-label">Total portfolio value</p>
                  <p className="HomePage__dashboard-value">$124,560.32</p>
                </div>
                <div className="HomePage__dashboard-header-right">
                  <p className="HomePage__dashboard-label">Today</p>
                  <p className="HomePage__dashboard-change HomePage__dashboard-change--positive">
                    + $842.17 (+0.68%)
                  </p>
                </div>
              </div>
              <div className="HomePage__dashboard-stats">
                <div className="HomePage__stat-card">
                  <p className="HomePage__stat-label">Dividends (YTD)</p>
                  <p className="HomePage__stat-value">$1,742.22</p>
                  <p className="HomePage__stat-change HomePage__stat-change--positive">+14.3% YoY</p>
                </div>
                <div className="HomePage__stat-card">
                  <p className="HomePage__stat-label">Yield on cost</p>
                  <p className="HomePage__stat-value">4.21%</p>
                  <p className="HomePage__stat-change">Projected</p>
                </div>
                <div className="HomePage__stat-card">
                  <p className="HomePage__stat-label">Cash</p>
                  <p className="HomePage__stat-value">$6,320.00</p>
                  <p className="HomePage__stat-change">Ready to invest</p>
                </div>
              </div>
              <div className="HomePage__positions">
                <div className="HomePage__positions-header">
                  <span>Top positions</span>
                  <span>Today P/L</span>
                </div>
                <div className="HomePage__positions-list">
                  <div className="HomePage__position">
                    <div>
                      <p className="HomePage__position-ticker">AAPL</p>
                      <p className="HomePage__position-name">Apple Inc.</p>
                    </div>
                    <div className="HomePage__position-right">
                      <p>$212.45</p>
                      <p className="HomePage__position-change HomePage__position-change--positive">+1.32%</p>
                    </div>
                  </div>
                  <div className="HomePage__position">
                    <div>
                      <p className="HomePage__position-ticker">MSFT</p>
                      <p className="HomePage__position-name">Microsoft</p>
                    </div>
                    <div className="HomePage__position-right">
                      <p>$384.10</p>
                      <p className="HomePage__position-change HomePage__position-change--positive">+0.54%</p>
                    </div>
                  </div>
                  <div className="HomePage__position">
                    <div>
                      <p className="HomePage__position-ticker">KO</p>
                      <p className="HomePage__position-name">Coca-Cola</p>
                    </div>
                    <div className="HomePage__position-right">
                      <p>$63.12</p>
                      <p className="HomePage__position-change HomePage__position-change--negative">-0.22%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio at a glance */}
      <section id="features" className="HomePage__section">
        <div className="container">
          <div className="HomePage__section-header">
            <h2 className="HomePage__section-title">
              Your portfolio at a glance
            </h2>
            <p className="HomePage__section-description">
              Объединяйте позиции с разных брокеров, отслеживайте дивиденды и доходность
              портфеля в одной простой панели.
            </p>
          </div>
          <div className="HomePage__features-grid">
            <div className="HomePage__feature-card">
              <p className="HomePage__feature-label">Performance</p>
              <p className="HomePage__feature-value">+16.4%</p>
              <p className="HomePage__feature-text">
                Track portfolio performance over any timeframe and compare to benchmarks.
              </p>
            </div>
            <div className="HomePage__feature-card">
              <p className="HomePage__feature-label">Dividend tracker</p>
              <p className="HomePage__feature-value">$1,742 / year</p>
              <p className="HomePage__feature-text">
                Monthly dividend calendar, yield on cost, and payout history.
              </p>
            </div>
            <div className="HomePage__feature-card">
              <p className="HomePage__feature-label">Multi-currency</p>
              <p className="HomePage__feature-value">USD · EUR · CZK</p>
              <p className="HomePage__feature-text">
                Positions in different currencies with automatic FX conversion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker analytics & screener */}
      <section id="screener" className="HomePage__section">
        <div className="container">
          <div className="HomePage__screener-content">
            <div className="HomePage__screener-text">
              <h2 className="HomePage__section-title">
                Deep analytics for every ticker
              </h2>
              <p className="HomePage__section-description">
                Смотрите историю цен, дивиденды, волатильность, сектор и страну,
                фильтруйте тикеры по нужным критериям и собирайте собственные watchlist'ы.
              </p>
              <ul className="HomePage__screener-list">
                <li>• Price history, volatility & drawdowns</li>
                <li>• Dividend history, yield & payout ratio</li>
                <li>• Sector, country, market cap and more</li>
                <li>• Custom tags, notes and watchlists</li>
              </ul>
            </div>
            <div className="HomePage__screener-demo">
              <div className="HomePage__screener-filters">
                <div className="HomePage__filter-group">
                  <label className="HomePage__filter-label">Search</label>
                  <div className="HomePage__filter-input">AAPL, MSFT, KO…</div>
                </div>
                <div className="HomePage__filter-group">
                  <label className="HomePage__filter-label">Dividend yield</label>
                  <div className="HomePage__filter-input">&gt; 2%</div>
                </div>
                <div className="HomePage__filter-group">
                  <label className="HomePage__filter-label">Sector</label>
                  <div className="HomePage__filter-input">Technology</div>
                </div>
              </div>
              <div className="HomePage__screener-table-wrapper">
                <table className="HomePage__screener-table">
                  <thead>
                    <tr>
                      <th>Ticker</th>
                      <th>Name</th>
                      <th className="HomePage__table-right">Price</th>
                      <th className="HomePage__table-right">Today</th>
                      <th className="HomePage__table-right">Div. Yield</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="HomePage__table-ticker">AAPL</td>
                      <td className="HomePage__table-name">Apple Inc.</td>
                      <td className="HomePage__table-right">$212.45</td>
                      <td className="HomePage__table-right HomePage__table-change--positive">+1.32%</td>
                      <td className="HomePage__table-right">0.50%</td>
                    </tr>
                    <tr>
                      <td className="HomePage__table-ticker">MSFT</td>
                      <td className="HomePage__table-name">Microsoft</td>
                      <td className="HomePage__table-right">$384.10</td>
                      <td className="HomePage__table-right HomePage__table-change--negative">-0.84%</td>
                      <td className="HomePage__table-right">0.80%</td>
                    </tr>
                    <tr>
                      <td className="HomePage__table-ticker">KO</td>
                      <td className="HomePage__table-name">Coca-Cola</td>
                      <td className="HomePage__table-right">$63.12</td>
                      <td className="HomePage__table-right HomePage__table-change--positive">+0.12%</td>
                      <td className="HomePage__table-right">3.10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="HomePage__screener-note">
                Demo data for illustration. Real data обновляется через ваши подключенные источники.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="HomePage__section">
        <div className="container">
          <h2 className="HomePage__section-title HomePage__section-title--centered">
            How it works
          </h2>
          <div className="HomePage__steps-grid">
            <div className="HomePage__step-card">
              <p className="HomePage__step-label">Step 1</p>
              <p className="HomePage__step-title">Create your portfolio</p>
              <p className="HomePage__step-text">
                Импортируйте транзакции из CSV или добавьте позиции вручную: покупки, продажи, комиссии и валюту.
              </p>
            </div>
            <div className="HomePage__step-card">
              <p className="HomePage__step-label">Step 2</p>
              <p className="HomePage__step-title">Add tickers & positions</p>
              <p className="HomePage__step-text">
                Свяжите тикеры с портфелем, настройте валюту отчётов и базовую валюту для расчётов.
              </p>
            </div>
            <div className="HomePage__step-card">
              <p className="HomePage__step-label">Step 3</p>
              <p className="HomePage__step-title">Track performance daily</p>
              <p className="HomePage__step-text">
                Цены и дивиденды обновляются автоматически. Смотрите графики, отчёты и сравнивайте с индексами.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA + Pricing placeholder */}
      <section id="pricing" className="HomePage__cta">
        <div className="container">
          <div className="HomePage__cta-content">
            <div>
              <h2 className="HomePage__section-title">
                Start tracking your portfolio today
              </h2>
              <p className="HomePage__section-description">
                Создайте первый портфель меньше чем за 2 минуты. Базовый план — бесплатно: без ограничений по количеству тикеров.
              </p>
            </div>
            <button className="HomePage__btn HomePage__btn--primary HomePage__btn--cta">
              Create free account
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
