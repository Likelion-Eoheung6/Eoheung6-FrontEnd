import React from 'react';
import { useSearchParams } from 'react-router-dom';
import EasyHomePage from './EasyHomePage';
import NormalHomePage from './NormalHomePage';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const version = searchParams.get('version');

  // 버전이 'easy'이면 쉬운 버전, 그 외에는 기본 버전
  if (version === 'easy') {
    return <EasyHomePage />;
  }

  return <NormalHomePage />;
}