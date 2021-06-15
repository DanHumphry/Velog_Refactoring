import { RootState } from '@reducers/index';
import { LOAD_MYPOSTS_REQUEST, LOAD_POST_REQUEST } from '@thunks/post';
import { UPDATE_PROFILE_REQUEST } from '@thunks/user';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function myFunctions() {
  const { myPosts } = useSelector((store: RootState) => store.post);
  const dispatch = useDispatch();
  const history = useHistory();

  const loadPost = useCallback(async (id: number) => {
    await dispatch(LOAD_POST_REQUEST({ postId: id }));
    history.push(`/detail/${id}`);
  }, []);

  const loadMyPost = useCallback(async (data: { userId: number; lastId: number | null }) => {
    if (Object.keys(myPosts).length === 0) await dispatch(LOAD_MYPOSTS_REQUEST(data));
    history.push(`/myPost/${data.userId}`);
  }, []);

  const updateProfile = useCallback(
    async (
      data: {
        id: number;
        email: string;
        nickname: string;
        git: string;
        profileImg: string;
        myIntroduce: string;
      },
      setModal: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      await dispatch(UPDATE_PROFILE_REQUEST(data));
      await setModal(false);
    },
    [],
  );

  const limitMaxLength = useCallback((value: string, length: number) => {
    const strLen = value.length;

    let byte = 0;
    let len = 0;
    let oneChar = '';
    let str = '';

    for (let i = 0; i < strLen; i += 1) {
      oneChar = value.charAt(i);
      if (escape(oneChar).length > 4) {
        byte += 2;
      } else {
        byte += 1;
      }

      if (byte <= length) {
        len = i + 1;
      }
    }

    if (byte > length) {
      alert(`한글 ${length / 2}자 / 영문 ${length}자를 초과 입력할 수 없습니다.`);
      str = value.substr(0, len); // 문자열 자르기
      return { str, byte };
    }
    str = value;
    return { str, byte };
  }, []);

  const limitLengthOnKeyUpEvent = useCallback(
    (
      e: React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLInputElement>,
      resetValue: React.Dispatch<any>,
      setState: React.Dispatch<React.SetStateAction<number>>,
      limit: number,
    ) => {
      const target = e.target as any;
      const { value } = target;
      const { str, byte } = limitMaxLength(value, limit);
      if (byte > limit) {
        resetValue(str);
        setState(limit);
      } else setState(byte);
    },
    [],
  );

  const onChangeImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setImgURL: React.Dispatch<React.SetStateAction<string>>) => {
      e.preventDefault();
      const reader = new FileReader();
      let file: any;
      if (e.target.files !== null) {
        // eslint-disable-next-line prefer-destructuring
        file = e.target.files[0];
      }
      reader.onloadend = () => {
        if (reader.result !== null && typeof reader.result === 'string') setImgURL(reader.result);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const insertSeries = useCallback(
    (
      mySeriesList: never,
      seriesInput: string,
      setSeriesList: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>,
      resetSeriesInput: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      if (seriesInput === '' || seriesInput === null) {
        alert('시리즈 제목을 입력해주세요.');
      } else {
        const temp: { id: number; name: string }[] = [...mySeriesList];
        if (temp.findIndex((v: any) => v.name === seriesInput.toLowerCase()) !== -1) {
          alert('이미 존재하는 시리즈 이름입니다.');
        } else {
          // eslint-disable-next-line no-bitwise
          const lastIdxId: number = temp[0]?.id | 1;
          temp.unshift({ id: lastIdxId + 1, name: seriesInput });
          setSeriesList(temp);
          resetSeriesInput('');
        }
      }
    },
    [],
  );

  const changePostSeries = useCallback(
    (
      selectSeries: number | null,
      mySeriesList: never,
      seriesList: { id: number; name: string }[],
      setSelectedPostSeries: React.Dispatch<React.SetStateAction<string | null>>,
      setSeriesModal: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      if (selectSeries !== null) {
        const temp: { id: number; name: string }[] = seriesList.length === 0 ? [...mySeriesList] : [...seriesList];
        const findIdx: number = temp.findIndex((v: { id: number; name: string }) => v.id === selectSeries);
        const currentSeries: string = temp[findIdx].name;
        setSelectedPostSeries(currentSeries);
        setSeriesModal(false);
      } else alert('시리즈를 선택해주세요.');
    },
    [],
  );

  const insertTag = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement>,
      tag: string[],
      setTag: React.Dispatch<React.SetStateAction<string[]>>,
      tagInput: string,
    ) => {
      if (e.code === 'Enter' && tagInput !== '') {
        const temp: string[] = [...tag];
        if (temp.indexOf(tagInput) === -1) {
          temp.push(tagInput);
          setTag(temp);
        } else alert('이미 존재하는 태그입니다.');
      }
    },
    [],
  );

  const delTeg = useCallback((idx: number, tag: string[], setTag: React.Dispatch<React.SetStateAction<string[]>>) => {
    const prev: string[] = [...tag];
    prev.splice(idx, 1);
    setTag(prev);
  }, []);

  const delSeries = useCallback(
    (
      setSelectSeries: React.Dispatch<React.SetStateAction<number | null>>,
      setSelectedPostSeries: React.Dispatch<React.SetStateAction<string | null>>,
    ) => {
      setSelectSeries(null);
      setSelectedPostSeries(null);
    },
    [],
  );

  return {
    loadPost,
    loadMyPost,
    updateProfile,
    limitLengthOnKeyUpEvent,
    onChangeImage,
    delTeg,
    insertTag,
    changePostSeries,
    insertSeries,
    delSeries,
  };
}
