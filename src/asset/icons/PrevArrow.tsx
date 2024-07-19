import React, { FC } from "react"

interface PrevArrowProps {
    color?: string
}

const PrevArrow: FC<PrevArrowProps> = ({ color }) => {
    return (
        <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_341_314)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 24L13.722 22.3283L4.5936 13.2L24 13.2V10.8L4.5936 10.8L13.6968 1.6969L12 0C7.6068 4.3932 4.2048 7.7952 0 12L12 24Z"
                        fill={color ?? "#1E3A2B"}
                    />
                </g>
                <defs>
                    <clipPath id="clip0_341_314">
                        <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 24 24)" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default PrevArrow
