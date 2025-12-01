# CaravanShare (카라반쉐어) - 캠핑카 공유 플랫폼

CaravanShare는 누구나 쉽게 캠핑카를 빌리고 빌려줄 수 있는 P2P 공유 플랫폼입니다. 한국 현지에 맞춘 지역 설정과 실제 캠핑카 모델 데이터를 기반으로 생생한 경험을 제공합니다.

## 🚀 주요 업데이트 및 기능

### 1. 한국형 현지화 (Localization)
- **완벽한 한글 지원**: 모든 메뉴와 안내 메시지를 자연스러운 한국어로 제공합니다.
- **국내 지역 기반**: 강원도 강릉, 제주도, 경기도 가평 등 국내 주요 캠핑 명소와 세부 지역(시/군/구) 필터링을 지원합니다.
- **원화(KRW) 결제**: 모든 가격을 원화로 표시하며, 한국적인 가격대(1박 7만원~35만원)를 형성했습니다.

### 2. 다양한 캠핑카 라인업
- **실제 모델 데이터**: 에어스트림, 스타리아 캠퍼, 레이 로디, 티어드롭 트레일러 등 실제 존재하는 인기 모델을 등록했습니다.
- **가성비 모델 추가**: 10만원 이하의 합리적인 가격대인 레이 캠퍼, 미니 트레일러 등을 추가하여 선택의 폭을 넓혔습니다.
- **상세 정보 제공**: 차량의 길이, 타입(모터홈/차박형), 편의시설(태양광/무시동히터 등) 정보를 상세하게 제공합니다.
- **고화질 갤러리**: 차량의 외관뿐만 아니라 내부 인테리어(침실, 주방)까지 확인할 수 있는 갤러리를 제공합니다.

### 3. 사용자 경험 (UX) 개선
- **직관적인 검색**: 가격 범위 슬라이더와 지역/세부지역 드롭다운으로 원하는 캠핑카를 쉽게 찾을 수 있습니다.
- **새로운 디자인**: 신뢰감을 주는 블루 톤의 테마와 직관적인 아이콘 로고를 적용했습니다.
- **상세한 등록 시스템**: 호스트가 차량의 타입, 길이, 옵션 등을 상세하게 등록할 수 있는 폼을 제공합니다.

### 4. 핵심 기능
- **회원가입/로그인**: 게스트와 호스트 모드 지원
- **예약 시스템**: 날짜 선택 및 예약 요청, 호스트의 승인/거절 프로세스
- **결제 시뮬레이션**: 안전한 카드 결제 프로세스 체험 (테스트 모드)
- **본인 인증**: 신분증 업로드 및 인증 배지 시스템

## 🛠 기술 스택 및 환경 (Tech Stack & Environment)

| 구분 (Category) | 기술 (Technology) | 설명 (Description) |
| :--- | :--- | :--- |
| **환경** | Node.js v18+, npm | Runtime & Package Manager |
| **프레임워크** | React v19, Vite v7 | Core Framework & Build Tool |
| **언어** | JavaScript (ES Modules) | Main Language |
| **라우팅** | React Router DOM v7 | Client-side Routing |
| **스타일링** | Tailwind CSS v3.4 | Utility-first CSS Framework |
| **UI 컴포넌트** | Lucide React | Icon Library |
| **유틸리티** | clsx, tailwind-merge, date-fns | Helper Libraries |
| **상태 관리** | React Context API | Global State Management |
| **백엔드** | LocalStorage | Mock Database & Persistence |

## 📂 프로젝트 구조 (Project Structure)

이 프로젝트는 React와 Vite를 사용하여 구축되었습니다. 주요 디렉토리 구조는 다음과 같습니다:

-   `src/`: 소스 코드가 위치하는 메인 디렉토리입니다.
    -   `components/`: 재사용 가능한 UI 컴포넌트들이 위치합니다. (예: `CaravanCard`, `PaymentModal`)
    -   `pages/`: 각 라우트에 해당하는 페이지 컴포넌트들이 위치합니다. (예: `CaravanDetail`, `Dashboard`)
    -   `services/`: 외부 API 호출이나 비즈니스 로직을 처리하는 서비스 파일들이 위치합니다. (예: `authService`)
    -   `hooks/`: 커스텀 React 훅들이 위치합니다.
    -   `utils/`: 유틸리티 함수들이 위치합니다.
-   `public/`: 정적 파일(이미지, 아이콘 등)이 위치합니다.
-   `index.html`: 앱의 진입점 HTML 파일입니다.
-   `package.json`: 프로젝트 의존성 및 스크립트가 정의되어 있습니다.
-   `vite.config.js`: Vite 설정 파일입니다.
-   `tailwind.config.js`: Tailwind CSS 설정 파일입니다.

## ▶️ 실행 방법 (Setup & Run)

이 프로젝트를 로컬 환경에서 실행하려면 다음 단계들을 따르세요.

### 1. 필수 요구사항 (Prerequisites)
- Node.js (버전 18 이상 권장)
- npm (Node.js 설치 시 포함됨)

### 2. 설치 (Installation)
프로젝트 루트 디렉토리에서 다음 명령어를 실행하여 의존성을 설치합니다:
```bash
npm install
```

### 3. 개발 서버 실행 (Development Server)
다음 명령어를 실행하여 개발 서버를 시작합니다:
```bash
npm run dev
```
서버가 실행되면 터미널에 표시된 로컬 주소(보통 [http://localhost:5173](http://localhost:5173))로 브라우저에서 접속하여 앱을 확인할 수 있습니다.

### 4. 빌드 (Build)
배포를 위한 프로덕션 빌드를 생성하려면 다음 명령어를 실행합니다:
```bash
npm run build
```
빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### 5. 린트 (Lint)
코드 스타일 및 잠재적인 오류를 확인하려면 다음 명령어를 실행합니다:
```bash
npm run lint
```

## 🔑 데모 계정

- **게스트 (Guest)**: `guest@test.com` / `password`
- **호스트 (Host)**: `host@test.com` / `password`
