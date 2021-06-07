import { RootState } from '@reducers/index';
import { LOAD_MYPOSTS_REQUEST, LOAD_POST_REQUEST } from '@thunks/post';
import { UPDATE_PROFILE_REQUEST } from '@thunks/user';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function myFunctions() {
  const { myPosts } = useSelector((store: RootState) => store.post);
  const dispatch = useDispatch();
  const history = useHistory();

  const loadPost = async (id: string) => {
    await dispatch(LOAD_POST_REQUEST({ postId: id }));
    history.push(`/detail/${id}`);
  };

  const loadMyPost = async (data: { userId: string; lastId: number | null }) => {
    if (Object.keys(myPosts).length === 0) await dispatch(LOAD_MYPOSTS_REQUEST(data));
    history.push(`/myPost/${data.userId}`);
  };

  const updateProfile = async (data: { info: any; modal: any }) => {
    await dispatch(UPDATE_PROFILE_REQUEST(data.info));
    await data.modal(false);
  };

  const limitMaxLength = (value: string, length: number) => {
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
  };

  const limitLengthOnKeyUpEvent = (
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
  };

  return { loadPost, loadMyPost, updateProfile, limitLengthOnKeyUpEvent };
}
