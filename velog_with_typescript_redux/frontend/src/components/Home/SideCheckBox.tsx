import useInput from '@hooks/useInput';
import { RootState } from '@reducers/index';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_FILTER_LIST_REQUEST, LOAD_FILTERED_POSTS_REQUEST } from '@thunks/post';

interface Props {
  filterList: number[];
  setFilterList: React.Dispatch<React.SetStateAction<number[]>>;
}

const SideCheckBox: React.VFC<Props> = ({ filterList, setFilterList }) => {
  const dispatch = useDispatch();
  const { allTags } = useSelector((store: RootState) => store.post);
  const [searchInput, setSearchInput] = useInput('');

  const clickTags = (idx: number) => {
    const temp = [...filterList];
    const isIndex = temp.indexOf(idx);
    if (isIndex === -1) temp.push(idx);
    else temp.splice(isIndex, 1);
    setFilterList(temp);
  };

  useEffect(() => {
    dispatch(LOAD_FILTERED_POSTS_REQUEST({ tagList: filterList }));
  }, [filterList]);

  useEffect(() => {
    dispatch(LOAD_FILTER_LIST_REQUEST());
  }, []);

  if (Object.keys(allTags).length === 0) return null;

  return (
    <aside className="pDRpR">
      <div className="checkBox_searchInput">
        <svg width="17" height="17" viewBox="0 0 17 17">
          <path
            fillRule="evenodd"
            d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
            clipRule="evenodd"
          />
        </svg>
        <input placeholder="검색어를 입력하세요" value={searchInput} onChange={setSearchInput} />
      </div>
      <div className="eyrfCG">
        <div className="filter__head" />
        <section>
          <ul>
            {searchInput === ''
              ? [...allTags].slice(0, 10).map((tag: { id: number; name: string }) => {
                  return (
                    <li key={tag.id}>
                      <input
                        id={tag.name}
                        className="filters-input__checkbox"
                        value="action"
                        type="checkbox"
                        data-type="genres"
                      />
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                      <label
                        className="input__label | filters-input__label--checkbox"
                        htmlFor={tag.name}
                        onClick={() => clickTags(tag.id)}
                      >
                        <span>{tag.name}</span>
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
                })
              : [...allTags]
                  .filter((v: { name: string }) => v.name.indexOf(searchInput) !== -1)
                  .map((tag: { id: number; name: string }) => {
                    return (
                      <li key={tag.id}>
                        <input
                          id={tag.name}
                          className="filters-input__checkbox"
                          value="action"
                          type="checkbox"
                          data-type="genres"
                        />
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                        <label
                          className="input__label | filters-input__label--checkbox"
                          htmlFor={tag.name}
                          onClick={() => clickTags(tag.id)}
                        >
                          <span>{tag.name}</span>
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
    </aside>
  );
};
export default SideCheckBox;
