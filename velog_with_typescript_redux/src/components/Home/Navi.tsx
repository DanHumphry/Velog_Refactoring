import { RootState } from '@reducers/index';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '@styles/Navi.css';
import { NEWORREC_SUCCESS } from '@reducers/post';

function Navi() {
  const dispatch = useDispatch();
  const { newOrRec } = useSelector((store: RootState) => store.post);

  const [underlineSt, setUnderlineSt] = useState({ left: '0%' });

  const clickNav = () => {
    dispatch({
      type: NEWORREC_SUCCESS,
    });
  };

  useEffect(() => {
    if (newOrRec === false) setUnderlineSt({ left: '0%' });
    else setUnderlineSt({ left: '50%' });
  }, [newOrRec]);

  return (
    <div className="navi-container">
      <div className="navi-box">
        <Link className="navi-" to="/" onClick={clickNav}>
          <span id="new" role="img" aria-label="하트">
            ⏰최신
          </span>
        </Link>
        <Link className="navi-" to="/like" onClick={clickNav}>
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
