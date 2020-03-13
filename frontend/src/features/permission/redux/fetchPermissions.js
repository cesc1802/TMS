import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { PERMISSION_ACTIONS } from "./constants";

export function fetchPermissions() {
    return dispatch => {
        dispatch({
            type: PERMISSION_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.get(`permissions`);
            doRequest.then(
                res => {
                    dispatch({
                        type: PERMISSION_ACTIONS.FETCH_ALL_PERM_SUCCESS,
                        data: res.data
                    });
                    resolve(res);
                },
                err => {
                    dispatch({
                        type: PERMISSION_ACTIONS.FAILURE,
                        data: { error: err.response }
                    });
                    reject(err);
                }
            );
        });
        return promise;
    };
}

export function dismissFetchPermissionsError() {
    return {
        type: PERMISSION_ACTIONS.ERROR
    };
}

export function useFetchPermissions() {
    const dispatch = useDispatch();
    const { allPermission, isLoading, error } = useSelector(
        state => ({
            allPermission: state.permission.allPermission,
            isLoading: state.permission.isLoading,
            error: state.permission.error
        }),
        shallowEqual
    );

    const boundAction = useCallback(() => {
        dispatch(fetchPermissions());
    }, [dispatch]);

    const boundDismissLoginError = useCallback(() => {
        dispatch(dismissFetchPermissionsError());
    }, [dispatch]);

    return {
        allPermission,
        isLoading,
        error,
        fetchPermissions: boundAction,
        fetchPermissionsError: boundDismissLoginError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case PERMISSION_ACTIONS.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case PERMISSION_ACTIONS.FETCH_ALL_PERM_SUCCESS:
            return {
                ...state,
                allPermission: action.data.data.permissions,
                isLoading: false,
                error: null
            };
        case PERMISSION_ACTIONS.FAILURE:
            return {
                ...state,
                error: action.data.error
            };
        case PERMISSION_ACTIONS.ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}
