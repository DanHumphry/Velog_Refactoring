import myFunctions from '@hooks/myFunctions';
import { RootState } from '@reducers/index';
import gravatar from 'gravatar';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST } from '@thunks/post';
import { detailPost } from '@typings/db';

interface Props {
  detailPost: detailPost;
}

function Post({ detailPost }: Props) {
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
  const { loadMyPost, loadPost } = myFunctions();

  const { me } = useSelector((store: RootState) => store.user);

  const [seriesModal, setSeriesModal] = useState(false);
  const [currentSeries, setCurrentSeries] = useState(0);
  const [seriesId, setSeriesId] = useState({ prev: 0, current: 0, next: 0 });

  const [isLiked, setIsLiked] = useState(false);
  const [likeBtnStyle, setLikeBtnStyle] = useState({
    svg: {},
    svgParent: {},
  });

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
    const liked = detailPost.Likers.find((v: { id: number }) => v.id === me.id);
    if (liked !== undefined) {
      setLikeBtnStyle({
        svg: { color: 'white' },
        svgParent: { backgroundColor: 'rgb(56, 217, 169)', border: 'none' },
      });
      setIsLiked(true);
    } else {
      setLikeBtnStyle({ svg: {}, svgParent: {} });
      setIsLiked(false);
    }

    if (Object.keys(detailPost.series).length) {
      const currentIndex = detailPost.series[0].Posts.findIndex((v: { id: number }) => v.id === detailPost.id);
      setCurrentSeries(currentIndex);
      const id = {
        prev: detailPost.series[0].Posts[currentIndex - 1]?.id,
        current: detailPost.series[0].Posts[currentIndex].id,
        next: detailPost.series[0].Posts[currentIndex + 1]?.id,
      };
      setSeriesId(id);
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
            <span
              className="detail__head-username"
              onClick={() => loadMyPost({ userId: detailPost.UserId, lastId: null })}
            >
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
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div style={likeBtnStyle.svgParent} className="dtrfkW" onClick={submitLike}>
              <svg style={likeBtnStyle.svg} width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
              </svg>
            </div>
            <div className="sc-iyvyFf bJqQCy">{detailPost.Likers.length}</div>
          </div>
        </div>
        <div className="filetrList">
          <div>
            {detailPost.tags.map((tag: { id: number; name: string }) => (
              <p key={tag.id}>{tag.name}</p>
            ))}
          </div>

          <div className="detail__head-mobileLike">
            <button style={likeBtnStyle.svgParent} type="button" className="likeBtn" onClick={submitLike}>
              <svg style={likeBtnStyle.svg} width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
              </svg>
              <span>{detailPost.Likers.length}</span>
            </button>
          </div>
        </div>
        {Object.keys(detailPost.series).length ? (
          <div className="sc-TOsTZ eeUjPp">
            <h2>{detailPost.series[0].name}</h2>
            <svg width="32" height="48" fill="none" viewBox="0 0 32 48" className="series-corner-image">
              <path fill="#12B886" d="M32 0H0v48h.163l16-16L32 47.836V0z" />
            </svg>
            {seriesModal ? (
              <ol className="sc-kvZOFW jYLshN">
                {detailPost.series[0].Posts.map((series: any) => (
                  <li key={series.id}>
                    <button type="button" onClick={() => loadPost(series.id)}>
                      {series.title}
                    </button>
                  </li>
                ))}
              </ol>
            ) : null}

            <div className="sc-ksYbfQ bqagB">
              <button type="button" className="sc-cJSrbW kGgGBF" onClick={() => setSeriesModal(!seriesModal)}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14l5-5 5 5z" />
                </svg>
                {seriesModal ? '숨기기' : '목록보기'}
              </button>
              <div className="sc-kgAjT lbOAwN">
                <div className="series-number">{`${currentSeries + 1}/${detailPost.series[0].Posts.length}`}</div>
                <div className="sc-hmzhuo ebXfAn">
                  <button
                    type="button"
                    className="sc-frDJqD kuTfSg"
                    disabled={seriesId.prev === undefined}
                    onClick={() => loadPost(seriesId.prev)}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="sc-frDJqD kuTfSg"
                    disabled={seriesId.next === undefined}
                    onClick={() => loadPost(seriesId.next)}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {detailPost.image === null ? null : <img src={detailPost.image} alt="" />}
      </div>
      <div className="detail__body-wrapper">
        <div className="detail__content">
          {detailPost.content.split('\n').map((line: string, idx: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={idx}>
              {line}
              <br />
            </p>
          ))}
        </div>
      </div>

      <div className="detail__footer-wrapper">
        <div className="detail__writerInfo">
          <div className="detail__topInfo">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div onClick={() => loadMyPost({ userId: detailPost.UserId, lastId: null })}>
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
}
export default Post;
