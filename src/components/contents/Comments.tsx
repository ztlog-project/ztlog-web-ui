'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'contexts';

export default function Comments() {
  const { theme } = useTheme();

  return (
    <Giscus
      id="comments"
      repo="zoetrope56/devlog-comments"
      repoId="R_kgDOKnxXWg"
      category="General"
      categoryId="DIC_kwDOKnxXWs4Camnw"
      mapping="url"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme === 'dark' ? 'dark' : 'light'}
      lang="ko"
      loading="lazy"
    />
  );
}
