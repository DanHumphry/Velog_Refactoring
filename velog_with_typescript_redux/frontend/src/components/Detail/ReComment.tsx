import useInput from '@hooks/useInput';
import {
  ADD_POST_RECOMMENT_REQUEST,
  LOAD_POST_REQUEST,
  REMOVE_POST_RECOMMENT_REQUEST,
  UPDATE_POST_RECOMMENT_REQUEST,
} from '@thunks/post';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface Props {
  comment: any;
  me: any;
}

const ReComment: React.VFC<Props> = ({ comment, me }) => {
  const dispatch = useDispatch();
  const [reCommentInput, setReCommentInput, resetInput] = useInput('');

  const submitReComment = () => {
    dispatch(
      ADD_POST_RECOMMENT_REQUEST({
        content: reCommentInput,
        userId: me.id,
        commentId: comment.id,
      }),
    );
    resetInput('');
  };

  const updateReComment = () => {
    dispatch(UPDATE_POST_RECOMMENT_REQUEST({}));
  };

  const removeReComment = (data: { writtenUser: number; reCommentId: number }) => {
    if (data.writtenUser === me.id) {
      if (window.confirm('정말 삭제하시겠습니까 ?')) {
        dispatch(REMOVE_POST_RECOMMENT_REQUEST(data));
      }
    } else alert('권한이 없습니다.');
  };

  return (
    <>
      <div className="sc-cIShpX cMzaJe">
        <div className="sc-kafWEX katOWY" />
        {comment.reComments?.map((reComment: any) => (
          <div key={reComment.id}>
            <div className="sc-kafWEX katOWY" />
            <div className="sc-elJkPf jRsZyA">
              <div className="sc-cmTdod kzRjyM comment">
                <div className="sc-jwKygS ezDpwK">
                  <div className="profile">
                    <Link to={`/myPost/${reComment.UserId}`}>
                      <img src={reComment.User.profileImg} alt="comment-user-thumbnail" />
                    </Link>
                    <div className="comment-info">
                      <div className="username">
                        <Link to={`/myPost/${reComment.UserId}`}>{reComment.User.nickname}</Link>
                      </div>
                      <div className="date">
                        {`${reComment.createdAt.split('-')[0]}년 
                        ${reComment.createdAt.split('-')[1]}월 
                        ${reComment.createdAt.split('-')[2].split('T')[0]}일`}
                        {reComment.createdAt === reComment.updatedAt ? null : '  ·  수정됨'}
                      </div>
                    </div>
                  </div>
                  {me.id === reComment.UserId ? (
                    <div className="actions">
                      <button type="button">수정</button>
                      <button
                        type="button"
                        onClick={() => removeReComment({ writtenUser: reComment.UserId, reCommentId: reComment.id })}
                      >
                        삭제
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className="sc-uJMKN fbcLAc">
                  <div className="sc-btzYZH dfktCZ">
                    <div className="sc-uJMKN fbcLAc">
                      <div className="sc-bbmXgH gDQvzU atom-one-light">
                        <p>{reComment.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sc-feJyhm sMZHE" />
          </div>
        ))}
        <div className="sc-elJkPf jRsZyA" />
        <div className="sc-hEsumM diaLmo">
          <textarea
            value={reCommentInput}
            placeholder="댓글을 작성하세요"
            className="sc-ktHwxA kMZaKo"
            onChange={setReCommentInput}
          />
          <div className="buttons-wrapper">
            <button type="button" className="sc-dnqmqq gzELJz" onClick={submitReComment}>
              댓글 작성
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReComment;
