import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const RootLayout = () => {
  return (
    <div className="relative w-screen min-h-screen bg-[#111]">
      {/* 앱의 메인화면 */}
      <div className="relative mx-auto max-w-[430px] min-w[375px] min-h-screen bg-[#FDFDFD]">
        <main className="relative w-full h-[calc(100vh-9vh)] overflow-y-auto">
          <Outlet />
        </main>
        <Navbar />
      </div>
    </div>
  );
};

export default RootLayout;
