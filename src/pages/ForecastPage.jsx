import { eachDayOfInterval, endOfMonth, format, isAfter } from 'date-fns';
import { useMemo, useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatINR } from '../utils/formatters';

export default function ForecastPage(){
  const {state}=useFinance();
  const [whatIf,setWhatIf]=useState(0);
  const current=state.accounts.reduce((a,b)=>a+Number(b.balance),0);
  const forecast=useMemo(()=>{
    const now=new Date();
    const days=eachDayOfInterval({start:now,end:endOfMonth(now)});
    let bal=current-Number(whatIf||0);
    return days.map((d)=>{const day=d.getDate();state.recurringExpenses.forEach((r)=>{if(Number(r.dueDay)===day) bal-=Number(r.amount)});if(day===Number(state.settings.salaryDay||0)) bal+=Number(state.settings.salaryAmount||0);return {date:format(d,'dd/MM'),balance:bal};});
  },[state,current,whatIf]);
  const min=Math.min(...forecast.map((f)=>f.balance),current);
  return <div className="space-y-3"><h2 className="text-2xl">Cash Flow Forecast</h2><div className="glass p-3">Current {formatINR(current)}<input className="ml-2 p-2 rounded bg-white/10" placeholder="What if expense" onChange={(e)=>setWhatIf(e.target.value)} /></div>{min<0?<div className="text-rose-400">⚠️ You may run out of money.</div>:min<5000?<div className="text-amber-400">Balance may drop low.</div>:null}<div className="glass p-3 max-h-80 overflow-auto">{forecast.map((f)=><p key={f.date}>{f.date}: {formatINR(f.balance)}</p>)}</div></div>
}
