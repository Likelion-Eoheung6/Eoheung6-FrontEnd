import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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

  // 각 네비게이션 아이템을 배열로 관리하면 코드가 더 깔끔해집니다.
  const navItems = [
    {
      path: '/',
      defaultIcon: HomeIcon,
      selectedIcon: HomeSelectedIcon,
      label: '홈',
      alt: '홈',
    },
    {
      path: '/recommend',
      defaultIcon: AiRecommendIcon,
      selectedIcon: AiRecommendSelectedIcon,
      label: 'Ai 추천',
      alt: 'Ai 추천',
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
        absolute bottom-0 left-0 right-0 z-[999]
        w-full max-w-[420px] h-[9vh]
        border-t border-[#B3B3B3] rounded-t-[20px] overflow-hidden
        flex items-center justify-around
        [-webkit-tap-highlight-color:transparent]
    "
    >
      {navItems.map(item => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            to={item.path}
            key={item.path}
            className="no-underline relative h-full flex items-center"
          >
            {/* BottomNavItem */}
            {/* {isActive && (
              <div
                className={`absolute bottom-0 left-0 h-[55px] w-full
                         bg-[linear-gradient(0deg,rgb(1,85,103)_0%,rgb(147,245,255)_100%)]
                         blur-sm origin-bottom
                         transform-gpu
                         transition-transform duration-1000 ease-out
                         scale-y-100 opacity-20
                         `}
              />
            )} */}
            <div className="h-full px-3 flex flex-col items-center justify-evenly ">
              <img
                src={isActive ? item.selectedIcon : item.defaultIcon}
                alt={item.alt}
                className="block"
              />
              {/* 텍스트와 하단 바를 그룹화하고, 위치 기준점으로 설정 */}
              <div
                className={`w-full text-center text-[1rem] font-bold leading-none border-b-[3px] 
                    ${isActive ? 'border-[#009DFF]' : 'border-transparent'} 
                    ${isActive ? 'text-[#009DFF]' : 'text-[#B3B3B3]'}
                `}
              >
                {item.label}
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
