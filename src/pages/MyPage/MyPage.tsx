import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import TagBox from '../../components/common/TagBox';
import ActivitySection from '../../components/mypage/ActivitySection';
import reservationIcon from '../../assets/mypage/reservation.svg';

export default function MyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const version = searchParams.get('version');

  // 예약 데이터 (실제로는 API에서 가져올 데이터)
  const reservationData = {
    title: "키오스크 사용방법 배우기",
    date: "2025년 08월 20일 (수요일)"
  };

  // 태그 상태 관리
  const [tags, setTags] = useState([
    "도예체험",
    "영어 회화", 
    "사진교실",
    "가죽공예"
  ]);

  // 프로필 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");

  // 태그 삭제 함수
  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  // 프로필 수정 모드 토글
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // 프로필 저장
  const handleSaveProfile = () => {
    // 여기에 실제 저장 로직 추가
    console.log('프로필 저장:', { nickname, introduction });
    setIsEditMode(false);
  };

  // 태그 추가하기 버튼 클릭
  const handleAddTag = () => {
    if (version === 'easy') {
      navigate('/tags?version=easy');
    } else {
      navigate('/tags');
    }
  };

  return (
    <div>
      <PageHeader title="마이페이지" />
      
      <div className="space-y-[14px]">
        {/* 프로필 이미지 */}
        <div className="mt-[24px] px-[16px] relative">
          <div className="flex justify-center">
            <div className="w-[145px] h-[145px] bg-[#545454] rounded-[100px]">
            </div>
          </div>
          {/* 프로필 수정하기 버튼 */}
          <button 
            onClick={isEditMode ? handleSaveProfile : toggleEditMode}
            className={`absolute top-0 right-[16px] border border-[#95E3FF] rounded-[20px] px-[10px] py-[6px] text-[14px] font-semibold leading-[120%] tracking-[-0.025em] ${
              isEditMode 
                ? 'bg-[#009DFF] text-[#FDFDFD]' 
                : 'bg-[#FDFDFD] text-[#009DFF]'
            }`}
          >
            {isEditMode ? "프로필 저장하기" : "프로필 수정하기"}
          </button>
        </div>
        
        {/* 닉네임 부분*/}
        <div className="flex justify-center px-[127px]">
          <input 
            type="text"
            placeholder="닉네임을 설정해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={!isEditMode}
            className={`w-full h-[24px] bg-[#FDFDFD] border border-[#E0E0E0] rounded-[12px] px-[12px] text-[#111111] text-[12px] font-light leading-[120%] tracking-[-0.025em] placeholder-[#111111] focus:outline-none text-center ${
              isEditMode ? 'border-[#009DFF]' : ''
            }`}
          />
        </div>
        
        {/* 소개 부분 */}
        <div className="px-[32px]">
          <input 
            type="text"
            placeholder="당신을 소개해 주세요!"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            disabled={!isEditMode}
            className={`w-full h-[38px] bg-[#FDFDFD] border border-[#E0E0E0] rounded-[12px] px-[10px] py-[5px] text-[#111111] text-[12px] font-light leading-[120%] tracking-[-0.025em] placeholder-[#111111] focus:outline-none ${
              isEditMode ? 'border-[#009DFF]' : ''
            }`}
          />
        </div>
        
        {/* 예약관리 컴포넌트 */}
        <div className="px-[32px]">
          <div className="w-full h-[68px] bg-[#FAFAFA] rounded-[20px] p-[12px] relative flex items-center">
            {/* 왼쪽 아이콘 영역 */}
            <div className="w-[68px] h-[68px] flex flex-col items-center justify-center">
              <div className="w-[30px] h-[30px] flex items-center justify-center mb-[2px]">
                <img src={reservationIcon} alt="예약 아이콘" className="w-[30px] h-[30px]" />
              </div>
              <span className="text-[#545454] text-[12px] font-semibold leading-[120%] tracking-[-0.025em]">예약관리</span>
            </div>
            
            {/* 콘텐츠 영역 */}
            <div className="flex-1">
              <div className="text-[#545454] text-[10px] font-medium leading-[120%] tracking-[-0.025em] mb-[2px]">
                최근 예약건
              </div>
              {reservationData.title ? (
                <>
                  <div className="text-[#111111] text-[14px] font-normal leading-[120%] tracking-[-0.025em] mb-[1px]">
                    {reservationData.title}
                  </div>
                  <div className="text-[#545454] text-[12px] font-light leading-[120%] tracking-[-0.025em]">
                    {reservationData.date}
                  </div>
                </>
              ) : (
                <div className="text-[#B3B3B3] text-[14px] font-normal leading-[120%] tracking-[-0.025em]">
                  예약건이 없습니다.
                </div>
              )}
            </div>
            
            {/* 오른쪽 위 더보기 버튼 */}
            <div className="absolute top-[10px] right-[12px] text-[#545454] text-[12px] font-medium leading-[120%] tracking-[-0.025em]">
              더보기 &gt;
            </div>
          </div>
        </div>
        
        {/* 태그관리 컴포넌트 */}
        <div className="px-[32px]">
          <div className="w-full bg-[#FAFAFA] rounded-[20px] p-[12px] relative min-h-[131px]">
            {/* 제목 영역 */}
            <div className="flex justify-between items-center mb-[14px]">
              <div className="text-[#009DFF] text-[14px] font-semibold leading-[120%] tracking-[-0.025em]">
                선호 태그 관리
              </div>
              <div 
                onClick={handleAddTag}
                className="text-[#545454] text-[12px] font-medium leading-[120%] tracking-[-0.025em] cursor-pointer"
              >
                태그 추가하기 &gt;
              </div>
            </div>
            
            {/* 태그 영역 */}
            <div className="space-y-[8px]">
              {tags.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[20px]">
                  <div className="text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em] text-center">
                    선호 태그가 없어요<br />
                    태그 추가하기로 추가해 주세요
                  </div>
                </div>
              ) : (
                <>
                  {/* 첫 번째 행 */}
                  <div className="flex gap-[3px]">
                    {tags.slice(0, 3).map((tag, index) => (
                      <TagBox key={index} onDelete={() => handleDeleteTag(tag)}>
                        {tag}
                      </TagBox>
                    ))}
                  </div>
                  
                  {/* 두 번째 행 */}
                  {tags.length > 3 && (
                    <div className="flex gap-[3px]">
                      {tags.slice(3).map((tag, index) => (
                        <TagBox key={index + 3} onDelete={() => handleDeleteTag(tag)}>
                          {tag}
                        </TagBox>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* 내 활동 섹션 */}
        <ActivitySection />
      </div>
      
      {/* 하단 패딩 */}
      <div className="mb-[31px]"></div>
    </div>
  );
}
