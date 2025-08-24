import { useSearchParams } from 'react-router-dom';
import TagGroup from '../../components/tags/TagGroup';
import TagBottomSheet from '../../components/tag/TagBottomSheet';
import tagLogo from '../../assets/common/logo2.svg';
import NextIcon from '../../assets/tag/next.svg';
import { useTagSelect } from '../../hooks/tag/useTagSelect';
import { TAGS, EASY_TAGS } from '../../constants/tags';

export default function TagSelectPage() {
  const [searchParams] = useSearchParams();
  const {
    selected,
    setSelected,
    isSheetOpen,
    classData,
    isEasyVersion,
    requiredCount,
    handleOpenSheet,
    handleCloseSheet,
    handleImageLoadComplete,
    areAllImagesLoaded,
    navigate,
    handleTagSave
  } = useTagSelect();
  
  const tags = isEasyVersion ? EASY_TAGS : TAGS;

  return (
    <div className="relative mx-auto min-h-screen">     
      {/* 배경 */}
      <div className="absolute inset-0 w-full min-h-screen bg-[#FDFDFD]" />
      <div className="absolute left-0 top-0 w-full flex items-center justify-center">
          <img src={tagLogo} alt="태그 로고" className="h-16 opacity-100 rotate-0" />
      </div>
      
      {/* 본문 */}
      <div className="absolute left-0 top-[88px] w-full pl-[16px] pr-[16px] z-10">
        {/* 상단 행: 배너 + 홈으로 버튼 */}
        <div className="flex items-center justify-between">
          {/* 배너 카드: 무엇을 좋아하세요? */}
          <div className="inline-flex items-center rounded-[20px] bg-[#009DFF] shadow-[0_4px_4px_2px_rgba(0,0,0,0.04)] px-[22px] py-[7px]">
            <span className="text-[#FDFDFD] text-[20px] font-semibold leading-[1.2] tracking-[-0.025em]">
              무엇을 좋아하세요?
            </span>
          </div>

          {/* 홈으로 버튼 */}
          <button
            type="button"
            onClick={() => {
              // 태그가 선택되어 있으면 저장 후 홈으로 이동
              if (selected.length >= requiredCount) {
                handleTagSave();
              } else {
                // 태그가 선택되지 않았으면 바로 홈으로 이동
                navigate(isEasyVersion ? '/easy' : '/home');
              }
            }}
            className="flex flex-col items-center justify-center appearance-none border-0 bg-transparent cursor-pointer pr-[2px]"
          >
            <div className="relative w-[36px] h-[36px]">
              <span className="absolute left-1/2 top-1/2 block h-[24px] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#545454]" />
              <span className="absolute left-1/2 top-1/2 block h-[24px] w-[2px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[#545454]" />
            </div>
            <span className="text-[#545454] text-[12px] font-normal leading-[1.2] tracking-[-0.025em]">홈으로</span>
          </button>
        </div>

        {/* 설명 문구 */}
        <p className={`mt-[10px] text-[#545454] font-medium leading-[1.2] tracking-[-0.025em] ${isEasyVersion ? 'text-[22px] whitespace-pre-line' : 'text-[14px]'}`}>
          {isEasyVersion ? '선택하신 태그에 맞춰서\n딱 맞는 수업을 찾아드릴게요!' : '선택하신 태그에 맞춰서 딱 맞는 수업을 찾아드릴게요!'}
        </p>
        {!isEasyVersion && (
          <p className="mt-[45px] text-[#545454] text-[12px] font-normal leading-[1.2] tracking-[-0.025em] underline">
            한가지 이상의 태그를 선택해 주세요
          </p>
        )}

        {/* 태그 영역 */}
        <div className={isEasyVersion ? "mt-[28px]" : "mt-[10px]"}>
          <TagGroup
            tags={tags}
            multiple
            onChange={(v) => setSelected(Array.isArray(v) ? v : v ? [v] : [])}
            isEasyVersion={isEasyVersion}
          />
        </div>
      
        {/* 다음 버튼: 시트 열림 전만 노출 (일반 버전에서만) */}
        {!isSheetOpen && !isEasyVersion && (
          <div className="mt-[97px] flex justify-end">
            <button
              type="button"
              disabled={selected.length < requiredCount}
              onClick={handleOpenSheet}
              className={`${
                selected.length >= requiredCount
                  ? 'bg-[#009DFF] cursor-pointer'
                  : 'bg-[#B3B3B3] cursor-not-allowed'
              } rounded-[20px] w-[49px] h-[46px] flex items-center justify-center appearance-none border-0 outline-none focus:outline-none ring-0 focus:ring-0`}
              aria-label="다음"
            >
              <img src={NextIcon} alt="다음" className="w-[15px] h-[20px]" />
            </button>
          </div>
        )}
        
        {/* 쉬운 버전용 다음 버튼 */}
        {isEasyVersion && (
          <div className="mt-[283px] flex justify-end">
            <button
              type="button"
              disabled={selected.length < requiredCount}
              onClick={handleOpenSheet}
              className={`${
                selected.length >= requiredCount
                  ? 'bg-[#009DFF] cursor-pointer'
                  : 'bg-[#B3B3B3] cursor-not-allowed'
              } rounded-[20px] w-[49px] h-[46px] flex items-center justify-center appearance-none border-0 outline-none focus:outline-none ring-0 focus:ring-0`}
              aria-label="다음"
            >
              <img src={NextIcon} alt="다음" className="w-[15px] h-[20px]" />
            </button>
          </div>
        )}
      </div>

      {/* 바텀 시트 (일반 버전에서만) */}
      {!isEasyVersion && (
        <TagBottomSheet
          isOpen={isSheetOpen}
          onClose={handleCloseSheet}
          classData={classData}
          areAllImagesLoaded={areAllImagesLoaded()}
          onImageLoad={handleImageLoadComplete}
          onClassClick={(classId) => navigate(`/class/${classId}`)}
        />
      )}
    </div>
  );
}