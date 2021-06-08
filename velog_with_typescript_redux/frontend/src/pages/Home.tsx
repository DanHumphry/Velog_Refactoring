import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import { LOAD_POSTS_REQUEST, LOAD_LIKED_POSTS_REQUEST } from '@thunks/post';
import React, { useEffect, useState } from 'react';
import Navi from '@components/Home/Navi';
import Header from '@components/Home/Header';
import Content from '@components/Home/Content';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const { loadPostsLoading, mainPosts, likedPosts, filteredPosts } = useSelector((store: RootState) => store.post);
  const [isContent, setIsContent] = useState(true);
  const [filterList, setFilterList] = useState<number[]>([]);

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
      {/* eslint-disable-next-line no-nested-ternary */}
      {loadPostsLoading && Object.keys(mainPosts).length === 0 ? (
        <PageLoader />
      ) : (
        <Content
          isContent={isContent}
          mainPosts={
            // eslint-disable-next-line no-nested-ternary
            Object.keys(filteredPosts).length === 0 && filterList.length === 0
              ? isContent
                ? mainPosts
                : likedPosts
              : filteredPosts
          }
          filterList={filterList}
          setFilterList={setFilterList}
        />
      )}
    </>
  );
};

export default Home;
