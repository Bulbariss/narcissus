import React from "react";
import { Curtains } from "curtainsjs";

const initialState = {
  curtains: new Curtains({
    pixelRatio: Math.min(
      1.5,
      typeof window !== `undefined` && window.devicePixelRatio
    ),
    production: true,
    watchScroll: false,
    antialias: false,
    depth: false,
    autoResize: true,
  }),
  isActive: true,
  container: null,
};

const CurtainsContext = React.createContext(initialState);
const { Provider } = CurtainsContext;

const CurtainsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "SET_CURTAINS_CONTAINER":
        return {
          ...state,
          container: action.container,
        };
      case "SET_CURTAINS_ERROR":
        return {
          ...state,
          isActive: false,
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { CurtainsContext, CurtainsProvider };
