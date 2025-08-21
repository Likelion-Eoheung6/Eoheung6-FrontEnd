import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTagMutation, useTagRetrieveMutation } from './useTagMutation';
import type { ClassData } from '../../types/tag/tagTypes';

export const useTagSelect = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [classData, setClassData] = useState<ClassData[]>([]);
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: number]: boolean }>({});
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tagMutation = useTagMutation();
  const tagRetrieveMutation = useTagRetrieveMutation();
  
  const isEasyVersion = searchParams.get('version') === 'easy';
  const requiredCount = isEasyVersion ? 1 : 2;

  // 태그 저장 함수
  const handleTagSave = () => {
    
    tagMutation.mutate(
      { tag: selected },
      {
        onSuccess: (saveResponse) => {
          if (saveResponse.isSuccess) {
            if (isEasyVersion) {
              // 쉬운 버전: 태그 저장만 하고 추천 페이지로 이동
              navigate('/recommend', { 
                state: { 
                  selectedTags: selected,
                  savedTags: saveResponse.data 
                } 
              });
            } else {
              // 일반 버전: 클래스 검색 실행
              handleClassSearch(saveResponse.data);
            }
          } else {
            console.error('태그 저장 API 호출 실패:', saveResponse.message);
            if (isEasyVersion) {
              navigate('/recommend', { state: { selectedTags: selected } });
            } else {
              handleClassSearch();
            }
          }
        },
        onError: (saveError: any) => {
          console.error('태그 저장 API 호출 중 오류 발생:', saveError);
          if (saveError.message === '인증 토큰이 없습니다. 로그인이 필요합니다.') {
            navigate('/login');
            return;
          }
          if (isEasyVersion) {
            navigate('/recommend', { state: { selectedTags: selected } });
          } else {
            handleClassSearch();
          }
        }
      }
    );
  };

  // 클래스 검색 함수
  const handleClassSearch = (savedTagsData?: any) => {
    tagRetrieveMutation.mutate(
      { tag: selected },
      {
        onSuccess: (response) => {
          if (response.isSuccess) {
            setClassData(response.data);
            
            const initialLoadingStates: { [key: number]: boolean } = {};
            response.data.forEach(classItem => {
              initialLoadingStates[classItem.openId] = true;
            });
            setImageLoadingStates(initialLoadingStates);
            
            if (isEasyVersion) {
              navigate('/recommend', { 
                state: { 
                  selectedTags: selected, 
                  classData: response.data,
                  savedTags: savedTagsData 
                } 
              });
            } else {
              setIsSheetOpen(true);
            }
          } else {
            console.error('태그 검색 API 호출 실패:', response.message);
            if (isEasyVersion) {
              navigate('/recommend', { state: { selectedTags: selected } });
            } else {
              setIsSheetOpen(true);
            }
          }
        },
        onError: (error) => {
          console.error('태그 검색 API 호출 중 오류 발생:', error);
          if (error.message === '인증 토큰이 없습니다. 로그인이 필요합니다.') {
            navigate('/login');
            return;
          }
          if (isEasyVersion) {
            navigate('/recommend', { state: { selectedTags: selected } });
          } else {
            setIsSheetOpen(true);
          }
        }
      }
    );
  };

  // 다음 버튼 클릭 핸들러
  const handleOpenSheet = async () => {
    if (selected.length >= requiredCount) {
      handleTagSave();
    }
  };

  // 바텀 시트 닫기
  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  // 이미지 로딩 완료
  const handleImageLoadComplete = (openId: number) => {
    setImageLoadingStates(prev => ({ ...prev, [openId]: false }));
  };

  // 모든 이미지가 로드되었는지 확인
  const areAllImagesLoaded = () => {
    if (classData.length === 0) return true;
    return classData.every(classItem => !imageLoadingStates[classItem.openId]);
  };

  // 이미지 로딩 상태를 자동으로 완료 처리 (타임아웃 방식)
  useEffect(() => {
    if (classData.length > 0 && Object.keys(imageLoadingStates).length > 0) {
      const timer = setTimeout(() => {
        const allLoaded = Object.keys(imageLoadingStates).reduce((acc, key) => {
          acc[parseInt(key)] = false;
          return acc;
        }, {} as { [key: number]: boolean });
        setImageLoadingStates(allLoaded);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [classData, imageLoadingStates]);

  return {
    selected,
    setSelected,
    isSheetOpen,
    classData,
    imageLoadingStates,
    isEasyVersion,
    requiredCount,
    handleOpenSheet,
    handleCloseSheet,
    handleImageLoadComplete,
    areAllImagesLoaded,
    navigate
  };
};
