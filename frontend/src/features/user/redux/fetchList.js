import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { USER_ACTIONS } from "./constants";

export function fetchUserList({ page, pageSize }) {
    return dispatch => {
        dispatch({
            type: USER_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.get(
                `users/search/page=${page}&page_size=${pageSize}`,
                { withCredentials: true }
            );
            doRequest.then(
                res => {
                    dispatch({
                        type: USER_ACTIONS.FETCH_LIST_SUCCESS,
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

export function dismissFetchUserListError() {
    return {
        type: USER_ACTIONS.ERROR
    };
}

export function useFetchUserList() {
    const dispatch = useDispatch();
    const { userList, totalRecord, isLoading, error } = useSelector(
        state => ({
            userList: state.user.userList,
            totalRecord: state.user.totalRecord,
            isLoading: state.user.isLoading,
            error: state.user.error
        }),
        shallowEqual
    );

    const fetchUserListAction = useCallback(
        ({ page, pageSize }) => {
            dispatch(fetchUserList({ page, pageSize }));
        },
        [dispatch]
    );

    const boundDismissUserError = useCallback(() => {
        dispatch(dismissFetchUserListError());
    }, [dispatch]);

    return {
        userList,
        totalRecord,
        isLoading,
        error,
        fetchUserList: fetchUserListAction,
        fetchUserListError: boundDismissUserError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case USER_ACTIONS.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case USER_ACTIONS.FETCH_LIST_SUCCESS:
            return {
                ...state,
                userList: action.data.data.users,
                totalRecord: action.data.data.totalRecord,
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
