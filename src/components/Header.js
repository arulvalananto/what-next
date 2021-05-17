import React from "react";
import "./Header.css";

// MaterialUI
import { AddCircle } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";

// React Router
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="header">
            <Link to="/" className="header__left">
                <p>What's Next ?</p>
            </Link>
            <Link to="/add-reminder" className="header__right">
                <Tooltip title="Add Note">
                    <IconButton>
                        <AddCircle style={{ color: "#fff" }} fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Link>
        </nav>
    );
};

export default Header;
