import { RootState } from '@reducers/index';
import { UPDATE_POST_SUCCESS } from '@reducers/post';
import React, { useEffect, useRef, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

interface Props {
  setGoBack: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: (e: any) => void;
  content: string;
  setContent: (e: any) => void;
}

const Setting: VFC<Props> = ({ setGoBack, title, content, setTitle, setContent }) => {
  const pgN = +document.location.href.split('/')[4];

  const { me } = useSelector((store: RootState) => store.user);
  const { mainPosts } = useSelector((store: RootState) => store.post);
  let updatePost: any = [...mainPosts].filter((v: { id: number }) => v.id === pgN)[0];

  const dispatch = useDispatch();

  const [filterList] = useState([
    { id: 1, language: 'Python' },
    { id: 2, language: 'React' },
    { id: 3, language: 'Java' },
    { id: 4, language: 'C#' },
    { id: 5, language: 'C' },
    { id: 6, language: 'C++' },
    { id: 7, language: 'GO' },
    { id: 8, language: 'Javascript' },
  ]);
  const [languagefilterList, setLanguageFilterList] = useState<string[]>([]);

  const Today = new Date();
  const date = `${Today.getFullYear()}-${Today.getMonth()}-${Today.getDate()}`;

  const history = useHistory();
  const [imgGoback, setImgGoback] = useState(false);

  const [img, setImg] = useState('');
  const [imgURL, setImgURL] = useState('' as string | ArrayBuffer);

  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring
    updatePost = [...mainPosts].filter((v: { id: number }) => v.id === pgN)[0];
    setTitle(updatePost.title);
    setContent(updatePost.content);
    setImgURL(updatePost.image);
    setLanguageFilterList(updatePost.language);
  }, [pgN]);

  let sendData: any;
  const handleEffect = (handleSubmit: any) => {
    if (languagefilterList.length === 0 || languagefilterList.length === 0) {
      alert('한 개 이상의 언어를 선택해주세요.');
      return;
    }
    sendData = {
      id: me.id,

      image: imgURL,
      title,
      content,
      date,
      like: 0,
      username: me.username,
      language: languagefilterList,
      profileImage: '',
      user_pk: me.id,
    };
    handleSubmit();
  };

  const [ImgCount, setImgCount] = useState(0);
  const refImgFiles: any = useRef(null);

  useEffect(() => {
    if (img !== undefined) {
      setImgCount(1);
    }
  }, [img]);

  const handleSubmit = () => {
    if (ImgCount === 1) {
      sendData = { ...sendData, image: refImgFiles.current.files[0] };
    }

    dispatch({
      type: UPDATE_POST_SUCCESS,
      data: sendData,
    });

    history.push('/');
  };

  const ClickFilter = (lang: string) => {
    let Num = 0;
    const List: string[] = [...languagefilterList];

    List.map((a) => {
      if (a === lang) {
        Num = 1;
      }
      return Num;
    });
    if (Num === 0) {
      List.push(lang);
    } else {
      List.splice(List.indexOf(lang), 1);
    }
    setLanguageFilterList(List);
  };

  return (
    <div className="thumbnail_container">
      <div className="thumbnail_section">
        <div className="left_section">
          <section className="left_container">
            <h3>포스트 미리보기</h3>
            <button type="button" className="upButton">
              <label htmlFor="file" className="img-up">
                <input
                  ref={refImgFiles}
                  type="file"
                  id="file"
                  accept=".jpg, .png, .jpeg, .gif"
                  onChange={(e) => {
                    e.preventDefault();
                    const reader = new FileReader();
                    let file: any;
                    if (e.target.files !== null) {
                      // eslint-disable-next-line prefer-destructuring
                      file = e.target.files[0];
                    }
                    reader.onloadend = () => {
                      setImg(file);
                      if (reader.result !== null) setImgURL(reader.result);
                    };
                    reader.readAsDataURL(file);
                    setImgGoback(true);
                  }}
                />
                이미지 업로드
              </label>
            </button>
            <button
              type="button"
              className="upButton"
              onClick={() => {
                setImg('');
                setImgURL('');
                setImgGoback(false);
              }}
            >
              이미지 제거
            </button>
            <div className="left_container2">
              <div className="left_container3">
                <div className="img_container">
                  <div className="img_container2">
                    {imgGoback === false ? (
                      <svg width="107" height="85" fill="none" viewBox="0 0 107 85">
                        <path
                          fill="#868E96"
                          d="M105.155 0H1.845A1.844 1.844 0 0 0 0 1.845v81.172c0 1.02.826 1.845 1.845 1.845h103.31A1.844 1.844 0 0 0 107 83.017V1.845C107 .825 106.174 0 105.155 0zm-1.845 81.172H3.69V3.69h99.62v77.482z"
                        />
                        <path
                          fill="#868E96"
                          d="M29.517 40.84c5.666 0 10.274-4.608 10.274-10.271 0-5.668-4.608-10.276-10.274-10.276-5.665 0-10.274 4.608-10.274 10.274 0 5.665 4.609 10.274 10.274 10.274zm0-16.857a6.593 6.593 0 0 1 6.584 6.584 6.593 6.593 0 0 1-6.584 6.584 6.591 6.591 0 0 1-6.584-6.582c0-3.629 2.954-6.586 6.584-6.586zM12.914 73.793a1.84 1.84 0 0 0 1.217-.46l30.095-26.495 19.005 19.004a1.843 1.843 0 0 0 2.609 0 1.843 1.843 0 0 0 0-2.609l-8.868-8.868 16.937-18.548 20.775 19.044a1.846 1.846 0 0 0 2.492-2.72L75.038 31.846a1.902 1.902 0 0 0-1.328-.483c-.489.022-.95.238-1.28.6L54.36 51.752l-8.75-8.75a1.847 1.847 0 0 0-2.523-.081l-31.394 27.64a1.845 1.845 0 0 0 1.22 3.231z"
                        />
                      </svg>
                    ) : (
                      <img src="" alt="" />
                    )}
                  </div>
                </div>
              </div>
              <div className="title-margin">
                <h4>{title}</h4>
                <textarea value={content} name="viewContent" />
              </div>
            </div>
          </section>
        </div>
        <div className="line_section" />
        <div className="right_section">
          <div className="fillter_section">
            <section>
              <ul>
                {filterList.map((a) => {
                  let boolenChecked = false;
                  if (languagefilterList.indexOf(a.language) !== -1) {
                    boolenChecked = true;
                  }
                  return (
                    <li key={a.id}>
                      <input
                        id={a.language}
                        className="filters-input__checkbox"
                        value="action"
                        type="checkbox"
                        data-type="genres"
                        defaultChecked={boolenChecked}
                      />
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                      <label
                        className="input__label | filters-input__label--checkbox"
                        htmlFor={a.language}
                        onClick={() => {
                          ClickFilter(a.language);
                        }}
                      >
                        <span>{a.language}</span>
                        <span className="filters-input__tick">
                          <svg focusable="false" aria-hidden="true">
                            <use xlinkHref="#check">
                              <svg viewBox="0 0 24 24" id="check" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436L24 5.782z" />
                              </svg>
                            </use>
                          </svg>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
          <div>
            <button
              type="button"
              className="upButton"
              onClick={() => {
                setGoBack(false);
              }}
            >
              뒤로가기
            </button>
            <button
              type="button"
              className="upButton"
              onClick={() => {
                handleEffect(handleSubmit);
              }}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Setting;
