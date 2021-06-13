import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import { LOAD_POSTS_REQUEST, LOAD_LIKED_POSTS_REQUEST } from '@thunks/post';
import React, { useEffect, useState } from 'react';
import Navi from '@components/Home/Navi';
import Header from '@components/Home/Header';
import Content from '@components/Home/Content';
import { useDispatch, useSelector } from 'react-redux';

// dispatch 등 싹 다 바꿀거임, -> 방향성은 크게 두가지로 나눠서 scrollEvent 하나 첫 로딩 loadPosts하나
// reducer 의 state값은 mainPosts하나만 쓰고 각각 loadPosts 할때마다 data 교체
// scrollEvent는 data.concat
// router.posts를 모두 통일해서 frontend단에서 보내는 data값에따라 where, order등 변경해서 api요청 주고받을 수 있도록 설계

function Home() {
  const dispatch = useDispatch();
  const { loadPostsLoading, mainPosts, likedPosts, filteredPosts, likedFilteredPosts } = useSelector(
    (store: RootState) => store.post,
  );
  const [isContent, setIsContent] = useState(true);
  const [filterList, setFilterList] = useState<number[]>([]);

  useEffect(() => {
    if (Object.keys(mainPosts).length === 0) {
      dispatch(LOAD_POSTS_REQUEST(null));
    } else if (Object.keys(likedPosts).length === 0) {
      dispatch(LOAD_LIKED_POSTS_REQUEST({ lastId: null, tagList: filterList.length === 0 ? null : filterList }));
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
            filterList.length === 0
              ? isContent
                ? mainPosts
                : likedPosts
              : isContent
              ? filteredPosts
              : likedFilteredPosts
          }
          filterList={filterList}
          setFilterList={setFilterList}
        />
      )}
    </>
  );
}

export default Home;
