import React, { useEffect } from 'react';
import '@styles/Detail.css';
import Post from '@components/Detail/Post';
import Comment from '@components/Detail/Comment';

function Detail() {
  return (
    <div className="detail__container">
      <Post />
      <Comment />
    </div>
  );
}
export default Detail;
