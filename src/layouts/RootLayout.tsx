import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="relative w-screen min-h-screen bg-[#111]">
      <div className="relative flex flex-col mx-auto bg-white max-w-[420px] min-w[375px] min-h-screen bg-[#FDFDFD]">
        <main className="flex-grow w-full overflow-y-auto">
          <Outlet />
        </main>
        {/* BottomNavBar: 하단 네비게이션 바 */}
        {/* <BottomNavBar /> */}
      </div>
    </div>
  );
};

export default RootLayout;
