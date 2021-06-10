import myFunctions from '@hooks/myFunctions';
import { RootState } from '@reducers/index';
import { LOAD_POSTS_REQUEST, LOAD_LIKED_POSTS_REQUEST, LOAD_SCROLL_EVENT_FILTERED_POSTS_REQUEST } from '@thunks/post';
import gravatar from 'gravatar';
import React, { useEffect } from 'react';
import '@styles/Board.css';
import SideCheckBox from '@components/Home/SideCheckBox';
import { useDispatch, useSelector } from 'react-redux';

// 0.update도 고치기
// 1.series detail만들기(미정)
// 2.detail Page에서 시리즈가 존재한다면 같은 시리즈들의 목록을 section추가

interface Props {
  isContent: boolean;
  mainPosts: any;
  filterList: number[];
  setFilterList: React.Dispatch<React.SetStateAction<number[]>>;
}

const Content: React.VFC<Props> = ({ isContent, mainPosts, filterList, setFilterList }) => {
  const dispatch = useDispatch();
  const { loadMyPost, loadPost } = myFunctions();
  const {
    loadPostsLoading,
    hasMorePosts,
    loadFilteredPostsLoading,
    loadMyPostsLoading,
    hasMoreFilteredPosts,
  } = useSelector((store: RootState) => store.post);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (
          (hasMorePosts || hasMoreFilteredPosts) &&
          !loadPostsLoading &&
          !loadFilteredPostsLoading &&
          !loadMyPostsLoading
        ) {
          const posts = [...mainPosts];

          if (filterList.length === 0) {
            if (isContent) {
              let lastId: any = posts[[...mainPosts].length - 1];
              if (lastId) lastId = lastId.id;
              dispatch(LOAD_POSTS_REQUEST(lastId));
            } else {
              const lastIdx = posts.length;
              dispatch(LOAD_LIKED_POSTS_REQUEST(lastIdx));
            }
          } else {
            let lastId: any = posts[[...mainPosts].length - 1];
            if (lastId) lastId = lastId.id;
            dispatch(LOAD_SCROLL_EVENT_FILTERED_POSTS_REQUEST({ tagList: filterList, lastId }));
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts, isContent, loadFilteredPostsLoading, loadMyPostsLoading]);

  return (
    <div className="trend-section">
      <main className="trend-main">
        <div className="main-section">
          {[...mainPosts].map((post: any) => {
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
                    {post.tags.map((tag: { id: number; name: string }) => (
                      <p key={tag.id}>{tag.name}</p>
                    ))}
                  </div>
                </div>
                <div className="article-footer">
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <div className="footer_userInfo" onClick={() => loadMyPost({ userId: post.User.id, lastId: null })}>
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
      <SideCheckBox filterList={filterList} setFilterList={setFilterList} />
    </div>
  );
};
export default Content;
