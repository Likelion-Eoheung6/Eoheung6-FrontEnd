import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import EasyHomePage from './EasyHomePage';
import NormalHomePage from './NormalHomePage';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  
  // URL 파라미터에서 버전 확인
  const urlVersion = searchParams.get('version');
  
  // 세션 스토리지에서 사용자 버전 확인
  const sessionVersion = sessionStorage.getItem('userVersion');
  
  // URL 파라미터가 우선, 없으면 세션 스토리지 값 사용
  const version = urlVersion || sessionVersion;

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