import { RootState } from '@reducers/index';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import './App.css';
import Home from '@pages/Home';
import AccountModal from '@pages/AccountModal';
import useSetModal from '@hooks/useSetModal';
import Write from '@pages/Write';
import Detail from '@pages/Detail';
import Header from '@components/Home/Header';
import Profile from '@pages/Profile';
import MyPost from '@pages/MyPost';

function App() {
  const { showLoginModal, showProfileModal } = useSetModal();
  const { loginModal, profileModal } = useSelector((store: RootState) => store.modal);

  const setProfileModal = () => {
    if (profileModal) showProfileModal();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className="App" onClick={setProfileModal}>
      <div className="auto-margin">
        {loginModal ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div className="overlay" onClick={showLoginModal} />
            <AccountModal />
          </>
        ) : null}
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/like">
          <Home />
        </Route>

        <Route exact path="/write">
          <Write />
        </Route>

        <Route path="/detail">
          <Header />
          <Detail />
        </Route>

        <Route exact path="/profile">
          <Header />
          <Profile />
        </Route>

        <Route path="/mysite">
          <Header />
          <MyPost />
        </Route>
      </div>
    </div>
  );
}

export default App;
