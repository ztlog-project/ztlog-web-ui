'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faFolder, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SideBar() {
  const [categories, setCategories] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const router = useRouter();

  const toggleExpand = (cateNo: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(cateNo) ? next.delete(cateNo) : next.add(cateNo);
      return next;
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BE_API_URL}/categories`)
      .then((response) => {
        const data: any[] = response.data.data || [];
        const unique = data.filter((c, i, arr) => arr.findIndex((x) => x.cateNo === c.cateNo) === i);
        setCategories(unique);
      })
      .catch(() => {});
  }, []);

  return (
    <aside className="sidebar col-lg-2 col-xl-2">
      <div className="author_profile">
        <div className="author__avatar">
          <Image src="/images/profile.png" alt="profile" width={120} height={120} />
        </div>
        <div className="author__content">
          <div className="author__name" style={{ margin: 'auto' }}>
            <div className="line">
              <label>
                <span>zoetrope</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="author__urls-wrapper">
        <ul className="author__urls social-icons">
          <li>
            <Link href="#" id="location" data-tooltip-text="Suwon, Republic of Korea">
              <FontAwesomeIcon icon={faLocationDot} />
              <span> Republic of Korea</span>
            </Link>
          </li>
          <li>
            <a
              href="mailto:chldpwl5620@gmail.com"
              target="_blank"
              rel="noreferrer"
              id="envelope"
              data-tooltip-text="chldpwl5620@gmail.com"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span> Email</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/zoetrope56"
              target="_blank"
              rel="noreferrer"
              id="github"
              data-tooltip-text="github.com/zoetrope56"
            >
              <FontAwesomeIcon icon={faGithub} />
              <span> GitHub</span>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/tromm_dev"
              target="_blank"
              rel="noreferrer"
              id="twitter"
              data-tooltip-text="twitter.com/tromm_dev"
            >
              <FontAwesomeIcon icon={faTwitter} />
              <span> Twitter</span>
            </a>
          </li>
        </ul>
      </div>
      {categories.length > 0 && (
        <div className="author__urls-wrapper" style={{ marginTop: '1rem' }}>
          <hr />
          <ul className="author__urls social-icons">
            <li>
              <Link href="/">
                <FontAwesomeIcon icon={faHouse} />
                <span> HOME</span>
              </Link>
            </li>
            {categories.map((cate, idx) => (
              <React.Fragment key={`${cate.cateNo}-${idx}`}>
                <li>
                  {cate.categories && cate.categories.length > 0 ? (
                    <span
                      onClick={() => {
                        toggleExpand(cate.cateNo);
                        router.push(`/categories?cateNo=${cate.cateNo}&cateName=${encodeURIComponent(cate.cateNm)}`);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon icon={faFolder} />
                      <span> {cate.cateNm} {expanded.has(cate.cateNo) ? '▾' : '▸'}</span>
                    </span>
                  ) : (
                    <Link href={`/categories?cateNo=${cate.cateNo}&cateName=${encodeURIComponent(cate.cateNm)}`}>
                      <FontAwesomeIcon icon={faFolder} />
                      <span> {cate.cateNm}</span>
                    </Link>
                  )}
                </li>
                {expanded.has(cate.cateNo) && cate.categories && cate.categories.map((sub: any) => (
                  <li key={sub.cateNo} style={{ paddingLeft: '1.2rem' }}>
                    <Link href={`/categories?cateNo=${sub.cateNo}&cateName=${encodeURIComponent(sub.cateNm)}`}>
                      <span>└ {sub.cateNm}</span>
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
