import React from "react";

export default function Main({ children }) {
    return (
        <div className="home-app">
            <div className="page-container">{children}</div>
        </div>
    );
}
