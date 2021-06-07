import React, { useState } from 'react';
import '@styles/Navi.css';

interface Props {
  setIsContent: any;
}

const Navi: React.VFC<Props> = ({ setIsContent }) => {
  const [underlineSt, setUnderlineSt] = useState({ left: '0%' });

  const changeContent = (content: boolean, underline: { left: string }) => {
    setUnderlineSt(underline);
    setIsContent(content);
  };

  return (
    <div className="navi-container">
      <div className="navi-box">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className="navi-" onClick={() => changeContent(true, { left: '0%' })}>
          <span id="new" role="img" aria-label="하트">
            ⏰최신
          </span>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className="navi-" onClick={() => changeContent(false, { left: '50%' })}>
          <span id="like" role="img" aria-label="질문">
            🤞추천
          </span>
        </div>
        <div className="navi-underline" style={underlineSt} />
      </div>
    </div>
  );
};
export default Navi;
