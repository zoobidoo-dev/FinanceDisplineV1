import SavingsGoals from '../components/goals/SavingsGoals';
import { useFinance } from '../context/FinanceContext';

export default function GoalsPage() {
  const { state, dispatch } = useFinance();

  return (
    <SavingsGoals
      goals={state.goals}
      transactions={state.transactions}
      onAddGoal={(payload) => dispatch({ type: 'ADD_GOAL', payload })}
      onFundGoal={(id, amount) => dispatch({ type: 'FUND_GOAL', payload: { id, amount } })}
    />
  );
}
