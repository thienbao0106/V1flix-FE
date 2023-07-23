import { IReducer } from "../../interface";
import { Hover } from "./interface";
export const reducer = (state: Hover, action: IReducer) => {
  if (action.type === "loading") {
    return { isLoading: !state.isLoading, id: action.payload };
  }
  if (action.type === "unloading") {
    return { isLoading: false, id: "" };
  }
};
