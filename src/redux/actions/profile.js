import axios from "axios";
import { toast } from "react-toastify";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export const updateProfile =
    (fullName, phoneNumber, email, picture, setLoading) =>
    async (dispatch, getState) => {
        const { user, token } = getState().auth;
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const form = new FormData();
        form.append("fullName", fullName);
        form.append("phoneNumber", phoneNumber);
        form.append("email", email);
        form.append("picture", picture);

        let config = {
            method: "patch",
            url: `${import.meta.env.VITE_BACKEND_API}/api/v1/profile/id/${
                user.id
            }`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: form,
        };

        try {
            await axios.request(config);
            dispatch({ type: UPDATE_PROFILE_SUCCESS });
            toast.success("Profile updated successfully");
        } catch (error) {
            dispatch({ type: UPDATE_PROFILE_FAILURE });
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
