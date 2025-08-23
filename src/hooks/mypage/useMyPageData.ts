import { useQuery } from '@tanstack/react-query';
import { getMyPageData } from '../../apis/mypage/mypageApi';

export const useMyPageData = () => {
  return useQuery({
    queryKey: ['mypage', 'data'],
    queryFn: getMyPageData,
  });
};
