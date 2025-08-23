import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../../apis/mypage/mypageApi';
import type { UpdateProfileRequest } from '../../types/mypage/mypageTypes';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, imageFile }: { data: UpdateProfileRequest; imageFile?: File }) =>
      updateProfile(data, imageFile),
    onSuccess: () => {
      // 프로필 수정 성공 시 마이페이지 데이터를 다시 가져옴
      queryClient.invalidateQueries({ queryKey: ['mypage', 'data'] });
    },
  });
};
