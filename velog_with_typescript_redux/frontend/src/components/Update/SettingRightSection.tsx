import myFunctions from '@hooks/myFunctions';
import useInput from '@hooks/useInput';
import { RootState } from '@reducers/index';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  setVisibility: React.Dispatch<
    React.SetStateAction<{ textSection: { visibility: string }; settingSection: { visibility: string } }>
  >;
  tag: string[];
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
  detailPost: any;
}

const SettingRightSection: React.VFC<Props> = ({ detailPost, tag, setTag, setVisibility }) => {
  const { mySeriesList } = useSelector((store: RootState) => store.post);

  const [tagInput, setTagInput, resetTagInput] = useInput('');
  const tagGuid = useRef<any>(null);

  const [seriesModal, setSeriesModal] = useState(false);
  const [seriesInput, setSeriesInput, resetSeriesInput] = useInput('');
  const [selectSeries, setSelectSeries] = useState<number | null>(null);
  const [selectedPostSeries, setSelectedPostSeries] = useState<string | null>(detailPost.series[0]?.name || null);
  const [seriesList, setSeriesList] = useState<{ id: number; name: string }[]>([]);

  const { delTeg, insertTag, changePostSeries, insertSeries } = myFunctions();
  const changeSeriesModal = () => setSeriesModal(!seriesModal);
  const setVisibleTagGuid = () => {
    if (tag.length === 0 && tagGuid.current !== null) tagGuid.current.style.visibility = 'visible';
  };

  useEffect(() => {
    if (tag.length !== 0) tagGuid.current.style.visibility = 'hidden';
    resetTagInput('');
  }, [tag]);

  return (
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
                      <button
                        color="teal"
                        type="button"
                        className="sc-dnqmqq gzELJz"
                        onClick={() => insertSeries(mySeriesList, seriesInput, setSeriesList, resetSeriesInput)}
                      >
                        시리즈 추가
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="sc-bMVAic XhGBA sc-iujRgT fAMcrW">
                {(seriesList.length === 0 ? [...mySeriesList] : seriesList).map((item: { id: number; name: string }) =>
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
                    <li className="sc-bAeIUo bTeTbc list-item" key={item.id} onClick={() => setSelectSeries(item.id)}>
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
              <button
                type="button"
                color="teal"
                className="sc-dnqmqq jvzOMf"
                onClick={() =>
                  changePostSeries(selectSeries, mySeriesList, seriesList, setSelectedPostSeries, setSeriesModal)
                }
              >
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
                onKeyPress={(e) => insertTag(e, tag, setTag, tagInput)}
              />
            </div>
            <div className="sc-fYxtnH hLQrny" ref={tagGuid}>
              <div className="inside">
                <p>엔터를 입력하여 태그를 등록 할 수 있습니다.</p>
                <p>등록된 태그를 클릭하면 삭제됩니다.</p>
              </div>
            </div>
            <div>
              {tag.map((item: any, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <button type="button" className="previewTag" key={index} onClick={() => delTeg(index, tag, setTag)}>
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
  );
};
export default SettingRightSection;
