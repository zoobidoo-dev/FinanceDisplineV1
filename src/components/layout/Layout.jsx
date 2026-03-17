import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
  return <div className="md:flex"><Sidebar /><main className="flex-1 p-3 md:p-6 pb-24 md:pb-6">{children}</main><BottomNav /></div>;
}
