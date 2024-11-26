import { Outlet } from 'react-router-dom';
import { TopNavigationBar } from './components/layout/TopNavigationBar/TopNavigationBar';

export function App() {
  return (
    <>
      <TopNavigationBar />
      <div className={`mt-[50px] min-h-[calc(100vh-50px)] px-4 md:px-16 py-4`}>
        <Outlet />
      </div>
    </>
  );
}
