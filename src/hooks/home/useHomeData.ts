import { useQuery } from '@tanstack/react-query';
import { getMainData } from '../../apis/home/homeApi';

export const useHomeData = () => {
  return useQuery({
    queryKey: ['home', 'main'],
    queryFn: getMainData,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
