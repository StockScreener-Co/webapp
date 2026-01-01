import { useEffect, useState } from 'react';
import './AddTransactionModal.scss';
import { searchInstruments, Instrument, getInstrumentPrice } from '../../api/instrumentApi';

export type OperationType = 'BUY' | 'SELL' | 'DIVIDEND' | 'DEPOSIT' | 'WITHDRAW';

export interface AddTransactionForm {
  instrumentId: string;
  tradeDate: string;
  price: string;
  operationType: OperationType;
  quantity: string;
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddTransactionForm) => void;
  isLoading?: boolean;
  error?: string | null;
}

const operationTypes: OperationType[] = ['BUY', 'SELL', 'DIVIDEND', 'DEPOSIT', 'WITHDRAW'];

export const AddTransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  error,
}: AddTransactionModalProps) => {
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<AddTransactionForm>({
    instrumentId: '',
    tradeDate: getTodayDate(),
    price: '',
    operationType: 'BUY',
    quantity: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Instrument[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      if (form.instrumentId && form.tradeDate) {
        setIsFetchingPrice(true);
        try {
          const price = await getInstrumentPrice(form.instrumentId, form.tradeDate);
          if (price !== undefined && price !== null) {
            setForm(prev => ({ ...prev, price: price.toString() }));
          }
        } catch (err) {
          console.error('Failed to fetch price:', err);
        } finally {
          setIsFetchingPrice(false);
        }
      }
    };

    fetchPrice();
  }, [form.instrumentId, form.tradeDate]);

  useEffect(() => {
    if (!searchTerm?.trim() || form.instrumentId) {
      if (!searchTerm?.trim()) setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchInstruments(searchTerm);
        setSearchResults(results);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, isLoading]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showSuggestions && !(e.target as HTMLElement).closest('.AddTransactionModal__autocomplete')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSuggestions]);

  useEffect(() => {
    if (!isOpen) {
      setForm({
        instrumentId: '',
        tradeDate: getTodayDate(),
        price: '',
        operationType: 'BUY',
        quantity: ''
      });
      setSearchTerm('');
      setSearchResults([]);
      setShowSuggestions(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.instrumentId?.trim() || !form.tradeDate || !form.price || !form.quantity) return;
    onSubmit(form);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleChange = (field: keyof AddTransactionForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleInstrumentSelect = (instrument: Instrument) => {
    setForm((prev) => ({ ...prev, instrumentId: instrument.id }));
    setSearchTerm(instrument.ticker);
    setSearchResults([]);
    setShowSuggestions(false);
  };

  return (
    <div className="AddTransactionModal__backdrop" onClick={handleBackdropClick}>
      <div className="AddTransactionModal__content">
        <div className="AddTransactionModal__header">
          <h2 className="AddTransactionModal__title">Add Transaction</h2>
          <button className="AddTransactionModal__close" onClick={onClose} disabled={isLoading}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="AddTransactionModal__form">
          <div className="AddTransactionModal__grid">
            <div className="AddTransactionModal__field">
              <label className="AddTransactionModal__label" htmlFor="instrumentId">Ticker/Company</label>
              <div className="AddTransactionModal__autocomplete">
                <div className={`AddTransactionModal__input-wrapper ${form.instrumentId ? 'AddTransactionModal__input-wrapper--selected' : ''}`}>
                  <input
                    id="instrumentId"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      if (form.instrumentId) {
                        setForm(prev => ({ ...prev, instrumentId: '' }));
                      }
                    }}
                    className="AddTransactionModal__input"
                    placeholder="e.g. AAPL"
                    disabled={isLoading}
                    autoComplete="off"
                    required
                  />
                  {form.instrumentId && (
                    <button
                      type="button"
                      className="AddTransactionModal__clear-btn"
                      onClick={() => {
                        setForm(prev => ({ ...prev, instrumentId: '' }));
                        setSearchTerm('');
                        setSearchResults([]);
                      }}
                      disabled={isLoading}
                      title="Clear selection"
                    >
                      ×
                    </button>
                  )}
                  {isSearching && <div className="AddTransactionModal__loading-spinner" />}
                </div>
                {showSuggestions && searchResults.length > 0 && (
                  <ul className="AddTransactionModal__suggestions">
                    {searchResults.map((instrument) => (
                      <li
                        key={instrument.id}
                        className="AddTransactionModal__suggestion-item"
                        onClick={() => handleInstrumentSelect(instrument)}
                      >
                        <span className="AddTransactionModal__suggestion-ticker">{instrument.ticker}</span>
                        <span className="AddTransactionModal__suggestion-name">{instrument.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="AddTransactionModal__field">
              <label className="AddTransactionModal__label" htmlFor="tradeDate">Date</label>
              <input
                id="tradeDate"
                type="date"
                value={form.tradeDate}
                onChange={(e) => handleChange('tradeDate', e.target.value)}
                onClick={(e) => e.currentTarget.showPicker()}
                className="AddTransactionModal__input"
                disabled={isLoading}
                required
              />
            </div>

            <div className="AddTransactionModal__field">
              <label className="AddTransactionModal__label" htmlFor="price">Price</label>
              <div className="AddTransactionModal__input-wrapper">
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.0001"
                  value={form.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  className="AddTransactionModal__input"
                  disabled={isLoading || isFetchingPrice}
                  required
                />
                {isFetchingPrice && <div className="AddTransactionModal__loading-spinner" />}
              </div>
            </div>

            <div className="AddTransactionModal__field">
              <label className="AddTransactionModal__label" htmlFor="operationType">Operation Type</label>
              <select
                id="operationType"
                value={form.operationType}
                onChange={(e) => handleChange('operationType', e.target.value)}
                className="AddTransactionModal__input"
                disabled={isLoading}
                required
              >
                {operationTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="AddTransactionModal__field">
              <label className="AddTransactionModal__label" htmlFor="quantity">Shares</label>
              <input
                id="quantity"
                type="number"
                min="0.0001"
                step="0.0001"
                value={form.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                className="AddTransactionModal__input"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {error && <div className="AddTransactionModal__error">{error}</div>}

          <div className="AddTransactionModal__actions">
            <button
              type="button"
              onClick={onClose}
              className="AddTransactionModal__btn AddTransactionModal__btn--cancel"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="AddTransactionModal__btn AddTransactionModal__btn--submit"
              disabled={isLoading || !form.instrumentId?.trim() || !form.tradeDate || !form.price || !form.quantity}
            >
              {isLoading ? 'Saving...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


