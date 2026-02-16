'use client';

/* eslint-disable array-callback-return */
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Pagination = dynamic(() => import('react-js-pagination'), { ssr: false });
import axios from 'axios';
import dayjs from 'dayjs';

export default function ContentsList() {
  const listWraper = {
    height: '1050px',
  };

  const prevewWraper = {
    height: '963.8px',
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || '1');

  const [ctnt, setCtnt] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_BE_API_URL}/contents?page=${page}`)
      .then((response) => {
        const dataObj = response.data?.data || {};
        const list = dataObj?.list || [];
        const totalCount = dataObj?.totalCount || 0;

        setCtnt(list);
        setTotal(totalCount);
        setLoading(false);
      })
      .catch(() => {
        setCtnt([]);
        setTotal(0);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (p: any) => {
    router.push(`/?page=${p}`);
  };

  return (
    <div className="col-md-10 col-lg-8 col-xl-7" style={listWraper}>
      <div style={prevewWraper}>
        {ctnt && ctnt.length > 0 ? (
          ctnt.map((e) => (
            <div key={e.ctntNo} className="post-preview">
              <Link href={`/contents/${e.ctntNo}`}>
                <h2 className="post-title">{e.title}</h2>
                <h3 className="post-subtitle">{e.subTitle}</h3>
              </Link>
              <div className="post-meta">
                <p>
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
                </p>
                <p>
                  <FontAwesomeIcon icon={faCalendarDays} />{' '}
                  {dayjs(e.inpDttm).format('YYYY년 M월 D일 h시 m분')}
                </p>
              </div>
              <hr className="my-4" />
            </div>
          ))
        ) : (
          <div className="spinner-wrap">
            <div className="spinner" />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center mb-4 pagnation">
        {loading ? (
          <> </>
        ) : (
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
