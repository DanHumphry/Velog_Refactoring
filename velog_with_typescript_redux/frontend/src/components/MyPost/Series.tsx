import { RootState } from '@reducers/index';
import React from 'react';
import { useSelector } from 'react-redux';

const Series = () => {
  const { mySeriesPosts } = useSelector((store: RootState) => store.post);

  return (
    <div className="sc-hwwEjo dzWcEQ">
      {[...mySeriesPosts].map((post: any) => {
        const image = post.Posts.filter((v: any) => v.image !== null);
        const lastUpdate = post.Posts[post.Posts.length - 1].PostSeries.createdAt.split('-');
        const date = `${lastUpdate[0]}년 ${lastUpdate[1]}월 ${lastUpdate[2].split('T')[0]}일`;

        return (
          <div className="sc-gzOgki cVbiiY" key={post.id}>
            <a className="sc-dfVpRl boXBJt" href="/">
              {Object.keys(image).length !== 0 ? (
                <div className="sc-jhAzac faWcFi">
                  <img src={image[0].image} alt="" />
                </div>
              ) : null}
            </a>
            <h4>
              <a className="sc-dfVpRl boXBJt" href="/">
                {post.name}
              </a>
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
};

export default Series;
