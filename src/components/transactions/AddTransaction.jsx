import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../utils/categories';
import { useFinance } from '../../context/FinanceContext';

export default function AddTransaction() {
  const { state, dispatch } = useFinance();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    category: 'food',
    accountId: state.accounts[0]?.id || '',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  });

  const categories = useMemo(
    () => (form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES),
    [form.type]
  );

  const onTypeChange = (type) => {
    setForm((prev) => ({ ...prev, type, category: type === 'income' ? 'salary' : 'food' }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const amount = Number(form.amount);

    if (!amount || amount <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    if (!form.accountId) {
      setError('Please select an account.');
      return;
    }

    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        ...form,
        amount,
        id: crypto.randomUUID(),
        isRecurring: false,
        createdAt: new Date().toISOString(),
      },
    });

    setError('');
    setToast('Transaction saved successfully!');
    setTimeout(() => navigate('/'), 700);
  };

  return (
    <form onSubmit={onSubmit} className="glass p-4 md:p-6 space-y-3 max-w-xl mx-auto">
      <h2 className="text-2xl font-heading">Add Transaction</h2>

      <div className="grid grid-cols-2 gap-2">
        {['income', 'expense'].map((type) => (
          <button
            type="button"
            key={type}
            onClick={() => onTypeChange(type)}
            className={`min-h-11 rounded-lg capitalize ${
              form.type === type
                ? type === 'income'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-rose-500 text-white'
                : 'bg-white/10'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="relative">
        <span className="absolute left-3 top-3 text-slate-300">₹</span>
        <input
          required
          inputMode="numeric"
          placeholder="0"
          className="w-full p-3 pl-7 rounded-lg bg-white/10 text-xl"
          value={form.amount}
          onChange={(event) => setForm({ ...form, amount: event.target.value })}
        />
      </div>

      <select
        className="w-full p-3 min-h-11 rounded-lg bg-slate-800"
        value={form.category}
        onChange={(event) => setForm({ ...form, category: event.target.value })}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.icon} {category.label}
          </option>
        ))}
      </select>

      <select
        className="w-full p-3 min-h-11 rounded-lg bg-slate-800"
        value={form.accountId}
        onChange={(event) => setForm({ ...form, accountId: event.target.value })}
      >
        {state.accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.icon} {account.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="w-full p-3 min-h-11 rounded-lg bg-white/10"
        value={form.date}
        onChange={(event) => setForm({ ...form, date: event.target.value })}
      />

      <input
        className="w-full p-3 min-h-11 rounded-lg bg-white/10"
        placeholder="e.g., Swiggy order, Auto to office"
        value={form.note}
        onChange={(event) => setForm({ ...form, note: event.target.value })}
      />

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      {toast ? <p className="text-sm text-emerald-400">{toast}</p> : null}

      <button className="w-full min-h-11 p-3 rounded-lg bg-sky-500 hover:bg-sky-400">Save Transaction</button>
    </form>
  );
}
