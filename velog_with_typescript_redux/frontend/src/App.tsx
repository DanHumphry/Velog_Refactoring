import { LOG_IN_SUCCESS_ACTION } from '@actions/user';
import { getUser } from '@api/user';
import { RootState } from '@reducers/index';
import { SET_LOGIN_MODAL } from '@thunks/user';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import './App.css';
import Home from '@pages/Home';
import AccountModal from '@pages/AccountModal';
import Write from '@pages/Write';
import Update from '@pages/Update';
import Detail from '@pages/Detail';
import Header from '@components/Home/Header';
import Profile from '@pages/Profile';
import MyPost from '@pages/MyPost';

function App() {
  const dispatch = useDispatch();
  const { loginModal } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.data) dispatch(LOG_IN_SUCCESS_ACTION(res.data));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className="App">
      <div className="auto-margin">
        {loginModal ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div id="withBackground" className="overlay" onClick={() => dispatch(SET_LOGIN_MODAL(false))} />
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

        <Route path="/update">
          <Update />
        </Route>

        <Route path="/detail">
          <Header />
          <Detail />
        </Route>

        <Route exact path="/profile">
          <Header />
          <Profile />
        </Route>

        <Route path="/myPost">
          <Header />
          <MyPost />
        </Route>
      </div>
    </div>
  );
}

export default App;
