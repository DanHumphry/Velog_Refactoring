import React, { useState } from 'react';

function SideCheckBox() {
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
  const [languagefilterList, setLanguagefilterList] = useState<string[]>([]);

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
      <div className="eyrfCG">
        <div className="filter__head" />
        <section>
          <ul>
            {filterList.map((a) => {
              return (
                <li key={a.id}>
                  <input
                    id={a.language}
                    className="filters-input__checkbox"
                    value="action"
                    type="checkbox"
                    data-type="genres"
                  />
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <label
                    className="input__label | filters-input__label--checkbox"
                    htmlFor={a.language}
                    onClick={() => ClickFilter(a.language)}
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
    </aside>
  );
}
export default SideCheckBox;
