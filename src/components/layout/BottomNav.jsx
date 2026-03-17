import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, PiggyBank, Target, MoreHorizontal } from 'lucide-react';

const tabs = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/add', icon: PlusCircle, label: 'Add', isPrimary: true },
  { to: '/budget', icon: PiggyBank, label: 'Budget' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/more', icon: MoreHorizontal, label: 'More' },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 glass rounded-none border-x-0 border-b-0 p-2 z-20">
      <div className="grid grid-cols-5 gap-1 items-end">
        {tabs.map(({ to, icon: Icon, label, isPrimary }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex flex-col items-center justify-center min-h-11 rounded-xl ${
              isPrimary
                ? 'bg-emerald-500 text-white -translate-y-2 shadow-lg'
                : isActive
                  ? 'text-sky-300'
                  : 'text-slate-300'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
