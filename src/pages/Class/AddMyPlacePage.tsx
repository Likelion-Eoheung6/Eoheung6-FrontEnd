import React, { useMemo, useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import BodyContainer from '../../components/common/BodyContainer';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import ButtonComponent from '../../components/common/ButtonComponent';
import { useMyPlaceStore } from '../../stores/useMyPlaceStore';
import { useNavigate } from 'react-router-dom';
import usePost from '../../hooks/usePost';

export default function AddMyPlacePage() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  // const [address, setAddress] = useState<string>('');
  // const [zipCode, setZipCode] = useState<string>('');
  // const [detailAddress, setDetailAddress] = useState<string>('');
  const { placeData, setMyPlace, updateMyPlaceDetail, clearMyPlace } =
    useMyPlaceStore();
  const { roadAddress, zipCode, detailAddress } = placeData || {};
  const { post, loading, error } = usePost();

  const handleCompletePost = (data: Address) => {
    updateMyPlaceDetail({
      roadAddress: data.address,
      zipCode: data.zonecode,
    });
    setModalOpen(false);
  };

  const isFormComplete = useMemo(() => {
    return !!(
      roadAddress &&
      zipCode &&
      detailAddress &&
      detailAddress.trim() !== ''
    );
  }, [roadAddress, zipCode, detailAddress]);

  const handleRegister = async () => {
    if (isFormComplete) {
      try {
        const response = await post('/classes/mentor-places', {
          roadAddress,
          zipCode,
          detailAddress,
        });

        console.log('Place registered successfully:', response);
        clearMyPlace();
        navigate('/open-class/myplace');
      } catch (err) {
        console.error('Error registering place:', err);
      }
    }
  };
  return (
    <ClassContainer>
      <ClassHeaderBar title="내 장소 등록하기" />
      <BodyContainer>
        <div className="rounded-[1.25rem] box-border p-[12px] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] bg-[#FAFAFA] p-[16px] mb-[100px]">
          <h2 className="text-center text-[14px] font-semibold mb-[10px]">
            내 장소
          </h2>
          <div className="flex mb-[24px]">
            <input
              type="text"
              readOnly
              value={roadAddress}
              className="flex-1 rounded-l-[8px] border-[1px] border-[#ced4da] p-[5px] text-[14px] bg-[#f8f9fa]"
              onClick={() => setModalOpen(true)}
            />
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-r-[8px] bg-[#545454] px-[20px] text-[14px] font-bold text-[white]"
            >
              주소 찾기
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-full max-w-[500px] bg-white p-4 rounded-lg">
                <DaumPostcodeEmbed
                  onComplete={handleCompletePost}
                  autoClose={false}
                />
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-4 w-full rounded-lg bg-gray-200 p-2"
                >
                  닫기
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col rounded-[8px] border-[1px] border-[#E0E0E0]">
            {/* Address */}
            <div className="flex items-center bg-[white] border-b-[1px] border-[#E0E0E0] bg-[#f8f9fa] p-[12px] text-[14px]">
              <span className="w-[80px] flex-shrink-0 font-semibold text-[#868e96]">
                주소
              </span>
              <span className="text-[#B3B3B3]">
                {roadAddress || '주소 찾기를 해주세요.'}
              </span>
            </div>
            {/* Zip Code */}
            <div className="flex items-center bg-[white] border-b-[1px] border-[#E0E0E0] p-[12px] text-[14px]">
              <span className="w-[80px] flex-shrink-0 font-semibold text-[#868e96]">
                우편번호
              </span>
              <span className="text-[#B3B3B3]">
                {zipCode || '주소 찾기를 해주세요.'}
              </span>
            </div>
            {/* Detail Address */}
            <div className="flex items-center bg-[white] p-[12px] text-[14px]">
              <span className="w-[80px] flex-shrink-0 font-semibold text-[#868e96]">
                상세주소
              </span>
              <input
                type="text"
                value={detailAddress || ''}
                onChange={e =>
                  updateMyPlaceDetail({ detailAddress: e.target.value })
                }
                placeholder="상세주소를 기입해주세요."
                className="w-full bg-transparent outline-none placeholder:text-[#B3B3B3] border-none"
              />
            </div>
          </div>
        </div>
        <ButtonComponent
          text="내 장소 등록"
          isActive={isFormComplete}
          onClick={handleRegister}
        />
      </BodyContainer>
    </ClassContainer>
  );
}
