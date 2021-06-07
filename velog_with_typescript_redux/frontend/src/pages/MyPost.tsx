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

const MyPost = () => {
  const dispatch = useDispatch();
  const { myPosts, myLikedPosts, loadLikedMyPostsLoading, loadMyPostsLoading } = useSelector(
    (store: RootState) => store.post,
  );
  const [navOption, setNavOption] = useState('최신순');
  const [navModal, setNavModal] = useState(false);

  const userId: string = window.location.href.split('/')[4];

  useEffect(() => {
    if (navOption === '최신순' && Object.keys(myPosts).length === 0) {
      dispatch(LOAD_MYPOSTS_REQUEST({ userId, lastId: null }));
    } else if (navOption === '좋아요순' && Object.keys(myLikedPosts).length === 0) {
      dispatch(LOAD_LIKED_MYPOSTS_REQUEST({ userId, lastIdx: null }));
    }
  }, [navOption]);

  if (Object.keys(myPosts).length === 0 && (loadLikedMyPostsLoading || loadMyPostsLoading)) return <PageLoader />;

  return (
    <div className="main_section">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      {navModal ? <div className="overlay" onClick={() => setNavModal(false)} /> : null}
      <Profile myPosts={myPosts} />
      <Nav navModal={navModal} setNavModal={setNavModal} navOption={navOption} setNavOption={setNavOption} />
      <Search />
      <Content myPosts={navOption === '최신순' ? myPosts : myLikedPosts} navOption={navOption} />
    </div>
  );
};

export default MyPost;
