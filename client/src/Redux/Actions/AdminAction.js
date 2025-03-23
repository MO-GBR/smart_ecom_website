import { setCurrent } from "../Slices/AdminSlice";

export const setAdminCurrent = (dispatch, current) => {
    try {
        dispatch(setCurrent({
            type: current
        }));
    } catch (error) {
        console.log(error.message);
    }
}