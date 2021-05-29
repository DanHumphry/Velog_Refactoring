import React, { useState } from 'react';
import '@styles/Write.css';
import '@styles/Thumbnail.css';
import TextArea from '@components/Write/Textarea';
import Setting from '@components/Write/Setting';
import { ADD_POST_REQUEST } from '@thunks/post';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

function Write() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState({
    textSection: { visibility: 'visible' },
    settingSection: { visibility: 'hidden' },
  });
  const [inp, setInp] = useState({ title: '', content: '' });

  const submitWrite = async (e: any) => {
    e.preventDefault();
    let langs = '';

    if (e.nativeEvent.submitter.name === 'settingPropsButton') {
      setInp({ title: e.target.elements.title.value, content: e.target.elements.content.value });
    } else {
      await e.target.elements.langs.forEach((item: HTMLInputElement) => {
        if (item.checked && langs === '') langs += `${item.id}`;
        else if (item.checked) langs += `,${item.id}`;
      });

      const formData = new FormData();
      formData.append('content', inp.content);
      formData.append('title', inp.title);
      formData.append('language', langs);
      if (e.target.elements.imgFile.value) {
        formData.append('image', e.target.elements.imgFile.files[0]);
      }

      await dispatch(ADD_POST_REQUEST(formData));
      history.push('/');
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={(e) => submitWrite(e)}>
      <TextArea visibility={visibility} setVisibility={setVisibility} />
      <Setting visibility={visibility} setVisibility={setVisibility} inp={inp} />
    </form>
  );
}

export default Write;
