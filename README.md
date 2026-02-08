# ztlog-web-ui

개발 블로그의 프론트엔드 웹 애플리케이션입니다. React와 TypeScript를 기반으로 구축되었으며, 백엔드 REST API와 통신하여 블로그 콘텐츠를 제공합니다.

<br>

### 🛠 기술 스택 (Tech Stack)

| 분류 | 기술 |
|------|------|
| Framework | React 18, TypeScript 4.9 |
| 상태관리 | Redux Toolkit |
| 스타일링 | Tailwind CSS, DaisyUI |
| HTTP 통신 | Axios |
| 마크다운 렌더링 | React Markdown, @uiw/react-markdown-preview |
| 댓글 시스템 | Giscus (GitHub 기반) |
| 라우팅 | React Router DOM 6 |

<br>

### 🚀 주요 기능 (Features)

- **게시글 목록** — 메인 화면에서 게시글 목록 조회 및 페이지네이션
- **게시글 상세** — Markdown 형식의 본문 렌더링 및 댓글 기능
- **태그 필터링** — 태그별 게시글 모아보기 및 브레드크럼 네비게이션
- **반응형 레이아웃** — 모바일/데스크탑 대응 반응형 디자인
- **사이드바** — 블로거 프로필 및 소셜 링크 표시

<br>

### 📂 프로젝트 구조 (Project Structure)

```text
src/
├── contexts/           # 반응형 디자인 및 공통 상태를 위한 Context (WindowResize 등)
├── pages/              # 이미지 자원 및 정적 리소스 관리
├── routes/             # 페이지 단위 컴포넌트 및 라우팅 설정
│   ├── About/          # 자기소개 및 마이페이지
│   ├── Contents/       # 게시글 상세 조회 및 댓글 섹션
│   ├── Home/           # 블로그 메인 화면 및 게시글 목록
│   ├── Layout/         # Header, Footer, SideBar 등 공통 레이아웃
│   ├── Tags/           # 태그별 게시글 모아보기
│   └── RouteSetup.tsx  # 전체 라우팅 경로 정의
├── store/              # Redux 기반 상태 관리 로직
│   ├── copy/           # 복사 기능 관련 상태
│   ├── errorMessage/   # 에러 메시지 처리 상태
│   └── loading/        # 비동기 로딩 상태 관리
├── styles/             # CSS 스타일 파일
├── App.tsx             # 메인 앱 컴포넌트
└── index.tsx           # 앱 진입점
```

<br>

### ⚙️ 실행 방법 (Getting Started)

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build
```

<br>

![js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![js](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![js](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![js](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
