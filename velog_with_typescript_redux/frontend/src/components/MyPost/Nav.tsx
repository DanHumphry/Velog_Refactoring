import React from 'react';

interface Props {
  navModal: boolean;
  setNavModal: React.Dispatch<React.SetStateAction<boolean>>;
  navOption: string;
  setNavOption: React.Dispatch<React.SetStateAction<string>>;
}

const Nav: React.VFC<Props> = ({ navModal, setNavModal, navOption, setNavOption }) => {
  const onClickMenu = (v: string) => {
    setNavOption(v);
    setNavModal(false);
  };
  const menu = ['최신순', '좋아요순'];
  return (
    <div className="nav-section">
      <div className="nav-margin">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <h2 onClick={() => setNavModal(true)}>
          {navOption}
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
        </h2>
        {navModal ? (
          <div className="filterModalBox">
            <ul>
              {menu.map((item, idx) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key,jsx-a11y/click-events-have-key-events
                  <li key={idx} onClick={() => onClickMenu(item)}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Nav;
