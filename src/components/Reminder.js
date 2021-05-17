import React, { useState } from "react";

// MaterialUI
import { CheckCircle, Delete, HighlightOff, Update } from "@material-ui/icons";

// Context API
import { deleteReminder, updateReminder } from "../context/actions";
import { useStateValue } from "../context/StateProvider";

const Reminder = ({ description, id, timestamp }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [message, setMessage] = useState(description);
    const [error, setError] = useState("");

    const [state, dispatch] = useStateValue();

    const handleKeyDown = (e) => {
        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const clearUpdate = () => {
        setIsUpdate(false);
        setError("");
        setMessage(description);
    };

    const handleDelete = async (reminderId) => {
        await deleteReminder(reminderId)(dispatch);
    };

    const handleUpdate = async (reminderId) => {
        setError("");
        if (message.trim() !== description && message.trim()) {
            let result = await updateReminder(
                reminderId,
                message.trim()
            )(dispatch);
            if (result) {
                setError(result);
            } else {
                setIsUpdate(false);
            }
        } else {
            setError("Please write something");
        }
    };

    return (
        <div className="reminder">
            <div
                className={`reminder__description ${
                    isUpdate && "reminder__descriptionEditable"
                }`}
            >
                {description}
            </div>
            {isUpdate && (
                <>
                    <textarea
                        onFocus={handleKeyDown}
                        // onKeyDown={handleKeyDown}
                        className="reminder__content"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="reminder__updatePopup">
                        {error && (
                            <p className="reminder__updatePopupLeft">{error}</p>
                        )}
                        <div className="reminder__updatePopupRight">
                            <HighlightOff
                                onClick={clearUpdate}
                                className="reminder__updateClear"
                            />
                            <CheckCircle
                                onClick={() => handleUpdate(id)}
                                className="reminder__updateProceed"
                            />
                        </div>
                    </div>
                </>
            )}
            <div className="reminder__footer">
                <div className="reminder__footerLeft">
                    <Delete
                        fontSize="small"
                        className="reminder__deleteIcon"
                        onClick={() => handleDelete(id)}
                    />
                    <Update
                        fontSize="small"
                        className={`reminder__updateIcon ${
                            isUpdate && "reminder__updateIcon--active"
                        }`}
                        onClick={() => setIsUpdate(true)}
                    />
                </div>
                <div className="reminder__footerRight">
                    <p className="reminder__timestamp">{timestamp}</p>
                </div>
            </div>
        </div>
    );
};

export default Reminder;
