import myFunctions from '@hooks/myFunctions';
import PageLoader from '@loader/PageLoader';
import { RootState } from '@reducers/index';
import gravatar from 'gravatar';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST } from '@thunks/post';

interface Props {
  detailPost: any;
  me: any;
}

const Post: React.VFC<Props> = ({ detailPost, me }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    addCommentError,
    addReCommentError,
    updateCommentError,
    updateReCommentError,
    removeCommentError,
    removeReCommentError,
    likePostError,
    unlikePostError,
  } = useSelector((store: RootState) => store.post);
  const { loadMyPost } = myFunctions();

  const [isLiked, setIsLiked] = useState(false);
  const [svgColor, setSvgColor] = useState({ color: 'gray' });

  const updatePost = () => {
    if (detailPost.UserId === me.id) history.push(`/update/${detailPost.id}`);
    else alert('권한이 없습니다.');
  };

  const delPost = () => {
    if (detailPost.UserId === me.id) {
      if (window.confirm('정말 삭제하시겠습니까 ?')) {
        dispatch(REMOVE_POST_REQUEST({ postId: detailPost.id }));
        history.push('/');
      }
    } else alert('권한이 없습니다.');
  };

  const submitLike = () => {
    if (isLiked) dispatch(UNLIKE_POST_REQUEST({ userId: me.id, postId: detailPost.id }));
    else dispatch(LIKE_POST_REQUEST({ userId: me.id, postId: detailPost.id }));
  };

  useEffect(() => {
    const liked = detailPost.Likers.find((v: any) => v.id === me.id);
    if (liked !== undefined) {
      setSvgColor({ color: 'black' });
      setIsLiked(true);
    } else {
      setSvgColor({ color: 'gray' });
      setIsLiked(false);
    }
  }, [detailPost]);

  useEffect(() => {
    if (
      addCommentError ||
      addReCommentError ||
      updateCommentError ||
      updateReCommentError ||
      removeCommentError ||
      removeReCommentError ||
      likePostError ||
      unlikePostError
    ) {
      alert(
        addCommentError ||
          addReCommentError ||
          updateCommentError ||
          updateReCommentError ||
          removeCommentError ||
          removeReCommentError ||
          likePostError ||
          unlikePostError,
      );
    }
  }, [
    addCommentError,
    addReCommentError,
    updateCommentError,
    updateReCommentError,
    removeCommentError,
    removeReCommentError,
    likePostError,
    unlikePostError,
  ]);

  return (
    <>
      <div className="detail__head-wrapper">
        <h1>{detailPost.title}</h1>
        <div className="detail__head-btn">
          {me?.id === detailPost.UserId ? (
            <>
              <button type="button" onClick={updatePost}>
                수정
              </button>
              <button type="button" onClick={delPost}>
                삭제
              </button>
            </>
          ) : null}
        </div>
        <div className="detail__head-info">
          <div className="information">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span className="detail__head-username" onClick={() => loadMyPost(`${detailPost.UserId}`)}>
              {detailPost.User.nickname}
            </span>
            <span className="separator">·</span>
            <span>
              {`${detailPost.createdAt.split('-')[0]}년 ${detailPost.createdAt.split('-')[1]}월 ${
                detailPost.createdAt.split('-')[2].split('T')[0]
              }일`}
              {detailPost.createdAt === detailPost.updatedAt ? null : '  ·  수정됨'}
            </span>
          </div>
        </div>

        <div className="detail__head-like">
          <div className="iCfLcp">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className="dtrfkW" onClick={submitLike}>
              <svg style={svgColor} width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
              </svg>
            </div>
            <div className="sc-iyvyFf bJqQCy">{detailPost.Likers.length}</div>
          </div>
        </div>
        <div className="filetrList">
          <div>
            {detailPost.language.split(',').map((a: string, i: number) => {
              // eslint-disable-next-line react/no-array-index-key
              return <p key={i}>{a}</p>;
            })}
          </div>

          <div className="detail__head-mobileLike">
            <button type="button" className="likeBtn" onClick={submitLike}>
              <svg style={svgColor} width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
              </svg>
              <span>{detailPost.Likers.length}</span>
            </button>
          </div>
        </div>
        {detailPost.image === null ? null : <img src={detailPost.image} alt="" />}
      </div>
      <div className="detail__body-wrapper">
        <div className="detail__content">
          <p>{detailPost.content}</p>
        </div>
      </div>

      <div className="detail__footer-wrapper">
        <div className="detail__writerInfo">
          <div className="detail__topInfo">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div onClick={() => loadMyPost(`${detailPost.UserId}`)}>
              {detailPost.User.profileImg ? (
                <img src={detailPost.User.profileImg} alt="" />
              ) : (
                <img
                  src={gravatar.url(detailPost.User.nickname, { s: '20px', d: 'retro' })}
                  className="user-image"
                  alt="/"
                />
              )}
            </div>
            <div className="detail__userInfo">
              <div className="description">{detailPost.User.myIntroduce}</div>
            </div>
          </div>
          <div className="sc-epnACN eIoWCE" />
          <div className="detail__buttomInfo" />
        </div>
      </div>
    </>
  );
};
export default Post;
