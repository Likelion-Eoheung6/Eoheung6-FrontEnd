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
import { getGovReservation } from '../../apis/create/createApi';

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

export default function RentalPlacePage() {
  const [places, setPlaces] = useState<VacantPlace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { updateReq } = useCreateClassStore();
  const { setReservation } = useGovReservationStore();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await getGovReservation(); // 수정한 API 함수 호출
        if (response.isSuccess) {
          setPlaces(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('장소 목록을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) {
    return <div>장소 목록을 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }
  const handleApply = () => {
    if (!selectedPlaceId) return;

    const selectedPlace = places.find(p => p.id === selectedPlaceId);

    if (selectedPlace) {
      updateReq({ govReservationId: selectedPlaceId });
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
                    id={place.id}
                    name="rental-place-selection"
                    address={`${place.roadAddress} ${place.detailAddress}`}
                    area={`${place.areaUsableSqm}m²`}
                    capacity={place.capacity}
                    imageUrl={place.thumbnail}
                    isSelected={selectedPlaceId === place.id}
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
