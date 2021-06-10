import myFunctions from '@hooks/myFunctions';
import useInput from '@hooks/useInput';
import { RootState } from '@reducers/index';
import React, { useRef, useState, VFC, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  visibility: { textSection: { visibility: string }; settingSection: { visibility: string } };
  setVisibility: React.Dispatch<
    React.SetStateAction<{ textSection: { visibility: string }; settingSection: { visibility: string } }>
  >;
  inp: { title: string; content: string };
  tag: string[];
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
}

const Setting: VFC<Props> = ({ visibility, setVisibility, inp, tag, setTag }) => {
  const { onChangeImage } = myFunctions();
  const { mySeriesList } = useSelector((store: RootState) => store.post);

  const [imgURL, setImgURL] = useState('' as string);

  const [tagInput, setTagInput, resetTagInput] = useInput('');
  const tagGuid = useRef<any>(null);

  const [seriesModal, setSeriesModal] = useState(false);
  const [seriesInput, setSeriesInput, resetSeriesInput] = useInput('');
  const [selectSeries, setSelectSeries] = useState<number | null>(null);
  const [selectedPostSeries, setSelectedPostSeries] = useState<string | null>(null);
  const [seriesList, setSeriesList] = useState<any>([]);

  const insertSeries = () => {
    const temp: any = [...mySeriesList];
    if (temp.findIndex((v: any) => v.name === seriesInput.toLowerCase()) !== -1) {
      alert('이미 존재하는 시리즈 이름입니다.');
    } else {
      const lastIdxId: number = temp[0].id || 1;
      temp.unshift({ id: lastIdxId + 1, name: seriesInput });
      setSeriesList(temp);
      resetSeriesInput('');
    }
  };

  const changePostSeries = () => {
    if (selectSeries !== null) {
      const temp: any = seriesList.length === 0 ? [...mySeriesList] : [...seriesList];
      const findIdx: number = temp.findIndex((v: any) => v.id === selectSeries);
      const currentSeries: string = temp[findIdx].name;
      setSelectedPostSeries(currentSeries);
      setSeriesModal(false);
    } else alert('시리즈를 선택해주세요.');
  };

  const changeSeriesModal = () => setSeriesModal(!seriesModal);

  const insertTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && tagInput !== '') {
      const temp: any = [...tag];
      if (temp.indexOf(tagInput) === -1) {
        temp.push(tagInput);
        setTag(temp);
      } else alert('이미 존재하는 태그입니다.');
    }
  };

  const delTeg = (index: number) => {
    const temp: any = [...tag];
    temp.splice(index, 1);
    setTag(temp);
  };

  const setVisibleTagGuid = () => {
    if (tag.length === 0 && tagGuid.current !== null) tagGuid.current.style.visibility = 'visible';
  };

  useEffect(() => {
    if (tag.length !== 0) tagGuid.current.style.visibility = 'hidden';
    resetTagInput('');
  }, [tag]);

  return (
    <div className="thumbnail_container" style={visibility.settingSection as React.CSSProperties}>
      <div className="thumbnail_section">
        <div className="left_section">
          <section className="left_container">
            <h3>포스트 미리보기</h3>
            <button type="button" className="upButton">
              <label htmlFor="file" className="img-up">
                <input
                  name="imgFile"
                  type="file"
                  id="file"
                  accept=".jpg, .png, .jpeg, .gif"
                  onChange={(e) => onChangeImage(e, setImgURL)}
                />
                이미지 업로드
              </label>
            </button>
            <button
              type="button"
              className="upButton"
              onClick={() => {
                setImgURL('');
              }}
            >
              이미지 제거
            </button>
            <div className="left_container2">
              <div className="left_container3">
                <div className="img_container">
                  <div className="img_container2">
                    {imgURL === '' ? (
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
                      <img src={imgURL} alt="" />
                    )}
                  </div>
                </div>
              </div>
              <div className="title-margin">
                <h4>{inp.title}</h4>
                <textarea defaultValue={inp.content} name="viewContent" readOnly />
              </div>
            </div>
          </section>
        </div>
        <div className="line_section" />
        <div className="right_section">
          {seriesModal ? (
            <section className="sc-gzOgki fRPcIQ sc-gqPbQI guOUmw">
              <h3>시리즈 설정</h3>
              <div className="contents">
                <div className="sc-hORach kxgRGC">
                  <div>
                    <div className="sc-iuJeZd ilAdLO">
                      <input
                        placeholder="새로운 시리즈 이름을 입력하세요"
                        name="name"
                        className="sc-esOvli fPWeGR"
                        value={seriesInput}
                        onChange={setSeriesInput}
                      />
                      <div className="sc-hMFtBS kFYgzZ">
                        <div className="sc-cLQEGU dryTVy">
                          <button color="teal" type="button" className="sc-dnqmqq gzELJz" onClick={insertSeries}>
                            시리즈 추가
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="sc-bMVAic XhGBA sc-iujRgT fAMcrW">
                    {(seriesList.length === 0 ? [...mySeriesList] : seriesList).map(
                      (item: { id: number; name: string }) =>
                        item.id === selectSeries ? (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                          <li
                            className="sc-bAeIUo bTeTbc list-item selectItem"
                            key={item.id}
                            onClick={() => setSelectSeries(item.id)}
                          >
                            {item.name}
                          </li>
                        ) : (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                          <li
                            className="sc-bAeIUo bTeTbc list-item"
                            key={item.id}
                            onClick={() => setSelectSeries(item.id)}
                          >
                            {item.name}
                          </li>
                        ),
                    )}
                  </ul>
                </div>
                <div className="sc-GMQeP hLTRLT">
                  <button type="button" color="gray" className="sc-dnqmqq ccZQXh" onClick={changeSeriesModal}>
                    취소
                  </button>
                  <button type="button" color="teal" className="sc-dnqmqq jvzOMf" onClick={changePostSeries}>
                    선택하기
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <>
              <section className="sc-gzOgki fRPcIQ sc-epnACN hsXqzQ">
                <h3>태그 추가하기</h3>
                <div className="contents">
                  <input
                    className="tag_input"
                    onFocus={setVisibleTagGuid}
                    value={tagInput}
                    onChange={setTagInput}
                    onKeyPress={(e) => insertTag(e)}
                  />
                </div>
                <div className="sc-fYxtnH hLQrny" ref={tagGuid}>
                  <div className="inside">
                    <p>엔터를 입력하여 태그를 등록 할 수 있습니다.</p>
                    <p>등록된 태그를 클릭하면 삭제됩니다.</p>
                  </div>
                </div>
                <div>
                  {tag.map((item: string, index: number) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <button type="button" className="previewTag" key={index} onClick={() => delTeg(index)}>
                      {item}
                    </button>
                  ))}
                </div>
              </section>
              <section className="sc-gzOgki fRPcIQ sc-epnACN hsXqzQ">
                <h3>시리즈 설정</h3>
                <div className="contents">
                  {selectedPostSeries === null ? (
                    <button type="button" className="sc-iQNlJl ikrfmY" onClick={changeSeriesModal}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14 10H2V12H14V10ZM14 6H2V8H14V6ZM18 14V10H16V14H12V16H16V20H18V16H22V14H18ZM2 16H10V14H2V16Z"
                          fill="currentColor"
                        />
                      </svg>
                      시리즈에 추가하기
                    </button>
                  ) : (
                    <div className="sc-ipZHIp fItzQM">
                      <input name="postSeries" className="name-wrapper" defaultValue={selectedPostSeries} readOnly />
                      <button type="button" data-testid="setting-button" onClick={changeSeriesModal}>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </section>
              <div>
                <button
                  type="button"
                  className="upButton"
                  onClick={() =>
                    setVisibility({ textSection: { visibility: 'visible' }, settingSection: { visibility: 'hidden' } })
                  }
                >
                  뒤로가기
                </button>
                <button type="submit" className="upButton" name="sendAPIButton">
                  출간하기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Setting;
