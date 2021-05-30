import { RootState } from '@reducers/index';
import React from 'react';
import '@styles/Detail.css';
import Post from '@components/Detail/Post';
import Comment from '@components/Detail/Comment';
import { useSelector } from 'react-redux';

function Detail() {
  const detailPost = useSelector((store: RootState) => store.post.detailPost);
  const { me } = useSelector((store: RootState) => store.user);

  return (
    <div className="detail__container">
      <Post detailPost={detailPost} me={me} />
      <Comment detailPost={detailPost} me={me} />
    </div>
  );
}
export default Detail;
