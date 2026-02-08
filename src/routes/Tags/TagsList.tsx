import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Pagination from "react-js-pagination";
import axios from "axios";
import dayjs from 'dayjs';

export default function TagList() {
    const listWraper = {
        padding: "50px", height: "850px"
    }

    const [tags, setTags] = useState<any[]>([]);
    const [selectedTag, setSelectedTag] = useState<any>(null);
    const [ctnt, setCtnt] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BE_API_URL}/tags`)
            .then((response) => {
                setTags(response.data.data);

                const params = new URLSearchParams(location.search);
                const tagNo = params.get('tagNo');
                const tagName = params.get('tagName');
                if (tagNo && tagName) {
                    setSelectedTag({ tagNo: Number(tagNo), tagName });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [location.search]);

    useEffect(() => {
        if (!selectedTag) return;
        setLoading(true);

        axios.get(`${process.env.REACT_APP_BE_API_URL}/tags/${selectedTag.tagNo}?page=${page}`)
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
    }, [selectedTag, page]);

    const handleTagClick = (tag: any) => {
        setSelectedTag(tag);
        setPage(1);
    };

    const handleBack = () => {
        setSelectedTag(null);
        setCtnt([]);
        setPage(1);
    };

    const handlePageChange = (page: any) => {
        setPage(page);
    };

    if (selectedTag) {
        return (
            <div className="col-md-10 col-lg-8 col-xl-7" style={listWraper}>
                <div style={{ padding: "0 0 20px" }}>
                    <button onClick={handleBack} className="btn-back">
                        <FontAwesomeIcon icon={faArrowLeft} /> 태그 목록
                    </button>
                    <h4 style={{ marginTop: "15px" }}>
                        <FontAwesomeIcon icon={faTags} /> {selectedTag.tagName}
                        <span style={{ fontSize: "14px", color: "#868e96", marginLeft: "8px" }}>
                            ({total}건)
                        </span>
                    </h4>
                    <hr className="my-4" />
                </div>
                <div>
                    {loading ? (
                        <div className="spinner-wrap">
                            <div className="spinner" />
                        </div>
                    ) : ctnt.length > 0 ? (
                        ctnt.map((e) => (
                            <div key={e.ctntNo} className="post-preview">
                                <Link to={"/contents?no=" + e.ctntNo}>
                                    <h2 className="post-title">{e.title}</h2>
                                    <h3 className="post-subtitle">{e.subTitle}</h3>
                                </Link>
                                <div className="post-meta">
                                    <p>
                                        <FontAwesomeIcon icon={faTags} /> {e.tags.map(function(tag: any) {
                                            return tag.tagName + ' '
                                        })}
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faCalendarDays} /> {dayjs(e.inpDttm).format('YYYY년 M월 D일 h시 m분')}
                                    </p>
                                </div>
                                <hr className="my-4" />
                            </div>
                        ))
                    ) : (
                        <p>게시물이 없습니다.</p>
                    )}
                </div>
                <div className="d-flex justify-content-center mb-4 pagnation">
                    {!loading && total > 0 && (
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={5}
                            totalItemsCount={Math.max(0, total)}
                            pageRangeDisplayed={5}
                            prevPageText={"‹"}
                            nextPageText={"›"}
                            onChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="col-md-10 col-lg-8 col-xl-7" style={listWraper}>
            <div className="post-meta">
            {tags && tags.map((e) => (
                <span key={e.tagNo} className="tag" onClick={() => handleTagClick(e)} style={{ cursor: "pointer" }}>
                    {e.tagName} <span>{e.count}</span>
                </span>
            ))}
            </div>
        </div>
    );
}
