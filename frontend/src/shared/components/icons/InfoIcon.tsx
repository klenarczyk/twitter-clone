import React from "react";

const InfoIcon = ({className}: { className?: string }) => (
    <div className={`flex items-center justify-center ${className}`}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 -960 960 960"
            fill="currentColor">
            <path
                d="M480-680q-33 0-56.5-23.5T400-760q0-33 23.5-56.5T480-840q33 0 56.5 23.5T560-760q0 33-23.5 56.5T480-680Zm-60 560v-480h120v480H420Z"/>
        </svg>
    </div>
);

export default InfoIcon;