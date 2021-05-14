import React, { VFC } from 'react';
import { useHistory } from 'react-router';

interface Props {
  setGoBack: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: (e: any) => void;
  content: string;
  setContent: (e: any) => void;
}

const TextArea: VFC<Props> = ({ setGoBack, title, setTitle, content, setContent }) => {
  const history = useHistory();

  return (
    <section className="container-section">
      <article className="write-container">
        <div className="post-title">
          <textarea defaultValue={title} name="" id="" placeholder="제목을 입력하세요" onChange={setTitle} />
        </div>
        <div className="post-contents">
          <textarea
            defaultValue={content}
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
            <button
              type="button"
              className="transparent-btn"
              onClick={() => {
                setGoBack(true);
              }}
            >
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
};
export default TextArea;
