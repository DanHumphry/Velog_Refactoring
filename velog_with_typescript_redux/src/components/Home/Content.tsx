import { RootState } from '@reducers/index';
import React, { useEffect, useState } from 'react';
import '@styles/Board.css';
import SideCheckBox from '@components/Home/SideCheckBox';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Content() {
  const { mainPosts, filterList } = useSelector((store: RootState) => store.post);

  const [filterPost, setFilterPost] = useState([...mainPosts]);

  useEffect(() => {
    setFilterPost(
      mainPosts.filter((v: { language: string[] }) => {
        let inc = true;
        [...filterList].forEach((item: string) => {
          if (v.language.indexOf(item) === -1) inc = false;
        });
        if (inc) return v;
        return null;
      }),
    );
  }, [filterList]);

  return (
    <div className="trend-section">
      <main className="trend-main">
        <div className="main-section">
          {filterPost
            .slice(0)
            .reverse()
            .map((a: any) => {
              const Y = a.date.split('-')[0];
              const M = a.date.split('-')[1];
              const D = a.date.split('-')[2].split('T')[0];

              return (
                <div className="article" key={a.id}>
                  {a.image === '' ? null : (
                    <Link to={`/detail/${a.id}`}>
                      <div className="arcticle-img">
                        <img src={a.image} alt="" />
                      </div>
                    </Link>
                  )}
                  <div className="article-content">
                    <Link to={`/detail/${a.id}`}>
                      <h4>{a.title}</h4>
                      <div className="desc-wrapper">
                        <p>{a.content}</p>
                      </div>
                    </Link>
                    <div className="sub-info">
                      <span>{`${Y}년 ${M}월 ${D}일`}</span>
                      <span className="separator">·</span>
                      <span>0개의 댓글</span>
                    </div>
                    <div className="filter-info">
                      {a.language.map((L: string, i: number) => {
                        // eslint-disable-next-line react/no-array-index-key
                        return <p key={i}>{L}</p>;
                      })}
                    </div>
                  </div>
                  <div className="article-footer">
                    <Link to={`/mysite/${a.user_pk}`}>
                      <img src={a.profileImage} alt="" />
                      <span>
                        by <b>{a.username}</b>
                      </span>
                    </Link>
                    <div className="likes">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
                      </svg>
                      {a.like}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
      <SideCheckBox />
    </div>
  );
}
export default Content;
