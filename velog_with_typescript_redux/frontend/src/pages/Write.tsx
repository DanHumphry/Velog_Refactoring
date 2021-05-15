import useInput from '@hooks/useInput';
import React, { useState } from 'react';
import '@styles/Write.css';
import '@styles/Thumbnail.css';
import TextArea from '@components/Write/Textarea';
import Setting from '@components/Write/Setting';

function Write() {
  const [goBack, setGoBack] = useState(false);
  const [title, setTitle] = useInput('');
  const [content, setContent] = useInput('');

  return (
    <>
      {goBack === false ? (
        <TextArea setGoBack={setGoBack} title={title} setTitle={setTitle} content={content} setContent={setContent} />
      ) : (
        <Setting setGoBack={setGoBack} title={title} content={content} />
      )}
    </>
  );
}

export default Write;
