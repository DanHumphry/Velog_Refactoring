export const initialState = {
  mainPosts: [],
  detailPost: {},
  myPosts: [],
  filterList: [],
  addPostLoading: false, // 포스트 작성중
  addPostDone: false,
  addPostError: null,
  loadPostsLoading: false, // 포스트들 가져오는중
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false, // 포스트 가져오는중
  loadPostDone: false,
  loadPostError: null,
  updatePostLoading: false, // 포스트 수정중
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false, // 포스트 제거중
  removePostDone: false,
  removePostError: null,
  likePostLoading: false, // 좋아요 요청중
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false, // 좋아요 취소중
  unlikePostDone: false,
  unlikePostError: null,
  addCommentLoading: false, // 댓글작성중
  addCommentDone: false,
  addCommentError: null,

  newOrRec: false,

  singlePost: null,
  imagePaths: [],
  hasMorePosts: true,

  myPostNavModal: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const FILTER_REQUEST = 'FILTER_REQUEST';
export const FILTER_SUCCESS = 'FILTER_SUCCESS';
export const FILTER_FAILURE = 'FILTER_FAILURE';

export const NEWORREC_REQUEST = 'NEWORREC_REQUEST';
export const NEWORREC_SUCCESS = 'NEWORREC_SUCCESS';
export const NEWORREC_FAILURE = 'NEWORREC_FAILURE';

export const SET_POST_NAV_MODAL = 'SET_POST_NAV_MODAL';

const Post = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { ...state, addPostLoading: true, addPostDone: false, addPostError: null };
    case ADD_POST_SUCCESS: {
      const posts: any[] = [...state.mainPosts];
      posts.unshift(action.data);
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        addPostError: null,
        mainPosts: posts,
      };
    }
    case ADD_POST_FAILURE:
      return { ...state, addPostLoading: false, addPostDone: false, addPostError: action.data };

    case LOAD_POSTS_REQUEST:
      return { ...state, loadPostsLoading: true, loadPostsDone: false, loadPostsError: null };
    case LOAD_POSTS_SUCCESS:
      return { ...state, loadPostsLoading: false, loadPostsDone: true, loadPostsError: null, mainPosts: action.data };
    case LOAD_POSTS_FAILURE:
      return { ...state, loadPostsLoading: false, loadPostsDone: false, loadPostsError: action.data };

    case LOAD_POST_REQUEST:
      return { ...state, loadPostLoading: true, loadPostDone: false, loadPostError: null };
    case LOAD_POST_SUCCESS:
      return { ...state, loadPostLoading: false, loadPostDone: true, loadPostError: null, detailPost: action.data };
    case LOAD_POST_FAILURE:
      return { ...state, loadPostLoading: false, loadPostDone: false, loadPostError: action.data };

    case UPDATE_POST_REQUEST:
      return { ...state, updatePostLoading: true, updatePostDone: false, updatePostError: null };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        updatePostLoading: false,
        updatePostDone: true,
        updatePostError: null,
        detailPost: action.data,
      };
    case UPDATE_POST_FAILURE:
      return { ...state, updatePostLoading: false, updatePostDone: false, updatePostError: action.data };

    case REMOVE_POST_REQUEST:
      return { ...state, removePostLoading: true, removePostDone: false, removePostError: null };
    case REMOVE_POST_SUCCESS: {
      const posts: any[] = [...state.mainPosts];
      posts.filter((v) => v.id !== action.data.PostId);
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        removePostError: null,
        detailPost: {},
        mainPosts: posts,
      };
    }
    case REMOVE_POST_FAILURE:
      return { ...state, removePostLoading: false, removePostDone: false, removePostError: action.data };

    case LIKE_POST_REQUEST:
      return { ...state, likePostLoading: true, likePostDone: false, likePostError: null };
    case LIKE_POST_SUCCESS: {
      const posts: any[] = [...state.mainPosts];
      const post = posts.find((v) => v.id === action.data.postId);
      if (post.liker) post.liker += `,${action.data.userId}`;
      else post.liker = `${action.data.userId}`;
      post.like += 1;
      return { ...state, likePostLoading: false, likePostDone: true, likePostError: null, detailPost: post };
    }
    case LIKE_POST_FAILURE:
      return { ...state, likePostLoading: false, likePostDone: false, likePostError: action.data };
    case UNLIKE_POST_REQUEST:
      return { ...state, unlikePostLoading: true, unlikePostDone: false, unlikePostError: null };
    case UNLIKE_POST_SUCCESS: {
      const posts: any[] = [...state.mainPosts];
      const post = posts.find((v) => v.id === action.data.postId);
      const liker = post.liker.split(',');
      const idx = liker.find((v: string) => +v === action.data.userId);
      liker.splice(idx, 1);
      post.liker = liker.join('');
      post.like -= 1;
      return { ...state, unlikePostLoading: false, unlikePostDone: true, unlikePostError: null, detailPost: post };
    }
    case UNLIKE_POST_FAILURE:
      return { ...state, unlikePostLoading: false, unlikePostDone: false, unlikePostError: action.data };

    case ADD_COMMENT_REQUEST:
      return { ...state, addCommentLoading: true, addCommentDone: false, addCommentError: null };
    case ADD_COMMENT_SUCCESS: {
      const post: any = { ...state.detailPost };
      post.Comments.push(action.data);
      return { ...state, addCommentLoading: false, addCommentDone: true, addCommentError: null, detailPost: post };
    }
    case ADD_COMMENT_FAILURE:
      return { ...state, addCommentLoading: false, addCommentDone: false, addCommentError: action.data };

    case FILTER_SUCCESS:
      return { ...state, filterList: action.data };
    case NEWORREC_SUCCESS:
      return { ...state, newOrRec: !state.newOrRec };
    case SET_POST_NAV_MODAL:
      return { ...state, myPostNavModal: action.data };
    default:
      return state;
  }
};

export default Post;
