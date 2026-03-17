import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

export default function SettingsPage(){
  const {state,dispatch}=useFinance();
  const [show,setShow]=useState(false);
  const s=state.settings;
  const update=(k,v)=>dispatch({type:'UPDATE_SETTINGS',payload:{[k]:v}});
  const testConnection=async()=>{if(!s.anthropicApiKey)return alert('Add key');try{const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':s.anthropicApiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:20,messages:[{role:'user',content:'Hi'}]})});alert(r.ok?'Connection successful':'Failed')}catch{alert('Failed')}};
  return <div className="space-y-3"><h2 className="text-2xl">Settings</h2><div className="glass p-4 space-y-2"><h3>AI Features</h3><input type={show?'text':'password'} className="p-2 rounded bg-white/10 w-full" placeholder="Anthropic API Key" value={s.anthropicApiKey} onChange={(e)=>update('anthropicApiKey',e.target.value)} /><button className="px-2 py-1 rounded bg-white/10" onClick={()=>setShow(!show)}>{show?'Hide':'Show'}</button><button className="ml-2 px-2 py-1 rounded bg-sky-500" onClick={testConnection}>Test Connection</button><p className="text-sm">Get your API key at console.anthropic.com</p></div><div className="glass p-4"><h3>Salary</h3><input className="p-2 rounded bg-white/10 mr-2" placeholder="Day" value={s.salaryDay} onChange={(e)=>update('salaryDay',e.target.value)} /><input className="p-2 rounded bg-white/10" placeholder="Amount" value={s.salaryAmount} onChange={(e)=>update('salaryAmount',e.target.value)} /></div></div>
}
