import { formatINR } from '../../utils/formatters';

export default function WeeklySummary({ thisWeekExpense, lastWeekExpense }) {
  const change = lastWeekExpense ? ((thisWeekExpense - lastWeekExpense) / lastWeekExpense) * 100 : 0;
  const spentMore = change > 0;

  return (
    <section className="glass p-4">
      <h3 className="font-heading text-lg mb-2">This Week vs Last Week</h3>
      <p className="text-sm">This week: <span className="text-rose-400">{formatINR(thisWeekExpense)}</span></p>
      <p className="text-sm">Last week: <span className="text-slate-300">{formatINR(lastWeekExpense)}</span></p>
      <p className={`mt-2 font-semibold ${spentMore ? 'text-rose-400' : 'text-emerald-400'}`}>
        {spentMore ? '↑' : '↓'} {Math.abs(change).toFixed(1)}% {spentMore ? 'higher spending' : 'lower spending'}
      </p>
    </section>
  );
}
