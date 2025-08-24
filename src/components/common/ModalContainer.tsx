import type { PropsWithChildren } from 'react';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

export default function ModalContainer({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    // 1. 가장 바깥 배경 div에 모달을 닫는 함수를 연결합니다.
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      onClick={onClickToggleModal} // <--- 이 부분이 중요합니다.
    >
      {/* 2. 실제 콘텐츠 영역(흰색 박스)에서는 이벤트 전파를 막습니다. */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-lg p-6 max-w-[90%]"
        onClick={e => e.stopPropagation()} // <--- 이 부분이 중요합니다.
      >
        {children}
      </div>
    </div>
  );
}
