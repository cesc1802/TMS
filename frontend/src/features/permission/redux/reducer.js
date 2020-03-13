import initialState from "./initialState";
import { reducer as fetchPermissionListReducer } from "./fetchPermissionList";
import { reducer as createPermissionReducer } from "./createPermission";
import { reducer as fetchPermissions } from "./fetchPermissions";
import { reducer as deletePermissionById } from "./deletePermissionById";

import { PERMISSION_ACTIONS } from "./constants";

const reducers = [
    fetchPermissionListReducer,
    createPermissionReducer,
    fetchPermissions,
    deletePermissionById
];

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        default:
            newState = state;
            break;
    }
    return reducers.reduce((s, r) => r(s, action), newState);
}
