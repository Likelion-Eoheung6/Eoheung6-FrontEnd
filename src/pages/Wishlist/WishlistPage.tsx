import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWishlist, useUpdateWishlist } from '../../hooks/wishlist/useWishlist';
import WishlistCard from '../../components/wish/WishlistCard';
import LoadingScreen from '../../components/common/LoadingScreen';
import EmptyState from '../../components/common/EmptyState';
import PageHeader from '../../components/common/PageHeader';

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: wishlistData, isLoading, error } = useWishlist();
  const updateWishlist = useUpdateWishlist();
  const [wishStates, setWishStates] = useState<Record<number, boolean>>({});
  const [initialWishStates, setInitialWishStates] = useState<Record<number, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // 위시리스트 데이터가 로드되면 초기 상태 설정
  useEffect(() => {
    if (wishlistData?.data?.WishPage) {
      const initialStates: Record<number, boolean> = {};
      wishlistData.data.WishPage.forEach(wishClass => {
        initialStates[wishClass.openId] = true; // 위시리스트에 있으므로 true
      });
      setWishStates(initialStates);
      setInitialWishStates(initialStates);
    }
  }, [wishlistData]);

  // 변경사항 추적
  useEffect(() => {
    const hasAnyChanges = Object.keys(wishStates).some(key => {
      const openId = parseInt(key);
      return wishStates[openId] !== initialWishStates[openId];
    });
    setHasChanges(hasAnyChanges);
  }, [wishStates, initialWishStates]);

  // 페이지를 떠날 때 변경사항이 있으면 POST 요청
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (hasChanges) {
        try {
          const currentWishIds = Object.keys(wishStates)
            .filter(key => wishStates[parseInt(key)])
            .map(key => parseInt(key));
          
          await updateWishlist.mutateAsync({ openId: currentWishIds });
        } catch (error) {
          console.error('페이지 떠날 때 위시리스트 업데이트 실패:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges, wishStates, updateWishlist]);

  // 라우트 변경 감지 (네브바 클릭 등)
  useEffect(() => {
    const handleRouteChange = async () => {
      if (hasChanges) {
        try {
          const currentWishIds = Object.keys(wishStates)
            .filter(key => wishStates[parseInt(key)])
            .map(key => parseInt(key));
          
          await updateWishlist.mutateAsync({ openId: currentWishIds });
          setHasChanges(false);
        } catch (error) {
          console.error('라우트 변경 시 위시리스트 업데이트 실패:', error);
        }
      }
    };

    // 현재 위치가 wishlist가 아닐 때만 실행
    if (location.pathname !== '/wishlist' && hasChanges) {
      handleRouteChange();
    }
  }, [location.pathname, hasChanges, wishStates, updateWishlist]);

  const handleToggleWish = (openId: number, isWished: boolean) => {
    // 로컬 상태만 업데이트 (즉시 POST 요청하지 않음)
    setWishStates(prev => ({
      ...prev,
      [openId]: isWished
    }));
  };
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    // 404 에러는 위시리스트가 비어있는 것으로 처리
    const is404Error = (error as any)?.response?.status === 404;
    
    if (is404Error) {
      return (
        <div>
          <PageHeader title="위시리스트"/>
          <EmptyState
            message="앗! 위시리스트에 추가한 클래스가 없어요."
            buttonText="클래스 검색하러 가기"
            onButtonClick={() => navigate('/search')}
          />
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            위시리스트를 불러오는데 실패했습니다
          </h2>
        </div>
      </div>
    );
  }

  const wishClasses = wishlistData?.data?.WishPage || [];

  if (wishClasses.length === 0) {
    return (
      <div>
        <PageHeader title="위시리스트"/>
        <EmptyState
          message="앗! 위시리스트에 추가한 클래스가 없어요."
          buttonText="클래스 검색하러 가기"
          onButtonClick={() => navigate('/search')}
        />
      </div>
    );
  }

    return (
    <div>
      <PageHeader title="위시리스트"/>
      
      {/* 변경사항 알림 */}
      {hasChanges && (
        <div className="px-[32px] py-[8px] bg-blue-50 border-b border-blue-200">
          <p className="text-sm text-blue-600 text-center">
            변경사항이 저장되지 않았습니다. 다른 페이지로 이동하면 자동으로 저장됩니다.
          </p>
        </div>
      )}
      
      <div className="px-[32px] py-[14px] space-y-[21px]">
        {wishClasses.map((wishClass) => (
          <WishlistCard
            key={wishClass.openId}
            openId={wishClass.openId}
            title={wishClass.title}
            date={wishClass.openAt}
            price={`${wishClass.price.toLocaleString()}원`}
            location={wishClass.roadAddress}
            imageUrl={wishClass.imageUrl}
            isWished={wishStates[wishClass.openId]}
            onToggleWish={handleToggleWish}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
