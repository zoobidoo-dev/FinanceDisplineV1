import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatINR } from '../utils/formatters';

export default function AccountsPage(){
  const {state,dispatch}=useFinance();
  const [a,setA]=useState({name:'',type:'bank',balance:'0',icon:'🏦',color:'#38bdf8'});
  return <div className="space-y-3"><h2 className="text-2xl">Accounts</h2><div className="glass p-3">Combined: {formatINR(state.accounts.reduce((x,y)=>x+Number(y.balance),0))}</div><div className="glass p-3 grid md:grid-cols-6 gap-2"><input className="p-2 rounded bg-white/10" placeholder="Name" onChange={(e)=>setA({...a,name:e.target.value})}/><select className="p-2 rounded bg-slate-800" onChange={(e)=>setA({...a,type:e.target.value})}><option>bank</option><option>credit_card</option><option>wallet</option><option>cash</option></select><input className="p-2 rounded bg-white/10" placeholder="Starting balance" onChange={(e)=>setA({...a,balance:e.target.value})}/><input className="p-2 rounded bg-white/10" value={a.icon} onChange={(e)=>setA({...a,icon:e.target.value})}/><button className="bg-sky-500 rounded" onClick={()=>dispatch({type:'ADD_ACCOUNT',payload:{...a,id:crypto.randomUUID(),balance:Number(a.balance),createdAt:new Date().toISOString()}})}>Add Account</button></div>{state.accounts.map((acc)=><div key={acc.id} className="glass p-3">{acc.icon} {acc.name} ({acc.type}) - {formatINR(acc.balance)}</div>)}</div>
}
