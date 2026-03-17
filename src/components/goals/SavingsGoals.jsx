import { useMemo, useState } from 'react';
import GoalCard from './GoalCard';

const suggested = [
  { name: 'Emergency Fund', icon: '🛡️' },
  { name: 'Vacation Fund', icon: '🏖️' },
  { name: 'New Gadget', icon: '📱' },
];

const defaultGoal = {
  name: '',
  targetAmount: '',
  deadline: '',
  icon: '🎯',
  color: '#f59e0b',
};

export default function SavingsGoals({ goals, transactions, onAddGoal, onFundGoal }) {
  const [form, setForm] = useState(defaultGoal);
  const [message, setMessage] = useState('');

  const monthlyAverageSaving = useMemo(() => {
    const now = new Date();
    const last90 = transactions.filter((tx) => new Date(tx.date) >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000));
    const income = last90.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + Number(tx.amount), 0);
    const expense = last90.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + Number(tx.amount), 0);
    return Math.max((income - expense) / 3, 0);
  }, [transactions]);

  const sortedGoals = useMemo(() => [...goals].sort((a, b) => {
    const aPct = Number(a.currentAmount || 0) / Number(a.targetAmount || 1);
    const bPct = Number(b.currentAmount || 0) / Number(b.targetAmount || 1);
    return bPct - aPct;
  }), [goals]);

  const submit = (event) => {
    event.preventDefault();
    if (!form.name || Number(form.targetAmount) <= 0) {
      setMessage('Please enter goal name and valid target amount.');
      return;
    }
    onAddGoal({ ...form, targetAmount: Number(form.targetAmount), currentAmount: 0, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    setForm(defaultGoal);
    setMessage('Goal created successfully.');
  };

  return (
    <div className="space-y-4">
      <section className="glass p-4">
        <h2 className="text-2xl font-heading">Savings Goals</h2>
        <p className="text-slate-400 text-sm">Avg monthly saving pace: ₹{Math.round(monthlyAverageSaving).toLocaleString('en-IN')}</p>
      </section>

      <section className="glass p-4 space-y-2">
        <h3 className="font-heading">Suggested Goals</h3>
        <div className="flex flex-wrap gap-2">
          {suggested.map((item) => (
            <button key={item.name} type="button" className="px-3 py-2 min-h-11 rounded-lg bg-white/10" onClick={() => setForm((prev) => ({ ...prev, name: item.name, icon: item.icon }))}>
              {item.icon} {item.name}
            </button>
          ))}
        </div>
      </section>

      <form onSubmit={submit} className="glass p-4 grid md:grid-cols-5 gap-2">
        <input className="p-3 rounded-lg bg-white/10 min-h-11" placeholder="Goal Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <input className="p-3 rounded-lg bg-white/10 min-h-11" inputMode="numeric" placeholder="Target Amount" value={form.targetAmount} onChange={(event) => setForm({ ...form, targetAmount: event.target.value })} />
        <input type="date" className="p-3 rounded-lg bg-white/10 min-h-11" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} />
        <input className="p-3 rounded-lg bg-white/10 min-h-11" value={form.icon} onChange={(event) => setForm({ ...form, icon: event.target.value })} />
        <input type="color" className="p-3 rounded-lg min-h-11" value={form.color} onChange={(event) => setForm({ ...form, color: event.target.value })} />
        <button className="p-3 rounded-lg bg-emerald-500 min-h-11 md:col-span-5">Create Goal</button>
      </form>

      {message ? <p className="text-sm text-emerald-300">{message}</p> : null}

      <section className="grid md:grid-cols-2 gap-3">
        {sortedGoals.length ? sortedGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} monthlyAverageSaving={monthlyAverageSaving} onAddMoney={onFundGoal} />
        )) : <div className="glass p-4 text-slate-400">No goals yet. Create your first savings target.</div>}
      </section>
    </div>
  );
}
