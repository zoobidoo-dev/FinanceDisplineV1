import { useMemo } from 'react';
import { EXPENSE_CATEGORIES } from '../../utils/categories';
import { formatINR } from '../../utils/formatters';

const categoryMap = new Map(EXPENSE_CATEGORIES.map((category) => [category.id, category]));

const progressColor = (pct) => {
  if (pct >= 80) return 'bg-rose-500';
  if (pct >= 50) return 'bg-amber-400';
  return 'bg-emerald-500';
};

export default function BudgetProgress({ budgets, monthExpenses }) {
  const cards = useMemo(() => budgets.map((budget) => {
    const spent = monthExpenses
      .filter((tx) => tx.category === budget.category)
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
    const percentage = budget.limit ? Math.round((spent / budget.limit) * 100) : 0;
    return { ...budget, spent, percentage };
  }).sort((a, b) => {
    const aOver = a.percentage > 100 ? 1 : 0;
    const bOver = b.percentage > 100 ? 1 : 0;
    if (bOver !== aOver) return bOver - aOver;
    return b.percentage - a.percentage;
  }), [budgets, monthExpenses]);

  if (!cards.length) {
    return <div className="glass p-4 text-slate-400">No budgets set for this month yet.</div>;
  }

  return (
    <section className="space-y-3">
      {cards.map((card) => {
        const category = categoryMap.get(card.category);
        const remaining = card.limit - card.spent;
        return (
          <article key={card.id} className="glass p-4">
            <div className="flex justify-between gap-2">
              <h4>{category?.icon || '📌'} {category?.label || card.category}</h4>
              <p>{Math.max(card.percentage, 0)}%</p>
            </div>

            <div className="h-2 rounded bg-white/10 mt-2 overflow-hidden">
              <div className={`h-full ${progressColor(card.percentage)}`} style={{ width: `${Math.min(Math.max(card.percentage, 0), 100)}%` }} />
            </div>

            <p className="mt-2 text-sm">{formatINR(card.spent)} / {formatINR(card.limit)} spent</p>
            {remaining >= 0 ? (
              <p className="text-sm text-emerald-300">{formatINR(remaining)} remaining</p>
            ) : (
              <p className="text-sm text-rose-400">⚠️ Over by {formatINR(Math.abs(remaining))}</p>
            )}
          </article>
        );
      })}
    </section>
  );
}
