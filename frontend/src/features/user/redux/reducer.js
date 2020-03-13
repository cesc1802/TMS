import initialState from "./initialState";
import { reducer as fetchAllReducer } from "./fetchAll";
import { reducer as fetchListReducer } from "./fetchList";
import { reducer as createReducer } from "./create";
import { reducer as deleteByIdReducer } from "./deleteById";
import { reducer as updateByIdReducer } from "./updateById";

const reducers = [
    fetchAllReducer,
    fetchListReducer,
    createReducer,
    deleteByIdReducer,
    updateByIdReducer
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
