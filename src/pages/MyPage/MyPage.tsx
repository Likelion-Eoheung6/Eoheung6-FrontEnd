import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import ActivitySection from '../../components/mypage/ActivitySection';
import reservationIcon from '../../assets/mypage/reservation.svg';
import LoadingScreen from '../../components/common/LoadingScreen';
import { useMyPageData } from '../../hooks/mypage/useMyPageData';
import { useUpdateProfile } from '../../hooks/mypage/useUpdateProfile';
import TagBox from '../../components/mypage/TagBox';
import DefaultProfileImage from '../../assets/mypage/defaultProfile.jpeg';
export default function MyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlVersion = searchParams.get('version');
  const sessionVersion = sessionStorage.getItem('userVersion');
  const version = urlVersion || sessionVersion;

  // API 데이터 가져오기
  const { data: myPageData, isLoading, error } = useMyPageData();
  const updateProfileMutation = useUpdateProfile();

  // 프로필 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editingTags, setEditingTags] = useState<
    Array<{ tagId: number; genre: string }>
  >([]);

  // API 데이터가 로드될 때마다 상태 업데이트
  useEffect(() => {
    if (myPageData?.data) {
      setNickname(myPageData.data.nickname || '');
      setIntroduction(myPageData.data.intro || '');

      // 중복된 태그 제거
      const uniqueTags =
        myPageData.data.preferredTags?.filter(
          (tag, index, self) =>
            index === self.findIndex(t => t.tagId === tag.tagId)
        ) || [];
      setEditingTags(uniqueTags);
    }
  }, [myPageData]);

  // 로딩 중이거나 에러가 있을 때 처리
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  // API 데이터에서 태그 추출 (표시용) - 중복 제거
  const tags = isEditMode
    ? editingTags.map(tag => tag.genre)
    : myPageData?.data?.preferredTags?.map(tag => tag.genre) || [];

  // 중복 제거된 고유한 태그 배열
  const uniqueTags = [...new Set(tags)];

  // 최근 예약 데이터 포맷팅
  const reservationData = myPageData?.data?.recentReservation
    ? {
        id: myPageData.data.recentReservation.applicationId,
        title: myPageData.data.recentReservation.title,
        date: myPageData.data.recentReservation.openAt,
        startTime: myPageData.data.recentReservation.startTime,
        endTime: myPageData.data.recentReservation.endTime,
        classId: myPageData.data.recentReservation.openId,
      }
    : null;

  // 예약한 클래스 데이터를 ActivitySection에서 사용할 형태로 변환
  const reservedClassesForActivity = reservationData ? [reservationData] : [];

  // 태그 삭제 함수
  const handleDeleteTag = (tagToDelete: string) => {
    if (isEditMode) {
      setEditingTags(prev => prev.filter(tag => tag.genre !== tagToDelete));
    }
  };

  // 프로필 수정 모드 토글
  const toggleEditMode = () => {
    if (isEditMode) {
      // 수정 모드 종료 시 초기값으로 되돌리기
      setNickname(myPageData?.data?.nickname || '');
      setIntroduction(myPageData?.data?.intro || '');
      setSelectedImage(null);
      // 중복된 태그 제거
      const uniqueTags =
        myPageData?.data?.preferredTags?.filter(
          (tag, index, self) =>
            index === self.findIndex(t => t.tagId === tag.tagId)
        ) || [];
      setEditingTags(uniqueTags);
    } else {
      // 수정 모드 시작 시 현재 API 데이터로 초기화
      setNickname(myPageData?.data?.nickname || '');
      setIntroduction(myPageData?.data?.intro || '');
      // 중복된 태그 제거
      const uniqueTags =
        myPageData?.data?.preferredTags?.filter(
          (tag, index, self) =>
            index === self.findIndex(t => t.tagId === tag.tagId)
        ) || [];
      setEditingTags(uniqueTags);
    }
    setIsEditMode(!isEditMode);
  };

  // 프로필 저장
  const handleSaveProfile = async () => {
    if (!myPageData?.data) return;

    try {
      // 중복된 태그 ID 제거
      const uniqueTagIds = [...new Set(editingTags.map(tag => tag.tagId))];

      const updateData = {
        nickname: nickname.trim(),
        intro: introduction.trim(),
        preferredTagIds: uniqueTagIds.length > 0 ? uniqueTagIds : [],
      };

      console.log('업데이트할 태그 ID들 (중복 제거):', uniqueTagIds);
      console.log('전체 업데이트 데이터:', updateData);

      await updateProfileMutation.mutateAsync({
        data: updateData,
        imageFile: selectedImage || undefined,
      });

      setIsEditMode(false);
      setSelectedImage(null);
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      // 에러 발생 시 사용자에게 알림
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 이미지 선택 핸들러
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const weekday = weekdays[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${weekday})`;
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
            <div className="w-[145px] h-[145px] bg-[#545454] rounded-[100px] overflow-hidden relative">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="선택된 프로필 이미지"
                  className="w-full h-full object-cover"
                />
              ) : myPageData?.data?.profileImageUrl ? (
                <img
                  src={myPageData.data.profileImageUrl}
                  alt="프로필 이미지"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={DefaultProfileImage}
                  alt="프로필 이미지"
                  className="w-full h-full object-cover"
                />
              )}

              {/* 이미지 선택 버튼 (수정 모드일 때만 표시) */}
              {isEditMode && (
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer rounded-[100px] opacity-0 hover:opacity-100 transition-opacity">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <span className="text-white text-[12px] font-medium">
                    이미지 변경
                  </span>
                </label>
              )}
            </div>
          </div>
          {/* 프로필 수정하기 버튼 */}
          <button
            onClick={isEditMode ? handleSaveProfile : toggleEditMode}
            disabled={isEditMode && updateProfileMutation.isPending}
            className={`absolute top-0 right-[16px] border border-[#95E3FF] rounded-[20px] px-[10px] py-[6px] text-[14px] font-semibold leading-[120%] tracking-[-0.025em] ${
              isEditMode
                ? 'bg-[#009DFF] text-[#FDFDFD]'
                : 'bg-[#FDFDFD] text-[#009DFF]'
            } ${
              updateProfileMutation.isPending
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {isEditMode
              ? updateProfileMutation.isPending
                ? '저장 중...'
                : '프로필 저장하기'
              : '프로필 수정하기'}
          </button>
        </div>

        {/* 닉네임 부분*/}
        <div className="flex justify-center px-[127px]">
          <input
            type="text"
            placeholder="닉네임을 설정해주세요"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
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
            onChange={e => setIntroduction(e.target.value)}
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
                <img
                  src={reservationIcon}
                  alt="신청 아이콘"
                  className="w-[30px] h-[30px]"
                />
              </div>
              <span className="text-[#545454] text-[12px] font-semibold leading-[120%] tracking-[-0.025em]">
                신청관리
              </span>
            </div>

            {/* 콘텐츠 영역 */}
            <div className="flex-1">
              <div className="text-[#545454] text-[10px] font-medium leading-[120%] tracking-[-0.025em] mb-[2px]">
                신청한 클래스
              </div>
              {reservationData ? (
                <div className="flex flex-col">
                  <div className="text-[#111111] text-[14px] font-normal leading-[120%] tracking-[-0.025em]">
                    {reservationData.title}
                  </div>
                  <div className="text-[#545454] text-[12px] font-light leading-[120%] tracking-[-0.025em]">
                    {formatDate(reservationData.date)}
                  </div>
                </div>
              ) : (
                <div className="text-[#B3B3B3] text-[14px] font-normal leading-[120%] tracking-[-0.025em]">
                  신청한 클래스가 없습니다.
                </div>
              )}
            </div>

            {/* 오른쪽 위 더보기 버튼 */}
            <div
              onClick={() => {
                if (reservationData) {
                  navigate('/my-applied');
                }
              }}
              className={`absolute top-[10px] right-[12px] text-[#545454] text-[12px] font-medium leading-[120%] tracking-[-0.025em] ${
                reservationData ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
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
            <div>
              {tags.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[20px]">
                  <div className="text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em] text-center">
                    선호 태그가 없어요
                    <br />
                    태그 추가하기로 추가해 주세요
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-[6px]">
                  {tags.map((tag, index) => {
                    const tagData = editingTags.find(t => t.genre === tag);
                    return (
                      <TagBox
                        key={`${tagData?.tagId || 'unknown'}-${index}`}
                        onDelete={() => handleDeleteTag(tag)}
                        isEditMode={isEditMode}
                      >
                        {tag}
                      </TagBox>
                    );
                  })}
                </div>
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
