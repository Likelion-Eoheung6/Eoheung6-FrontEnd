// 쿠키 설정 함수 (암호화된 토큰 저장)
export const setEncryptedCookie = (name: string, value: string, days: number = 7) => {
  // 간단한 Base64 인코딩 (실제 프로덕션에서는 더 강력한 암호화 사용)
  const encodedValue = btoa(value);
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  document.cookie = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
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
  setEncryptedCookie('accessToken', token, 1/24); // 1시간 유효 (1/24일)
};

export const getAccessToken = (): string | null => {
  return getEncryptedCookie('accessToken');
};

export const removeAccessToken = () => {
  deleteCookie('accessToken');
};
