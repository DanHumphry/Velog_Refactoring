import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import { LOAD_POSTS_REQUEST } from '@thunks/post';
import React, { useEffect } from 'react';
import Navi from '@components/Home/Navi';
import Header from '@components/Home/Header';
import Content from '@components/Home/Content';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const dispatch = useDispatch();
  const { loadPostsLoading } = useSelector((store: RootState) => store.post);

  const href = window.location.href.split('/')[4];

  useEffect(() => {
    dispatch(LOAD_POSTS_REQUEST(href));
  }, []);

  return (
    <>
      <Header />
      <Navi />
      {loadPostsLoading ? <PageLoader /> : <Content />}
    </>
  );
}
export default Home;
