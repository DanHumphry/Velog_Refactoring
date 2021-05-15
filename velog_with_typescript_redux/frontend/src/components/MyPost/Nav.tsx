import React, { useRef } from 'react';

function Nav() {
  const filterModal = useRef<HTMLDivElement | null>(null);

  const onClickFilterModal = () => {
    if (filterModal.current?.style.visibility === 'hidden' || filterModal.current?.style.visibility === '')
      filterModal.current.style.visibility = 'visible';
    else if (filterModal.current !== null) filterModal.current.style.visibility = 'hidden';
  };
  return (
    <div className="nav-section">
      <div className="nav-margin">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <h2 onClick={onClickFilterModal}>
          최신순
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
        <div className="filterModalBox" ref={filterModal}>
          <ul>
            <li>최신순</li>
            <li>좋아요순</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Nav;
