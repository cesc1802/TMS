import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { USER_ACTIONS } from "./constants";

export function createUser({ username, password, roleId }) {
    console.log(username, password, roleId);
    return dispatch => {
        dispatch({
            type: USER_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.post("users", { username, password, roleId });

            doRequest.then(
                res => {
                    dispatch({
                        type: USER_ACTIONS.CREATE_SUCCESS,
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

export function dismissCreateUserError() {
    return {
        type: USER_ACTIONS.ERROR
    };
}

export function useCreateUser() {
    const dispatch = useDispatch();
    const {
        userList,
        totalRecord,
        isLoading,
        isSuccessed,
        error
    } = useSelector(
        state => ({
            userList: state.user.userList,
            totalRecord: state.user.totalRecord,
            isLoading: state.user.isLoading,
            isSuccessed: state.user.isSuccessed,
            error: state.user.error
        }),
        shallowEqual
    );

    const createUserAction = useCallback(
        ({ username, password, roleId }) => {
            dispatch(createUser({ username, password, roleId }));
        },
        [dispatch]
    );

    const boundDismissUserError = useCallback(() => {
        dispatch(dismissCreateUserError());
    }, [dispatch]);

    return {
        userList,
        totalRecord,
        isLoading,
        isSuccessed,
        error,
        createUser: createUserAction,
        createUserError: boundDismissUserError
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
        case USER_ACTIONS.CREATE_SUCCESS:
            return {
                ...state,
                userList: action.data.data.users,
                totalRecord: action.data.data.totalRecord,
                isLoading: false,
                isSuccessed: true,
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
