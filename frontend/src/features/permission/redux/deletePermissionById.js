import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { PERMISSION_ACTIONS } from "./constants";

export function deletePermissionById({ ids }) {
    return dispatch => {
        dispatch({
            type: PERMISSION_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.delete(`permissions/${ids}`);

            doRequest.then(
                res => {
                    dispatch({
                        type: PERMISSION_ACTIONS.DELETE_SUCCESS,
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

export function useDeletePermission() {
    const dispatch = useDispatch();
    const {
        permissionList,
        totalRecord,
        isLoading,
        isSuccessed,
        error
    } = useSelector(
        state => ({
            permissionList: state.permission.permissionList,
            totalRecord: state.permission.totalRecord,
            isLoading: state.permission.isLoading,
            isSuccessed: state.permission.isSuccessed,
            error: state.permission.error
        }),
        shallowEqual
    );

    const deletePermissionAction = useCallback(
        ({ ids }) => {
            dispatch(deletePermissionById({ ids }));
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
        isSuccessed,
        error,
        deletePermission: deletePermissionAction,
        fetchPermissionListError: boundDismissLoginError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case PERMISSION_ACTIONS.REQUEST:
            return {
                ...state,
                isLoading: true,
                isSuccessed: false
            };
        case PERMISSION_ACTIONS.DELETE_SUCCESS:
            return {
                ...state,
                permissionList: action.data.data.permissions,
                totalRecord: action.data.data.totalRecord,
                isSuccessed: true,
                isLoading: false,
                error: null
            };
        case PERMISSION_ACTIONS.FAILURE:
            return {
                ...state,
                isSuccessed: false,
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
