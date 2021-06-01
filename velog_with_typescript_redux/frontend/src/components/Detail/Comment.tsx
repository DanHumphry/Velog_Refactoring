import ReComment from '@components/Detail/ReComment';
import useInput from '@hooks/useInput';
import { ADD_POST_COMMENT_REQUEST, REMOVE_POST_COMMENT_REQUEST, UPDATE_POST_COMMENT_REQUEST } from '@thunks/post';
import gravatar from 'gravatar';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface Props {
  detailPost: any;
  me: any;
}

const Comment: React.VFC<Props> = ({ detailPost, me }) => {
  const dispatch = useDispatch();
  const [comment, setComment, resetInput] = useInput('');

  const [reCommentModal, setReCommentModal] = useState([] as any);

  const submitComment = () => {
    dispatch(ADD_POST_COMMENT_REQUEST({ content: comment, postId: detailPost.id, userId: me.id }));
    resetInput('');
  };

  const showReCommentModal = (id: number) => {
    const temp: any = [...reCommentModal];
    if (temp.indexOf(id) === -1) temp.push(id);
    else temp.splice(temp.indexOf(id), 1);

    setReCommentModal(temp);
  };

  const updateComment = () => {
    dispatch(UPDATE_POST_COMMENT_REQUEST({}));
  };

  const removeComment = (data: { writtenUser: number; commentId: number }) => {
    if (data.writtenUser === me.id) {
      if (window.confirm('정말 삭제하시겠습니까 ?')) {
        dispatch(REMOVE_POST_COMMENT_REQUEST(data));
      }
    } else alert('권한이 없습니다.');
  };

  const [commentCnt, setCommentCnt] = useState(0);
  useEffect(() => {
    let cnt = 0;
    for (let i = 0; i < detailPost.Comments?.length; i += 1) {
      cnt += detailPost.Comments[i].reComments?.length + 1;
    }
    setCommentCnt(cnt);
  }, [detailPost]);

  return (
    <div className="detail__comment-wrapper">
      <h4>{commentCnt}개의 댓글</h4>
      <div className="detail__comment-width">
        <div>
          <textarea
            value={comment}
            placeholder="댓글을 작성하세요"
            className="comment__textarea"
            onChange={setComment}
          />
          <div className="buttons-wrapper">
            <button type="button" className="comment__btn" onClick={() => submitComment()}>
              댓글 작성
            </button>
          </div>
        </div>
        <div className="margin__top">
          <div />
        </div>
        {detailPost.Comments?.map((comment: any) => {
          return (
            <div key={comment.id} className="sc-rBLzX iNHoKr commentList__container">
              <div className="commentList__article">
                <div className="commentUserInfo">
                  <div className="commentProfile">
                    <Link to={`/myPost/${comment.UserId}`}>
                      {comment.User.profileImg === null ||
                      comment.User.profileImg === '' ||
                      comment.User.profileImg === undefined ? (
                        <img src={gravatar.url(me.nickname, { s: '20px', d: 'retro' })} alt="" />
                      ) : (
                        <img src={comment.User.profileImg} alt="" />
                      )}
                    </Link>
                    <div className="comment-info">
                      <div className="commentUsername">
                        <Link to={`/myPost/${comment.UserId}`}>{comment.User.nickname}</Link>
                      </div>
                      <div className="commentDate">
                        {`${comment.createdAt.split('-')[0]}년 ${comment.createdAt.split('-')[1]}월 ${
                          comment.createdAt.split('-')[2].split('T')[0]
                        }일`}
                        {comment.createdAt === comment.updatedAt ? null : '  ·  수정됨'}
                      </div>
                    </div>
                  </div>
                  {comment.UserId === me.id ? (
                    <div className="actions">
                      <button type="button">수정</button>
                      <button
                        type="button"
                        onClick={() => removeComment({ writtenUser: comment.UserId, commentId: comment.id })}
                      >
                        삭제
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className="commentContent">
                  <div className="sc-CtfFt jUJTZI">
                    <div className="sc-kafWEX hQjZHl">
                      <div className="sc-feJyhm gzDGWh atom-one-light">
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reCommentOpen">
                  <div className="sc-hGoxap cHbAfK">
                    <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                      <path fill="currentColor" d="M5.5 2.5h1v3h3v1h-3v3h-1v-3h-3v-1h3v-3z" />
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M1 0a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm10 1H1v10h10V1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                    <span onClick={() => showReCommentModal(comment.id)}>
                      {reCommentModal.indexOf(comment.id) !== -1 ? '숨기기' : '답글 달기'}
                    </span>
                  </div>
                  {reCommentModal.indexOf(comment.id) !== -1 ? <ReComment comment={comment} me={me} /> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Comment;
