import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { User } from "../types/types";

// null if user is not logged in
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
      //console.log("Logging in with payload:", action.payload);
      if (action.payload) {
        //console.log("Updated state:", { user: action.payload });
        localStorage.setItem("user", JSON.stringify(action.payload));
        return { user: action.payload };
      }
      break;
    case ActionType.LOGOUT:
      localStorage.removeItem("user");
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

  // if there exists a user in localstorage, log in
  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const user: User = userStorage ? JSON.parse(userStorage) : null;

    if (user) {
      dispatch({ type: ActionType.LOGIN, payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
