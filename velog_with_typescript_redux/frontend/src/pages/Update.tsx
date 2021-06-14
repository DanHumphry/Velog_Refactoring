import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import { LOAD_SERIES_LIST_REQUEST, UPDATE_POST_REQUEST } from '@thunks/post';
import React, { useEffect, useState } from 'react';
import '@styles/Write.css';
import '@styles/Thumbnail.css';
import TextArea from '@components/Update/Textarea';
import Setting from '@components/Update/Setting';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

function Update() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { me } = useSelector((store: RootState) => store.user);
  const { updatePostLoading } = useSelector((store: RootState) => store.post);
  const { detailPost }: any = useSelector((store: RootState) => store.post);

  const [tag, setTag] = useState<string[]>(detailPost.tags.map((v: any) => v.name));

  const [visibility, setVisibility] = useState({
    textSection: { visibility: 'visible' },
    settingSection: { visibility: 'hidden' },
  });
  const [inp, setInp] = useState({ title: '', content: '' });
  const [imgURL, setImgURL] = useState<string>(detailPost.image);

  const submitWrite = async (e: any) => {
    e.preventDefault();

    if (me.id === detailPost.UserId) {
      if (e.nativeEvent.submitter.name === 'settingPropsButton') {
        setInp({ title: e.target.elements.title.value, content: e.target.elements.content.value });
      } else {
        const formData = new FormData();
        formData.append('content', inp.content);
        formData.append('title', inp.title);
        formData.append('tag', tag.join(','));
        if (e.target.elements.postSeries) formData.append('series', e.target.elements.postSeries.value);
        if (e.target.elements.imgFile.value) {
          formData.append('image', e.target.elements.imgFile.files[0]);
        } else if (detailPost.image && imgURL !== '') {
          formData.append('image', detailPost.image);
        }

        await dispatch(UPDATE_POST_REQUEST({ postId: detailPost.id, data: formData }));
        history.push(`/detail/${detailPost.id}`);
      }
    } else {
      alert('권한이 없는 사용자 입니다.');
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

  if (updatePostLoading) return <PageLoader />;

  return (
    <form encType="multipart/form-data" onSubmit={(e) => submitWrite(e)}>
      <TextArea visibility={visibility} setVisibility={setVisibility} detailPost={detailPost} />
      <Setting
        visibility={visibility}
        setVisibility={setVisibility}
        inp={inp}
        imgURL={imgURL}
        setImgURL={setImgURL}
        tag={tag}
        setTag={setTag}
        detailPost={detailPost}
      />
    </form>
  );
}

export default Update;
