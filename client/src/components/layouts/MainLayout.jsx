import { Outlet } from 'react-router-dom';
import BottomNav from '../navigation/BottomNav';
import TopBar from '../navigation/TopBar';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
