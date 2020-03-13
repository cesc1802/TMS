import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { USER_ACTIONS } from "./constants";

export function deleteUserById({ ids }) {
    return dispatch => {
        dispatch({
            type: USER_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.delete(`users/${ids}`);

            doRequest.then(
                res => {
                    dispatch({
                        type: USER_ACTIONS.DELETE_SUCCESS,
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

export function useDeleteUser() {
    const dispatch = useDispatch();
    const {
        userList,
        totalRecord,
        isLoading,
        isSuccessed,
        error
    } = useSelector(
        state => ({
            userList: state.permission.userList,
            totalRecord: state.permission.totalRecord,
            isLoading: state.permission.isLoading,
            isSuccessed: state.permission.isSuccessed,
            error: state.permission.error
        }),
        shallowEqual
    );

    const deleteUsersAction = useCallback(
        ({ ids }) => {
            dispatch(deleteUserById({ ids }));
        },
        [dispatch]
    );

    const boundDismissUserError = useCallback(() => {
        dispatch(dismissDeleteUserError());
    }, [dispatch]);

    return {
        userList,
        totalRecord,
        isLoading,
        isSuccessed,
        error,
        deleteUsers: deleteUsersAction,
        deleteUserError: boundDismissUserError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case USER_ACTIONS.REQUEST:
            return {
                ...state,
                isLoading: true,
                isSuccessed: false
            };
        case USER_ACTIONS.DELETE_SUCCESS:
            return {
                ...state,
                userList: action.data.data.users,
                totalRecord: action.data.data.totalRecord,
                isSuccessed: true,
                isLoading: false,
                error: null
            };
        case USER_ACTIONS.FAILURE:
            return {
                ...state,
                isSuccessed: false,
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
