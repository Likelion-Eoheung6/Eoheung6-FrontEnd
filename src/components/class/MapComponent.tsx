import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface VacantPlace {
  id: number;
  latitude: number;
  longitude: number;
  detailAddress: string;
}

interface MapComponentProps {
  places: VacantPlace[];
  selectedPlaceId: string | null;
  onMarkerClick: (placeId: string) => void;
}

export default function MapComponent({
  places,
  selectedPlaceId,
  onMarkerClick,
}: MapComponentProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 37.5884, lng: 127.0062 });
  const [map, setMap] = useState<kakao.maps.Map>();

  useEffect(() => {
    if (map && selectedPlaceId) {
      const selectedPlace = places.find(
        p => p.id.toString() === selectedPlaceId
      );
      if (selectedPlace) {
        const newCenter = new window.kakao.maps.LatLng(
          selectedPlace.latitude,
          selectedPlace.longitude
        );
        map.panTo(newCenter);
      }
    }
  }, [selectedPlaceId, map, places]);

  return (
    <Map
      center={mapCenter}
      className="w-full h-[300px]"
      level={6}
      onCreate={setMap}
    >
      {places.map(place => (
        <MapMarker
          key={place.id}
          position={{ lat: place.latitude, lng: place.longitude }}
          title={place.detailAddress}
          onClick={() => onMarkerClick(place.id.toString())} // ✅ 3. Tell the parent when a marker is clicked
        />
      ))}
    </Map>
  );
}
