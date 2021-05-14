import useInput from '@hooks/useInput';
import React, { useState, useEffect, useRef } from 'react';
import '@styles/Write.css';
import '@styles/Thumbnail.css';
import TextArea from '@components/Update/Textarea';
import Setting from '@components/Update/Setting';

function Update() {
  const [goBack, setGoBack] = useState(false);
  const [title, setTitle] = useInput('');
  const [content, setContent] = useInput('');

  return (
    <>
      {goBack === false ? (
        <TextArea setGoBack={setGoBack} title={title} setTitle={setTitle} content={content} setContent={setContent} />
      ) : (
        <Setting setGoBack={setGoBack} title={title} setTitle={setTitle} content={content} setContent={setContent} />
      )}
    </>
  );
}

export default Update;
