import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { EXPENSE_CATEGORIES } from '../../utils/categories';
import { formatINR } from '../../utils/formatters';

const COLORS = ['#10b981', '#22c55e', '#38bdf8', '#a78bfa', '#f59e0b', '#f43f5e', '#14b8a6', '#60a5fa', '#fb7185'];

export default function ExpensePieChart({ monthExpenses }) {
  const data = EXPENSE_CATEGORIES
    .map((category) => ({
      name: `${category.icon} ${category.label}`,
      value: monthExpenses.filter((tx) => tx.category === category.id).reduce((sum, tx) => sum + Number(tx.amount), 0),
    }))
    .filter((item) => item.value > 0);

  if (!data.length) {
    return <div className="glass p-4 text-slate-400">Add expense transactions to view category breakdown.</div>;
  }

  return (
    <section className="glass p-4 h-80">
      <h3 className="font-heading text-lg mb-2">Expense Breakdown (This Month)</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
            {data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(value) => formatINR(value)} />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}
