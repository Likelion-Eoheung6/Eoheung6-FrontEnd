import { Outlet } from 'react-router-dom';
// 상단 high 바는 각 페이지에서 개별 배치합니다.

const AuthLayout = () => {
  return (
    <div className="relative w-screen min-h-screen bg-[#111]">
      <div className="relative mx-auto w-full max-w-[430px] min-w[375px] min-h-screen">
        <main className="relative w-full min-h-screen overflow-y-auto h-[calc(100vh-9vh)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;


