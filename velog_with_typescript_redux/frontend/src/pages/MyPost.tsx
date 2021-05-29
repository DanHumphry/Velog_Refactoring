import React, { useState } from 'react';
import '@styles/Mysite.css';
import Profile from '@components/MyPost/Profile';
import Content from '@components/MyPost/Content';
import Nav from '@components/MyPost/Nav';
import Search from '@components/MyPost/Search';

function MyPost() {
  const [navOption, setNavOption] = useState('최신순');
  const [navModal, setNavModal] = useState(false);

  return (
    <div className="main_section">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      {navModal ? <div className="overlay" onClick={() => setNavModal(false)} /> : null}
      <Profile />
      <Nav navModal={navModal} setNavModal={setNavModal} navOption={navOption} setNavOption={setNavOption} />
      <Search />
      <Content />
    </div>
  );
}
export default MyPost;
