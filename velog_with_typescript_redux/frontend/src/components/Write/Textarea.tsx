import myFunctions from '@hooks/myFunctions';
import useInput from '@hooks/useInput';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

interface Props {
  visibility: { textSection: { visibility: string }; settingSection: { visibility: string } };
}

function TextArea({ visibility }: Props) {
  const history = useHistory();

  const { limitLengthOnKeyUpEvent } = myFunctions();

  const [title, setTitle, resetTitle] = useInput('');
  const [content, setContent] = useInput('');
  const [titleLength, setTitleLength] = useState<number>(0);

  return (
    <section className="container-section" style={visibility.textSection as React.CSSProperties}>
      <article className="write-container">
        <div className="post-title">
          <textarea
            value={title}
            name="title"
            placeholder="제목을 입력하세요"
            onChange={setTitle}
            onKeyUp={(e) => limitLengthOnKeyUpEvent(e, resetTitle, setTitleLength, 80)}
          />
          <div className="title_maxLength">
            <p>{titleLength} / 80</p>
          </div>
        </div>
        <div className="post-contents">
          <textarea
            value={content}
            name="content"
            className="post-textarea"
            placeholder="내용을 입력하세요"
            onChange={setContent}
          />
          <div>
            <div className="contents-scroll">
              <input type="hidden" name="textType" value="HTML" id="textType" />
            </div>
          </div>
        </div>
        <footer className="post-comment">
          <button
            type="button"
            className="exit-btn transparent-btn"
            onClick={() => {
              history.goBack();
            }}
          >
            ✔ 나가기
          </button>
          <div>
            <button type="submit" name="settingPropsButton" className="transparent-btn">
              발행
            </button>
          </div>
        </footer>
      </article>
      <article className="view-container">
        <div className="view-margin">
          <h1>{title}</h1>
          <div className="view-content">
            <div>
              <p>
                {content.split('\n').map((line, i) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
export default TextArea;
