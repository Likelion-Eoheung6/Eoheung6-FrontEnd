import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import EasyHomePage from './EasyHomePage';
import NormalHomePage from './NormalHomePage';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const version = searchParams.get('version');
  const queryClient = useQueryClient();

  // 홈으로 돌아올 때 캐시 무효화
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['home', 'main'] });
  }, [queryClient]);

  // 버전이 'easy'이면 쉬운 버전, 그 외에는 기본 버전
  if (version === 'easy') {
    return <EasyHomePage />;
  }

  return <NormalHomePage />;
}