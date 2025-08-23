import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from '../../apis/mypage/mypageApi';

interface CreateReviewParams {
  classId: string;
  score: number;
}

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, score }: CreateReviewParams) => createReview(classId, score),
    onSuccess: () => {
      // 리뷰 작성 성공 시 수강한 클래스 목록을 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ['mypage', 'takenClasses'] });
    },
  });
};
