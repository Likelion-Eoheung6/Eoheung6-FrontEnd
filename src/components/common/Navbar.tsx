import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// images - 이 경로들은 실제 프로젝트 구조에 맞게 확인해주세요.
import HomeSelectedIcon from '../../assets/common/home-selected.svg';
import HomeIcon from '../../assets/common/home.svg';
import AiRecommendSelectedIcon from '../../assets/common/aiRecommend-selected.svg';
import AiRecommendIcon from '../../assets/common/aiRecommend.svg';
import SearchSelectedIcon from '../../assets/common/search-selected.svg';
import SearchIcon from '../../assets/common/search.svg';
import WishlistSelectedIcon from '../../assets/common/wishlist-selected.svg';
import WishlistIcon from '../../assets/common/wishlist.svg';
import MyPageSelectedIcon from '../../assets/common/mypage-selected.svg';
import MyPageIcon from '../../assets/common/mypage.svg';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  // 각 네비게이션 아이템을 배열로 관리하면 코드가 더 깔끔해집니다.
  const navItems = [
    {
      path: '/home',
      defaultIcon: HomeIcon,
      selectedIcon: HomeSelectedIcon,
      label: '홈',
      alt: '홈',
      activePaths: ['/home', '/easy', '/open-class', '/request-class'],
    },
    {
      path: '/recommend',
      defaultIcon: AiRecommendIcon,
      selectedIcon: AiRecommendSelectedIcon,
      label: 'AI 추천',
      alt: 'AI 추천',
    },
    {
      path: '/search',
      defaultIcon: SearchIcon,
      selectedIcon: SearchSelectedIcon,
      label: '검색',
      alt: '검색',
    },
    {
      path: '/wishlist',
      defaultIcon: WishlistIcon,
      selectedIcon: WishlistSelectedIcon,
      label: '위시리스트',
      alt: '위시리스트',
    },
    {
      path: '/mypage',
      defaultIcon: MyPageIcon,
      selectedIcon: MyPageSelectedIcon,
      label: '마이페이지',
      alt: '마이페이지',
    },
  ];

  return (
    <nav
      className="
    absolute bottom-0 left-0 right-0 z-50 bg-white 
    w-full h-[9vh]
    border border-[#E0E0E0] shadow-[0_10px_10px_10px_rgba(0,0,0,0.05)]
    flex items-center justify-between box-border 
    px-[20px] py-[14px]
    [-webkit-tap-highlight-color:transparent]
"
    >
      {navItems.map(item => {
        const isActive = item.activePaths
          ? item.activePaths.includes(pathname)
          : pathname === item.path;

        return (
          <Link
            to={
              item.path === '/home'
                ? (() => {
                    // 홈 버튼 클릭 시 사용자의 버전에 따라 이동
                    const userVersion = sessionStorage.getItem('userVersion');
                    return userVersion === 'easy' ? '/easy' : '/home';
                  })()
                : item.path
            }
            key={item.path}
            className="flex-1 h-full flex flex-col items-center justify-center no-underline relative"
          >
            {/* 빛 애니메이션 */}
            {isActive && (
              <>
                <style>
                  {`
        @keyframes lightGrow {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}
                </style>
                <div
                  className="absolute bottom-0 left-0 w-full h-[40%] rounded-t-full origin-bottom"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(149, 227, 255, 0.80) 100%)',
                    animation: 'lightGrow 0.6s ease-out forwards',
                    filter: 'blur(8px)',
                    pointerEvents: 'none',
                  }}
                />
              </>
            )}
            <img
              src={isActive ? item.selectedIcon : item.defaultIcon}
              alt={item.alt}
              className="block mb-[5px]object-cover"
            />
            {/* 텍스트 */}
            <div
              className={`text-center text-[12px] font-bold leading-none
      ${isActive ? 'text-[#009DFF]' : 'text-[#B3B3B3]'}
    `}
            >
              {item.label}
            </div>

            {/* 밑줄 */}
            <div
              className={`mt-[4px] h-[3px] w-full border-b-[4px] rounded-full
      ${isActive ? 'border-[#009DFF] ' : 'border-transparent'}
    `}
            />
          </Link>
        );
      })}
    </nav>
  );
}
