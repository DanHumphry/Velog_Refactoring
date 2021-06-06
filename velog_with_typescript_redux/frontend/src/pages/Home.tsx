import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import { LOAD_POSTS_REQUEST, LOAD_LIKED_POSTS_REQUEST } from '@thunks/post';
import React, { useEffect } from 'react';
import Navi from '@components/Home/Navi';
import Header from '@components/Home/Header';
import Content from '@components/Home/Content';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const dispatch = useDispatch();
  const { loadPostsLoading, mainPosts } = useSelector((store: RootState) => store.post);

  const href = window.location.href.split('/')[3];
  // href는 like 인지 없는지 , 백엔드에서 sortting할때 필요한 정보, 아직 mysql구문 에러때문에 sortting못하는중,,

  useEffect(() => {
    if (href === '') {
      dispatch(LOAD_POSTS_REQUEST(null));
    } else {
      dispatch(LOAD_LIKED_POSTS_REQUEST(null));
    }
  }, [href]);

  return (
    <>
      <Header />
      <Navi />
      {loadPostsLoading && Object.keys(mainPosts).length === 0 ? <PageLoader /> : <Content />}
    </>
  );
}
export default Home;
