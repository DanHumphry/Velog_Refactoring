import myFunctions from '@hooks/myFunctions';
import { RootState } from '@reducers/index';
import React from 'react';
import { useSelector } from 'react-redux';

function Series() {
  const { mySeriesPosts } = useSelector((store: RootState) => store.post);
  const { loadPost } = myFunctions();

  if (Object.keys(mySeriesPosts).length === 0) {
    return (
      <div className="sc-kafWEX ksEIiH">
        <img src="https://static.velog.io/static/media/undraw_blank_canvas_3rbb.35e81baf.svg" alt="list is empty" />
        <div className="message">포스트가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="sc-hwwEjo dzWcEQ">
      {[...mySeriesPosts].map((post: any) => {
        const image = post.Posts.filter((v: { image: string }) => v.image !== null);
        const lastUpdate = post.Posts[post.Posts.length - 1].PostSeries.createdAt.split('-');
        const date = `${lastUpdate[0]}년 ${lastUpdate[1]}월 ${lastUpdate[2].split('T')[0]}일`;

        return (
          <div className="sc-gzOgki cVbiiY" key={post.id}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className="sc-dfVpRl boXBJt" onClick={() => loadPost(post.Posts[0].id)}>
              {Object.keys(image).length !== 0 ? (
                <div className="sc-jhAzac faWcFi">
                  <img src={image[0].image} alt="" />
                </div>
              ) : null}
            </div>
            <h4>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div className="sc-dfVpRl boXBJt" onClick={() => loadPost(post.Posts[0].id)}>
                {post.name}
              </div>
            </h4>
            <div className="info">
              <span className="count">{post.Posts.length}개의 포스트</span>
              <span className="dot">·</span>마지막 업데이트 {date}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Series;
