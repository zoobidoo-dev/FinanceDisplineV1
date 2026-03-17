import CountUp from 'react-countup';
import { formatINR } from '../../utils/formatters';

const styles = {
  income: 'text-emerald-400',
  expense: 'text-rose-400',
  balance: 'text-sky-300',
};

export default function BalanceCard({ title, amount, type }) {
  return (
    <article className="glass p-4 min-h-28">
      <p className="text-sm text-slate-300">{title}</p>
      <p className={`text-2xl md:text-3xl font-heading mt-2 ${styles[type]}`}>
        <CountUp end={Number(amount || 0)} duration={0.7} separator="," prefix="₹" preserveValue />
      </p>
      <p className="text-xs text-slate-400 mt-1">{formatINR(amount)}</p>
    </article>
  );
}
