import { useMemo, useState } from 'react';
import { differenceInMonths, format } from 'date-fns';
import { formatINR } from '../../utils/formatters';

export default function GoalCard({ goal, monthlyAverageSaving, onAddMoney }) {
  const [amount, setAmount] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const progress = useMemo(() => {
    const ratio = Number(goal.currentAmount || 0) / Number(goal.targetAmount || 1);
    return Math.min(100, Math.round(ratio * 100));
  }, [goal.currentAmount, goal.targetAmount]);

  const remaining = Math.max(Number(goal.targetAmount) - Number(goal.currentAmount), 0);
  const monthsNeeded = monthlyAverageSaving > 0 ? Math.ceil(remaining / monthlyAverageSaving) : null;
  const estimatedDate = monthsNeeded !== null ? format(new Date(new Date().setMonth(new Date().getMonth() + monthsNeeded)), 'MMM yyyy') : 'N/A';
  const deadlineMonths = goal.deadline ? differenceInMonths(new Date(goal.deadline), new Date()) : null;

  return (
    <article className="glass p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading">{goal.icon} {goal.name}</h3>
        {progress >= 100 ? <span className="text-emerald-300">🎉 Completed</span> : null}
      </div>

      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full transition-all duration-700" style={{ width: `${progress}%`, backgroundColor: goal.color || '#10b981' }} />
      </div>

      <p>{formatINR(goal.currentAmount)} / {formatINR(goal.targetAmount)} saved</p>
      <p className="text-sm text-slate-400">{formatINR(remaining)} remaining</p>
      <p className="text-sm text-slate-400">Estimated completion: {estimatedDate}</p>
      {deadlineMonths !== null ? <p className="text-xs text-slate-500">Deadline in ~{deadlineMonths} months</p> : null}

      <button type="button" className="px-3 py-2 min-h-11 rounded-lg bg-sky-500" onClick={() => setShowAdd((prev) => !prev)}>
        Add Money
      </button>

      {showAdd ? (
        <div className="flex gap-2">
          <input className="flex-1 p-2 rounded bg-white/10" placeholder="Amount" inputMode="numeric" value={amount} onChange={(event) => setAmount(event.target.value)} />
          <button
            type="button"
            className="px-3 py-2 rounded bg-emerald-500"
            onClick={() => {
              const val = Number(amount);
              if (val > 0) onAddMoney(goal.id, val);
              setAmount('');
              setShowAdd(false);
            }}
          >
            Save
          </button>
        </div>
      ) : null}
    </article>
  );
}
