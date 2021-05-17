import React, { useEffect, useState } from "react";
import "./Reminders.css";

// MaterialUI
import { CircularProgress } from "@material-ui/core";

// Other Components
import Reminder from "./Reminder";

// Context API
import { useStateValue } from "../context/StateProvider";
import { fetchReminders } from "../context/actions";

const Reminders = () => {
    const [{ reminders }, dispatch] = useStateValue();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchUser = async () => {
        setLoading(true);
        const result = await fetchReminders()(dispatch);
        if (result) {
            setError(result);
        }
        setLoading(false);
    };

    useEffect(fetchUser, []);

    return loading ? (
        <div className="reminders__spinnerContainer">
            <CircularProgress className="reminders__spinner" />
        </div>
    ) : (
        <div className="reminders">
            {reminders.length > 0 ? (
                reminders.map((reminder) => (
                    <Reminder
                        key={reminder.id}
                        description={reminder.description}
                        id={reminder.id}
                        timestamp={reminder.modifiedAt}
                    />
                ))
            ) : (
                <p className={`reminders__notFound ${error && "red-text"}`}>
                    {error ? (
                        <p>
                            {error} 🙁 Please <a href="/">try again</a>
                        </p>
                    ) : (
                        "No Notes Found!"
                    )}
                </p>
            )}
        </div>
    );
};

export default Reminders;
