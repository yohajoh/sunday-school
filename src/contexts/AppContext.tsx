import { useContext, useEffect, useReducer, createContext } from "react";
import { AppState, User, Asset, Post, Comment } from "@/types";
// import { createContext } from "vm";

interface AppContextType extends AppState {
  dispatch: React.Dispatch<AppAction>;
  setLoading: (loading: boolean) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  likeComment: (postId: string, commentId: string, userId: string) => void;
}

type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CURRENT_USER"; payload: User | null }
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: { id: string; updates: Partial<User> } }
  | { type: "DELETE_USER"; payload: string }
  | { type: "ADD_ASSET"; payload: Asset }
  | { type: "UPDATE_ASSET"; payload: { id: string; updates: Partial<Asset> } }
  | { type: "DELETE_ASSET"; payload: string }
  | { type: "ADD_POST"; payload: Post }
  | { type: "UPDATE_POST"; payload: { id: string; updates: Partial<Post> } }
  | { type: "DELETE_POST"; payload: string }
  | { type: "LIKE_POST"; payload: { postId: string; userId: string } }
  | { type: "ADD_COMMENT"; payload: { postId: string; comment: Comment } }
  | {
      type: "LIKE_COMMENT";
      payload: { postId: string; commentId: string; userId: string };
    };

const initialState: AppState = {
  userrs: [],
  assets: [],
  posts: [],
  currentUser: null,
  isLoading: true,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };

    case "ADD_USER":
      return { ...state, userrs: [...state.userrs, action.payload] };

    case "UPDATE_USER":
      return {
        ...state,
        userrs: state.userrs.map((user) =>
          user.id === action.payload.id
            ? { ...user, ...action.payload.updates }
            : user
        ),
      };

    case "DELETE_USER":
      return {
        ...state,
        userrs: state.userrs.filter((user) => user.id !== action.payload),
      };

    case "ADD_ASSET":
      return { ...state, assets: [...state.assets, action.payload] };

    case "UPDATE_ASSET":
      return {
        ...state,
        assets: state.assets.map((asset) =>
          asset.id === action.payload.id
            ? { ...asset, ...action.payload.updates }
            : asset
        ),
      };

    case "DELETE_ASSET":
      return {
        ...state,
        assets: state.assets.filter((asset) => asset.id !== action.payload),
      };

    case "ADD_POST":
      return { ...state, posts: [action.payload, ...state.posts] };

    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? { ...post, ...action.payload.updates }
            : post
        ),
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case "LIKE_POST":
      return {
        ...state,
        posts: state.posts.map((post) => {
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
        }),
      };

    case "ADD_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              comments: [...post.comments, action.payload.comment],
            };
          }
          return post;
        }),
      };

    case "LIKE_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.map((comment) => {
                if (comment.id === action.payload.commentId) {
                  const isLiked = comment.likes.includes(action.payload.userId);
                  return {
                    ...comment,
                    likes: isLiked
                      ? comment.likes.filter(
                          (id) => id !== action.payload.userId
                        )
                      : [...comment.likes, action.payload.userId],
                  };
                }
                return comment;
              }),
            };
          }
          return post;
        }),
      };

    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const addUser = (user: User) => {
    dispatch({ type: "ADD_USER", payload: user });
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: { id, updates } });
  };

  const deleteUser = (id: string) => {
    dispatch({ type: "DELETE_USER", payload: id });
  };

  const addAsset = (asset: Asset) => {
    dispatch({ type: "ADD_ASSET", payload: asset });
  };

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    dispatch({ type: "UPDATE_ASSET", payload: { id, updates } });
  };

  const deleteAsset = (id: string) => {
    dispatch({ type: "DELETE_ASSET", payload: id });
  };

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

  // Initialize with sample data
  useEffect(() => {
    const sampleUsers: User[] = [
      {
        id: "7",
        studentId: "SS001",
        email: "admin@sundayschool.org",
        role: "admin",
        firstName: "Admin",
        middleName: "",
        lastName: "User",
        sex: "male",
        phoneNumber: "+251911223344",
        disability: false,
        dateOfBirth: "1980-01-01",
        country: "Ethiopia",
        region: "Addis Ababa",
        zone: "Central",
        woreda: "Kirkos",
        church: "St. George Cathedral",
        occupation: "Administrator",
        marriageStatus: "married",
        parentStatus: "both",
        parentFullName: "Parent Name",
        parentEmail: "parent@example.com",
        parentPhoneNumber: "+251922334455",
        nationalId: "1234567890",
        joinDate: "2020-01-01",
        status: "active",
      },
    ];

    sampleUsers.forEach((user) => addUser(user));
    dispatch({ type: "SET_CURRENT_USER", payload: sampleUsers[0] });
  }, []);

  const value: AppContextType = {
    ...state,
    dispatch,
    setLoading,
    addUser,
    updateUser,
    deleteUser,
    addAsset,
    updateAsset,
    deleteAsset,
    addPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    likeComment,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
