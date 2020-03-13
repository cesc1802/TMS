import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { ROLE_ACTIONS } from "./constants";

export function fetchRoleList({ page, pageSize }) {
    return dispatch => {
        dispatch({
            type: ROLE_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.get(
                `roles/search/page=${page}&page_size=${pageSize}`,
                { withCredentials: true }
            );
            doRequest.then(
                res => {
                    dispatch({
                        type: ROLE_ACTIONS.FETCH_LIST_SUCCESS,
                        data: res.data
                    });
                    resolve(res);
                },
                err => {
                    dispatch({
                        type: ROLE_ACTIONS.FAILURE,
                        data: { error: err.response }
                    });
                    reject(err);
                }
            );
        });
        return promise;
    };
}

export function dismissFetchRoleListError() {
    return {
        type: ROLE_ACTIONS.ERROR
    };
}

export function useFetchRoleList() {
    const dispatch = useDispatch();
    const { roleList, totalRecord, isPending, error } = useSelector(
        state => ({
            roleList: state.role.roleList,
            totalRecord: state.role.totalRecord,
            isPending: state.role.isPending,
            error: state.role.error
        }),
        shallowEqual
    );

    const boundAction = useCallback(
        ({ page, pageSize }) => {
            dispatch(fetchRoleList({ page, pageSize }));
        },
        [dispatch]
    );

    const boundDismissLoginError = useCallback(() => {
        dispatch(dismissFetchRoleListError());
    }, [dispatch]);

    return {
        roleList,
        totalRecord,
        isPending,
        error,
        fetchRoleList: boundAction,
        fetchRoleListError: boundDismissLoginError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ROLE_ACTIONS.REQUEST:
            return {
                ...state,
                isPending: true
            };
        case ROLE_ACTIONS.FETCH_LIST_SUCCESS:
            return {
                ...state,
                isPending: false,
                error: null
            };
        case ROLE_ACTIONS.FAILURE:
            return {
                ...state,
                error: action.data.error
            };
        case ROLE_ACTIONS.ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}
