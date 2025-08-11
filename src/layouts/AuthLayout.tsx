import { Outlet } from 'react-router-dom';
// 상단 high 바는 각 페이지에서 개별 배치합니다.

const AuthLayout = () => {
  return (
    <div className="relative w-screen min-h-screen bg-[#111]">
      <div className="relative mx-auto w-full max-w-[420px] min-h-screen bg-[linear-gradient(180deg,_#FDFDFD_28.75%,_#FFF6CC_100%)]">
        {/* 각 페이지에서 헤더 이미지를 렌더링합니다. */}
        <main className="relative w-full min-h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;


