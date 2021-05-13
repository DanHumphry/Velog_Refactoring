import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@styles/Navi.css';

function Navi() {
  const lineRef = useRef<HTMLDivElement | null>(null);

  const clickNav = (e: any) => {
    const { current } = lineRef;
    if (e.target.id === 'new' && current !== null) current.style.left = '0%';
    else if (current !== null) current.style.left = '50%';
  };

  return (
    <div className="navi-container">
      <div className="navi-box">
        <Link className="navi-" to="/" onClick={(e) => clickNav(e)}>
          <span id="new" role="img" aria-label="하트">
            ⏰최신
          </span>
        </Link>
        <Link className="navi-" to="/like" onClick={(e) => clickNav(e)}>
          <span id="like" role="img" aria-label="질문">
            🤞추천
          </span>
        </Link>
        <div ref={lineRef} className="navi-underline" />
      </div>
    </div>
  );
}
export default Navi;
