import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../hooks/wishlist/useWishlist';
import WishlistCard from '../../components/wish/WishlistCard';
import LoadingScreen from '../../components/common/LoadingScreen';
import EmptyState from '../../components/common/EmptyState';
import PageHeader from '../../components/common/PageHeader';

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: wishlistData, isLoading, error } = useWishlist();
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
      
      <div className="px-[32px] py-[14px] space-y-[21px]">
        {wishClasses.map((wishClass) => (
          <WishlistCard
            key={wishClass.openId}
            title={wishClass.title}
            date={wishClass.openAt}
            price={`${wishClass.price.toLocaleString()}원`}
            location={wishClass.roadAddress}
            imageUrl={wishClass.imageUrl}
            onRemove={() => {
              // 위시리스트에서 제거 기능은 나중에 구현
              console.log('위시리스트에서 제거:', wishClass.openId);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
