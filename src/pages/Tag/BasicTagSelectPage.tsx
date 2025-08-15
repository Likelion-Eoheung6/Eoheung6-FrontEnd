import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagGroup from '../../components/tags/TagGroup';
import tagLogo from '../../assets/tag/tag-logo.svg';
import NextIcon from '../../assets/tag/next.svg';
import ClassCard from '../../components/common/ClassCard';

const TAGS = [
  '영어 회화', '꽃꽂이', '도예체험', '천연비누 만들기',
  '가죽공예', '수채화 클래스', '캘리그라피', '사진찍기',
  '인형 만들기', '목공 체험', '김치 만들기', '막걸리 체험',
  '홈베이킹', '자수 원데이 클래스', '전통음식 배우기', '커피 드립 클래스',
  '시니어 레시피 공유', '한식 디저트', '브런치 만들기', '요가 명상',
  '생활한방', '건강차 만들기', '영상편집', '인스타 운영법',
  'AI 체험 클래스', '줌(ZOOM) 활용법', '피그마(Figma) 활용법',
  '미니홈피 제작', '향수 만들기', '만다라 드로잉', '화과자 만들기',
  '생활 속 법률', '자취 생활 꿀팁', '슬기로운 장보기', '반려식물 키우기',
  '스마트뱅킹 기초', '성북역사알기', '영화 감상회', '컬러테라피'
];

export default function BasicTagSelectPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selected.length === 2) setIsSheetOpen(true);
    else setIsSheetOpen(false);
  }, [selected]);

  return (
    <div className="relative mx-auto min-h-screen">
      {/* 배경 */}
      <div className="absolute inset-0 w-full min-h-screen bg-[#FDFDFD]" />

      {/* 헤더: 로고 중앙 배치 (393x38, top:58px) */}
      <div className="absolute left-0 top-[58px] w-full flex items-center justify-center">
        <div className="w-[123px] h-[22px] flex items-center justify-center">
          <img src={tagLogo} alt="태그 로고" className="h-[38px] opacity-100 rotate-0" />
        </div>
      </div>

      {/* 본문 */}
      <div className="absolute left-0 top-[120px] w-full pl-[16px] pr-[10px] z-10">
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
            onClick={() => navigate('/')}
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
        <p className="mt-[10px] text-[#545454] text-[14px] font-medium leading-[1.2] tracking-[-0.025em]">
          선택하신 태그에 맞춰서 딱 맞는 수업을 찾아드릴게요!
        </p>
        <p className="mt-[45px] text-[#545454] text-[12px] font-normal leading-[1.2] tracking-[-0.025em] underline">
          2가지 이상의 태그를 선택해 주세요
        </p>

        {/* 태그 영역 */}
        <div className="mt-[10px]">
          <TagGroup
            tags={TAGS}
            multiple
            onChange={(v) => setSelected(Array.isArray(v) ? v : v ? [v] : [])}
          />
        </div>
      
      {/* 다음 버튼: 시트 열림 전만 노출 */}
      {!isSheetOpen && (
      <div className="mt-[97px] flex justify-end">
        <button
          type="button"
          disabled={selected.length < 2}
          className={`${
            selected.length >= 2
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

      {/* 오버레이 + 바텀 시트 */}
      <div className={`fixed inset-0 z-30 transition ${isSheetOpen ? 'pointer-events-auto' : 'pointer-events-none'} w-full`}>
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${isSheetOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsSheetOpen(false)}
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <div className={`w-full max-w-[420px] h-[650px] transform transition-transform duration-300 ease-out ${isSheetOpen ? 'translate-y-0' : 'translate-y-[120%]'} rounded-t-[20px] bg-[#FDFDFD] shadow-[0_-4px_16px_rgba(0,0,0,0.1)]`}>
            <div className="pt-[12px] px-[16px]">
              <div className="mx-auto h-[4px] w-[120px] rounded-full bg-[#C7C7C7]" />
              <div className="mt-[12px] flex items-start justify-center relative">
                <div className="inline-flex items-center rounded-[20px] bg-[#009DFF] px-[14px] py-[8px] shadow-[0_4px_4px_2px_rgba(0,0,0,0.04)] mt-[7px] ml-[22px]">
                  <span className="text-white text-[14px] font-semibold tracking-[-0.01em]">"선택하신 태그에 딱 맞는 클래스를 모아봤어요!"</span>
                </div>
                <button type="button" onClick={() => setIsSheetOpen(false)} className="absolute -right-[20px] -mt-[20px] w-[36px] h-[36px] relative" aria-label="닫기">
                  <span className="absolute left-1/2 top-1/2 block h-[24px] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#545454]" />
                  <span className="absolute left-1/2 top-1/2 block h-[24px] w-[2px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[#545454]" />
                </button>
              </div>
            </div>
            <div className="mt-[8px] px-[16px] pb-[45px] max-h-[60vh] overflow-y-auto">
              <ClassCard
                title="한성대 영문과 학생과 함께하는 영어교실교실교실"
                location="성북구성북구성북구성북구성북구성북구"
                maxParticipants={5}
                currentParticipants={4}
                price={5000}
                tags={['영어 회화', '편안한 분위기', '초보환영']}
              />
              <ClassCard
                title="전직 영어 교사와 함께하는 영어교실교실교실"
                location="성북구성북구성북구성북구성북구성북구"
                maxParticipants={10}
                currentParticipants={4}
                price={10000}
                tags={['영어 회화', '재밌는 수업', '초보 환영']}
              />
              <ClassCard
                title="한성대 사진동아리 PIG와 함께하는 사람여기붙어라"
                location="성북구성북구성북구성북구성북구성북구"
                maxParticipants={5}
                currentParticipants={4}
                price={5000}
                tags={['사진찍기', '편안한 분위기', '초보환영']}
                isRecommended={true}
              />
              <ClassCard
                title="증명사진 잘 찍는법!"
                location="성북구성북구성북구성북구성북구성북구"
                maxParticipants={10}
                currentParticipants={4}
                price={10000}
                tags={['사진찍기', '재밌는 수업', '초보 환영']}
                isRecommended={true}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


  