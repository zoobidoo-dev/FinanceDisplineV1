import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { loadData, saveData } from '../utils/storage';

const FinanceContext = createContext(null);

const updateAccountBalance = (accounts, tx) => accounts.map((account) => {
  if (account.id !== tx.accountId) return account;
  const signedAmount = tx.type === 'income' ? Number(tx.amount) : -Number(tx.amount);
  return { ...account, balance: Number(account.balance) + signedAmount };
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        accounts: updateAccountBalance(state.accounts, action.payload),
      };
    case 'SET_BUDGET': {
      const budget = action.payload;
      const nextBudgets = state.budgets.filter((item) => !(item.category === budget.category && item.month === budget.month));
      return { ...state, budgets: [...nextBudgets, budget] };
    }
    case 'COPY_BUDGETS_TO_MONTH': {
      const { sourceMonth, targetMonth } = action.payload;
      const source = state.budgets.filter((item) => item.month === sourceMonth);
      if (!source.length) return state;
      const withoutTarget = state.budgets.filter((item) => item.month !== targetMonth);
      const copied = source.map((item) => ({ ...item, id: crypto.randomUUID(), month: targetMonth }));
      return { ...state, budgets: [...withoutTarget, ...copied] };
    }
    case 'ADD_RECURRING':
      return { ...state, recurringExpenses: [action.payload, ...state.recurringExpenses] };
    case 'MARK_RECURRING_PAID':
      return {
        ...state,
        recurringExpenses: state.recurringExpenses.map((item) =>
          item.id === action.payload ? { ...item, lastPaidDate: new Date().toISOString().slice(0, 10) } : item
        ),
      };
    case 'ADD_GOAL':
      return { ...state, goals: [action.payload, ...state.goals] };
    case 'FUND_GOAL':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.id
            ? { ...goal, currentAmount: Number(goal.currentAmount) + Number(action.payload.amount) }
            : goal
        ),
      };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    default:
      return state;
  }
};

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadData);
  const [saveWarning, setSaveWarning] = useState('');

  useEffect(() => {
    const result = saveData(state);
    if (!result.ok) setSaveWarning(result.message);
    else if (saveWarning) setSaveWarning('');
  }, [state]);

  const value = useMemo(() => ({ state, dispatch, saveWarning }), [state, saveWarning]);
  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export const useFinance = () => useContext(FinanceContext);
