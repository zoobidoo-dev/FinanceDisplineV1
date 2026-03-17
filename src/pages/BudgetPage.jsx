import { format, isSameMonth, parseISO } from 'date-fns';
import { useMemo, useState } from 'react';
import BudgetSetup from '../components/budget/BudgetSetup';
import BudgetProgress from '../components/budget/BudgetProgress';
import { useFinance } from '../context/FinanceContext';

export default function BudgetPage() {
  const { state, dispatch } = useFinance();
  const [message, setMessage] = useState('');

  const month = format(new Date(), 'yyyy-MM');
  const monthBudgets = useMemo(() => state.budgets.filter((item) => item.month === month), [state.budgets, month]);
  const monthExpenses = useMemo(
    () => state.transactions.filter((tx) => tx.type === 'expense' && isSameMonth(parseISO(tx.date), new Date())),
    [state.transactions]
  );

  const onSaveBudget = (categoryId, value) => {
    const limit = Number(value);
    if (!limit || limit <= 0) {
      setMessage('Enter a valid budget amount greater than 0.');
      return;
    }

    dispatch({
      type: 'SET_BUDGET',
      payload: { id: crypto.randomUUID(), category: categoryId, limit, month },
    });
    setMessage('Budget saved.');
  };

  const onCopyLastMonth = (sourceMonth, targetMonth) => {
    dispatch({ type: 'COPY_BUDGETS_TO_MONTH', payload: { sourceMonth, targetMonth } });
    setMessage('Copied last month budgets.');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-heading">Budget</h2>
      {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
      <BudgetSetup budgets={state.budgets} onSaveBudget={onSaveBudget} onCopyLastMonth={onCopyLastMonth} />
      <BudgetProgress budgets={monthBudgets} monthExpenses={monthExpenses} />
    </div>
  );
}
