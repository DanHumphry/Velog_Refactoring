import myFunctions from '@hooks/myFunctions';
import React from 'react';

interface Props {
  myPosts: any;
}

const Content: React.VFC<Props> = ({ myPosts }) => {
  const { loadPost } = myFunctions();

  if (myPosts.length === 0) {
    return (
      <div className="sc-kafWEX ksEIiH">
        <img src="https://static.velog.io/static/media/undraw_blank_canvas_3rbb.35e81baf.svg" alt="list is empty" />
        <div className="message">포스트가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="contents-section">
      <div className="filter-bar" />
      <div className="myContents">
        <div className="myContents_">
          {myPosts.map((post: any) => {
            const temp = post.createdAt.split('-');
            const date = `${temp[0]}년 ${temp[1]}월 ${temp[2].split('T')[0]}일`;

            let commentCnt = post.Comments.length;
            for (let i = 0; i < post.Comments.length; i += 1) commentCnt += post.Comments[i].reComments.length;

            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div className="contents-article" key={post.id} onClick={() => loadPost(post.id)}>
                {post.image === null || post.image === undefined || post.image === '' ? null : (
                  <div>
                    <div className="article-thumbnail">
                      <img src={post.image} alt="/" />
                    </div>
                  </div>
                )}
                <div>
                  <h2>{post.title}</h2>
                </div>
                <p>{post.content}</p>
                <div className="contents-filter">
                  {post.language.split(',').map((L: string, i: number) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <p key={i}>{L}</p>;
                  })}
                </div>
                <div className="time-info">
                  <span>{date}</span>
                  <div className="separator">·</div>
                  <span>{commentCnt}개의 댓글</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Content;
