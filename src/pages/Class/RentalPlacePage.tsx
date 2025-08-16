import React, { useEffect, useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import BodyContainer from '../../components/common/BodyContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import { useCreateClassStore } from '../../stores/useCreateClassStore';
import PlaceInfoCardComponent from '../../components/class/PlaceInfoCardComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import { useNavigate } from 'react-router-dom';

interface VacantPlace {
  id: number;
  roadAddress: string;
  zipCode: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  areaTotalSqm: number;
  areaUsableSqm: number;
  capacity: number;
  thumbnail: string;
}
// dummy
const sampleApiData = {
  data: [
    {
      id: 7,
      roadAddress: '서울특별시 성북구 월곡동 85-5',
      zipCode: '02800',
      detailAddress: '월곡동 도서관',
      latitude: 37.606,
      longitude: 127.0615,
      areaTotalSqm: 17.0,
      areaUsableSqm: 17.0,
      capacity: 7,
      thumbnail:
        'https://lh6.googleusercontent.com/proxy/eZB4ridglUytmGNKEJdMXBG3vxPIABxHPorn3S2NImWk4VgDmiNNt6gDbwJGlFMnHCRyCojGQRFqXaQZZtUcV03ztwWpjTFnnvEvN2zlEAE',
    },
    {
      id: 8,
      roadAddress: '서울특별시 강남구 역삼동 123-4',
      zipCode: '06123',
      detailAddress: '강남 아지트',
      latitude: 37.501,
      longitude: 127.036,
      areaTotalSqm: 25.0,
      areaUsableSqm: 22.0,
      capacity: 10,
      thumbnail: 'https://...',
    },
  ],
};

export default function RentalPlacePage() {
  const [places, setPlaces] = useState<VacantPlace[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { updateReq } = useCreateClassStore(); // Get update function from store

  useEffect(() => {
    setPlaces(sampleApiData.data);
  }, []);
  const handleApply = () => {
    if (!selectedPlaceId) return; // Guard clause

    // Find the full place object from the ID
    const selectedPlace = places.find(p => p.id.toString() === selectedPlaceId);

    if (selectedPlace) {
      updateReq({ placeId: selectedPlace.id });
      navigate(`/open-class/rent/${selectedPlaceId}`, {
        state: {
          thumbnail: selectedPlace.thumbnail,
        },
      });
    }
  };
  return (
    <ClassContainer>
      <ClassHeaderBar title="빈집 대여하기" />
      <BodyContainer>
        <div className="flex flex-col gap-[30px]">
          {/* 지도 */}
          <div className="w-full h-[300px] bg-[red] "></div>
          {/* 빈집 리스트 */}
          <div
            className={`w-full rounded-[1.25rem] box-border p-[12px] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]`}
          >
            <div className="flex flex-col">
              <span className="w-fit px-[14px] py-[6px] text-[12px] rounded-full bg-[#009DFF] text-[white] font-semibold mb-[14px]">
                내 주변 빈집 확인하기
              </span>
              <div className="flex flex-col gap-[11px]">
                {places.map(place => (
                  <PlaceInfoCardComponent
                    key={place.id}
                    id={place.id.toString()} // id는 문자열이어야 합니다.
                    name="rental-place-selection" // 라디오 그룹 이름
                    address={`${place.roadAddress} ${place.detailAddress}`}
                    area={`${place.areaUsableSqm}m²`}
                    capacity={place.capacity}
                    imageUrl={place.thumbnail}
                    isSelected={selectedPlaceId === place.id.toString()}
                    onSelect={setSelectedPlaceId}
                  />
                ))}
              </div>
            </div>
          </div>
          <ButtonComponent
            text="빈집 신청하기"
            isActive={!!selectedPlaceId}
            onClick={handleApply}
          />
        </div>
      </BodyContainer>
    </ClassContainer>
  );
}
