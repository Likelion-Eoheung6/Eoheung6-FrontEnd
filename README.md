## ✨ Git Convention ✨ 

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
> 2. **PR 후 팀원들에게 공지하기**

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
