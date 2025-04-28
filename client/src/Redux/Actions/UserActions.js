import { fetchData } from "../../Lib/fetchData";
import { start, end, authProcess } from "../Slices/UserSlice";

export const setUser = async (dispatch, data) => {
    dispatch(start());

    try {
        localStorage.setItem('token', data.token);
        dispatch(authProcess({
            user: data.user
        }));
    } catch (error) {
        console.log(error.message);
        dispatch(authProcess({
            user: null,
        }));
    };

    dispatch(end());
};


export const LogoutUser = async (dispatch) => {
    dispatch(start());

    try {
        dispatch(authProcess({
            user: null,
        }));
    } catch (error) {
        console.log(error.message);
    };

    dispatch(end());
};