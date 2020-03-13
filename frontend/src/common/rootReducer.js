import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "./history";
import authenticationReducer from "../features/login/redux/reducer";
import roleReducer from "../features/role/redux/reducer";
import permissionReducer from "../features/permission/redux/reducer";
import grantReducer from "../features/grant/redux/reducer";
import actionReducer from "../features/action/redux/reducer";
import resourceReducer from "../features/resources/redux/reducer";
import userReducer from "../features/user/redux/reducer";
// import homeReducer from "../features/home/redux/reducer";
// import commonReducer from "../features/common/redux/reducer";
// import examplesReducer from "../features/examples/redux/reducer";

const reducerMap = {
    router: connectRouter(history),
    auth: authenticationReducer,
    role: roleReducer,
    permission: permissionReducer,
    grant: grantReducer,
    action: actionReducer,
    resource: resourceReducer,
    user: userReducer
};

export default combineReducers(reducerMap);
