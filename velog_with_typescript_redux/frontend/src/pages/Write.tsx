import PageLoader from '@loader/PageLoader';
import React, { useEffect, useState } from 'react';
import '@styles/Write.css';
import '@styles/Thumbnail.css';
import TextArea from '@components/Write/Textarea';
import Setting from '@components/Write/Setting';
import { ADD_POST_REQUEST, LOAD_SERIES_LIST_REQUEST } from '@thunks/post';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '@reducers/index';

function Write() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { addPostLoading } = useSelector((store: RootState) => store.post);
  const { me } = useSelector((store: RootState) => store.user);

  const [tag, setTag] = useState<string[]>([]);

  const [visibility, setVisibility] = useState({
    textSection: { visibility: 'visible' },
    settingSection: { visibility: 'hidden' },
  });
  const [inp, setInp] = useState({ title: '', content: '' });

  const submitWrite = async (e: any) => {
    e.preventDefault();

    if (e.target.elements.title.value === '' || e.target.elements.content.value === '') {
      alert('제목과 내용은 필수입력사항입니다.');
    } else if (e.nativeEvent.submitter.name === 'settingPropsButton') {
      setInp({ title: e.target.elements.title.value, content: e.target.elements.content.value });
      setVisibility({ textSection: { visibility: 'hidden' }, settingSection: { visibility: 'visible' } });
    } else {
      const formData = new FormData();
      formData.append('content', inp.content);
      formData.append('title', inp.title);
      formData.append('tag', tag.join(','));
      if (e.target.elements.postSeries) formData.append('series', e.target.elements.postSeries.value);

      if (e.target.elements.imgFile.value) {
        formData.append('image', e.target.elements.imgFile.files[0]);
      }
      await dispatch(ADD_POST_REQUEST(formData));
      history.push('/');
    }
  };

  useEffect(() => {
    if (Object.keys(me).length === 0) {
      alert('로그인이 필요한 서비스입니다.');
      history.push('/');
    } else {
      dispatch(LOAD_SERIES_LIST_REQUEST({ userId: me.id }));
    }
  }, [me]);

  if (addPostLoading) return <PageLoader />;

  return (
    <form encType="multipart/form-data" onSubmit={(e) => submitWrite(e)}>
      <TextArea visibility={visibility} />
      <Setting visibility={visibility} setVisibility={setVisibility} inp={inp} tag={tag} setTag={setTag} />
    </form>
  );
}

export default Write;
