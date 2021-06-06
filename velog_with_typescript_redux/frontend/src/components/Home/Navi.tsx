import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@styles/Navi.css';

function Navi() {
  const [underlineSt, setUnderlineSt] = useState({ left: '0%' });
  const href = window.location.href.split('/')[3];

  useEffect(() => {
    if (href === '') setUnderlineSt({ left: '0%' });
    else setUnderlineSt({ left: '50%' });
  }, [href]);

  return (
    <div className="navi-container">
      <div className="navi-box">
        <Link className="navi-" to="/">
          <span id="new" role="img" aria-label="하트">
            ⏰최신
          </span>
        </Link>
        <Link className="navi-" to="/like">
          <span id="like" role="img" aria-label="질문">
            🤞추천
          </span>
        </Link>
        <div className="navi-underline" style={underlineSt} />
      </div>
    </div>
  );
}
export default Navi;
