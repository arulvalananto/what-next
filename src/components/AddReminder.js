import React, { useState } from "react";
import { useHistory } from "react-router";
import "./AddReminder.css";
import { Error } from "@material-ui/icons";
import { addReminder } from "../context/actions";
import { useStateValue } from "../context/StateProvider";

const AddReminder = () => {
    const [state, dispatch] = useStateValue();

    const history = useHistory();

    const [error, setError] = useState("");

    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const handleSubmit = async () => {
        setError("");
        setDescriptionError("");
        if (description) {
            const result = await addReminder(description)(dispatch);
            if (result) {
                setError(result);
            } else {
                setDescription("");
                history.push("/");
            }
        } else {
            setDescriptionError(
                "Please enter some descrption for your reminder or idea"
            );
        }
    };

    return (
        <div className="addReminder">
            {error && (
                <div className="addReminder__popupError">
                    <Error className="addReminder__popupErrorIcon" />
                    <p>{error}</p>
                </div>
            )}
            <div className="addReminder__wrapper">
                <div className="addReminder__header">
                    <p>Add Reminder</p>
                </div>
                <div className="addReminder__body">
                    <textarea
                        className={`addReminder__description ${
                            descriptionError && "addReminder__descriptionError"
                        }`}
                        placeholder="Type Something"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {descriptionError && (
                        <p className="addReminder_error">{descriptionError}</p>
                    )}
                </div>
                <div className="addReminder__footer">
                    <button
                        className="addReminder__btn addReminder__cancelButton"
                        onClick={() => history.goBack()}
                    >
                        back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="addReminder__btn addReminder__saveButton"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddReminder;
