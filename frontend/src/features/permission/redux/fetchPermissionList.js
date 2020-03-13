import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { PERMISSION_ACTIONS } from "./constants";

export function fetchPermissionList({ page, pageSize }) {
    return dispatch => {
        dispatch({
            type: PERMISSION_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.get(
                `permissions/search/page=${page}&page_size=${pageSize}`
            );
            doRequest.then(
                res => {
                    dispatch({
                        type: PERMISSION_ACTIONS.FETCH_SUCCESS,
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

export function dismissFetchPermissionListError() {
    return {
        type: PERMISSION_ACTIONS.ERROR
    };
}

export function useFetchPermissionList() {
    const dispatch = useDispatch();
    const { permissionList, totalRecord, isLoading, error } = useSelector(
        state => ({
            permissionList: state.permission.permissionList,
            totalRecord: state.permission.totalRecord,
            isLoading: state.permission.isLoading,
            error: state.permission.error
        }),
        shallowEqual
    );

    const boundAction = useCallback(
        ({ page, pageSize }) => {
            dispatch(fetchPermissionList({ page, pageSize }));
        },
        [dispatch]
    );

    const boundDismissLoginError = useCallback(() => {
        dispatch(dismissFetchPermissionListError());
    }, [dispatch]);

    return {
        permissionList,
        totalRecord,
        isLoading,
        error,
        fetchPermissionList: boundAction,
        fetchPermissionListError: boundDismissLoginError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case PERMISSION_ACTIONS.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case PERMISSION_ACTIONS.FETCH_SUCCESS:
            return {
                ...state,
                permissionList: action.data.data.permissions,
                totalRecord: action.data.data.totalRecord,
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
