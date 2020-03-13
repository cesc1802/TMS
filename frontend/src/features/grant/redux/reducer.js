import initialState from "./initialState";
import { reducer as fetchGrantListReducer } from "./fetchGrantList";
import { reducer as createGrantReducer } from "./createGrant";
import { reducer as deleteGrantByIdReducer } from "./deleteGrantById";

const reducers = [
    fetchGrantListReducer,
    createGrantReducer,
    deleteGrantByIdReducer
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
