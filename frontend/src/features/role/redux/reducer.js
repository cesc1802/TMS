import initialState from "./initialState";
import { reducer as fetchRoleListReducer } from "./fetchList";
import { reducer as fetchRoles } from "./fetchAll";

const reducers = [fetchRoleListReducer, fetchRoles];

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        default:
            newState = state;
            break;
    }
    return reducers.reduce((s, r) => r(s, action), newState);
}
