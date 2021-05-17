import * as React from "react";

function Close(props) {
    return (
        <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6 4.822L10.125.697l1.178 1.178L7.178 6l4.125 4.125-1.178 1.178L6 7.178l-4.125 4.125-1.178-1.178L4.822 6 .697 1.875 1.875.697 6 4.822z"
                fill="#4B5563"
            />
        </svg>
    )
}

export default Close;
