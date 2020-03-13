import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { GRANT_ACTIONS } from "./constants";

export function createGrant({ roleId, permissionId }) {
    return dispatch => {
        dispatch({
            type: GRANT_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.post("grants", {
                roleId,
                permissionId
            });

            doRequest.then(
                res => {
                    dispatch({
                        type: GRANT_ACTIONS.CREATE_SUCCESS,
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

export function dismissFetchGrantListError() {
    return {
        type: GRANT_ACTIONS.ERROR
    };
}

export function useCreateGrant() {
    const dispatch = useDispatch();
    const {
        grantList,
        totalRecord,
        isLoading,
        isSuccessed,
        error
    } = useSelector(
        state => ({
            grantList: state.grant.grantList,
            totalRecord: state.grant.totalRecord,
            isLoading: state.grant.isLoading,
            isSuccessed: state.grant.isSuccessed,
            error: state.grant.error
        }),
        shallowEqual
    );

    const createGrantAction = useCallback(
        ({ roleId, permissionId }) => {
            dispatch(createGrant({ roleId, permissionId }));
        },
        [dispatch]
    );

    const boundDismissLoginError = useCallback(() => {
        dispatch(dismissFetchGrantListError());
    }, [dispatch]);

    return {
        grantList,
        totalRecord,
        isLoading,
        isSuccessed,
        error,
        createGrant: createGrantAction,
        fetchGrantListError: boundDismissLoginError
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case GRANT_ACTIONS.REQUEST:
            return {
                ...state,
                isLoading: true,
                isSuccessed: false
            };
        case GRANT_ACTIONS.CREATE_SUCCESS:
            return {
                ...state,
                grantList: action.data.data.grants,
                totalRecord: action.data.data.totalRecord,
                isLoading: false,
                isSuccessed: true,
                error: null
            };
        case GRANT_ACTIONS.FAILURE:
            return {
                ...state,
                isSuccessed: false,
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
