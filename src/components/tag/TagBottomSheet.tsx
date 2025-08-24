import React from 'react';
import ClassCard from '../common/ClassCard';
import ClassCardSkeleton from '../common/ClassCardSkeleton';
import type { ClassData } from '../../types/tag/tagTypes';

interface TagBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassData[];
  areAllImagesLoaded: boolean;
  onImageLoad: (openId: number) => void;
  onClassClick?: (classId: number) => void;
}

export default function TagBottomSheet({
  isOpen,
  onClose,
  classData,
  areAllImagesLoaded,
  onImageLoad,
  onClassClick
}: TagBottomSheetProps) {
  return (
    <div className={`fixed inset-0 z-30 transition-all duration-500 ease-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-500 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className={`w-full max-w-[430px] h-[76vh] max-h-[700px] rounded-t-[20px] bg-[#FDFDFD] shadow-[0_-4px_16px_rgba(0,0,0,0.1)] transform transition-all duration-500 ease-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <div className="pt-[12px] px-[16px]">
            <div className="mx-auto h-[4px] w-[120px] rounded-full bg-[#C7C7C7]" />
            <div className="flex justify-center">
              <div className="mt-[35px]">
                <div className="inline-flex items-center rounded-[20px] bg-[#009DFF] px-[14px] py-[8px] shadow-[0_4px_4px_2px_rgba(0,0,0,0.04)]">
                  <span className="text-white text-[14px] font-semibold tracking-[-0.01em] whitespace-nowrap">
                    "선택하신 태그에 딱 맞는 클래스를 모아봤어요!"
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[20px] px-[16px] pb-[45px] space-y-[18px] max-h-[60vh] overflow-y-auto">
            {classData.length > 0 ? (
              areAllImagesLoaded ? (
                classData.map((classItem, index) => (
                  <ClassCard
                    key={classItem.openId}
                    title={classItem.title}
                    location={classItem.roadAddress}
                    maxParticipants={classItem.capacity}
                    currentParticipants={classItem.count}
                    price={classItem.price}
                    tags={classItem.moodTagsJson}
                    imageUrl={classItem.image}
                    isRecommended={index < 2}
                    onImageLoad={() => onImageLoad(classItem.openId)}
                    onImageError={() => onImageLoad(classItem.openId)}
                    onClick={() => onClassClick?.(classItem.openId)}
                  />
                ))
              ) : (
                classData.map((classItem) => (
                  <ClassCardSkeleton key={classItem.openId} />
                ))
              )
            ) : (
              <div className="text-center py-8 text-gray-500">
                선택하신 태그에 맞는 클래스가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
