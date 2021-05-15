export const initialState = {
  mainPosts: [
    {
      id: 0,
      title: '123',
      content: '123123',
      date: '2021-4-13',
      like: 0,
      username: '1234',
      profileImage: '',
      user_pk: 0,
      language: ['C', 'Java'],
      image: '',
    },
  ],
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  myPosts: [],
  filterList: [],
  newOrRec: false,

  singlePost: null,
  imagePaths: [],
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
};

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const FILTER_REQUEST = 'FILTER_REQUEST';
export const FILTER_SUCCESS = 'FILTER_SUCCESS';
export const FILTER_FAILURE = 'FILTER_FAILURE';

export const NEWORREC_REQUEST = 'NEWORREC_REQUEST';
export const NEWORREC_SUCCESS = 'NEWORREC_SUCCESS';
export const NEWORREC_FAILURE = 'NEWORREC_FAILURE';

const Post = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return { ...state, mainPosts: [...state.mainPosts, action.data] };
    case REMOVE_POST_SUCCESS:
      return { ...state, mainPosts: [...state.mainPosts.filter((v: { id: number }) => v.id !== action.data)] };
    case UPDATE_POST_SUCCESS: {
      const temp = [...state.mainPosts];
      const idx = temp.findIndex((v) => v.id === action.data.id);
      temp.splice(idx, 1, action.data);
      return { ...state, mainPosts: temp };
    }
    case FILTER_SUCCESS:
      return { ...state, filterList: action.data };
    case NEWORREC_SUCCESS:
      return { ...state, newOrRec: !state.newOrRec };
    default:
      return state;
  }
};

export default Post;
