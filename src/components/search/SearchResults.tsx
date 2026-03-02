'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faFolder } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Pagination = dynamic(() => import('react-js-pagination'), { ssr: false });
import axios from 'axios';
import dayjs from 'dayjs';

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'TITLE_CONTENT';
  const param = searchParams.get('param') || '';
  const page = Number(searchParams.get('page') || '1');

  const [ctnt, setCtnt] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!param) return;
    setLoading(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_BE_API_URL}/contents/search`, {
        params: { type, param, page },
      })
      .then((response) => {
        const dataObj = response.data?.data || {};
        setCtnt(dataObj?.list || []);
        setTotal(dataObj?.totalCount || 0);
        setLoading(false);
      })
      .catch(() => {
        setCtnt([]);
        setTotal(0);
        setLoading(false);
      });
  }, [type, param, page]);

  const handlePageChange = (p: number) => {
    router.push(`/search?type=${type}&param=${encodeURIComponent(param)}&page=${p}`);
  };

  return (
    <div className="col-md-10 col-lg-8 col-xl-7" style={{ padding: '50px' }}>
      <div className="tag-breadcrumb">
        <span className="breadcrumb-current">검색: {param}</span>
        {!loading && <span className="breadcrumb-count">{total}</span>}
      </div>
      <hr className="my-4" />
      {loading ? (
        <div className="spinner-wrap">
          <div className="spinner" />
        </div>
      ) : ctnt.length > 0 ? (
        ctnt.map((e) => (
          <div key={e.ctntNo} className="post-preview">
            <Link href={`/contents/${e.ctntNo}`}>
              <h2 className="post-title">{e.title}</h2>
              <h3 className="post-subtitle">{e.subTitle} . . .</h3>
            </Link>
            <div className="post-meta">
              <p>
                {e.category?.cateNm && (
                  <>
                    <FontAwesomeIcon icon={faFolder} />{' '}
                    <Link
                      href={`/categories?cateNo=${e.category.cateNo}&cateName=${encodeURIComponent(e.category.cateNm)}`}
                      className="tag-link"
                    >
                      {e.category.cateNm}
                    </Link>
                    <span style={{ marginRight: '0.75rem' }} />
                  </>
                )}
                {e.tags && e.tags.length > 0 && (
                  <>
                    <FontAwesomeIcon icon={faTags} />{' '}
                    {e.tags.map(function (tag: any, idx: number) {
                      return (
                        <span key={tag.tagNo}>
                          <Link
                            href={`/tags?tagNo=${tag.tagNo}&tagName=${tag.tagName}`}
                            className="tag-link"
                          >
                            {tag.tagName}
                          </Link>
                          {idx < e.tags.length - 1 && ', '}
                        </span>
                      );
                    })}
                  </>
                )}
              </p>
              <p>
                <FontAwesomeIcon icon={faCalendarDays} />{' '}
                {dayjs(e.inpDttm).format('YYYY년 M월 D일 h시 m분')}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
      <div className="d-flex justify-content-center mb-4 pagnation">
        {!loading && total > 0 && (
          <Pagination
            activePage={page}
            itemsCountPerPage={5}
            totalItemsCount={Math.max(0, total)}
            pageRangeDisplayed={5}
            prevPageText={'‹'}
            nextPageText={'›'}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
