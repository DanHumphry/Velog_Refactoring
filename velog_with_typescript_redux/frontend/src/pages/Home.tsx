import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import React from 'react';
import Navi from '@components/Home/Navi';
import Header from '@components/Home/Header';
import Content from '@components/Home/Content';
import { useSelector } from 'react-redux';

function Home() {
  const { loadPostsLoading } = useSelector((store: RootState) => store.post);

  return (
    <>
      <Header />
      <Navi />
      {loadPostsLoading ? <PageLoader /> : <Content />}
    </>
  );
}
export default Home;
