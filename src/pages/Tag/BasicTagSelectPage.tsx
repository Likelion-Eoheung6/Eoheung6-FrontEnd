import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagGroup from '../../components/tags/TagGroup';
import tagLogo from '../../assets/tag/tag-logo.svg';
import NextIcon from '../../assets/tag/next.svg';

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
  const navigate = useNavigate();

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
      
      {/* 다음 버튼: 태그 영역과 간격 97, 오른쪽 정렬 */}
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
      </div>

    </div>
  );
}


  