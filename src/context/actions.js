import axios from "../axios";

import { actionTypes } from "./reducer";

export const fetchReminders = () => async (dispatch) => {
    let error = "";
    await axios
        .get("/get-all-reminders")
        .then((res) => {
            dispatch({
                type: actionTypes.FETCH_REMINDERS,
                payload: res.data.reminders,
            });
        })
        .catch((err) => (error = err.message));
    if (error) {
        return error;
    }
};

export const addReminder = (description) => async (dispatch) => {
    let error = "";
    await axios
        .post("/add-reminder", { description })
        .then((res) => {
            dispatch({
                type: actionTypes.FETCH_REMINDERS,
                payload: res.data.reminders,
            });
        })
        .catch((err) => (error = err.message));
    if (error) {
        return error;
    }
};

export const updateReminder = (id, description) => async (dispatch) => {
    let error = "";
    await axios
        .patch(`/update-reminder/${id}`, { description })
        .then((res) => {
            dispatch({
                type: actionTypes.FETCH_REMINDERS,
                payload: res.data.reminders,
            });
        })
        .catch((err) => (error = err.message));
    if (error) {
        return error;
    }
};

export const deleteReminder = (id) => async (dispatch) => {
    let error = "";
    await axios
        .delete(`/delete-reminder/${id}`)
        .then((res) => {
            dispatch({
                type: actionTypes.FETCH_REMINDERS,
                payload: res.data.reminders,
            });
        })
        .catch((err) => (error = err.message));
    if (error) {
        return error;
    }
};
