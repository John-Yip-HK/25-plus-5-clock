import { createContext, useContext, useReducer } from "react";
import { TimerReducer, TimerRunningReducer } from "./Reducers";

const Timer = createContext();

const defaults = {
  mainMinutes: 25,
  auxiliaryMinutes: 5,
  seconds: 0,
  mode: "S",
  timer: null,
  initMinutes: [null, null],
};

for (let defaultKey in defaults) {
  Object.defineProperty(defaults, defaultKey, {
    writeable: false,
    eumerable: true,
    configurable: false,
  });
}

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(TimerReducer, {
    ...defaults,
  });

  const [runningState, runningDispatch] = useReducer(TimerRunningReducer, {
    changedDuringPause: false,
    isReset: false,
  });

  return (
    <Timer.Provider
      value={{
        state,
        dispatch,
        runningState,
        runningDispatch,
      }}
    >
      {children}
    </Timer.Provider>
  );
};

export default Context;
const TimerState = () => useContext(Timer);
export { defaults, TimerState };
