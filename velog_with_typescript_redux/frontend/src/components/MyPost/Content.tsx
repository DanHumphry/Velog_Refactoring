import { RootState } from '@reducers/index';
import { LOAD_POST_REQUEST } from '@thunks/post';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Content() {
  const dispatch = useDispatch();
  const history = useHistory();
  const pgN = +document.location.href.split('/')[4];

  const { mainPosts } = useSelector((store: RootState) => store.post);
  let myPosts: any = [...mainPosts].filter((v: any) => v.UserId === pgN);

  const loadPost = async (id: string) => {
    await dispatch(LOAD_POST_REQUEST(id));
    await history.push(`/detail/${id}`);
  };

  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring
    myPosts = [...mainPosts].filter((v: any) => v.UserId === pgN);
  }, [pgN]);

  return (
    <div className="contents-section">
      <div className="filter-bar" />
      <div className="myContents">
        <div className="myContents_">
          {myPosts.map((a: any) => {
            const temp = a.createdAt.split('-');
            const date = `${temp[0]}년 ${temp[1]}월 ${temp[2].split('T')[0]}일`;

            return (
              <div className="contents-article" key={a.id}>
                {a.image === null || a.image === undefined || a.image === '' ? null : (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                  <div onClick={() => loadPost(a.id)}>
                    <div className="article-thumbnail">
                      <img src={a.image} alt="/" />
                    </div>
                  </div>
                )}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div onClick={() => loadPost(a.id)}>
                  <h2>{a.title}</h2>
                </div>
                <p>{a.content}</p>
                <div className="contents-filter">
                  {a.language.split(',').map((L: string, i: number) => {
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
          })}
        </div>
      </div>
    </div>
  );
}
export default Content;
