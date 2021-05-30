import useInput from '@hooks/useInput';
import { ADD_POST_COMMENT_REQUEST } from '@thunks/post';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface Props {
  detailPost: any;
  me: any;
}

const Comment: React.VFC<Props> = ({ detailPost, me }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useInput('');

  const submitComment = () => {
    dispatch(ADD_POST_COMMENT_REQUEST({ content: comment, postId: detailPost.id, userId: me.id }));
  };

  return (
    <div className="detail__comment-wrapper">
      <h4>0개의 댓글</h4>
      <div className="detail__comment-width">
        <div>
          <textarea
            defaultValue={comment}
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
        {detailPost.Comments.map((comment: any) => {
          return (
            <div key={comment.id} className="sc-rBLzX iNHoKr commentList__container">
              <div className="commentList__article">
                <div className="commentUserInfo">
                  <div className="commentProfile">
                    <Link to={`/mysite/${comment.UserId}`}>
                      <img src={comment.User.profileImg} alt="" />
                    </Link>
                    <div className="comment-info">
                      <div className="commentUsername">
                        <Link to={`/mysite/${comment.UserId}`}>{comment.User.nickname}</Link>
                      </div>
                      <div className="commentDate">
                        {`${comment.createdAt.split('-')[0]}년 ${comment.createdAt.split('-')[1]}월 ${
                          comment.createdAt.split('-')[2].split('T')[0]
                        }일`}
                        {comment.createdAt === comment.updatedAt ? null : '  ·  수정됨'}
                      </div>
                    </div>
                  </div>
                  <div className="actions">
                    {comment.UserId === me.id ? (
                      <>
                        <span>수정</span>
                        <span>삭제</span>
                      </>
                    ) : null}
                  </div>
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
                    <span>답글 달기</span>
                  </div>
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
