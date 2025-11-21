import React, { createContext, useContext, useReducer } from "react";
import { Post, Comment } from "@/types";

interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  likeComment: (postId: string, commentId: string, userId: string) => void;
}

type PostAction =
  | { type: "ADD_POST"; payload: Post }
  | { type: "UPDATE_POST"; payload: { id: string; updates: Partial<Post> } }
  | { type: "DELETE_POST"; payload: string }
  | { type: "LIKE_POST"; payload: { postId: string; userId: string } }
  | { type: "ADD_COMMENT"; payload: { postId: string; comment: Comment } }
  | {
      type: "LIKE_COMMENT";
      payload: { postId: string; commentId: string; userId: string };
    };

const PostContext = createContext<PostContextType | undefined>(undefined);

const postReducer = (state: Post[], action: PostAction): Post[] => {
  switch (action.type) {
    case "ADD_POST":
      return [action.payload, ...state];

    case "UPDATE_POST":
      return state.map((post) =>
        post.id === action.payload.id
          ? { ...post, ...action.payload.updates }
          : post
      );

    case "DELETE_POST":
      return state.filter((post) => post.id !== action.payload);

    case "LIKE_POST":
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          const isLiked = post.likes.includes(action.payload.userId);
          return {
            ...post,
            likes: isLiked
              ? post.likes.filter((id) => id !== action.payload.userId)
              : [...post.likes, action.payload.userId],
          };
        }
        return post;
      });

    case "ADD_COMMENT":
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            comments: [...post.comments, action.payload.comment],
          };
        }
        return post;
      });

    case "LIKE_COMMENT":
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === action.payload.commentId) {
                const isLiked = comment.likes.includes(action.payload.userId);
                return {
                  ...comment,
                  likes: isLiked
                    ? comment.likes.filter((id) => id !== action.payload.userId)
                    : [...comment.likes, action.payload.userId],
                };
              }
              return comment;
            }),
          };
        }
        return post;
      });

    default:
      return state;
  }
};

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, dispatch] = useReducer(postReducer, []);

  const addPost = (post: Post) => {
    dispatch({ type: "ADD_POST", payload: post });
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    dispatch({ type: "UPDATE_POST", payload: { id, updates } });
  };

  const deletePost = (id: string) => {
    dispatch({ type: "DELETE_POST", payload: id });
  };

  const likePost = (postId: string, userId: string) => {
    dispatch({ type: "LIKE_POST", payload: { postId, userId } });
  };

  const addComment = (postId: string, comment: Comment) => {
    dispatch({ type: "ADD_COMMENT", payload: { postId, comment } });
  };

  const likeComment = (postId: string, commentId: string, userId: string) => {
    dispatch({ type: "LIKE_COMMENT", payload: { postId, commentId, userId } });
  };

  const value: PostContextType = {
    posts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    likeComment,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within PostProvider");
  }
  return context;
};
