import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { push } from "connected-react-router";
import { USER_ACTIONS } from "./constants";

export function login({ username, password }) {
    return dispatch => {
        dispatch({
            type: USER_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const body = { username, password };
            const doRequest = API.post("auth/login", body);
            doRequest.then(
                res => {
                    console.log(res);
                    dispatch({
                        type: USER_ACTIONS.SUCCESS,
                        data: res.data
                    });
                    resolve(res);
                },
                err => {
                    dispatch({
                        type: USER_ACTIONS.FAILURE,
                        data: { error: err.response }
                    });
                    reject(err);
                }
            );
        });
        return promise;
    };
}

export function loginError() {
    return {
        type: USER_ACTIONS.ERROR
    };
}

export function useLogin() {
    const dispatch = useDispatch();
    const { isAuthenticated, isPending, accessToken, error } = useSelector(
        state => ({
            isAuthenticated: state.auth.isAuthenticated,
            isPending: state.auth.isPending,
            accessToken: state.auth.accessToken,
            error: state.auth.error
        }),
        shallowEqual
    );

    const boundAction = useCallback(
        ({ username, password }) => {
            dispatch(login({ username, password }))
                .then(() => {
                    dispatch(push("/"));
                })
                .catch(() => {
                    dispatch(push("/login"));
                });
        },
        [dispatch]
    );

    const boundDismissLoginError = useCallback(() => {
        dispatch(loginError());
    }, [dispatch]);

    return {
        isAuthenticated,
        isPending,
        accessToken,
        error,
        doLogin: boundAction,
        doLoginError: boundDismissLoginError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case USER_ACTIONS.REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                isPending: true
            };
        case USER_ACTIONS.SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isPending: false,
                // accessToken: action.data.token.accessToken,
                // tokenType: action.data.token.tokenType,
                error: null
            };
        case USER_ACTIONS.FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                accessToken: "",
                tokenType: "",
                error: action.data.error
            };
        case USER_ACTIONS.ERROR:
            return {
                ...state,
                isAuthenticated: false,
                accessToken: "",
                tokenType: ""
            };
        default:
            return state;
    }
}
