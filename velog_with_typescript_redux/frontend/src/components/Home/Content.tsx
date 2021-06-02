import myFunctions from '@hooks/myFunctions';
import { RootState } from '@reducers/index';
import { LOAD_POSTS_REQUEST } from '@thunks/post';
import gravatar from 'gravatar';
import React, { useEffect, useState } from 'react';
import '@styles/Board.css';
import SideCheckBox from '@components/Home/SideCheckBox';
import { useDispatch, useSelector } from 'react-redux';

function Content() {
  const dispatch = useDispatch();
  const { loadMyPost, loadPost } = myFunctions();
  const { mainPosts, loadPostsLoading, hasMorePosts } = useSelector((store: RootState) => store.post);

  // const [filterPost, setFilterPost] = useState<any[]>([...mainPosts]);
  // useEffect(() => {
  //   setFilterPost(
  //     [...mainPosts].filter((v: { language: string }) => {
  //       let inc = true;
  //       [...filterList].forEach((item: string) => {
  //         if (v.language.split(',').indexOf(item) === -1) inc = false;
  //       });
  //       if (inc) return v;
  //       return null;
  //     }),
  //   );
  // }, [mainPosts, filterList]);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId: number = mainPosts[mainPosts.length - 1]?.id;
          dispatch(LOAD_POSTS_REQUEST(lastId));
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <div className="trend-section">
      <main className="trend-main">
        <div className="main-section">
          {mainPosts.map((post: any) => {
            let commentCnt = post.Comments.length;
            for (let i = 0; i < post.Comments.length; i += 1) commentCnt += post.Comments[i].reComments.length;

            const temp = post.createdAt.split('-');
            const date = `${temp[0]}년 ${temp[1]}월 ${temp[2].split('T')[0]}일`;

            return (
              <div className="article" key={post.id}>
                {post.image === null || post.image === undefined || post.image === '' ? null : (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                  <div onClick={() => loadPost(post.id)}>
                    <div className="arcticle-img">
                      <img src={post.image || ''} alt="" />
                    </div>
                  </div>
                )}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div className="article-content" onClick={() => loadPost(post.id)}>
                  <div className="content__cursor">
                    <h4>{post.title}</h4>
                    <div className="desc-wrapper">
                      <p>{post.content}</p>
                    </div>
                  </div>
                  <div className="sub-info">
                    <span>{date}</span>
                    <span className="separator">·</span>
                    <span>{commentCnt}개의 댓글</span>
                  </div>
                  <div className="filter-info">
                    {post.language.split(',').map((L: string, i: number) => {
                      // eslint-disable-next-line react/no-array-index-key
                      return <p key={i}>{L}</p>;
                    })}
                  </div>
                </div>
                <div className="article-footer">
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <div className="footer_userInfo" onClick={() => loadMyPost(post.User.id)}>
                    {post.User.profileImg ? (
                      <img src={post.User.profileImg} alt="" />
                    ) : (
                      <img
                        src={gravatar.url(post.User.nickname, { s: '20px', d: 'retro' })}
                        className="user-image"
                        alt="/"
                      />
                    )}
                    <span>
                      by <b>{post.User.nickname}</b>
                    </span>
                  </div>
                  <div className="likes">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
                    </svg>
                    {post.Likers.length}
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
