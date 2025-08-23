export default function ActivityClassCardSkeleton() {
  return (
    <div className="rounded-[16px] relative">
      <div className="flex gap-[5px]">
        {/* 이미지 스켈레톤 */}
        <div className="w-[130px] h-[130px] bg-gray-200 rounded-[20px] animate-pulse" />
        <div className="flex-1">
          {/* 제목 스켈레톤 */}
          <div className="h-[24px] bg-gray-200 rounded-[10px] mb-[4px] animate-pulse" />
          {/* 내용 스켈레톤 */}
          <div className="bg-[#FDFDFD] border border-[#E0E0E0] rounded-[10px] pl-[5px] pt-[2px] space-y-[2px]">
            {/* 장소 정보 스켈레톤 */}
            <div className="flex items-center gap-[4px] h-[20px]">
              <div className="w-[60px] h-[20px] bg-gray-200 rounded animate-pulse" />
              <div className="w-[1px] h-[12px] bg-[#E0E0E0]"></div>
              <div className="w-[120px] h-[12px] bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
            {/* 모집인원 정보 스켈레톤 */}
            <div className="flex items-center gap-[4px] h-[20px]">
              <div className="w-[20px] h-[20px] bg-gray-200 rounded animate-pulse" />
              <div className="w-[60px] h-[12px] bg-gray-200 rounded animate-pulse" />
              <div className="w-[1px] h-[12px] bg-[#E0E0E0]"></div>
              <div className="w-[40px] h-[12px] bg-gray-200 rounded animate-pulse" />
              <div className="w-[60px] h-[12px] bg-gray-200 rounded animate-pulse" />
              <div className="w-[1px] h-[12px] bg-[#E0E0E0]"></div>
              <div className="w-[40px] h-[12px] bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
            {/* 비용 정보 스켈레톤 */}
            <div className="flex items-center gap-[4px] h-[20px]">
              <div className="w-[20px] h-[20px] bg-gray-200 rounded animate-pulse" />
              <div className="w-[30px] h-[12px] bg-gray-200 rounded animate-pulse" />
              <div className="w-[1px] h-[12px] bg-[#E0E0E0]"></div>
              <div className="w-[80px] h-[12px] bg-gray-200 rounded animate-pulse" />
              <div className="ml-auto w-[80px] h-[20px] bg-gray-200 rounded-[10px] animate-pulse mr-[4px]" />
            </div>
          </div>
          {/* 버튼 스켈레톤 */}
          <div className="mt-[4px]">
            <div className="w-full h-[22px] bg-gray-200 rounded-[20px] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
