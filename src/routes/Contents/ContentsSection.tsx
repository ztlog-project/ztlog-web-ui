/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import MarkdownPreview from '@uiw/react-markdown-preview';
import Comments from "./Comments";
import dayjs from 'dayjs';

export default function ContentsSection() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [post, setPost] = useState({
    ctntNo: 0,
    title: '',
    body: '',
    inpDttm: '',
    tags: [] as any[]
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BE_API_URL}/contents/${params.get('no')}`)
      .then((response) => {
        setPost(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="col-md-10 col-lg-8 col-xl-7">
      <div className="article">
        <div className="post-header">
          <h1>{post.title}</h1>
          <hr className="my-4" />
        </div>

        <div className="content-box">
          <br />
          <MarkdownPreview source={post.body} wrapperElement={{ "data-color-mode": "light" }} />
          <br />
        </div>
        <div className="post-footer">
          <p className="meta">
            <FontAwesomeIcon icon={faTags} /> {post.tags.map(function (el: any, idx: number) {
              return <span key={el.tagNo}><Link to={`/tags?tagNo=${el.tagNo}&tagName=${el.tagName}`} className="tag-link">{el.tagName}</Link>{idx < post.tags.length - 1 && ', '}</span>
            })}
          </p>
          <p className="meta">
            <FontAwesomeIcon icon={faCalendarDays} /> {dayjs(post.inpDttm).format('YYYY년 M월 D일 h시 m분')}
          </p>
        </div>
        <hr className="my-4" />
        <div className="giscus">
          <Comments />
        </div>
      </div>
    </div>
  );
}
