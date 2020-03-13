import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { GRANT_ACTIONS } from "./constants";

export function fetchGrantList({ page, pageSize }) {
    return dispatch => {
        dispatch({
            type: GRANT_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.get(
                `grants/search/page=${page}&recordPerPage=${pageSize}`
            );
            doRequest.then(
                res => {
                    dispatch({
                        type: GRANT_ACTIONS.FETCH_SUCCESS,
                        data: res.data
                    });
                    resolve(res);
                },
                err => {
                    dispatch({
                        type: GRANT_ACTIONS.FAILURE,
                        data: { error: err.response }
                    });
                    reject(err);
                }
            );
        });
        return promise;
    };
}
export function updateGrantById({ id, resource, action }) {
    return dispatch => {
        dispatch({
            type: GRANT_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.put(`grants/${id}`, {
                resource,
                action
            });

            doRequest.then(
                res => {
                    dispatch({
                        type: GRANT_ACTIONS.FETCH_SUCCESS,
                        data: res.data
                    });
                    resolve(res);
                },
                err => {
                    dispatch({
                        type: GRANT_ACTIONS.FAILURE,
                        data: { error: err.response }
                    });
                }
            );
        });
        return promise;
    };
}
export function dismissFetchGrantListError() {
    return {
        type: GRANT_ACTIONS.ERROR
    };
}

export function useFetchGrantList() {
    const dispatch = useDispatch();
    const { grantList, totalRecord, isLoading, error } = useSelector(
        state => ({
            grantList: state.grant.grantList,
            totalRecord: state.grant.totalRecord,
            isLoading: state.grant.isLoading,
            error: state.grant.error
        }),
        shallowEqual
    );

    const boundAction = useCallback(
        ({ page, pageSize }) => {
            dispatch(fetchGrantList({ page, pageSize }));
        },
        [dispatch]
    );

    const boundDismissGrantError = useCallback(() => {
        dispatch(dismissFetchGrantListError());
    }, [dispatch]);

    return {
        grantList,
        totalRecord,
        isLoading,
        error,
        fetchGrantList: boundAction,
        fetchGrantListError: boundDismissGrantError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case GRANT_ACTIONS.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case GRANT_ACTIONS.FETCH_SUCCESS:
            return {
                ...state,
                grantList: action.data.data.grants,
                totalRecord: action.data.data.totalRecord,
                isLoading: false,
                error: null
            };
        case GRANT_ACTIONS.FAILURE:
            return {
                ...state,
                error: action.data.error
            };
        case GRANT_ACTIONS.ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}
