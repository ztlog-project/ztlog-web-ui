# 마이그레이션: CRA → Next.js 15

## 개요

**Create React App (CRA) + React Router v6**에서 **Next.js 15 App Router**로 마이그레이션.

- **이전**: CRA 스캐폴드, `react-router-dom`, 클라이언트 전용, `package.json`에서 프록시 설정
- **이후**: Next.js 15 App Router, 파일 기반 라우팅, SSR 지원, `next.config.js`에서 프록시 설정

---

## 폴더 구조 변경

### 삭제 (CRA 산출물)

```
src/index.tsx               → Next.js App Router 진입점으로 대체
src/App.tsx                 → src/app/layout.tsx + providers.tsx로 대체
src/routes/                 → src/app/ 파일 기반 라우팅으로 대체
  RouteSetup.tsx
  Layout/Header.tsx
  Layout/Footer.tsx
  Layout/SideBar.tsx
  Home/ContentsList.tsx
  Contents/ContentsSection.tsx
  Contents/Comments.tsx
  Tags/TagsList.tsx
  About/MyPage.tsx
  NoMatch.tsx
public/index.html           → Next.js 내장 HTML 셸로 대체
src/store/copy/             → 데드 코드; rootReducer에 등록된 적 없음
  actions.ts
  index.ts
  reducers.ts
  types.ts
tsconfig.tsbuildinfo        → 빌드 캐시; 자동으로 재생성됨
public/images/logo_1.png    → 미사용
public/images/logo_2.png    → 미사용
public/images/post-sample-image.jpg  → 미사용
```

### 생성 (Next.js 구조)

```
src/app/
  layout.tsx                # 루트 레이아웃: providers, FOUC 스크립트, Bootstrap CDN, 전역 CSS
  providers.tsx             # 'use client' — Redux, Theme, Responsive 프로바이더
  page.tsx                  # 홈 / (ContentsList 렌더링)
  not-found.tsx             # 404 페이지
  about/page.tsx            # /about
  contents/[id]/page.tsx    # /contents/[id] (기존: /contents?no={id})
  tags/page.tsx             # /tags?tagNo=&tagName=
src/components/
  layout/ClientLayout.tsx   # Header + SideBar 동적 임포트 래퍼 (ssr: false)
  layout/Header.tsx         # src/routes/Layout/Header.tsx에서 마이그레이션
  layout/Footer.tsx         # src/routes/Layout/Footer.tsx에서 마이그레이션
  layout/SideBar.tsx        # src/routes/Layout/SideBar.tsx에서 마이그레이션
  home/ContentsList.tsx     # src/routes/Home/ContentsList.tsx에서 마이그레이션
  contents/ContentsSection.tsx  # src/routes/Contents/ContentsSection.tsx에서 마이그레이션
  contents/Comments.tsx     # src/routes/Contents/Comments.tsx에서 마이그레이션
  tags/TagsList.tsx         # src/routes/Tags/TagsList.tsx에서 마이그레이션
  about/MyPage.tsx          # src/routes/About/MyPage.tsx에서 마이그레이션
src/lib/fontawesome.ts      # 아이콘 라이브러리 설정 (컴포넌트 파일에서 분리)
next.config.js              # API 프록시 rewrite 포함 Next.js 설정
next-env.d.ts               # Next.js 자동 생성 타입 정의
```

### 변경 없음

```
src/contexts/               # ThemeContext, ResponsiveContext, hooks — 그대로 유지
src/store/loading/          # Redux 슬라이스 — 그대로 유지
src/store/errorMessage/     # Redux 슬라이스 — 그대로 유지
src/store/useStore.ts       # 단순화됨 (아래 참고)
src/store/rootReducer.tsx
src/store/appState.tsx
src/store/index.ts
src/styles/Styles.css       # 일부 정리됨 (아래 참고)
src/styles/DarkMode.css
public/images/logo.png
public/images/profile.png
public/images/photo.png
```

---

## URL 구조 변경

| 라우트 | 이전 | 이후 |
| --- | --- | --- |
| 홈 | `/` | `/` |
| 블로그 포스트 | `/contents?no={id}` | `/contents/{id}` |
| 소개 | `/about` | `/about` |
| 태그 | `/tags?tagNo=&tagName=` | `/tags?tagNo=&tagName=` (변경 없음) |
| 404 | React Router `<NoMatch>` | `app/not-found.tsx` |

---

## 설정 변경

### `package.json`

**스크립트 교체:**
```json
// 이전 (CRA)
"start": "react-scripts start",
"build": "react-scripts build",
"test":  "react-scripts test"

// 이후 (Next.js)
"dev":   "next dev",
"build": "next build",
"start": "next start"
```

**제거된 의존성:**

| 패키지 | 이유 |
| --- | --- |
| `react-scripts` | CRA 빌드 도구; Next.js로 대체 |
| `react-router-dom` | 클라이언트 라우터; App Router로 대체 |
| `redux-thunk` | `@reduxjs/toolkit`에 기본 포함 |
| `redux-logger` | 개발 전용 도구; 실제로 적용된 적 없음 (빈 미들웨어 배열에 있었음) |
| `web-vitals` | CRA 성능 모니터링; Next.js에서 불필요 |
| `@types/redux-logger` | 제거된 패키지의 타입 |
| `@types/redux-thunk` | 제거된 패키지의 타입 |

**추가된 의존성:**

| 패키지 | 이유 |
| --- | --- |
| `next` ^15.1.6 | Next.js 프레임워크 |

### `next.config.js` (신규)

```js
const path = require('path');

module.exports = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  async rewrites() {
    return [{
      source: '/front/api/v1/:path*',
      destination: 'http://localhost:8086/front/api/v1/:path*',
    }];
  },
};
```

CRA의 `package.json`에 있던 `"proxy"` 필드를 대체 (Next.js에서 미지원).

### `tsconfig.json`

| 필드 | 이전 | 이후 |
| --- | --- | --- |
| `plugins` | — | `[{ "name": "next" }]` |
| `moduleResolution` | `"node"` | `"bundler"` |
| `jsx` | `"react-jsx"` | `"preserve"` |
| `noEmit` | — | `true` |
| `incremental` | `true` | `true` (유지, Next.js가 캐시 관리) |
| `baseUrl` | `"src"` | `"src"` (변경 없음) |

### `.env`

```
# 이전
REACT_APP_BE_API_URL=http://localhost:8086/front/api/v1

# 이후
NEXT_PUBLIC_BE_API_URL=/front/api/v1
```

백엔드 전체 URL은 `next.config.js` rewrites로 이동. 환경 변수는 경로 접두사만 보유.

### `run.sh`

CRA 전용 환경 변수 제거:
```bash
# 제거됨
export REACT_EDITOR=none
export TSC_COMPILE_ON_ERROR=true
export HOST=0.0.0.0
```

---

## 코드 변경

### 라우팅 (`react-router-dom` → `next/navigation`)

| 이전 | 이후 |
| --- | --- |
| `import { Link } from 'react-router-dom'` | `import Link from 'next/link'` |
| `import { useNavigate } from 'react-router-dom'` | `import { useRouter } from 'next/navigation'` |
| `import { useLocation } from 'react-router-dom'` | `import { useSearchParams } from 'next/navigation'` |
| `navigate('/path')` | `router.push('/path')` |
| `navigate(-1)` | `router.back()` |
| `new URLSearchParams(location.search).get('no')` | 동적 세그먼트 `params.id` |

### 블로그 포스트 URL 파라미터

`ContentsSection`에서 기존에는 쿼리스트링으로 포스트 ID를 읽었음:
```ts
// 이전
const no = new URLSearchParams(location.search).get('no');
```

이제 동적 라우트 세그먼트에서 읽음:
```ts
// 이후 — /contents/[id]/page.tsx가 params.id를 전달
const { id } = params;
```

### 이미지

```ts
// 이전 — webpack이 src/pages/images/에서 임포트
import logo from 'pages/images/logo.png';
<img src={logo} />

// 이후 — public/images/의 정적 파일
<img src="/images/logo.png" />
```

이미지를 `src/pages/images/`에서 `public/images/`로 이동.

### 환경 변수 접두사

모든 axios 호출 위치 업데이트:
```ts
// 이전
process.env.REACT_APP_BE_API_URL

// 이후
process.env.NEXT_PUBLIC_BE_API_URL
```

### Redux 스토어 (`src/store/useStore.ts`)

사용되지 않는 미들웨어 설정 제거:
```ts
// 이전 — middleware 배열이 빈 배열로 하드코딩되어 logger/thunk가 실제로 적용되지 않았음
import logger from 'redux-logger';
import thunk from 'redux-thunk';
const store = configureStore({
  reducer: rootReducer,
  middleware: [],   // 데드 코드
});

// 이후 — RTK 기본 미들웨어 사용 (thunk 포함)
const store = configureStore({ reducer: rootReducer });
```

### 프로바이더 (`src/App.tsx` → `src/app/providers.tsx` + `src/app/layout.tsx`)

```tsx
// 이전 (App.tsx)
<ReduxProvider store={store}>
  <ThemeProvider>
    <ResponsiveProvider>
      <BrowserRouter>
        <RouteSetup />
      </BrowserRouter>
    </ResponsiveProvider>
  </ThemeProvider>
</ReduxProvider>

// 이후 (providers.tsx — 'use client')
<ReduxProvider store={store}>
  <ThemeProvider>
    <ResponsiveProvider>
      {children}
    </ResponsiveProvider>
  </ThemeProvider>
</ReduxProvider>
```

`BrowserRouter` 제거 — Next.js App Router가 내비게이션을 처리.

### FOUC 방지

`public/index.html` 인라인 스크립트에서 `src/app/layout.tsx`로 이동:
```tsx
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    const theme = localStorage.getItem('ztlog-theme-preference') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  })();
`}} />
```

### CSS (`src/styles/Styles.css`)

Tailwind 디렉티브 제거 (PostCSS/Tailwind 설정이 설치되지 않았음):
```css
/* 제거됨 */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## SSR 호환성 수정

| 문제 | 해결 방법 |
| --- | --- |
| FontAwesome 6.x가 SSR/정적 프리렌더 중 충돌 | `ClientLayout.tsx`에서 Header + SideBar를 `dynamic(..., { ssr: false })`로 래핑 |
| `react-js-pagination` SSR 비호환 | ContentsList와 TagsList에서 `dynamic(() => import('react-js-pagination'), { ssr: false })` 적용 |
| `useLocalStorage`가 `window`에 접근 | `typeof window === 'undefined'` 가드 추가 |
| `useWindowResize`가 `window`에 `addEventListener` 호출 | `useEventListener(typeof window !== 'undefined' ? window : null, ...)` 로 변경 |
| `useSearchParams()`에 Suspense 경계 필요 | `tags/page.tsx`에서 `<TagsList>`를 `<Suspense>`로 래핑 |

---

## 빌드 결과

마이그레이션 후 `next build` 생성 결과:

| 라우트 | 타입 |
| --- | --- |
| `/` | 정적 |
| `/about` | 정적 |
| `/tags` | 정적 |
| `/not-found` | 정적 |
| `/contents/[id]` | 동적 (요청 시 SSR) |
