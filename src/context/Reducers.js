import { defaults } from "./Context";

export const TimerReducer = (state, action) => {
  switch (action.type) {
    case "SET_TIMER":
      return { ...state, timer: action.payload };
    case "SET_INIT_MINUTE":
      return { ...state, initMinutes: action.payload };
    case "SET_TIMER_TIME":
      return { ...state, ...action.payload };
    case "RESET":
      return { ...defaults };
    default:
      return state;
  }
};

export const TimerRunningReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHANGED_FLAG":
      return { ...state, changedDuringPause: action.payload };
    case "SET_RESET_FLAG":
      return { ...state, isReset: action.payload };
    default:
      return state;
  }
};
