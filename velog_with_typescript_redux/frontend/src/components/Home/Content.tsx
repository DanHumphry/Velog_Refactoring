import { RootState } from '@reducers/index';
import { LOAD_POST_REQUEST } from '@thunks/post';
import React, { useEffect, useState } from 'react';
import '@styles/Board.css';
import SideCheckBox from '@components/Home/SideCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function Content() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { mainPosts, filterList } = useSelector((store: RootState) => store.post);
  const [filterPost, setFilterPost] = useState<any[]>([...mainPosts]);

  useEffect(() => {
    setFilterPost(
      [...mainPosts].filter((v: { language: string }) => {
        let inc = true;
        [...filterList].forEach((item: string) => {
          if (v.language.split(',').indexOf(item) === -1) inc = false;
        });
        if (inc) return v;
        return null;
      }),
    );
  }, [mainPosts, filterList]);

  const loadPost = async (id: string) => {
    await dispatch(LOAD_POST_REQUEST(id));
    history.push(`/detail/${id}`);
  };

  return (
    <div className="trend-section">
      <main className="trend-main">
        <div className="main-section">
          {filterPost.map((a: any) => {
            const temp = a.createdAt.split('-');
            const date = `${temp[0]}년 ${temp[1]}월 ${temp[2].split('T')[0]}일`;

            return (
              <div className="article" key={a.id}>
                {a.image === null || a.image === undefined || a.image === '' ? null : (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                  <div onClick={() => loadPost(a.id)}>
                    <div className="arcticle-img">
                      <img src={a.image || ''} alt="" />
                    </div>
                  </div>
                )}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div className="article-content" onClick={() => loadPost(a.id)}>
                  <div>
                    <h4>{a.title}</h4>
                    <div className="desc-wrapper">
                      <p>{a.content}</p>
                    </div>
                  </div>
                  <div className="sub-info">
                    <span>{date}</span>
                    <span className="separator">·</span>
                    <span>0개의 댓글</span>
                  </div>
                  <div className="filter-info">
                    {a.language.split(',').map((L: string, i: number) => {
                      // eslint-disable-next-line react/no-array-index-key
                      return <p key={i}>{L}</p>;
                    })}
                  </div>
                </div>
                <div className="article-footer">
                  <Link to={`/myPost/${a.User.id}`}>
                    <img src={a.User.profileImg} alt="" />
                    <span>
                      by <b>{a.User.nickname}</b>
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
