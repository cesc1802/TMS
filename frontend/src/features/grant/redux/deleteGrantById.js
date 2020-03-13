import API from "../../../common/api";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { GRANT_ACTIONS } from "./constants";

export function deleteGrantById({ ids }) {
    return dispatch => {
        dispatch({
            type: GRANT_ACTIONS.REQUEST
        });

        const promise = new Promise((resolve, reject) => {
            const doRequest = API.delete(`grants/${ids}`);

            doRequest.then(
                res => {
                    dispatch({
                        type: GRANT_ACTIONS.DELETE_SUCCESS,
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

export function useDeleteGrant() {
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

    const deleteGrantAction = useCallback(
        ({ ids }) => {
            dispatch(deleteGrantById({ ids }));
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
        deleteGrant: deleteGrantAction,
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
        case GRANT_ACTIONS.DELETE_SUCCESS:
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
