'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RightSideBar() {
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BE_API_URL}/tags`)
      .then((response) => {
        setTags(response.data.data || []);
      })
      .catch(() => {});
  }, []);

  return (
    <aside className="sidebar col-lg-2 col-xl-2 d-none d-lg-block">
      <div style={{ borderLeft: '1.5px solid var(--bs-gray-400)', paddingLeft: '0.75rem' }}>
        <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', textAlign: 'left', fontWeight: 700, fontFamily: '"Gothic A1", -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif', color: 'var(--bs-gray-600)' }}>Trending Topics</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {tags.map((tag) => (
          <Link
            key={tag.tagNo}
            href={`/tags?tagNo=${tag.tagNo}&tagName=${encodeURIComponent(tag.tagName)}`}
            className="sidebar-tag"
            style={{
              border: '1px solid #6c757d',
              borderRadius: '12px',
              padding: '2px 10px',
              fontSize: '0.75rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              color: 'var(--bs-body-color)',
            }}
          >
            {tag.tagName}
          </Link>
        ))}
        </div>
      </div>
    </aside>
  );
}
