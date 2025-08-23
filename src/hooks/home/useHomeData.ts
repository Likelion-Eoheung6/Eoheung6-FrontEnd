import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMainData } from '../../apis/home/homeApi';

export const useHomeData = () => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['home', 'main'],
    queryFn: getMainData,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });

  const invalidateHomeData = () => {
    queryClient.invalidateQueries({ queryKey: ['home', 'main'] });
  };

  return {
    ...query,
    invalidateHomeData,
  };
};
