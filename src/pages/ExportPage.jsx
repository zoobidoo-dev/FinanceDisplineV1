import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useFinance } from '../context/FinanceContext';

export default function ExportPage(){
  const {state,dispatch}=useFinance();
  const exportCsv=()=>{const csv=Papa.unparse(state.transactions.map((t)=>({Date:t.date,Type:t.type,Category:t.category,Amount:t.amount,Account:state.accounts.find((a)=>a.id===t.accountId)?.name||'',Note:t.note||''})));saveAs(new Blob([csv],{type:'text/csv'}),`DhanRakshak_Transactions_${new Date().toISOString().slice(0,10)}.csv`)};
  const exportPdf=()=>{const doc=new jsPDF();doc.text('DhanRakshak Monthly Report',14,15);autoTable(doc,{startY:25,head:[['Date','Type','Category','Amount']],body:state.transactions.slice(0,20).map((t)=>[t.date,t.type,t.category,String(t.amount)])});doc.save('DhanRakshak_Report.pdf')};
  const backup=()=>saveAs(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),`DhanRakshak_Backup_${new Date().toISOString().slice(0,10)}.json`);
  const restore=(e)=>{const f=e.target.files?.[0];if(!f)return;f.text().then((txt)=>dispatch({type:'IMPORT_DATA',payload:JSON.parse(txt)}));};
  return <div className="space-y-3"><h2 className="text-2xl">Export & Backup</h2><div className="glass p-3 space-x-2"><button className="bg-sky-500 px-3 py-2 rounded" onClick={exportCsv}>Export CSV</button><button className="bg-emerald-500 px-3 py-2 rounded" onClick={exportPdf}>Export PDF</button><button className="bg-amber-500 px-3 py-2 rounded" onClick={backup}>Backup JSON</button><label className="bg-rose-500 px-3 py-2 rounded cursor-pointer">Restore<input type="file" accept=".json" className="hidden" onChange={restore}/></label></div></div>
}
