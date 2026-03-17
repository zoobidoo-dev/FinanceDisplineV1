import { NavLink } from 'react-router-dom';

const links = [
  ['/', 'Dashboard'],
  ['/add', 'Add Transaction'],
  ['/budget', 'Budget'],
  ['/goals', 'Goals'],
  ['/more', 'More'],
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 p-4">
      <div className="glass p-4 min-h-[calc(100vh-2rem)]">
        <h1 className="text-2xl font-heading mb-1">धनरक्षक</h1>
        <p className="text-sm text-slate-400 mb-5">Protector of Wealth</p>
        <div className="space-y-2">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `block px-3 py-2 rounded-lg ${isActive ? 'bg-sky-500/20 text-sky-300' : 'text-slate-300'}`}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}
