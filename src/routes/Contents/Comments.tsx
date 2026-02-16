import { useEffect, useRef } from 'react';

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const theme = 'light';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;
    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';
    scriptElem.setAttribute('data-repo', 'zoetrope56/devlog-comments');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOKnxXWg');
    scriptElem.setAttribute('data-category', 'General');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOKnxXWs4Camnw');
    scriptElem.setAttribute('data-mapping', 'url');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'bottom');
    scriptElem.setAttribute('data-theme', theme);
    scriptElem.setAttribute('data-lang', 'ko');
    ref.current.appendChild(scriptElem);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme]);

  return <section ref={ref} />;
}

// export default function Comments() {
//     return (
//         <Giscus
//         id='comments'
//         repo="zoetrope56/devlog-comments"
//         repoId="R_kgDOKnxXWg"
//         category="General"
//         categoryId="DIC_kwDOKnxXWs4Camnw"
//         mapping="pathname"
//         term="Welcome to @giscus/react component!"
//         strict="0"
//         reactionsEnabled="1"
//         emitMetadata="0"
//         inputPosition="bottom"
//         theme="light"
//         lang="ko"
//         loading='lazy'
//         />
//     );
// }