import initialState from "./initialState";
import { reducer as fetchResourceList } from "./fetchResourceList";

const reducers = [fetchResourceList];

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        default:
            newState = state;
            break;
    }
    return reducers.reduce((s, r) => r(s, action), newState);
}
