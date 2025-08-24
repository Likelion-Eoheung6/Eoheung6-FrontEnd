import { useEffect, useMemo, useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import BodyContainer from '../../components/common/BodyContainer';
import ImageSwiperComponent from '../../components/class/ImageSwiperComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import { useCreateClassStore } from '../../stores/useCreateClassStore';
import { useNavigate } from 'react-router-dom';
import type { ClassRequest } from '../../types/request/requestTypes';
import { requestClass } from '../../apis/request/requestApi';
import RequestCompleteIcon from '../../assets/loading/loadigin-1.svg';
import ModalContainer from '../../components/common/ModalContainer';
import LoadingScreen from '../../components/common/LoadingScreen';

export interface CreateClassPayload {
  infoId: number | null;
  title: string;
  content: string;
  mentorPlaceId: number | null;
  govReservationId: number;
  openAt: string;
  startTime: string;
  endTime: string;
  capacity: number;
  price: number;
  tags: string[];
}

export default function RequestClassPage() {
  const navigate = useNavigate();
  const { req, images, updateReq, setImages, resetStore } =
    useCreateClassStore();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달
  const [isLoading, setIsLoading] = useState(false);

  // 클래스 사진
  const imageUrls = useMemo(() => {
    return images.map(file => URL.createObjectURL(file));
  }, [images]);
  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const slides = [
    ...imageUrls,
    ...Array(Math.max(0, 5 - imageUrls.length)).fill(null),
  ];

  const isFormComplete = useMemo(() => {
    return (
      images.length > 0 && req.title.trim() !== '' && req.content.trim() !== ''
    );
  }, [req, images]);

  const handleSubmit = async () => {
    if (!isFormComplete || isLoading) {
      return <LoadingScreen />;
    }
    setIsModalOpen(true); // 모달 열기

    // 1. API 함수에 전달할 요청 데이터를 준비합니다.
    const requestData: ClassRequest = {
      title: req.title,
      content: req.content,
    };

    try {
      // 2. 새로 만든 API 함수를 호출합니다.
      const response = await requestClass(requestData, images);

      if (response.isSuccess) {
        // 성공 시, 응답으로 받은 title과 content로 스토어를 업데이트 할 수 있습니다.
        console.log('클래스 요청 성공: ', response);
        updateReq({
          title: response.data.title,
          content: response.data.content,
        });
        resetStore(); // 스토어 초기화
      } else {
        // API 자체는 성공했지만, isSuccess가 false인 경우
        alert(`클래스 요청에 실패했습니다: ${response.message}`);
      }
    } catch (err) {
      // 네트워크 오류 등 API 호출 자체가 실패한 경우
      console.error('Submission failed:', err);
      alert('클래스 요청 중 오류가 발생했습니다.');
    }
  };

  const closeModalAndReset = () => {
    setIsModalOpen(false);
  };
  const handleSuccessConfirm = () => {
    resetStore(); // 스토어 초기화
    navigate('/'); // 홈으로 이동
  };
  useEffect(() => {
    resetStore();
  }, []);
  return (
    <>
      <ClassContainer>
        <ClassHeaderBar title="클래스 요청하기" />

        <BodyContainer>
          {/* 사진 등록/수정하기 */}
          <ImageSwiperComponent
            slides={slides}
            images={images}
            setImageFiles={setImages}
          />
          {/* 클래스 제목 */}
          <div
            className={`h-[50px] rounded-[1.25rem] box-border px-[12px] flex items-center shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] my-[20px] `}
          >
            <div
              className="flex-shrink-0  
          whitespace-nowrap           
          rounded-full bg-[#009DFF] text-white font-semibold shadow
          mr-3                       
          text-[12px] py-1.5 px-3.5
          md:text-sm md:py-2 md:px-4 "
            >
              클래스 제목
            </div>
            <input
              value={req.title}
              onChange={e => updateReq({ title: e.target.value })}
              placeholder="클래스 제목을 적어주세요."
              className="bg-transparent outline-none border-0 placeholder:text-[#B3B3B3] text-gray-500 px-1 py-2"
            />
          </div>
          {/* 클래스 소개 */}
          <div
            className={`w-full rounded-[1.25rem] box-border p-[12px]   shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]`}
          >
            <div className="flex flex-col">
              <span className="w-fit px-[14px] py-[6px] text-[12px] rounded-full bg-[#009DFF] text-[white] font-semibold mb-[5px]">
                클래스 소개
              </span>
              <textarea
                value={req.content}
                onChange={e => updateReq({ content: e.target.value })}
                placeholder="클래스 내용을 적어주세요."
                rows={5}
                className="w-full bg-transparent outline-none border-0 placeholder:text-[#B3B3B3] text-gray-600 px-1 py-2 resize-none"
              />
            </div>
          </div>
          <ButtonComponent
            text={'클래스 요청하기'}
            isActive={isFormComplete}
            onClick={handleSubmit}
          />
        </BodyContainer>
      </ClassContainer>
      {isModalOpen && (
        <ModalContainer onClickToggleModal={closeModalAndReset}>
          <div className="p-8 text-center bg-white rounded-2xl border-1 border-[#E0E0E0] max-w-xs w-full mb-[23px]">
            <h2 className="text-2xl font-bold text-[#009DFF] mb-4">
              클래스 요청 완료!
            </h2>
            <img src={RequestCompleteIcon} />
            <p className="text-gray-700 mb-8">
              클래스 개설 시 알림을 보내드릴게요!
            </p>
          </div>
          <ButtonComponent text="홈으로 이동" onClick={handleSuccessConfirm} />
        </ModalContainer>
      )}
    </>
  );
}
