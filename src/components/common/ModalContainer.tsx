// ModalContainer.tsx
import type { PropsWithChildren } from 'react';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

export default function ModalContainer({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <div className="absolute inset-[0] z-[9999] flex items-center justify-center w-full bg-[rgba(0,0,0,0.5)]">
      <div
        className="absolute inset-0 w-full h-full bg-opacity-50"
        onClick={onClickToggleModal}
      />
      {/* 모달 콘텐츠 */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-6 max-w-[90%]">
        {children}
      </div>
    </div>
  );
}
