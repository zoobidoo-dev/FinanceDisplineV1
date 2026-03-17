import { Link } from 'react-router-dom';

const links = [
  ['/budget', 'Budget'],
  ['/goals', 'Goals'],
  ['/recurring', 'Recurring Expenses'],
  ['/add', 'Add Transaction'],
];

export default function MorePage() {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-heading">More</h2>
      {links.map(([to, label]) => (
        <Link key={to} to={to} className="glass p-3 block min-h-11">{label}</Link>
      ))}
    </div>
  );
}
