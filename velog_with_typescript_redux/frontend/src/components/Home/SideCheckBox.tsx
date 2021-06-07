import { FILTER_SUCCESS } from '@reducers/post';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function SideCheckBox() {
  // const disPatch = useDispatch();

  const [filterList] = useState([]);
  const [languagefilterList, setLanguagefilterList] = useState<string[]>([]);

  // useEffect(() => {
  //   disPatch({
  //     type: FILTER_SUCCESS,
  //     data: languagefilterList,
  //   });
  // }, [languagefilterList]);

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
    setLanguagefilterList(List);
  };

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
        <input placeholder="검색어를 입력하세요" />
      </div>
      <div className="eyrfCG">
        <div className="filter__head" />
        <section>
          <ul>
            {filterList.map((a: string, idx: number) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={idx}>
                  <input id={a} className="filters-input__checkbox" value="action" type="checkbox" data-type="genres" />
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <label
                    className="input__label | filters-input__label--checkbox"
                    htmlFor={a}
                    onClick={() => ClickFilter(a)}
                  >
                    <span>{a}</span>
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
}
export default SideCheckBox;
