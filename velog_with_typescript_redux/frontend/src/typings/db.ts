export interface mainPosts {
  id: number;
  content: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  User: {
    id: number;
    nickname: string;
    profileImg: string;
    myIntroduce: string;
  };
  Comments: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    PostId: number;
    UserId: number;
    User: { id: number; nickname: string; profileImg: string };
    reComments: {
      id: number;
      content: string;
      createdAt: string;
      updatedAt: string;
      UserId: number;
      CommentId: number;
    }[];
  }[];
  Likers: { id: number }[];
  tags: {
    id: number;
    name: string;
    PostTag: {
      createdAt: string;
      updatedAt: string;
      PostId: number;
      tagId: number;
    };
  }[];
}
export interface detailPost extends mainPosts {
  series: {
    id: number;
    name: string;
    Posts: { id: number; title: string; UserId: number }[];
    PostSeries: {
      createdAt: string;
      updatedAt: string;
      PostId: number;
      seriesId: number;
    };
  }[];
}
export type comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  PostId: number;
  UserId: number;
  User: { id: number; nickname: string; profileImg: string };
  reComments: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
    CommentId: number;
  }[];
};
export interface myPosts {
  id: number;
  content: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  User: {
    id: number;
    nickname: string;
    profileImg: string;
    myIntroduce: string;
    git: string;
  };
  Comments: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    PostId: number;
    UserId: number;
    User: { id: number; nickname: string; profileImg: string };
    reComments: {
      id: number;
      content: string;
      createdAt: string;
      updatedAt: string;
      UserId: number;
      CommentId: number;
    }[];
  }[];
  Likers: { id: number }[];
  tags: {
    id: number;
    name: string;
    PostTag: {
      createdAt: string;
      updatedAt: string;
      PostId: number;
      tagId: number;
    };
  }[];
}
export type me = {
  id: number;
  email: string;
  nickname: string;
  git: string;
  profileImg: string;
  myIntroduce: string;
};
