import { formatDate, formatINR } from '../../utils/formatters';
import { allCategories } from '../../utils/categories';

const categoryMap = new Map(allCategories.map((cat) => [cat.id, cat]));

export default function RecentTransactions({ transactions }) {
  if (!transactions.length) {
    return <div className="glass p-4 text-slate-400">No transactions yet. Tap + to add your first one!</div>;
  }

  return (
    <section className="glass p-4">
      <h3 className="font-heading text-lg mb-2">Recent Transactions</h3>
      <div className="space-y-2">
        {transactions.slice(0, 10).map((tx) => {
          const cat = categoryMap.get(tx.category);
          return (
            <div key={tx.id} className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
              <div className="min-w-0">
                <p className="truncate">{cat?.icon || '🧾'} {tx.note || cat?.label || tx.category}</p>
                <p className="text-xs text-slate-400">{formatDate(tx.date)}</p>
              </div>
              <p className={tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}>
                {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
