import { endOfMonth, getDate, isSameDay, eachDayOfInterval } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { formatINR } from '../../utils/formatters';

export default function DailySpendingBarChart({ monthExpenses }) {
  const now = new Date();
  const days = eachDayOfInterval({ start: new Date(now.getFullYear(), now.getMonth(), 1), end: endOfMonth(now) });
  const data = days.map((day) => ({
    day: getDate(day),
    amount: monthExpenses
      .filter((tx) => isSameDay(new Date(tx.date), day))
      .reduce((sum, tx) => sum + Number(tx.amount), 0),
    isToday: isSameDay(day, now),
  }));
  const avg = data.reduce((sum, item) => sum + item.amount, 0) / (data.length || 1);

  return (
    <section className="glass p-4 h-80">
      <h3 className="font-heading text-lg mb-2">Daily Spending (This Month)</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="day" interval={3} />
          <YAxis />
          <Tooltip formatter={(value) => formatINR(value)} />
          <ReferenceLine y={avg} stroke="#f59e0b" strokeDasharray="4 4" />
          <Bar dataKey="amount">
            {data.map((entry) => <Cell key={entry.day} fill={entry.isToday ? '#f43f5e' : '#38bdf8'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-slate-400 mt-2">Dashed line = average daily spend</p>
    </section>
  );
}
