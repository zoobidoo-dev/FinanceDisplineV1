import { useMemo, useState } from 'react';
import { format, subMonths } from 'date-fns';
import { EXPENSE_CATEGORIES } from '../../utils/categories';

export default function BudgetSetup({ budgets, onSaveBudget, onCopyLastMonth }) {
  const month = format(new Date(), 'yyyy-MM');
  const previousMonth = format(subMonths(new Date(), 1), 'yyyy-MM');
  const [values, setValues] = useState({});

  const budgetMap = useMemo(() => {
    const map = new Map();
    budgets.filter((item) => item.month === month).forEach((item) => map.set(item.category, item.limit));
    return map;
  }, [budgets, month]);

  return (
    <section className="glass p-4 space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="font-heading text-lg">Monthly Budget Setup ({month})</h3>
        <button
          className="px-3 py-2 rounded-lg bg-sky-500 min-h-11"
          onClick={() => onCopyLastMonth(previousMonth, month)}
          type="button"
        >
          Copy Last Month's Budget
        </button>
      </div>

      <div className="space-y-2">
        {EXPENSE_CATEGORIES.map((category) => (
          <div key={category.id} className="grid grid-cols-1 md:grid-cols-[1fr_180px_120px] gap-2 items-center">
            <p>{category.icon} {category.label}</p>
            <input
              className="p-3 rounded-lg bg-white/10 min-h-11"
              placeholder={`₹ ${budgetMap.get(category.id) || 0}`}
              value={values[category.id] ?? ''}
              onChange={(event) => setValues((prev) => ({ ...prev, [category.id]: event.target.value }))}
            />
            <button
              type="button"
              className="p-3 rounded-lg bg-emerald-500 min-h-11"
              onClick={() => onSaveBudget(category.id, values[category.id])}
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
