import myFunctions from '@hooks/myFunctions';
import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import React, { useEffect, useState } from 'react';
import '@styles/Mysite.css';
import Profile from '@components/MyPost/Profile';
import Content from '@components/MyPost/Content';
import Nav from '@components/MyPost/Nav';
import Search from '@components/MyPost/Search';
import { useSelector } from 'react-redux';

function MyPost() {
  const { myPosts, loadMyPostsLoading, hasMoreMyPosts } = useSelector((store: RootState) => store.post);
  const { loadMyPost } = myFunctions();
  const [navOption, setNavOption] = useState('최신순');
  const [navModal, setNavModal] = useState(false);

  const userId: string = window.location.href.split('/')[4];

  useEffect(() => {
    if (Object.keys(myPosts).length === 0) {
      loadMyPost({ userId, lastId: null });
    }
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMoreMyPosts && !loadMyPostsLoading) {
          let lastId: any = myPosts[[...myPosts].length - 1];
          if (lastId) lastId = lastId.id;
          loadMyPost({ userId, lastId });
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMoreMyPosts, loadMyPostsLoading, myPosts]);

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
