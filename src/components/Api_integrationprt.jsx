import React from "react";
import { useReducer } from "react";
import Axios from "axios";
const ACTIONS = {
  FETCH_START: "fetch_start",
  FETCH_COMPLETE: "fetch_complete",
  FETCH_ERROR: "fetch_error",
};
const postReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, error: false };

    case ACTIONS.FETCH_COMPLETE:
      return { ...state, error: false, generatedExcuse: action.payload };
    case ACTIONS.FETCH_ERROR:
      return { ...state, error: true };

    default:
      return state;
  }
};

const Api_integrationprt = () => {
  const [state, dispatch] = useReducer(postReducer, {
    generatedExcuse: "",
    error: false,
  });
  const fetchExcuse = (excuse) => {
    dispatch({ type: ACTIONS.FETCH_START });
    Axios.get(`https://excuser-three.vercel.app/v1/excuse/${excuse}/`)
      .then((res) => {
        dispatch({ type: ACTIONS.FETCH_COMPLETE, payload: res.data[0].excuse });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.FETCH_ERROR });
      });
  };
  const { generatedExcuse, error } = state;
  return (
    <div>
      <h1>Generate An excuse</h1>
      <div>
        <button onClick={() => fetchExcuse("party")}>party</button>
        <button onClick={() => fetchExcuse("family")}> Family</button>
        <button onClick={() => fetchExcuse("office")}> Office </button>
      </div>
      <div>
        <p>{generatedExcuse}</p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Api_integrationprt;
