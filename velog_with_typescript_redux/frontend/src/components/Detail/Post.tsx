import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST } from '@thunks/post';

interface Props {
  detailPost: any;
  me: any;
}

const Post: React.VFC<Props> = ({ detailPost, me }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(
    { ...detailPost }.liker?.split(',').filter((v: string) => +v === me.id).length || 0,
  );
  const [svgColor, setSvgColor] = useState({ color: 'gray' });

  const updatePost = () => {
    if (detailPost.UserId === me.id) history.push(`/update/${detailPost.id}`);
    else alert('권한이 없습니다.');
  };

  const delPost = () => {
    if (detailPost.UserId === me.id) {
      if (window.confirm('정말 삭제하시겠습니까 ?')) {
        dispatch(REMOVE_POST_REQUEST(detailPost.id));
        history.push('/');
      }
    } else alert('권한이 없습니다.');
  };

  const submitLike = () => {
    if (isLiked) dispatch(UNLIKE_POST_REQUEST({ userId: me.id, postId: detailPost.id }));
    else dispatch(LIKE_POST_REQUEST({ userId: me.id, postId: detailPost.id }));
  };

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
            <span className="detail__head-username">{detailPost.User.nickname}</span>
            <span className="separator">·</span>
            <span>{`${detailPost.createdAt.split('-')[0]}년 ${detailPost.createdAt.split('-')[1]}월 ${
              detailPost.createdAt.split('-')[2].split('T')[0]
            }일`}</span>
          </div>
        </div>

        <div className="detail__head-like">
          <div className="iCfLcp">
            <div className="dtrfkW">
              <svg style={svgColor} width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
              </svg>
            </div>
            <div className="sc-iyvyFf bJqQCy">{detailPost.like}</div>
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
              <span>{detailPost.like}</span>
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
            <Link to={`/myPost/${detailPost.UserId}`}>
              <img src={detailPost.User.profileImg} alt="" />
            </Link>
            <div className="detail__userInfo">
              <div className="description">{detailPost.User.myIntroduce}</div>
            </div>
          </div>
          <div className="sc-epnACN eIoWCE" />
          <div className="detail__buttomInfo">
            <div>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <mask id="github" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse">
                  <path
                    fill="#ffffff"
                    fillRule="evenodd"
                    d="M6.69 15.944c0 .08-.093.145-.21.145-.133.012-.226-.053-.226-.145 0-.081.093-.146.21-.146.12-.012.226.053.226.146zm-1.255-.182c-.028.08.053.173.174.198.105.04.226 0 .25-.081.024-.08-.053-.173-.174-.21-.104-.028-.221.012-.25.093zm1.783-.068c-.117.028-.198.104-.186.197.012.08.117.133.238.105.117-.028.198-.105.186-.186-.012-.076-.121-.129-.238-.116zM9.87.242C4.278.242 0 4.488 0 10.08c0 4.471 2.815 8.298 6.835 9.645.516.093.697-.226.697-.488 0-.25-.012-1.63-.012-2.476 0 0-2.822.605-3.415-1.202 0 0-.46-1.173-1.121-1.475 0 0-.924-.633.064-.621 0 0 1.004.08 1.557 1.04.883 1.557 2.363 1.109 2.94.843.092-.645.354-1.093.645-1.36-2.255-.25-4.529-.576-4.529-4.455 0-1.109.307-1.665.952-2.375-.105-.262-.448-1.342.105-2.738C5.56 4.157 7.5 5.51 7.5 5.51a9.474 9.474 0 0 1 2.532-.344c.86 0 1.726.117 2.533.343 0 0 1.939-1.355 2.782-1.089.552 1.4.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.63 4.456.372.319.686.923.686 1.87 0 1.36-.012 3.041-.012 3.372 0 .262.186.58.698.488C17.266 18.379 20 14.552 20 10.08 20 4.488 15.464.24 9.871.24zM3.919 14.149c-.052.04-.04.133.029.21.064.064.157.093.21.04.052-.04.04-.133-.029-.21-.064-.064-.157-.092-.21-.04zm-.435-.326c-.028.052.012.117.093.157.064.04.145.028.173-.028.028-.053-.012-.117-.093-.158-.08-.024-.145-.012-.173.029zm1.306 1.435c-.064.053-.04.174.053.25.092.093.21.105.262.04.052-.052.028-.173-.053-.25-.088-.092-.21-.104-.262-.04zm-.46-.593c-.064.04-.064.146 0 .238.065.093.174.133.226.093.065-.053.065-.157 0-.25-.056-.093-.16-.133-.225-.08z"
                    clipRule="evenodd"
                  />
                </mask>
                <g mask="url(#github)">
                  <path fill="currentColor" d="M0 0h20v20H0z" />
                </g>
              </svg>
            </div>
            <div>
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32" data-testid="email">
                <path
                  fill="currentColor"
                  d="M16 16.871L1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
