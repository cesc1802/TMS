import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { USER_ACTIONS } from "./constants";

export function fetchAll() {
    return dispatch => {
        dispatch({
            type: USER_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.get(`users`, { withCredentials: true });
            doRequest.then(
                res => {
                    dispatch({
                        type: USER_ACTIONS.FETCH_ALL_SUCCESS,
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

export function dismissDeleteUserError() {
    return {
        type: USER_ACTIONS.ERROR
    };
}

export function useFetchAllUser() {
    const dispatch = useDispatch();
    const { allUser, isLoading, error } = useSelector(
        state => ({
            allUser: state.permission.allUser,
            isLoading: state.permission.isLoading,
            error: state.permission.error
        }),
        shallowEqual
    );

    const fetchAllUserAction = useCallback(() => {
        dispatch(fetchAll());
    }, [dispatch]);

    const boundDismissUserError = useCallback(() => {
        dispatch(dismissDeleteUserError());
    }, [dispatch]);

    return {
        allUser,
        isLoading,
        error,
        fetchAllUser: fetchAllUserAction,
        fetchAllUserError: boundDismissUserError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case USER_ACTIONS.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case USER_ACTIONS.FETCH_ALL_SUCCESS:
            return {
                ...state,
                allUser: action.data.data.users,
                isLoading: false,
                error: null
            };
        case USER_ACTIONS.FAILURE:
            return {
                ...state,
                error: action.data.error
            };
        case USER_ACTIONS.ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}
