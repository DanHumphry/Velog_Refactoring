import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import { LOAD_POSTS_REQUEST, LOAD_LIKED_POSTS_REQUEST } from '@thunks/post';
import React, { useEffect, useState } from 'react';
import Navi from '@components/Home/Navi';
import Header from '@components/Home/Header';
import Content from '@components/Home/Content';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const dispatch = useDispatch();
  const { loadPostsLoading, mainPosts, likedPosts } = useSelector((store: RootState) => store.post);
  const [isContent, setIsContent] = useState(true);

  useEffect(() => {
    if (Object.keys(mainPosts).length === 0) {
      dispatch(LOAD_POSTS_REQUEST(null));
    } else if (Object.keys(likedPosts).length === 0) {
      dispatch(LOAD_LIKED_POSTS_REQUEST(null));
    }
  }, [isContent]);

  return (
    <>
      <Header />
      <Navi setIsContent={setIsContent} />
      {loadPostsLoading && Object.keys(mainPosts).length === 0 ? (
        <PageLoader />
      ) : (
        <Content isContent={isContent} mainPosts={isContent ? mainPosts : likedPosts} />
      )}
    </>
  );
}
export default Home;
