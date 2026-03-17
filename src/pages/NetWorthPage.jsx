import { useFinance } from '../context/FinanceContext';
import { formatINR } from '../utils/formatters';

export default function NetWorthPage(){
const {state,dispatch}=useFinance();
const assets=state.netWorth.assets.reduce((a,b)=>a+Number(b.value),0); const liabilities=state.netWorth.liabilities.reduce((a,b)=>a+Number(b.value),0); const net=assets-liabilities;
return <div className="space-y-3"><h2 className="text-2xl">Net Worth</h2><div className="glass p-4">Net Worth: <span className={net>=0?'text-emerald-400':'text-rose-400'}>{formatINR(net)}</span></div><div className="grid md:grid-cols-2 gap-3"><div className="glass p-3"><button className="bg-emerald-500 px-2 rounded" onClick={()=>{const n=prompt('Asset name');const v=prompt('Value');if(n&&v)dispatch({type:'ADD_ASSET',payload:{id:crypto.randomUUID(),name:n,value:Number(v),type:'other'}})}}>Add Asset</button>{state.netWorth.assets.map((a)=><p key={a.id}>{a.name}: {formatINR(a.value)}</p>)}</div><div className="glass p-3"><button className="bg-rose-500 px-2 rounded" onClick={()=>{const n=prompt('Liability name');const v=prompt('Value');if(n&&v)dispatch({type:'ADD_LIABILITY',payload:{id:crypto.randomUUID(),name:n,value:Number(v),type:'other'}})}}>Add Liability</button>{state.netWorth.liabilities.map((l)=><p key={l.id}>{l.name}: {formatINR(l.value)}</p>)}</div></div><button className="bg-sky-500 px-3 py-2 rounded" onClick={()=>dispatch({type:'SAVE_SNAPSHOT',payload:{month:new Date().toISOString().slice(0,7),totalAssets:assets,totalLiabilities:liabilities,netWorth:net}})}>Save Snapshot</button></div>
}
