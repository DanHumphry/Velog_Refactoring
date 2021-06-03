import myFunctions from '@hooks/myFunctions';
import useInput from '@hooks/useInput';
import { ADD_POST_RECOMMENT_REQUEST, REMOVE_POST_RECOMMENT_REQUEST, UPDATE_POST_RECOMMENT_REQUEST } from '@thunks/post';
import gravatar from 'gravatar';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  comment: any;
  me: any;
}

const ReComment: React.VFC<Props> = ({ comment, me }) => {
  const dispatch = useDispatch();
  const { loadMyPost } = myFunctions();

  const [reCommentInput, setReCommentInput, resetInput] = useInput('');

  const [updateReCommentInput, setUpdateReCommentInput, resetUpdateReComment] = useInput('');
  const [updateReCommentModal, setUpdateReCommentModal] = useState<number | null>(null);

  const showReCommentUpdateInput = (id: number | null) => {
    setUpdateReCommentModal(id);
    resetUpdateReComment('');
  };

  const submitReComment = () => {
    if (reCommentInput !== '') {
      dispatch(
        ADD_POST_RECOMMENT_REQUEST({
          content: reCommentInput,
          userId: me.id,
          commentId: comment.id,
        }),
      );
      resetInput('');
    }
  };

  const updateReComment = async (reCommentId: string) => {
    await dispatch(UPDATE_POST_RECOMMENT_REQUEST({ content: updateReCommentInput, reCommentId }));
    setUpdateReCommentModal(null);
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
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                    <div onClick={() => loadMyPost({ userId: `${reComment.UserId}`, lastId: null })}>
                      {reComment.User.profileImg ? (
                        <img src={reComment.User.profileImg} alt="comment-user-thumbnail" />
                      ) : (
                        <img src={gravatar.url(me.nickname, { s: '20px', d: 'retro' })} alt="" />
                      )}
                    </div>
                    <div className="comment-info">
                      <div className="username">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div onClick={() => loadMyPost({ userId: `${reComment.UserId}`, lastId: null })}>
                          {reComment.User.nickname}
                        </div>
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
                      <button type="button" onClick={() => showReCommentUpdateInput(reComment.id)}>
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => removeReComment({ writtenUser: reComment.UserId, reCommentId: reComment.id })}
                      >
                        삭제
                      </button>
                    </div>
                  ) : null}
                </div>
                {updateReCommentModal !== reComment.id ? (
                  <div className="sc-uJMKN fbcLAc">
                    <div className="sc-btzYZH dfktCZ">
                      <div className="sc-uJMKN fbcLAc">
                        <div className="sc-bbmXgH gDQvzU atom-one-light">
                          {reComment.content.split('\n').map((line: string, idx: number) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <p key={idx}>
                              {line}
                              <br />
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="sc-hEsumM diaLmo">
                    <textarea
                      placeholder="댓글을 작성하세요"
                      className="sc-ktHwxA kMZaKo"
                      defaultValue={reComment.content}
                      onChange={setUpdateReCommentInput}
                    />
                    <div className="buttons-wrapper">
                      <button type="button" className="sc-dnqmqq eLHDzq" onClick={() => showReCommentUpdateInput(null)}>
                        취소
                      </button>
                      <button type="button" className="sc-dnqmqq gzELJz" onClick={() => updateReComment(reComment.id)}>
                        댓글 수정
                      </button>
                    </div>
                  </div>
                )}
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
