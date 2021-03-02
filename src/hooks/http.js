import { useReducer, useCallback } from "react";

const initialState = { data: null };

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return { ...httpState };
    case "RESPONSE":
      return { ...httpState, data: action.resData };
    default:
      throw new Error("Should not be reached");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback((url, method, body) => {
    dispatchHttp({ type: "SEND" });
    fetch(url, {
      method,
      body,
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatchHttp({ type: "RESPONSE", resData });
      });

    return;
  }, []);

  return {
    data: httpState.data,
    sendRequest,
  };
};

export default useHttp;
