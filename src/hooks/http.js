import { useReducer, useCallback } from "react";

const initialState = { data: null, reFetch: false, initialFetch: true };

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return { ...httpState, reFetch: false };
    case "RESPONSE":
      return {
        ...httpState,
        data: action.resData,
        reFetch: action.reFetch,
        initialFetch: false,
      };
    default:
      throw new Error("Should not be reached");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback((url, method, body, reFetch) => {
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
        dispatchHttp({ type: "RESPONSE", resData, reFetch });
      });

    return;
  }, []);

  return {
    data: httpState.data,
    sendRequest,
    reFetch: httpState.reFetch,
    initialFetch: httpState.initialFetch,
  };
};

export default useHttp;
