import { fetchData } from "../../Lib/fetchData";
import { start, end, authProcess } from "../Slices/UserSlice";

export const LoginUser = async (dispatch, email, password) => {
    dispatch(start());

    try {
        const res = await fetchData("auth/login", "POST", { email, password });
        dispatch(authProcess({
            user: res
        }));
    } catch (error) {
        console.log(error.message);
        dispatch(authProcess({
            user: null,
            msg: error.message,
            err: true
        }));
    };

    dispatch(end());
};

export const RegisterUser = async (dispatch, userData) =>{
    dispatch(start());

    try {
        const res = await fetchData("auth/register", "POST", userData);
        LoginUser(dispatch, res.data.email, userData.password);
    } catch (error) {
        console.log(error.message);
        dispatch(authProcess({
            user: null,
            msg: error.message,
            err: true
        }));
    }
}

export const LogoutUser = async (dispatch) => {
    dispatch(start());

    try {
        const res = await fetchData("auth/logout", "POST");
        dispatch(authProcess({
            user: null,
            msg: res.data.message,
        }));
    } catch (error) {
        console.log(error.message);
    };

    dispatch(end());
};

export const ForgetUserPassword = async (dispatch, email) => {
    dispatch(start());

    try {
        const res = await fetchData("auth/forget", "PUT", { email });
        dispatch(authProcess({
            user: null,
            msg: res.data.data
        }));
    } catch (error) {
        console.log(error.message);
        dispatch(authProcess({
            user: null,
            msg: error.message,
            err: true
        }));
    };

    dispatch(end());
};

export const ResetUserPassword = async (dispatch, token, password, confirmPassword) => {
    dispatch(start());

    try {
        const res = await fetchData(`auth/resetpassword/${token}`, "PUT", { password, confirmPassword });
        dispatch(authProcess({
            user: null,
            msg: res.data
        }));
    } catch (error) {
        console.log(error.message);
        dispatch(authProcess({
            user: null,
            msg: error.message,
            err: true
        }));
    };

    dispatch(end());
};