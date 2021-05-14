import React from 'react';

function Comment() {
  return (
    <div className="detail__comment-wrapper">
      <h4>0개의 댓글</h4>
      <div className="detail__comment-width">
        <div>
          <textarea defaultValue="" placeholder="댓글을 작성하세요" className="comment__textarea" />
          <div className="buttons-wrapper">
            <button type="button" className="comment__btn">
              댓글 작성
            </button>
          </div>
        </div>
        <div className="margin__top">
          <div />
        </div>
      </div>
    </div>
  );
}
export default Comment;
