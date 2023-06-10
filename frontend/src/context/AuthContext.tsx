import React, { createContext, useReducer, useEffect, ReactNode } from "react";

type User = {
  token: string;
  username: string;
  email: string;
};

// user can eiter exist or not
type State = {
  user: User | null;
};

type Action = {
  type: ActionType;
  payload?: User;
};

export enum ActionType {
  LOGIN,
  LOGOUT,
}

export const AuthContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOGIN:
      if (action.payload) {
        return { user: action.payload };
      }
      break;
    case ActionType.LOGOUT:
      return { user: null };
    default:
      break;
  }
  return state;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // if there exists a user in localstorage, show as logged in
  useEffect(() => {
    const userStorage = localStorage.getItem("user");

    const user: User | null = userStorage ? JSON.parse(userStorage) : null;

    if (user !== null) {
      dispatch({ type: ActionType.LOGIN, payload: user });
    }
  }, []);

  //console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
