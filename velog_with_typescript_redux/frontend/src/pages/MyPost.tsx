import React from 'react';
import '@styles/Mysite.css';
import Profile from '@components/MyPost/Profile';
import Content from '@components/MyPost/Content';
import Nav from '@components/MyPost/Nav';
import Search from '@components/MyPost/Search';

function MyPost() {
  return (
    <div className="main_section">
      <Profile />
      <Nav />
      <Search />
      <Content />
    </div>
  );
}
export default MyPost;
