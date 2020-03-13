import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { ROLE_ACTIONS } from "./constants";

export function fetchAll() {
    return dispatch => {
        dispatch({
            type: ROLE_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.get(`roles`, { withCredentials: true });
            doRequest.then(
                res => {
                    dispatch({
                        type: ROLE_ACTIONS.FETCH_ALL_SUCCESS,
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

export function dismissFetchListError() {
    return {
        type: ROLE_ACTIONS.ERROR
    };
}

export function useFetchAllRoles() {
    const dispatch = useDispatch();
    const { allRoles, isPending, error } = useSelector(
        state => ({
            allRoles: state.role.allRoles,
            isPending: state.role.isPending,
            error: state.role.error
        }),
        shallowEqual
    );

    const fetchAllRoleAction = useCallback(() => {
        dispatch(fetchAll());
    }, [dispatch]);

    const boundDismissRoleError = useCallback(() => {
        dispatch(dismissFetchListError());
    }, [dispatch]);

    return {
        allRoles,
        isPending,
        error,
        fetchAllRoles: fetchAllRoleAction,
        fetchRoleListError: boundDismissRoleError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case ROLE_ACTIONS.REQUEST:
            return {
                ...state,
                isPending: true
            };
        case ROLE_ACTIONS.FETCH_ALL_SUCCESS:
            return {
                ...state,
                allRoles: action.data.data.roles,
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
