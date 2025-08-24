// 쿠키 설정 함수 (암호화된 토큰 저장)
export const setEncryptedCookie = (name: string, value: string, days: number = 7) => {
  // 간단한 Base64 인코딩 (실제 프로덕션에서는 더 강력한 암호화 사용)
  const encodedValue = btoa(value);
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  // 환경에 따른 쿠키 옵션 설정
  const isSecure = window.location.protocol === 'https:';
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  let cookieString = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/`;
  
  // HTTPS 환경에서만 secure 플래그 추가
  if (isSecure) {
    cookieString += ';secure';
  }
  
  // localhost가 아닌 경우에만 SameSite 설정
  if (!isLocalhost) {
    cookieString += ';samesite=lax';
  }
  
  document.cookie = cookieString;
  
  // 디버깅을 위한 로그
  console.log('쿠키 설정:', {
    name,
    value: encodedValue,
    cookieString,
    isSecure,
    isLocalhost,
    currentUrl: window.location.href
  });
};

// 쿠키 읽기 함수 (암호화된 토큰 복호화)
export const getEncryptedCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const encodedValue = c.substring(nameEQ.length, c.length);
      try {
        // Base64 디코딩
        return atob(encodedValue);
      } catch (error) {
        console.error('쿠키 복호화 실패:', error);
        return null;
      }
    }
  }
  return null;
};

// 쿠키 삭제 함수
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// 액세스 토큰 관련 함수들
export const setAccessToken = (token: string) => {
  try {
    setEncryptedCookie('accessToken', token, 1/24); // 1시간 유효 (1/24일)
    
    // 쿠키 저장 확인
    setTimeout(() => {
      const savedToken = getAccessToken();
      if (!savedToken) {
        console.warn('쿠키 저장 실패, localStorage에 저장합니다.');
        localStorage.setItem('accessToken', token);
      }
    }, 50);
  } catch (error) {
    console.error('쿠키 저장 중 오류, localStorage에 저장합니다:', error);
    localStorage.setItem('accessToken', token);
  }
};

export const getAccessToken = (): string | null => {
  // 먼저 쿠키에서 시도
  const cookieToken = getEncryptedCookie('accessToken');
  if (cookieToken) {
    return cookieToken;
  }
  
  // 쿠키에 없으면 localStorage에서 시도
  const localToken = localStorage.getItem('accessToken');
  if (localToken) {
    console.log('쿠키에서 토큰을 찾을 수 없어 localStorage에서 가져왔습니다.');
    return localToken;
  }
  
  return null;
};

export const removeAccessToken = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('accessToken');
};

// 디버깅용 함수들
export const debugCookies = () => {
  console.log('현재 모든 쿠키:', document.cookie);
  console.log('현재 URL:', window.location.href);
  console.log('현재 도메인:', window.location.hostname);
  console.log('현재 프로토콜:', window.location.protocol);
  
  const accessToken = getAccessToken();
  console.log('저장된 액세스 토큰:', accessToken ? '있음' : '없음');
  
  return {
    allCookies: document.cookie,
    currentUrl: window.location.href,
    currentDomain: window.location.hostname,
    currentProtocol: window.location.protocol,
    hasAccessToken: !!accessToken
  };
};

// 쿠키 존재 여부 확인
export const hasCookie = (name: string): boolean => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return true;
    }
  }
  return false;
};
