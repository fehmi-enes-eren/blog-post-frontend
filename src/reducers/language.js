import { SET_LANGUAGE } from "../actions/types";
const initialState = {};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LANGUAGE:
      return { language: payload };
    default:
      return state;
  }
}