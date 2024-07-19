import React, { FC } from "react"

interface NextArrowProps {
    color?: string
}

const NextArrow: FC<NextArrowProps> = ({ color }) => {
    return (
        <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_341_317)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 0L10.278 1.67168L19.4064 10.8H0V13.2H19.4064L10.3032 22.3031L12 24C16.3932 19.6068 19.7952 16.2048 24 12L12 0Z"
                        fill={color ?? "white"}
                    />
                </g>
                <defs>
                    <clipPath id="clip0_341_317">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default NextArrow
