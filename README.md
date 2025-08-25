<div align="center" style="display: flex; align-items: center; gap: 20px;">

<img width="200" height="200" alt="eoheung6-logo" src="https://github.com/user-attachments/assets/2d4810eb-79bc-41fa-ae7d-1351d4fbc56d" />


  <div>
    <h1 style="margin: 0;">이음학당</h1>
    <p style="margin: 4px 0 0;">취미, 배움, 이야기까지 잇는 하루 클래스</p>
  </div>

> **“맞춤형 클래스 예약 및 관리 플랫폼”**  
> **“AI 기반 태그 추천으로 나에게 딱 맞는 클래스를 찾아보세요”**  
> **“간편한 예약 시스템과 안전한 결제로 스트레스 없는 학습 경험”**

</div>

---

## 🎉 서비스 소개

**이음학당**은 성북구를 중심으로 세대 간 소통과 재능 나눔을 위해 운영되는 **원데이 클래스 플랫폼**입니다.  
취미, 배움, 그리고 이야기를 나누는 하루를 통해 지역 커뮤니티를 연결하는 것을 목표로 합니다.

### ✨ 주요 기능
- **클래스 개설 / 신청 / 요청**  
  원하는 주제로 원데이 클래스를 열거나 참여할 수 있습니다.
- **빈집 대여하기**  
  멘토가 자신의 개인 장소를 등록하거나, 성북구의 빈집을 대여하여 클래스를 진행할 수 있습니다.
- **AI 맞춤 추천**  
  사용자가 선택한 선호 태그를 기반으로 AI가 맞춤형 클래스를 추천합니다.
- **쉬움 모드 & 기본 모드**  
  휴대폰 사용이 서툰 어르신들을 위해 UI를 간소화한 쉬움 모드를 제공합니다.


### 📑 서비스 소개 자료

<img width="1080" height="1350" alt="KakaoTalk_Photo_2025-08-25-15-55-14 005" src="https://github.com/user-attachments/assets/93eba493-04a7-453b-bd89-d70ce03778f7" />

<br>

<img width="1080" height="1350" alt="KakaoTalk_Photo_2025-08-25-15-55-11 002" src="https://github.com/user-attachments/assets/86ddeaad-eccb-4284-a24a-584724480361" />

<br>

<img width="1080" height="1350" alt="KakaoTalk_Photo_2025-08-25-15-55-13 004" src="https://github.com/user-attachments/assets/be028d18-a729-4c01-8c32-e2fd569d5c1f" />


---

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) |
| **Framework** | ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) |
| **State Management** | ![Zustand](https://img.shields.io/badge/Zustand-4433ff?logo=react&logoColor=white) |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white) |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) |
| **Deploy** | ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white) |

---

## 📁 프로젝트 폴더 구조

```bash
Eoheung6-FrontEnd/
├── public/
├── src/
│   ├── assets/          # 이미지 및 리소스
│   ├── components/      # 공통 컴포넌트
│   ├── hooks/           # 커스텀 훅
│   ├── layouts/         # 레이아웃 컴포넌트 (Header/Footer 포함)
│   ├── pages/           # 주요 페이지 단위
│   ├── shared/          # 상수, 유틸 함수, 타입
│   ├── stores/          # 전역 상태 관리 (Zustand)
│   ├── styles/          # 전역 스타일
│   └── main.tsx         # 엔트리 포인트
├── .gitignore
├── package.json
└── README.md
```
---


## 🧑‍💻 팀원 소개

| 정예빈 | 원준영 | 김나영 | 이준석 |
|:---:|:---:|:---:|:---:|
| <img src="https://github.com/benniejung.png" width="200"> | <img src="https://github.com/geg222.png" width="200"> | <img src="https://github.com/gimn70009.png" width="200"> | <img src="https://github.com/Joonseok-Lee.png" width="200"> | | [@benniejung](https://github.com/benniejung) | [@khyaejin]([https://github.com/geg222](https://github.com/geg222)) | [@gimn70009](https://github.com/gimn70009) | [@Joonseok-Lee](https://github.com/Joonseok-Lee) | | FE 개발 | FE 개발 | BE 개발 | BE 개발 |
</br>


## 📏 컨벤션
<details>
<summary>Git Convention</summary>

### 🌐 Git Flow
- **main**: 프로젝트가 최종적으로 배포되는 브랜치  
- **develop**: 다음 출시 버전을 개발하는 브랜치  
- **feature**: 기능을 개발하는 브랜치
  
### 📌 Git branch 규칙
> 1. **개인 작업은 꼭 feature 브랜치에서 하기**
> 2. **모든 작업 시작 전 develop에서 pull을 받은 후, feature 브랜치에서 작업 시작**
> 3. **개인 작업 마치면 feature 브랜치로 pull request를 통해 develop에 merge하기**
> 4. **프로젝트 완료 후 main으로 merge**
<br>

### 📝 Feature branch
> 1. **브랜치명은 아래의 형식으로 작성합니다. (feature/이름-기능제목#이슈번호)**
>    - 팀원 benniejung의 브랜치명: `feature/benniejung-login#1`
> 
> 2. **Feature branch -> develop branch로 merge하기 전 PR에서 reviewers 설정하여 팀원 1명 이상에게 approve 받기**
> 
> 3. **PR 후 팀원들에게 공지하기**

### 🎯 Commit Convention
> 1. **커밋 메시지의 형식은 아래처럼 통일해 주세요.**
>    - ✨feat: 로그인 페이지 UI 개발
>
> 3. **깃모지를 사용해 주세요.**
> 
> <li> 🎉 Start: Start New Project [:tada]
> <li> ✨ Feat: 새로운 기능을 추가 [:sparkles]
> <li> 🐛 Fix: 버그 수정 [:bug]
> <li> 🎨 Design: CSS 등 사용자 UI 디자인 변경 [:art]
> <li> ♻️ Refactor: 코드 리팩토링 [:recycle]
> <li> 🔧 Settings: Changing configuration files [:wrench]
> <li> 🗃️ Comment: 필요한 주석 추가 및 변경 [:card_file_box]
> <li> ➕ Dependency/Plugin: Add a dependency/plugin [:heavy_plus_sign]
> <li> 📝 Docs: 문서 수정 [:memo]
> <li> 🔀 Merge: Merge branches [:twisted_rightwards_arrows:]
> <li> 🚀 Deploy: Deploying stuff [:rocket]
> <li> 🚚 Rename: 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 [:truck]
> <li> 🔥 Remove: 파일을 삭제하는 작업만 수행한 경우 [:fire]
> <li> ⏪️ Revert: 전 버전으로 롤백 [:rewind]

<br>




</details>
