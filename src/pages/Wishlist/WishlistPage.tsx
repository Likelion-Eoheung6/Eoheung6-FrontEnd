import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist, useUpdateWishlist } from '../../hooks/wishlist/useWishlist';
import WishlistCard from '../../components/wish/WishlistCard';
import ClassCardSkeleton from '../../components/common/ClassCardSkeleton';
import EmptyState from '../../components/common/EmptyState';
import PageHeader from '../../components/common/PageHeader';

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: wishlistData, isLoading, error } = useWishlist();
  const updateWishlist = useUpdateWishlist();
  const [wishStates, setWishStates] = useState<Record<number, boolean>>({});

  // 위시리스트 데이터가 로드되면 초기 상태 설정
  useEffect(() => {
    if (wishlistData?.data?.WishPage) {
      const initialStates: Record<number, boolean> = {};
      wishlistData.data.WishPage.forEach(wishClass => {
        // 위시리스트에 있는 아이템은 기본적으로 true
        initialStates[wishClass.openId] = true;
      });
      setWishStates(initialStates);
    }
  }, [wishlistData]);



  const handleToggleWish = async (openId: number, isWished: boolean) => {
    console.log('위시 토글:', openId, isWished);
    
    try {
      // 변경된 ID만 포함하여 요청
      const updatedWishIds = [openId];
      
      // 위시리스트 업데이트
      await updateWishlist.mutateAsync({ ids: updatedWishIds });
      
      // 성공 후 UI 업데이트
      setWishStates(prev => {
        const newState = {
          ...prev,
          [openId]: isWished
        };
        console.log('새로운 위시 상태:', newState);
        return newState;
      });
      
    } catch (error) {
      console.error('위시리스트 업데이트 실패:', error);
      // 실패 시 UI 업데이트하지 않음
    }
  };
  if (isLoading) {
    return (
      <div>
        <PageHeader title="위시리스트"/>
        <div className="px-[32px] py-[14px] space-y-[21px]">
          {[1, 2, 3].map((index) => (
            <ClassCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
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
            isLoading={updateWishlist.isPending}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
