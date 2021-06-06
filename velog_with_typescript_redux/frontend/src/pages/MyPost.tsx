import myFunctions from '@hooks/myFunctions';
import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import { LOAD_LIKED_MYPOSTS_REQUEST, LOAD_MYPOSTS_REQUEST } from '@thunks/post';
import React, { useEffect, useState } from 'react';
import '@styles/Mysite.css';
import Profile from '@components/MyPost/Profile';
import Content from '@components/MyPost/Content';
import Nav from '@components/MyPost/Nav';
import Search from '@components/MyPost/Search';
import { useDispatch, useSelector } from 'react-redux';

function MyPost() {
  const dispatch = useDispatch();
  const { myPosts, loadMyPostsLoading, hasMoreMyPosts, loadLikedMyPostsLoading, hasMyPostsSorting } = useSelector(
    (store: RootState) => store.post,
  );
  const [navOption, setNavOption] = useState('최신순');
  const [navModal, setNavModal] = useState(false);

  const userId: string = window.location.href.split('/')[4];

  useEffect(() => {
    if (navOption === '최신순' && hasMyPostsSorting === 'like') {
      dispatch(LOAD_MYPOSTS_REQUEST({ userId, lastId: null }));
    } else if (navOption === '좋아요순' && hasMyPostsSorting === '') {
      dispatch(LOAD_LIKED_MYPOSTS_REQUEST({ userId, lastIdx: null }));
    }
  }, [navOption, hasMyPostsSorting]);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMoreMyPosts && !loadMyPostsLoading && !loadLikedMyPostsLoading) {
          if (navOption === '최신순') {
            let lastId: any = myPosts[[...myPosts].length - 1];
            if (lastId) lastId = lastId.id;
            dispatch(LOAD_MYPOSTS_REQUEST({ userId, lastId }));
          } else {
            const lastIdx = [...myPosts].length;
            dispatch(LOAD_LIKED_MYPOSTS_REQUEST({ userId, lastIdx }));
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMoreMyPosts, loadMyPostsLoading, loadLikedMyPostsLoading, myPosts]);

  if (Object.keys(myPosts).length === 0) return <PageLoader />;

  return (
    <div className="main_section">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      {navModal ? <div className="overlay" onClick={() => setNavModal(false)} /> : null}
      <Profile myPosts={myPosts} />
      <Nav navModal={navModal} setNavModal={setNavModal} navOption={navOption} setNavOption={setNavOption} />
      <Search />
      <Content myPosts={myPosts} />
    </div>
  );
}
export default MyPost;
