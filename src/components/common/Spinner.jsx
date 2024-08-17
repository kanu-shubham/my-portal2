import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Spinner(props) {
    const {
        size = 16,
        color = "secondary",
        label = "Loading indicator",
        visible = true,
    } = props;

    if (!visible) return null;

    return <CircularProgress color={color} size={size} aria-label={label} />;
}
