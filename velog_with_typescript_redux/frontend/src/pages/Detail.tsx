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

  useEffect(() => {
    if (Object.keys(detailPost).length === 0) {
      dispatch(LOAD_POST_REQUEST({ postId: +window.location.href.split('/')[4] }));
    }
  }, []);

  if (Object.keys(detailPost).length === 0 || loadPostLoading) return <PageLoader />;

  return (
    <div className="detail__container">
      <Post detailPost={detailPost} />
      <Comment detailPost={detailPost} />
    </div>
  );
}
export default Detail;
