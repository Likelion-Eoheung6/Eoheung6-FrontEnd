export default function ClassCardSkeleton() {
  return (
    <div className="rounded-[16px] relative">
      <div className="flex gap-[5px]">
        {/* 이미지 스켈레톤 */}
        <div className="w-[130px] h-[130px] bg-gray-200 rounded-[20px] animate-pulse" />
        <div className="flex-1">
          {/* 제목 스켈레톤 */}
          <div className="h-[24px] bg-gray-200 rounded-[10px] mb-[4px] animate-pulse" />
          {/* 내용 스켈레톤 */}
          <div className="bg-gray-100 rounded-[10px] p-[8px] space-y-[2px]">
            <div className="h-[12px] bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="h-[12px] bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="h-[12px] bg-gray-200 rounded animate-pulse" />
          </div>
          {/* 태그 스켈레톤 */}
          <div className="mt-[4px] flex gap-[8px]">
            <div className="w-[60px] h-[24px] bg-gray-200 rounded-full animate-pulse" />
            <div className="w-[80px] h-[24px] bg-gray-200 rounded-full animate-pulse" />
            <div className="w-[70px] h-[24px] bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
