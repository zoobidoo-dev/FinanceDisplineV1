import { formatINR } from '../../utils/formatters';

export default function QuickStats({ totalBalance, accountCount }) {
  return (
    <section className="glass p-4">
      <h3 className="font-heading text-lg mb-2">Quick Stats</h3>
      <p>Total across accounts: <span className="text-sky-300">{formatINR(totalBalance)}</span></p>
      <p className="text-sm text-slate-400">Active accounts: {accountCount}</p>
    </section>
  );
}
