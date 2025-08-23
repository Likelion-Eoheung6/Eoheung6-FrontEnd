import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import WishlistCard from '../../components/wish/WishlistCard';

export default function WishlistPage() {
  const navigate = useNavigate();
  
  // 샘플 위시리스트 데이터
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '1',
      title: '사진을 잘 찍는 방법에 대하여',
      date: '2025년 8월 20일 수요일',
      price: '15,000원',
      location: '성북구성북구성북구성북성북구성북구성북구성북...',
      imageUrl: ''
    },
    {
      id: '2',
      title: '영어 회화 기초 클래스',
      date: '2025년 8월 25일 월요일',
      price: '25,000원',
      location: '강남구',
      imageUrl: ''
    },
    {
      id: '3',
      title: '도예체험 클래스',
      date: '2025년 8월 30일 토요일',
      price: '35,000원',
      location: '마포구',
      imageUrl: ''
    },
    {
      id: '4',
      title: '꽃꽂이 기초 수업',
      date: '2025년 9월 5일 금요일',
      price: '45,000원',
      location: '서초구',
      imageUrl: ''
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div>
      {/* 페이지 헤더 */}
      <PageHeader 
        title="위시리스트" 
        onBack={handleBack}
      />

      {/* 위시리스트 아이템들 */}
      {wishlistItems.length > 0 && (
        <div className="px-[32px] py-[14px] space-y-[21px]">
          {wishlistItems.map((item) => (
            <WishlistCard
              key={item.id}
              title={item.title}
              date={item.date}
              price={item.price}
              location={item.location}
              imageUrl={item.imageUrl}
              onRemove={() => handleRemoveFromWishlist(item.id)}
            />
          ))}
        </div>
      )}

      {/* 빈 상태 */}
      {wishlistItems.length === 0 && (
        <EmptyState
          message="앗! 위시리스트에 추가한 클래스가 없어요."
          buttonText="클래스 검색하러 가기"
          onButtonClick={() => navigate('/search')}
        />
      )}
    </div>
  );
}
