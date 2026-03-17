import { isSameMonth, isSameWeek, parseISO, subWeeks } from 'date-fns';
import BalanceCard from '../components/dashboard/BalanceCard';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import WeeklySummary from '../components/dashboard/WeeklySummary';
import QuickStats from '../components/dashboard/QuickStats';
import ExpensePieChart from '../components/charts/PieChart';
import DailySpendingBarChart from '../components/charts/BarChart';
import { useFinance } from '../context/FinanceContext';

export default function DashboardPage() {
  const { state, saveWarning } = useFinance();
  const now = new Date();

  const monthTransactions = state.transactions.filter((tx) => isSameMonth(parseISO(tx.date), now));
  const monthExpenses = monthTransactions.filter((tx) => tx.type === 'expense');

  const monthlyIncome = monthTransactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const monthlyExpense = monthExpenses
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const thisWeekExpense = state.transactions
    .filter((tx) => tx.type === 'expense' && isSameWeek(parseISO(tx.date), now, { weekStartsOn: 1 }))
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const lastWeekExpense = state.transactions
    .filter((tx) => tx.type === 'expense' && isSameWeek(parseISO(tx.date), subWeeks(now, 1), { weekStartsOn: 1 }))
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalBalance = state.accounts.reduce((sum, account) => sum + Number(account.balance), 0);

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl font-heading">Dashboard</h2>
        <p className="text-slate-400 text-sm">Welcome to DhanRakshak — track every rupee with clarity.</p>
      </header>

      {saveWarning ? <div className="glass p-3 text-amber-300">Storage warning: {saveWarning}</div> : null}

      <section className="grid md:grid-cols-3 gap-3">
        <BalanceCard title="Total Income (This Month)" amount={monthlyIncome} type="income" />
        <BalanceCard title="Total Expense (This Month)" amount={monthlyExpense} type="expense" />
        <BalanceCard title="Balance Remaining" amount={monthlyIncome - monthlyExpense} type="balance" />
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <WeeklySummary thisWeekExpense={thisWeekExpense} lastWeekExpense={lastWeekExpense} />
        <QuickStats totalBalance={totalBalance} accountCount={state.accounts.length} />
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <ExpensePieChart monthExpenses={monthExpenses} />
        <DailySpendingBarChart monthExpenses={monthExpenses} />
      </section>

      <RecentTransactions transactions={state.transactions} />
    </div>
  );
}
