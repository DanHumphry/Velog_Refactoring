import { RootState } from '@reducers/index';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '@styles/Header.css';
import useSetModal from '@hooks/useSetModal';
import gravatar from 'gravatar';
import { LOG_OUT_REQUEST } from '@thunks/user';

function Header() {
  const dispatch = useDispatch();
  const { me } = useSelector((store: RootState) => store.user);
  const { showLoginModal } = useSetModal();

  const [profileModal, setProfileModal] = useState(false);

  const clickProfileModal = () => setProfileModal(!profileModal);
  const handleLogout = () => dispatch(LOG_OUT_REQUEST());

  return (
    <>
      {profileModal ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div className="overlayEvent" onClick={clickProfileModal} />
      ) : null}
      <div className="header">
        <div className="header-nav">
          <div className="header-nav-links">
            <Link className="header-logo" to="/">
              Velog
            </Link>
            {me.id === null || me.id === undefined ? (
              <button type="button" className="header-btn" onClick={showLoginModal}>
                로그인
              </button>
            ) : (
              <>
                <Link className="header-dashboard" to="/write">
                  <button type="button">새 글 작성</button>
                </Link>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div className="user-container" onClick={clickProfileModal}>
                  {me.profileImg === '' || me.profileImg === null || me.profileImg === undefined ? (
                    <img src={gravatar.url(me.username, { s: '20px', d: 'retro' })} className="user-image" alt="/" />
                  ) : (
                    <img src={me.profileImg} className="user-image" alt="/" />
                  )}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </div>
                {profileModal ? (
                  <div className="user-profile">
                    <div className="profile-menu">
                      <Link to={`/myPost/${me.id}`}>
                        <div className="menu">내가 쓴 글</div>
                      </Link>
                      <Link to="/profile">
                        <div className="menu">내 정보</div>
                      </Link>
                      <Link onClick={handleLogout} to="/">
                        <div className="menu">로그아웃</div>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
