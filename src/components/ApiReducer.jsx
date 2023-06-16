import { useEffect, useReducer } from "react";

const initialState = { data: [], loading: true, error: null };

const apiReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, data: action.payload };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useApiReducer = () => useReducer(apiReducer, initialState);
