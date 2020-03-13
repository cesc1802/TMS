import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { ACTION_ACTIONS } from "./constants";

export function fetchActionList() {
    return dispatch => {
        dispatch({
            type: ACTION_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.get(`actions`);
            doRequest.then(
                res => {
                    dispatch({
                        type: ACTION_ACTIONS.FETCH_SUCCESS,
                        data: res.data
                    });
                    resolve(res);
                },
                err => {
                    dispatch({
                        type: ACTION_ACTIONS.FAILURE,
                        data: { error: err.response }
                    });
                    reject(err);
                }
            );
        });
        return promise;
    };
}

export function dismissFetchActionListError() {
    return {
        type: ACTION_ACTIONS.ERROR
    };
}

export function useFetchActionList() {
    const dispatch = useDispatch();
    const { actionList, isLoading, error } = useSelector(
        state => ({
            actionList: state.action.actionList,
            isLoading: state.action.isLoading,
            error: state.action.error
        }),
        shallowEqual
    );

    const boundAction = useCallback(() => {
        dispatch(fetchActionList());
    }, [dispatch]);

    const boundDismissActionError = useCallback(() => {
        dispatch(dismissFetchActionListError());
    }, [dispatch]);

    return {
        actionList,
        isLoading,
        error,
        fetchActionList: boundAction,
        fetchActionListError: boundDismissActionError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ACTION_ACTIONS.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case ACTION_ACTIONS.FETCH_SUCCESS:
            return {
                ...state,
                actionList: action.data.data.actions,
                isLoading: false,
                error: null
            };
        case ACTION_ACTIONS.FAILURE:
            return {
                ...state,
                error: action.data.error
            };
        case ACTION_ACTIONS.ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}
