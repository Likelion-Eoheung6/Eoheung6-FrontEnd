import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMainData } from '../../apis/home/homeApi';

export const useHomeData = () => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['home', 'main'],
    queryFn: getMainData,
    staleTime: 0, // 항상 최신 데이터를 가져오도록 설정
    gcTime: 5 * 60 * 1000, // 5분
    refetchOnMount: true, // 컴포넌트 마운트 시 항상 다시 불러오기
    refetchOnWindowFocus: true, // 윈도우 포커스 시 다시 불러오기
  });

  const invalidateHomeData = () => {
    queryClient.invalidateQueries({ queryKey: ['home', 'main'] });
  };

  return {
    ...query,
    invalidateHomeData,
  };
};
