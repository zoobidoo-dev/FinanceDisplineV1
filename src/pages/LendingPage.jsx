import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatINR } from '../utils/formatters';

export default function LendingPage(){
  const {state,dispatch}=useFinance();
  const [f,setF]=useState({type:'lent',personName:'',amount:'',reason:'',date:new Date().toISOString().slice(0,10)});
  const lent=state.lending.filter((l)=>l.type==='lent'&&l.status==='pending');
  const borrowed=state.lending.filter((l)=>l.type==='borrowed'&&l.status==='pending');
  return <div className="space-y-3"><h2 className="text-2xl">Lending & Borrowing</h2><div className="glass p-3 grid md:grid-cols-6 gap-2"><select className="p-2 rounded bg-slate-800" onChange={(e)=>setF({...f,type:e.target.value})}><option value="lent">Lent</option><option value="borrowed">Borrowed</option></select><input className="p-2 rounded bg-white/10" placeholder="Person" onChange={(e)=>setF({...f,personName:e.target.value})}/><input className="p-2 rounded bg-white/10" placeholder="Amount" onChange={(e)=>setF({...f,amount:e.target.value})}/><input className="p-2 rounded bg-white/10" placeholder="Reason" onChange={(e)=>setF({...f,reason:e.target.value})}/><button className="bg-sky-500 rounded" onClick={()=>dispatch({type:'ADD_LENDING',payload:{...f,id:crypto.randomUUID(),status:'pending',settledDate:null}})}>Add</button></div><div className="grid md:grid-cols-2 gap-3"><div className="glass p-3"><h3>People owe you {formatINR(lent.reduce((a,b)=>a+Number(b.amount),0))}</h3>{lent.map((l)=><div key={l.id} className="flex justify-between"><span>{l.personName} {formatINR(l.amount)}</span><button onClick={()=>dispatch({type:'SETTLE_LENDING',payload:l.id})}>Settled</button></div>)}</div><div className="glass p-3"><h3>You owe {formatINR(borrowed.reduce((a,b)=>a+Number(b.amount),0))}</h3>{borrowed.map((l)=><div key={l.id}>{l.personName} {formatINR(l.amount)}</div>)}</div></div></div>
}
