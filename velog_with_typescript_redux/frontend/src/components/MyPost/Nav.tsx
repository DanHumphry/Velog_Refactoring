import React from 'react';

interface Props {
  navModal: boolean;
  setNavModal: React.Dispatch<React.SetStateAction<boolean>>;
  navOption: string;
  setNavOption: React.Dispatch<React.SetStateAction<string>>;
}

function Nav({ navModal, setNavModal, navOption, setNavOption }: Props) {
  const onClickMenu = (v: string) => {
    setNavOption(v);
    setNavModal(false);
  };
  const menu = [
    { id: 1, name: '최신순' },
    { id: 2, name: '좋아요순' },
    { id: 3, name: '시리즈별' },
  ];
  return (
    <div className="nav-section">
      <div className="nav-margin">
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
              {menu.map((item) => (
                <li key={item.id} onClick={() => onClickMenu(item.name)}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default Nav;
