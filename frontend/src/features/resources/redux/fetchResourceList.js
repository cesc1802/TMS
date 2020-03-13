import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { RESOURCE_ACTIONS } from "./constants";

export function fetchResourceList() {
    return dispatch => {
        dispatch({
            type: RESOURCE_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.get(`resources`);
            doRequest.then(
                res => {
                    dispatch({
                        type: RESOURCE_ACTIONS.FETCH_SUCCESS,
                        data: res.data
                    });
                    resolve(res);
                },
                err => {
                    dispatch({
                        type: RESOURCE_ACTIONS.FAILURE,
                        data: { error: err.response }
                    });
                    reject(err);
                }
            );
        });
        return promise;
    };
}

export function dismissFetchResourceListError() {
    return {
        type: RESOURCE_ACTIONS.ERROR
    };
}

export function useFetchResourceList() {
    const dispatch = useDispatch();
    const { resourceList, isLoading, error } = useSelector(
        state => ({
            resourceList: state.resource.resourceList,
            isLoading: state.resource.isLoading,
            error: state.resource.error
        }),
        shallowEqual
    );

    const boundAction = useCallback(() => {
        dispatch(fetchResourceList());
    }, [dispatch]);

    const boundDismissActionError = useCallback(() => {
        dispatch(dismissFetchResourceListError());
    }, [dispatch]);

    return {
        resourceList,
        isLoading,
        error,
        fetchResourceList: boundAction,
        fetchResourceListError: boundDismissActionError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case RESOURCE_ACTIONS.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case RESOURCE_ACTIONS.FETCH_SUCCESS:
            return {
                ...state,
                resourceList: action.data.data.resources,
                isLoading: false,
                error: null
            };
        case RESOURCE_ACTIONS.FAILURE:
            return {
                ...state,
                error: action.data.error
            };
        case RESOURCE_ACTIONS.ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}
