import { RootState } from '@reducers/index';
import { UPDATE_PROFILE_SUCCESS } from '@reducers/user';
import React, { useState, useEffect } from 'react';
import '@styles/Profile.css';
import { useDispatch, useSelector } from 'react-redux';

function Profile() {
  const dispatch = useDispatch();
  const { me } = useSelector((store: RootState) => store.user);
  const [inputModal, setInputModal] = useState({ infoModal: false, nicknameModal: false, socialModal: false });
  const [myProfile, setMyProfile] = useState({
    myInfo: me.myInfo,
    nickname: me.nickname,
    email: me.email,
    mygit: me.mygit,
  });

  const onChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyProfile({ ...myProfile, [e.target.name]: e.target.value });
  };

  const updateMyProfile = () => {
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      data: {
        ...me,
        myInfo: myProfile.myInfo,
        nickname: myProfile.nickname,
        email: myProfile.email,
        mygit: myProfile.mygit,
      },
    });
    setInputModal({ infoModal: false, nicknameModal: false, socialModal: false });
  };

  return (
    <main className="profile-main">
      <section className="section1">
        <div className="thumbnail__">
          <img src={me.userPhoto} alt="" />
          <label htmlFor="file" className="img-up">
            <input type="file" id="file" accept=".jpg, .png, .jpeg, .gif" />
            이미지 업로드
          </label>
          <button type="button" className="img-de">
            저장
          </button>
        </div>
        <div className="profile-info">
          {inputModal.infoModal === true ? (
            <form>
              <input
                name="myInfo"
                placeholder={me.myInfo}
                onChange={(e) => {
                  onChangeProfile(e);
                }}
              />
            </form>
          ) : (
            <>
              <h2>{me.myInfo}</h2>
              <button
                type="button"
                className="fix-button"
                onClick={() => {
                  setInputModal({ ...inputModal, infoModal: true });
                }}
              >
                자기소개 수정
              </button>
            </>
          )}
        </div>
      </section>

      <section className="section2">
        <div className="myProfile">
          <div className="wrapper">
            <div className="title-wrapper">
              <h3>닉네임</h3>
            </div>
            <div className="block-for-mobile">
              {inputModal.nicknameModal === true ? (
                <form className="nickname-form">
                  <input
                    name="nickname"
                    className="nickname-input"
                    placeholder={me.nickname}
                    onChange={(e) => {
                      onChangeProfile(e);
                    }}
                  />
                </form>
              ) : (
                <>
                  <div className="contents">{me.nickname}</div>
                  <div className="edit-wrapper">
                    <button
                      type="button"
                      className="fix-button"
                      onClick={() => {
                        setInputModal({ ...inputModal, nicknameModal: true });
                      }}
                    >
                      수정
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="myProfile">
          <div className="wrapper">
            <div className="title-wrapper">
              <h3>소셜 정보</h3>
            </div>
            <div className="block-for-mobile">
              {inputModal.socialModal === true ? (
                <form>
                  <ul className="social-contents">
                    <li>
                      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                        <path
                          fill="currentColor"
                          d="M16 16.871L1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z"
                        />
                      </svg>
                      <input
                        name="email"
                        className="social-input"
                        placeholder={me.email}
                        onChange={(e) => {
                          onChangeProfile(e);
                        }}
                      />
                    </li>
                    <li>
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <mask id="github" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse">
                          <path
                            fill="#ffffff"
                            fillRule="evenodd"
                            d="M6.69 15.944c0 .08-.093.145-.21.145-.133.012-.226-.053-.226-.145 0-.081.093-.146.21-.146.12-.012.226.053.226.146zm-1.255-.182c-.028.08.053.173.174.198.105.04.226 0 .25-.081.024-.08-.053-.173-.174-.21-.104-.028-.221.012-.25.093zm1.783-.068c-.117.028-.198.104-.186.197.012.08.117.133.238.105.117-.028.198-.105.186-.186-.012-.076-.121-.129-.238-.116zM9.87.242C4.278.242 0 4.488 0 10.08c0 4.471 2.815 8.298 6.835 9.645.516.093.697-.226.697-.488 0-.25-.012-1.63-.012-2.476 0 0-2.822.605-3.415-1.202 0 0-.46-1.173-1.121-1.475 0 0-.924-.633.064-.621 0 0 1.004.08 1.557 1.04.883 1.557 2.363 1.109 2.94.843.092-.645.354-1.093.645-1.36-2.255-.25-4.529-.576-4.529-4.455 0-1.109.307-1.665.952-2.375-.105-.262-.448-1.342.105-2.738C5.56 4.157 7.5 5.51 7.5 5.51a9.474 9.474 0 0 1 2.532-.344c.86 0 1.726.117 2.533.343 0 0 1.939-1.355 2.782-1.089.552 1.4.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.63 4.456.372.319.686.923.686 1.87 0 1.36-.012 3.041-.012 3.372 0 .262.186.58.698.488C17.266 18.379 20 14.552 20 10.08 20 4.488 15.464.24 9.871.24zM3.919 14.149c-.052.04-.04.133.029.21.064.064.157.093.21.04.052-.04.04-.133-.029-.21-.064-.064-.157-.092-.21-.04zm-.435-.326c-.028.052.012.117.093.157.064.04.145.028.173-.028.028-.053-.012-.117-.093-.158-.08-.024-.145-.012-.173.029zm1.306 1.435c-.064.053-.04.174.053.25.092.093.21.105.262.04.052-.052.028-.173-.053-.25-.088-.092-.21-.104-.262-.04zm-.46-.593c-.064.04-.064.146 0 .238.065.093.174.133.226.093.065-.053.065-.157 0-.25-.056-.093-.16-.133-.225-.08z"
                            clipRule="evenodd"
                          />
                        </mask>
                        <g mask="url(#github)">
                          <path fill="currentColor" d="M0 0h20v20H0z" />
                        </g>
                      </svg>
                      <input
                        name="mygit"
                        className="social-input"
                        placeholder={me.mygit}
                        onChange={(e) => {
                          onChangeProfile(e);
                        }}
                      />
                    </li>
                  </ul>
                </form>
              ) : (
                <>
                  <div className="contents">
                    <ul className="social-contents">
                      <li>
                        <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                          <path
                            fill="currentColor"
                            d="M16 16.871L1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z"
                          />
                        </svg>
                        <span>{me.email}</span>
                      </li>
                      <li>
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                          <mask id="github" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse">
                            <path
                              fill="#ffffff"
                              fillRule="evenodd"
                              d="M6.69 15.944c0 .08-.093.145-.21.145-.133.012-.226-.053-.226-.145 0-.081.093-.146.21-.146.12-.012.226.053.226.146zm-1.255-.182c-.028.08.053.173.174.198.105.04.226 0 .25-.081.024-.08-.053-.173-.174-.21-.104-.028-.221.012-.25.093zm1.783-.068c-.117.028-.198.104-.186.197.012.08.117.133.238.105.117-.028.198-.105.186-.186-.012-.076-.121-.129-.238-.116zM9.87.242C4.278.242 0 4.488 0 10.08c0 4.471 2.815 8.298 6.835 9.645.516.093.697-.226.697-.488 0-.25-.012-1.63-.012-2.476 0 0-2.822.605-3.415-1.202 0 0-.46-1.173-1.121-1.475 0 0-.924-.633.064-.621 0 0 1.004.08 1.557 1.04.883 1.557 2.363 1.109 2.94.843.092-.645.354-1.093.645-1.36-2.255-.25-4.529-.576-4.529-4.455 0-1.109.307-1.665.952-2.375-.105-.262-.448-1.342.105-2.738C5.56 4.157 7.5 5.51 7.5 5.51a9.474 9.474 0 0 1 2.532-.344c.86 0 1.726.117 2.533.343 0 0 1.939-1.355 2.782-1.089.552 1.4.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.63 4.456.372.319.686.923.686 1.87 0 1.36-.012 3.041-.012 3.372 0 .262.186.58.698.488C17.266 18.379 20 14.552 20 10.08 20 4.488 15.464.24 9.871.24zM3.919 14.149c-.052.04-.04.133.029.21.064.064.157.093.21.04.052-.04.04-.133-.029-.21-.064-.064-.157-.092-.21-.04zm-.435-.326c-.028.052.012.117.093.157.064.04.145.028.173-.028.028-.053-.012-.117-.093-.158-.08-.024-.145-.012-.173.029zm1.306 1.435c-.064.053-.04.174.053.25.092.093.21.105.262.04.052-.052.028-.173-.053-.25-.088-.092-.21-.104-.262-.04zm-.46-.593c-.064.04-.064.146 0 .238.065.093.174.133.226.093.065-.053.065-.157 0-.25-.056-.093-.16-.133-.225-.08z"
                              clipRule="evenodd"
                            />
                          </mask>
                          <g mask="url(#github)">
                            <path fill="currentColor" d="M0 0h20v20H0z" />
                          </g>
                        </svg>
                        <span>{me.mygit}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="edit-wrapper">
                    <button
                      type="button"
                      className="fix-button"
                      onClick={() => {
                        setInputModal({ ...inputModal, socialModal: true });
                      }}
                    >
                      수정
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="myProfile">
          <div className="wrapper">
            <div className="title-wrapper" />
            <div className="block-for-mobile">
              <div className="contents">
                <button className="out-button" type="button">
                  회원탈퇴
                </button>
                <button type="button" className="save-button" onClick={updateMyProfile}>
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Profile;
