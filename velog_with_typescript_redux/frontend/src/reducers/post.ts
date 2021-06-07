export const initialState = {
  mainPosts: [],
  likedPosts: [],
  detailPost: {},
  myPosts: [],
  myLikedPosts: [],
  filterList: [],
  hasMorePosts: true,
  hasMoreMyPosts: true,
  addPostLoading: false, // 포스트 작성중
  addPostDone: false,
  addPostError: null,
  loadPostsLoading: false, // 포스트들 가져오는중
  loadPostsDone: false,
  loadPostsError: null,
  loadLikedPostsLoading: false, // (sortting)포스트들 가져오는중
  loadLikedPostsDone: false,
  loadLikedPostsError: null,
  loadMyPostsLoading: false, // 나의 포스트들 가져오는중
  loadMyPostsDone: false,
  loadMyPostsError: null,
  loadLikedMyPostsLoading: false, // (sortting)나의 포스트들 가져오는중
  loadLikedMyPostsDone: false,
  loadLikedMyPostsError: null,
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
  updateCommentLoading: false, // 댓글 수정중
  updateCommentDone: false,
  updateCommentError: null,
  removeCommentLoading: false, // 댓글 제거중
  removeCommentDone: false,
  removeCommentError: null,
  addReCommentLoading: false, // 대댓글작성중
  addReCommentDone: false,
  addReCommentError: null,
  updateReCommentLoading: false, // 댓글 수정중
  updateReCommentDone: false,
  updateReCommentError: null,
  removeReCommentLoading: false, // 댓글 제거중
  removeReCommentDone: false,
  removeReCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_LIKED_POSTS_REQUEST = 'LOAD_LIKED_POSTS_REQUEST';
export const LOAD_LIKED_POSTS_SUCCESS = 'LOAD_LIKED_POSTS_SUCCESS';
export const LOAD_LIKED_POSTS_FAILURE = 'LOAD_LIKED_POSTS_FAILURE';

export const LOAD_MYPOSTS_REQUEST = 'LOAD_MYPOSTS_REQUEST';
export const LOAD_MYPOSTS_SUCCESS = 'LOAD_MYPOSTS_SUCCESS';
export const LOAD_MYPOSTS_FAILURE = 'LOAD_MYPOSTS_FAILURE';

export const LOAD_LIKED_MYPOSTS_REQUEST = 'LOAD_LIKED_MYPOSTS_REQUEST';
export const LOAD_LIKED_MYPOSTS_SUCCESS = 'LOAD_LIKED_MYPOSTS_SUCCESS';
export const LOAD_LIKED_MYPOSTS_FAILURE = 'LOAD_LIKED_MYPOSTS_FAILURE';

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

export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const ADD_RECOMMENT_REQUEST = 'ADD_RECOMMENT_REQUEST';
export const ADD_RECOMMENT_SUCCESS = 'ADD_RECOMMENT_SUCCESS';
export const ADD_RECOMMENT_FAILURE = 'ADD_RECOMMENT_FAILURE';

export const UPDATE_RECOMMENT_REQUEST = 'UPDATE_RECOMMENT_REQUEST';
export const UPDATE_RECOMMENT_SUCCESS = 'UPDATE_RECOMMENT_SUCCESS';
export const UPDATE_RECOMMENT_FAILURE = 'UPDATE_RECOMMENT_FAILURE';

export const REMOVE_RECOMMENT_REQUEST = 'REMOVE_RECOMMENT_REQUEST';
export const REMOVE_RECOMMENT_SUCCESS = 'REMOVE_RECOMMENT_SUCCESS';
export const REMOVE_RECOMMENT_FAILURE = 'REMOVE_RECOMMENT_FAILURE';

export const FILTER_REQUEST = 'FILTER_REQUEST';
export const FILTER_SUCCESS = 'FILTER_SUCCESS';
export const FILTER_FAILURE = 'FILTER_FAILURE';

export const NEWORREC_REQUEST = 'NEWORREC_REQUEST';
export const NEWORREC_SUCCESS = 'NEWORREC_SUCCESS';
export const NEWORREC_FAILURE = 'NEWORREC_FAILURE';

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

    case LOAD_POSTS_REQUEST: {
      return { ...state, loadPostsLoading: true, loadPostsDone: false, loadPostsError: null };
    }
    case LOAD_POSTS_SUCCESS: {
      const prevPosts = [...state.mainPosts];
      const nextPosts = prevPosts.concat(action.data);
      const isHasMore = action.data.length === 10;
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: true,
        loadPostsError: null,
        mainPosts: nextPosts,
        hasMorePosts: isHasMore,
      };
    }
    case LOAD_POSTS_FAILURE:
      return { ...state, loadPostsLoading: false, loadPostsDone: false, loadPostsError: action.data };

    case LOAD_LIKED_POSTS_REQUEST:
      return {
        ...state,
        loadLikedPostsLoading: true,
        loadLikedPostsDone: false,
        loadLikedPostsError: null,
      };

    case LOAD_LIKED_POSTS_SUCCESS: {
      const prevPosts = [...state.likedPosts];
      const nextPosts = prevPosts.concat(action.data);
      const isHasMore = action.data.length === 10;
      return {
        ...state,
        loadLikedPostsLoading: false,
        loadLikedPostsDone: true,
        loadLikedPostsError: null,
        likedPosts: nextPosts,
        hasMorePosts: isHasMore,
      };
    }
    case LOAD_LIKED_POSTS_FAILURE:
      return { ...state, loadLikedPostsLoading: false, loadLikedPostsDone: false, loadLikedPostsError: action.data };

    case LOAD_MYPOSTS_REQUEST:
      return { ...state, loadMyPostsLoading: true, loadMyPostsDone: false, loadMyPostsError: null };
    case LOAD_MYPOSTS_SUCCESS: {
      const prevPosts = [...state.myPosts];
      const nextPosts = prevPosts.concat(action.data);
      const isHasMore = action.data.length === 5;
      return {
        ...state,
        loadMyPostsLoading: false,
        loadMyPostsDone: true,
        loadMyPostsError: null,
        myPosts: nextPosts,
        hasMoreMyPosts: isHasMore,
      };
    }
    case LOAD_MYPOSTS_FAILURE:
      return { ...state, loadMyPostsLoading: false, loadMyPostsDone: false, loadMyPostsError: action.data };

    case LOAD_LIKED_MYPOSTS_REQUEST:
      return { ...state, loadLikedMyPostsLoading: true, loadLikedMyPostsDone: false, loadLikedMyPostsError: null };

    case LOAD_LIKED_MYPOSTS_SUCCESS: {
      const prevPosts = [...state.myLikedPosts];
      const nextPosts = prevPosts.concat(action.data);
      const isHasMore = action.data.length === 5;
      return {
        ...state,
        loadLikedMyPostsLoading: false,
        loadLikedMyPostsDone: true,
        loadLikedMyPostsError: null,
        myLikedPosts: nextPosts,
        hasMoreMyPosts: isHasMore,
      };
    }
    case LOAD_LIKED_MYPOSTS_FAILURE:
      return {
        ...state,
        loadLikedMyPostsLoading: false,
        loadLikedMyPostsDone: false,
        loadLikedMyPostsError: action.data,
      };

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
      let posts: any[] = [...state.mainPosts];
      posts = posts.filter((v) => v.id !== action.data.PostId);
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
      const post: any = { ...state.detailPost };
      post.Likers.push({ id: action.data.userId });
      return { ...state, likePostLoading: false, likePostDone: true, likePostError: null, detailPost: post };
    }
    case LIKE_POST_FAILURE:
      return { ...state, likePostLoading: false, likePostDone: false, likePostError: action.data };
    case UNLIKE_POST_REQUEST:
      return { ...state, unlikePostLoading: true, unlikePostDone: false, unlikePostError: null };
    case UNLIKE_POST_SUCCESS: {
      const post: any = { ...state.detailPost };
      post.Likers = post.Likers.filter((v: any) => v.id !== action.data.userId);
      return { ...state, unlikePostLoading: false, unlikePostDone: true, unlikePostError: null, detailPost: post };
    }
    case UNLIKE_POST_FAILURE:
      return { ...state, unlikePostLoading: false, unlikePostDone: false, unlikePostError: action.data };

    case ADD_COMMENT_REQUEST:
      return { ...state, addCommentLoading: true, addCommentDone: false, addCommentError: null };
    case ADD_COMMENT_SUCCESS: {
      const post: any = { ...state.detailPost };
      if (post.Comments) post.Comments.push(action.data);
      else post.Comments = [action.data];
      return { ...state, addCommentLoading: false, addCommentDone: true, addCommentError: null, detailPost: post };
    }
    case ADD_COMMENT_FAILURE:
      return { ...state, addCommentLoading: false, addCommentDone: false, addCommentError: action.data };
    case UPDATE_COMMENT_REQUEST:
      return { ...state, updateCommentLoading: true, updateCommentDone: false, updateCommentError: null };
    case UPDATE_COMMENT_SUCCESS: {
      const post: any = { ...state.detailPost };
      const idx = post.Comments.findIndex((comment: any) => comment.id === action.data.id);
      post.Comments[idx] = action.data;
      return {
        ...state,
        updateCommentLoading: false,
        updateCommentDone: true,
        updateCommentError: null,
        detailPost: post,
      };
    }
    case UPDATE_COMMENT_FAILURE:
      return { ...state, updateCommentLoading: false, updateCommentDone: false, updateCommentError: action.data };
    case REMOVE_COMMENT_REQUEST:
      return { ...state, removeCommentLoading: true, removeCommentDone: false, removeCommentError: null };
    case REMOVE_COMMENT_SUCCESS: {
      const post: any = { ...state.detailPost };
      post.Comments = post.Comments.filter((comment: any) => comment.id !== action.data.commentId);
      return {
        ...state,
        removeCommentLoading: false,
        removeCommentDone: true,
        removeCommentError: null,
        detailPost: post,
      };
    }
    case REMOVE_COMMENT_FAILURE:
      return { ...state, removeCommentLoading: false, removeCommentDone: false, removeCommentError: action.data };

    case ADD_RECOMMENT_REQUEST:
      return { ...state, addReCommentLoading: true, addReCommentDone: false, addReCommentError: null };
    case ADD_RECOMMENT_SUCCESS: {
      const post: any = { ...state.detailPost };
      const postComment = post.Comments.find((v: any) => v.id === action.data.CommentId);
      postComment.reComments.push(action.data);
      // else postComment.reComments = [action.data];
      return {
        ...state,
        addReCommentLoading: false,
        addReCommentDone: true,
        addReCommentError: null,
        detailPost: post,
      };
    }
    case ADD_RECOMMENT_FAILURE:
      return { ...state, addReCommentLoading: false, addReCommentDone: false, addReCommentError: action.data };
    case UPDATE_RECOMMENT_REQUEST:
      return { ...state, updateReCommentLoading: true, updateReCommentDone: false, updateReCommentError: null };
    case UPDATE_RECOMMENT_SUCCESS: {
      const post: any = { ...state.detailPost };
      const commentIdx = post.Comments.findIndex((v: any) => v.id === action.data.CommentId);
      const reCommentIdx = post.Comments[commentIdx].reComments.findIndex((v: any) => v.id === action.data.id);
      post.Comments[commentIdx].reComments[reCommentIdx] = action.data;
      return {
        ...state,
        updateReCommentLoading: false,
        updateReCommentDone: true,
        updateReCommentError: null,
        detailPost: post,
      };
    }
    case UPDATE_RECOMMENT_FAILURE:
      return { ...state, updateReCommentLoading: false, updateReCommentDone: false, updateReCommentError: action.data };
    case REMOVE_RECOMMENT_REQUEST:
      return { ...state, removeReCommentLoading: true, removeReCommentDone: false, removeReCommentError: null };
    case REMOVE_RECOMMENT_SUCCESS: {
      const post: any = { ...state.detailPost };
      let idx;
      for (let l = 0; l < post.Comments.length; l += 1) {
        idx = post.Comments[l].reComments.findIndex((reComment: any) => reComment.id === action.data.reCommentId);
        if (idx !== -1) {
          post.Comments[l].reComments.splice(idx, 1);
          break;
        }
      }
      return {
        ...state,
        removeReCommentLoading: false,
        removeReCommentDone: true,
        removeReCommentError: null,
        detailPost: post,
      };
    }
    case REMOVE_RECOMMENT_FAILURE:
      return { ...state, removeReCommentLoading: false, removeReCommentDone: false, removeReCommentError: action.data };

    case FILTER_SUCCESS:
      return { ...state, filterList: action.data };

    default:
      return state;
  }
};

export default Post;
