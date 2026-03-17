import { useMemo, useState } from 'react';
import { EXPENSE_CATEGORIES } from '../../utils/categories';
import { formatINR } from '../../utils/formatters';

const presets = [
  { name: 'Netflix', amount: 649, category: 'subscriptions' },
  { name: 'Spotify', amount: 119, category: 'subscriptions' },
  { name: 'Gym', amount: 1500, category: 'health' },
  { name: 'Mobile Recharge', amount: 499, category: 'mobile_recharge' },
];

const categoryMap = new Map(EXPENSE_CATEGORIES.map((item) => [item.id, item]));

const isPaidThisMonth = (lastPaidDate) => {
  if (!lastPaidDate) return false;
  const now = new Date();
  const paid = new Date(lastPaidDate);
  return paid.getFullYear() === now.getFullYear() && paid.getMonth() === now.getMonth();
};

export default function RecurringExpenses({ accounts, recurringExpenses, onAdd, onMarkPaid }) {
  const [form, setForm] = useState({
    name: '', amount: '', dueDay: 1, category: 'subscriptions', accountId: accounts[0]?.id || '', status: 'active',
  });
  const [message, setMessage] = useState('');

  const totalFixed = recurringExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const today = new Date().getDate();

  const decorated = useMemo(() => recurringExpenses.map((item) => {
    const paid = isPaidThisMonth(item.lastPaidDate);
    const daysLeft = Number(item.dueDay) - today;
    return { ...item, paid, daysLeft, overdue: !paid && daysLeft < 0 };
  }), [recurringExpenses, today]);

  const submit = (event) => {
    event.preventDefault();
    if (!form.name || Number(form.amount) <= 0) {
      setMessage('Please enter a valid name and amount.');
      return;
    }
    onAdd({
      ...form,
      id: crypto.randomUUID(),
      amount: Number(form.amount),
      dueDay: Number(form.dueDay),
      createdAt: new Date().toISOString(),
      lastPaidDate: '',
    });
    setMessage('Recurring expense added.');
    setForm({ ...form, name: '', amount: '' });
  };

  return (
    <div className="space-y-4">
      <section className="glass p-4">
        <h2 className="text-2xl font-heading">Recurring Expenses</h2>
        <p className="text-slate-300 mt-1">Your fixed costs: <span className="text-rose-400">{formatINR(totalFixed)}/month</span></p>
      </section>

      <section className="glass p-4 space-y-3">
        <h3 className="font-heading text-lg">Quick Add Presets</h3>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              className="px-3 py-2 min-h-11 rounded-lg bg-white/10"
              onClick={() => setForm((prev) => ({ ...prev, ...preset }))}
            >
              {preset.name} {formatINR(preset.amount)}
            </button>
          ))}
        </div>
      </section>

      <form onSubmit={submit} className="glass p-4 grid md:grid-cols-6 gap-2">
        <input className="p-3 rounded-lg bg-white/10 min-h-11" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <input className="p-3 rounded-lg bg-white/10 min-h-11" placeholder="Amount" inputMode="numeric" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} />
        <input type="number" min="1" max="31" className="p-3 rounded-lg bg-white/10 min-h-11" value={form.dueDay} onChange={(event) => setForm({ ...form, dueDay: event.target.value })} />
        <select className="p-3 rounded-lg bg-slate-800 min-h-11" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
          {EXPENSE_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.icon} {item.label}</option>)}
        </select>
        <select className="p-3 rounded-lg bg-slate-800 min-h-11" value={form.accountId} onChange={(event) => setForm({ ...form, accountId: event.target.value })}>
          {accounts.map((account) => <option key={account.id} value={account.id}>{account.icon} {account.name}</option>)}
        </select>
        <button className="p-3 rounded-lg bg-sky-500 min-h-11">Add</button>
      </form>

      {message ? <p className="text-emerald-300 text-sm">{message}</p> : null}

      <section className="space-y-2">
        {decorated.length ? decorated.map((item) => {
          const category = categoryMap.get(item.category);
          return (
            <article key={item.id} className={`glass p-4 flex items-center justify-between gap-3 ${item.overdue ? 'border-rose-400/60' : ''}`}>
              <div>
                <p className="font-semibold">{item.name} · {formatINR(item.amount)}</p>
                <p className="text-sm text-slate-400">Due on {item.dueDay}th · {category?.icon} {category?.label}</p>
                <p className={`text-xs ${item.paid ? 'text-emerald-300' : item.overdue ? 'text-rose-400' : 'text-amber-300'}`}>
                  {item.paid ? 'Paid this month' : item.overdue ? `OVERDUE by ${Math.abs(item.daysLeft)} day(s)` : `Due in ${item.daysLeft} day(s)`}
                </p>
              </div>
              <button
                type="button"
                className="px-3 py-2 min-h-11 rounded-lg bg-emerald-500 disabled:opacity-50"
                disabled={item.paid}
                onClick={() => onMarkPaid(item)}
              >
                {item.paid ? 'Paid' : 'Mark as Paid'}
              </button>
            </article>
          );
        }) : <div className="glass p-4 text-slate-400">No recurring expenses yet.</div>}
      </section>
    </div>
  );
}
