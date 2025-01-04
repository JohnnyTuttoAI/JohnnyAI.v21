import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <>
      <Sidebar />
      <TopBar />
      <main className="lg:ml-60 pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}