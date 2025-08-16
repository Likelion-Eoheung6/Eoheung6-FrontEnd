import React, { useEffect, useRef, useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import BodyContainer from '../../components/common/BodyContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import { useCreateClassStore } from '../../stores/useCreateClassStore';
import PlaceInfoCardComponent from '../../components/class/PlaceInfoCardComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useGovReservationStore } from '../../stores/useGovReservationStore';
import MapComponent from '../../components/class/MapComponent';

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
      roadAddress: '서울특별시 성북구 삼선교로 12',
      zipCode: '02860',
      detailAddress: '한성대입구역 근처 스터디룸',
      latitude: 37.5884, // 한성대입구역 위도
      longitude: 127.0062, // 한성대입구역 경도
      areaTotalSqm: 20.0,
      areaUsableSqm: 18.5,
      capacity: 8,
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
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDNV6qvX4bnZsZOK6qecyf43eI_bRxK2-qMg&s',
    },
    {
      id: 9,
      roadAddress: '서울특별시 강남구 역삼동 123-4',
      zipCode: '06123',
      detailAddress: '강남 아지트',
      latitude: 37.501,
      longitude: 127.036,
      areaTotalSqm: 25.0,
      areaUsableSqm: 22.0,
      capacity: 10,
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDNV6qvX4bnZsZOK6qecyf43eI_bRxK2-qMg&s',
    },
    {
      id: 10,
      roadAddress: '서울특별시 강남구 역삼동 123-4',
      zipCode: '06123',
      detailAddress: '강남 아지트',
      latitude: 37.501,
      longitude: 127.036,
      areaTotalSqm: 25.0,
      areaUsableSqm: 22.0,
      capacity: 10,
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDNV6qvX4bnZsZOK6qecyf43eI_bRxK2-qMg&s',
    },
    {
      id: 11,
      roadAddress: '서울특별시 강남구 역삼동 123-4',
      zipCode: '06123',
      detailAddress: '강남 아지트',
      latitude: 37.501,
      longitude: 127.036,
      areaTotalSqm: 25.0,
      areaUsableSqm: 22.0,
      capacity: 10,
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDNV6qvX4bnZsZOK6qecyf43eI_bRxK2-qMg&s',
    },
  ],
};

export default function RentalPlacePage() {
  const [places, setPlaces] = useState<VacantPlace[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { updateReq } = useCreateClassStore();
  const { setReservation } = useGovReservationStore();

  useEffect(() => {
    setPlaces(sampleApiData.data);
  }, []);

  const handleApply = () => {
    if (!selectedPlaceId) return;

    const selectedPlace = places.find(p => p.id.toString() === selectedPlaceId);

    if (selectedPlace) {
      updateReq({ govReservationId: selectedPlace.id });
      setReservation({
        placeId: selectedPlace.id,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      });
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
          <MapComponent
            places={places}
            selectedPlaceId={selectedPlaceId}
            onMarkerClick={setSelectedPlaceId}
          />
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
                    id={place.id.toString()}
                    name="rental-place-selection"
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
