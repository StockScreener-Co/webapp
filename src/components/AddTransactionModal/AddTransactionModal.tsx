import { useEffect, useState } from 'react';
import './AddTransactionModal.scss';

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
  const [form, setForm] = useState<AddTransactionForm>({
    instrumentId: '',
    tradeDate: '',
    price: '',
    operationType: 'BUY',
    quantity: '',
  });

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
    if (!isOpen) {
      setForm({ instrumentId: '', tradeDate: '', price: '', operationType: 'BUY', quantity: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.instrumentId.trim() || !form.tradeDate || !form.price || !form.quantity) return;
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
              <label className="AddTransactionModal__label" htmlFor="instrumentId">Instrument ID (UUID)</label>
              <input
                id="instrumentId"
                type="text"
                value={form.instrumentId}
                onChange={(e) => handleChange('instrumentId', e.target.value)}
                className="AddTransactionModal__input"
                placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                disabled={isLoading}
                required
              />
            </div>

            <div className="AddTransactionModal__field">
              <label className="AddTransactionModal__label" htmlFor="tradeDate">Trade Date</label>
              <input
                id="tradeDate"
                type="date"
                value={form.tradeDate}
                onChange={(e) => handleChange('tradeDate', e.target.value)}
                className="AddTransactionModal__input"
                disabled={isLoading}
                required
              />
            </div>

            <div className="AddTransactionModal__field">
              <label className="AddTransactionModal__label" htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.0001"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="AddTransactionModal__input"
                disabled={isLoading}
                required
              />
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
              <label className="AddTransactionModal__label" htmlFor="quantity">Quantity</label>
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
              disabled={isLoading || !form.instrumentId.trim() || !form.tradeDate || !form.price || !form.quantity}
            >
              {isLoading ? 'Saving...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


