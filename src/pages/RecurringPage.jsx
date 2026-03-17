import RecurringExpenses from '../components/recurring/RecurringExpenses';
import { useFinance } from '../context/FinanceContext';

export default function RecurringPage() {
  const { state, dispatch } = useFinance();

  const addRecurring = (payload) => {
    dispatch({ type: 'ADD_RECURRING', payload });
  };

  const markPaid = (item) => {
    dispatch({ type: 'MARK_RECURRING_PAID', payload: item.id });
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        id: crypto.randomUUID(),
        type: 'expense',
        amount: Number(item.amount),
        category: item.category,
        accountId: item.accountId,
        note: `${item.name} (Recurring)` ,
        date: new Date().toISOString().slice(0, 10),
        isRecurring: true,
        createdAt: new Date().toISOString(),
      },
    });
  };

  return (
    <RecurringExpenses
      accounts={state.accounts}
      recurringExpenses={state.recurringExpenses}
      onAdd={addRecurring}
      onMarkPaid={markPaid}
    />
  );
}
