import { useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import BodyContainer from '../../components/common/BodyContainer';

export default function ClassPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // <div className="relative mx-auto max-w-[430px] min-w-[375px] min-h-screen bg-[#FDFDFD]">
    //   <main className="relative w-full h-[calc(100vh-9vh)] overflow-y-auto">
    //     <button
    //       onClick={() => setIsOpen(true)}
    //       className="px-4 py-2 bg-[blue] text-[white] rounded"
    //     >
    //       모달 열기
    //     </button>

    //     {isOpen && (
    //       <div className="absolute inset-0 z-50 w-full h-full flex items-center justify-center">
    //         {/* 검정색 반투명 배경 */}
    //         <div
    //           className="absolute inset-0 bg-[black] w-full h-full"
    //           onClick={() => setIsOpen(false)}
    //         />
    //         {/* 모달 박스 */}
    //         <div className="bg-[white] rounded-lg shadow-lg p-6 z-50 w-[80px] max-w-[90%]">
    //           <p className="text-lg font-semibold mb-4">모달 제목</p>
    //           <p className="mb-4 text-gray-600">
    //             여기에 모달 내용을 넣으세요. 이 영역은 스크롤 없이 중앙에
    //             고정됩니다.
    //           </p>
    //           <button
    //             onClick={() => setIsOpen(false)}
    //             className="px-[4px] py-[2px] bg-[red] text-[white] rounded hover:bg-red-600"
    //           >
    //             닫기
    //           </button>
    //         </div>
    //       </div>
    //     )}
    //   </main>
    // </div>
    <>
      <ClassContainer>
        <BodyContainer>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-[blue] text-[white] rounded"
          >
            모달 열기
          </button>
        </BodyContainer>
      </ClassContainer>
      {isOpen && (
        <div className="absolute inset-0 z-[50] w-full h-full flex items-center justify-center">
          {/* 검정색 반투명 배경 */}
          <div
            className="absolute inset-0 bg-[black] w-full h-full"
            onClick={() => setIsOpen(false)}
          />
          {/* 모달 박스 */}
          <div className="bg-[white] rounded-lg shadow-lg p-6 z-[50] w-[80px] max-w-[90%]">
            <p className="text-lg font-semibold mb-4">모달 제목</p>
            <p className="mb-4 text-gray-600">
              여기에 모달 내용을 넣으세요. 이 영역은 스크롤 없이 중앙에
              고정됩니다.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-[4px] py-[2px] bg-[red] text-[white] rounded hover:bg-red-600"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
