import { RootState } from '@reducers/index';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Content() {
  const pgN = document.location.href.split('/')[4];

  const { mainPosts } = useSelector((store: RootState) => store.post);
  let myPosts: any = [...mainPosts].filter((v: any) => v.id === +pgN);

  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring
    myPosts = [...mainPosts].filter((v: any) => v.id === +pgN)[0];
  }, [pgN]);

  return (
    <div className="contents-section">
      <div className="filter-bar" />
      <div className="myContents">
        <div className="myContents_">
          {myPosts
            .slice(0)
            .reverse()
            .map((a: any) => {
              const temp = a.date.split('-');
              const date = `${temp[0]}년 ${temp[1]}월 ${temp[2].split('T')[0]}일`;

              let boardActicle;
              if (a.UserId.toString() === pgN) {
                boardActicle = (
                  <div className="contents-acticle" key={a.id}>
                    {a.image === null || a.image === undefined || a.image === '' ? null : (
                      <Link to={`/detail/${a.id}`}>
                        <div className="acticle-thumbnail">
                          <img src={`http://localhost:8000${a.image}`} alt="/" />
                        </div>
                      </Link>
                    )}
                    <Link to={`/detail/${a.id}`}>
                      <h2>{a.title}</h2>
                    </Link>
                    <p>{a.content}</p>
                    <div className="contents-filter">
                      {a.language.map((L: string, i: number) => {
                        return (
                          <>
                            {/* eslint-disable-next-line react/no-array-index-key */}
                            <p key={i}>{L}</p>
                          </>
                        );
                      })}
                    </div>
                    <div className="time-info">
                      <span>{date}</span>
                      <div className="separator">·</div>
                      <span>{a.comment}개의 댓글</span>
                    </div>
                  </div>
                );
              }

              return boardActicle;
            })}
        </div>
      </div>
    </div>
  );
}
export default Content;
