import { useQuery } from '@tanstack/react-query';
import { getReservedClasses } from '../../apis/mypage/mypageApi';

interface UseReservedClassesOptions {
  enabled?: boolean;
}

export const useReservedClasses = (options: UseReservedClassesOptions = {}) => {
  return useQuery({
    queryKey: ['mypage', 'reservedClasses'],
    queryFn: getReservedClasses,
    enabled: options.enabled ?? true,
  });
};
