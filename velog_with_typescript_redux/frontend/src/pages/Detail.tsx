import { loadPostAPI } from '@api/post';
import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import { LOAD_POST_REQUEST } from '@thunks/post';
import React, { useEffect } from 'react';
import '@styles/Detail.css';
import Post from '@components/Detail/Post';
import Comment from '@components/Detail/Comment';
import { useSelector, useDispatch } from 'react-redux';

function Detail() {
  const dispatch = useDispatch();
  const { detailPost, loadPostLoading } = useSelector((store: RootState) => store.post);
  const { me } = useSelector((store: RootState) => store.user);

  // useEffect(() => {
  //   if (!Object.keys(detailPost).length) dispatch(LOAD_POST_REQUEST(window.location.href.split('/')[4]));
  // }, []);

  // if (!detailPost.id) {
  //   dispatch(LOAD_POST_REQUEST(window.location.href.split('/')[4]));
  // }

  if (loadPostLoading) return <PageLoader />;

  return (
    <div className="detail__container">
      <Post detailPost={detailPost} me={me} />
      <Comment detailPost={detailPost} me={me} />
    </div>
  );
}
export default Detail;
