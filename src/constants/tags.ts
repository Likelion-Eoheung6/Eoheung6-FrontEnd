// 백엔드 태그 데이터 매핑 (일반 버전)
export const BACKEND_TAGS = [
  { tagId: 1, genre: "영어 회화" },
  { tagId: 2, genre: "꽃꽂이" },
  { tagId: 3, genre: "도예체험" },
  { tagId: 4, genre: "천연비누만들기" },
  { tagId: 5, genre: "가죽공예" },
  { tagId: 6, genre: "수채화클래스" },
  { tagId: 7, genre: "캘리그라피" },
  { tagId: 8, genre: "사진교실" },
  { tagId: 9, genre: "자수 원데이" },
  { tagId: 10, genre: "인형만들기" },
  { tagId: 11, genre: "목공체험" },
  { tagId: 12, genre: "전통음식배우기" },
  { tagId: 13, genre: "홈베이킹" },
  { tagId: 14, genre: "커피 드립 클래스" },
  { tagId: 15, genre: "김치만들기" },
  { tagId: 16, genre: "머랭체험" },
  { tagId: 17, genre: "시니어레시피공유" },
  { tagId: 18, genre: "한식디저트" },
  { tagId: 19, genre: "브런치" },
  { tagId: 20, genre: "요가명상" },
  { tagId: 21, genre: "생활한방" },
  { tagId: 22, genre: "건강차만들기" },
  { tagId: 23, genre: "영상편집" },
  { tagId: 24, genre: "인스타운영법" },
  { tagId: 25, genre: "AI체험클래스" },
  { tagId: 26, genre: "줌(ZOOM)활용법" },
  { tagId: 27, genre: "피그마(Figma)활용법" },
  { tagId: 28, genre: "미니홈피제작" },
  { tagId: 29, genre: "향수만들기" },
  { tagId: 30, genre: "만다라드로잉" },
  { tagId: 31, genre: "화과자 만들기" },
  { tagId: 32, genre: "생활속법률" },
  { tagId: 33, genre: "자취생활꿀팁" },
  { tagId: 34, genre: "슬기로운장보기" },
  { tagId: 35, genre: "반려식물키우기" },
  { tagId: 36, genre: "스마트뱅킹기초" },
  { tagId: 37, genre: "성북역사알기" },
  { tagId: 38, genre: "영화감상회" },
  { tagId: 39, genre: "컬러테라피" }
];

// 쉬운 버전용 태그들 (백엔드 데이터 매핑)
export const EASY_TAGS = [
  '전자기기 활용',
  '요리', 
  '베이커리', 
  '운동', 
  '건강', 
  '미술', 
  '언어', 
  '만들기', 
  '생활정보'
];

// 태그 이름만 추출 (일반 버전)
export const TAGS = BACKEND_TAGS.map(tag => tag.genre);
