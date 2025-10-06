// import React from 'react';

// // Define the custom colors for easy reference in the component
// const CUSTOM_COLORS = {
//     stage: '#F4CF42',    // Purple for Main Stage
//     electronic: '#ffffff', // Cyan/Blue for Electronic Stage (using the 'merch' color)
//     acoustic: '#ffffff',   // Green for Acoustic Stage (using the 'parking' color)
// };

// // --- New Stage Data Array for easier iteration ---
// const STAGES = [
//     { name: 'All', color: CUSTOM_COLORS.stage },
//     { name: 'Electronic', color: CUSTOM_COLORS.electronic },
//     { name: 'Alternative Rock', color: CUSTOM_COLORS.acoustic },
//     { name: 'Hip Hop', color: CUSTOM_COLORS.acoustic },
//     { name: 'Indie', color: CUSTOM_COLORS.acoustic },
// ];
// // -------------------------------------------------


// // SVG Icon for the location/stage pin
// // This is a standard map-pin icon (Heroicon) customized with fill
// const StagePinIcon = ({ color }) => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="18"
//         height="18"
//         viewBox="0 0 18 18"
//         fill="none" // Set fill to none on the SVG container
//         className="shrink-0" // Prevents the icon from being shrunk in a flex container
//     >
//         <path
//             d="M14.0625 15.75H10.5848C11.169 15.2284 11.72 14.6706 12.2344 14.0801C14.1645 11.8603 15.1875 9.52031 15.1875 7.3125C15.1875 5.67147 14.5356 4.09766 13.3752 2.93728C12.2148 1.7769 10.641 1.125 9 1.125C7.35897 1.125 5.78516 1.7769 4.62478 2.93728C3.4644 4.09766 2.8125 5.67147 2.8125 7.3125C2.8125 9.52031 3.83273 11.8603 5.76562 14.0801C6.28004 14.6706 6.83096 15.2284 7.41516 15.75H3.9375C3.78832 15.75 3.64524 15.8093 3.53975 15.9148C3.43426 16.0202 3.375 16.1633 3.375 16.3125C3.375 16.4617 3.43426 16.6048 3.53975 16.7102C3.64524 16.8157 3.78832 16.875 3.9375 16.875H14.0625C14.2117 16.875 14.3548 16.8157 14.4602 16.7102C14.5657 16.6048 14.625 16.4617 14.625 16.3125C14.625 16.1633 14.5657 16.0202 14.4602 15.9148C14.3548 15.8093 14.2117 15.75 14.0625 15.75ZM3.9375 7.3125C3.9375 5.96984 4.47087 4.68217 5.42027 3.73277C6.36967 2.78337 7.65734 2.25 9 2.25C10.3427 2.25 11.6303 2.78337 12.5797 3.73277C13.5291 4.68217 14.0625 5.96984 14.0625 7.3125C14.0625 11.3365 10.1623 14.6953 9 15.6094C7.83773 14.6953 3.9375 11.3365 3.9375 7.3125ZM11.8125 7.3125C11.8125 6.75624 11.6475 6.21247 11.3385 5.74996C11.0295 5.28745 10.5902 4.92696 10.0763 4.71409C9.56238 4.50122 8.99688 4.44552 8.45131 4.55404C7.90574 4.66256 7.4046 4.93043 7.01126 5.32376C6.61793 5.7171 6.35006 6.21824 6.24154 6.76381C6.13302 7.30938 6.18872 7.87488 6.40159 8.3888C6.61446 8.90271 6.97495 9.34197 7.43746 9.65101C7.89997 9.96005 8.44374 10.125 9 10.125C9.74592 10.125 10.4613 9.82868 10.9887 9.30124C11.5162 8.77379 11.8125 8.05842 11.8125 7.3125ZM7.3125 7.3125C7.3125 6.97874 7.41147 6.65248 7.5969 6.37498C7.78232 6.09747 8.04587 5.88118 8.35422 5.75345C8.66257 5.62573 9.00187 5.59231 9.32922 5.65742C9.65656 5.72254 9.95724 5.88326 10.1932 6.11926C10.4292 6.35526 10.59 6.65594 10.6551 6.98328C10.7202 7.31063 10.6868 7.64993 10.559 7.95828C10.4313 8.26663 10.215 8.53018 9.93752 8.7156C9.66002 8.90103 9.33376 9 9 9C8.55245 9 8.12322 8.82221 7.80676 8.50574C7.49029 8.18928 7.3125 7.76005 7.3125 7.3125Z"
//             fill={color} // ✨ This makes the icon color dynamic!
//         />
//     </svg>
// );

// const ArtistPageButton = () => {
//     return (
//         <div className="p-4">
//             <div
//                 className="flex items-center justify-between rounded-3xl p-3 shadow-2xl backdrop-blur-md transition-all duration-300 max-w-[500px] max-h-[62px]"
//                 style={{
//                     // Custom border and box-shadow for the UI effect
//                     border: '2px solid rgba(255, 255, 255, 0.1)',
//                     boxShadow: '0 4px 6px -1px rgba(1, 2, 2, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.3) inset',
//                 }}
//             >
//                 {STAGES.map((stage, index) => (
//                     <React.Fragment key={stage.name}>
//                         {/* Stage Button */}
//                         <button
//                             className="flex items-center space-x-2  rounded-lg transition duration-150 ease-in-out shrink-0"
//                             style={{ color: stage.color }} // Apply dynamic color
//                         >
//                             <span className="text-[16px] mx-2 font-medium whitespace-nowrap">{stage.name}</span>
//                         </button>


//                     </React.Fragment>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ArtistPageButton;
import React from 'react';

// Define the custom colors for easy reference in the component
const CUSTOM_COLORS = {
    stage: '#F4CF42',    // Purple for Main Stage
    electronic: '#F4CF42', // Cyan/Blue for Electronic Stage (using the 'merch' color)
    acoustic: '#F4CF42',   // Green for Acoustic Stage (using the 'parking' color)
};

// --- New Stage Data Array for easier iteration ---
const STAGES = [
    { name: 'All', color: CUSTOM_COLORS.stage },
    { name: 'Electronic', color: CUSTOM_COLORS.electronic },
    { name: 'Alternative Rock', color: CUSTOM_COLORS.acoustic },
    { name: 'Hip Hop', color: CUSTOM_COLORS.acoustic },
    { name: 'Indie', color: CUSTOM_COLORS.acoustic },
];
// -------------------------------------------------


// SVG Icon for the location/stage pin
// This is a standard map-pin icon (Heroicon) customized with fill
const StagePinIcon = ({ color }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none" // Set fill to none on the SVG container
        className="shrink-0" // Prevents the icon from being shrunk in a flex container
    >
        <path
            d="M14.0625 15.75H10.5848C11.169 15.2284 11.72 14.6706 12.2344 14.0801C14.1645 11.8603 15.1875 9.52031 15.1875 7.3125C15.1875 5.67147 14.5356 4.09766 13.3752 2.93728C12.2148 1.7769 10.641 1.125 9 1.125C7.35897 1.125 5.78516 1.7769 4.62478 2.93728C3.4644 4.09766 2.8125 5.67147 2.8125 7.3125C2.8125 9.52031 3.83273 11.8603 5.76562 14.0801C6.28004 14.6706 6.83096 15.2284 7.41516 15.75H3.9375C3.78832 15.75 3.64524 15.8093 3.53975 15.9148C3.43426 16.0202 3.375 16.1633 3.375 16.3125C3.375 16.4617 3.43426 16.6048 3.53975 16.7102C3.64524 16.8157 3.78832 16.875 3.9375 16.875H14.0625C14.2117 16.875 14.3548 16.8157 14.4602 16.7102C14.5657 16.6048 14.625 16.4617 14.625 16.3125C14.625 16.1633 14.5657 16.0202 14.4602 15.9148C14.3548 15.8093 14.2117 15.75 14.0625 15.75ZM3.9375 7.3125C3.9375 5.96984 4.47087 4.68217 5.42027 3.73277C6.36967 2.78337 7.65734 2.25 9 2.25C10.3427 2.25 11.6303 2.78337 12.5797 3.73277C13.5291 4.68217 14.0625 5.96984 14.0625 7.3125C14.0625 11.3365 10.1623 14.6953 9 15.6094C7.83773 14.6953 3.9375 11.3365 3.9375 7.3125ZM11.8125 7.3125C11.8125 6.75624 11.6475 6.21247 11.3385 5.74996C11.0295 5.28745 10.5902 4.92696 10.0763 4.71409C9.56238 4.50122 8.99688 4.44552 8.45131 4.55404C7.90574 4.66256 7.4046 4.93043 7.01126 5.32376C6.61793 5.7171 6.35006 6.21824 6.24154 6.76381C6.13302 7.30938 6.18872 7.87488 6.40159 8.3888C6.61446 8.90271 6.97495 9.34197 7.43746 9.65101C7.89997 9.96005 8.44374 10.125 9 10.125C9.74592 10.125 10.4613 9.82868 10.9887 9.30124C11.5162 8.77379 11.8125 8.05842 11.8125 7.3125ZM7.3125 7.3125C7.3125 6.97874 7.41147 6.65248 7.5969 6.37498C7.78232 6.09747 8.04587 5.88118 8.35422 5.75345C8.66257 5.62573 9.00187 5.59231 9.32922 5.65742C9.65656 5.72254 9.95724 5.88326 10.1932 6.11926C10.4292 6.35526 10.59 6.65594 10.6551 6.98328C10.7202 7.31063 10.6868 7.64993 10.559 7.95828C10.4313 8.26663 10.215 8.53018 9.93752 8.7156C9.66002 8.90103 9.33376 9 9 9C8.55245 9 8.12322 8.82221 7.80676 8.50574C7.49029 8.18928 7.3125 7.76005 7.3125 7.3125Z"
            fill={color} // ✨ This makes the icon color dynamic!
        />
    </svg>
);

const ArtistPageButton = ({ selectedStage, onStageSelect }) => {
    return (
        <div className="">
            <div
                className="flex items-center justify-between rounded-3xl p-3 shadow-2xl backdrop-blur-md transition-all duration-300 w-full md:max-w-[500px] max-h-[62px]"
                style={{
                    // Custom border and box-shadow for the UI effect
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 6px -1px rgba(1, 2, 2, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.3) inset',
                }}
            >
                {STAGES.map((stage, index) => (
                    <React.Fragment key={stage.name}>
                        {/* Stage Button */}
                        <button
                            className="flex items-center space-x-1  rounded-lg transition duration-150 ease-in-out shrink-0"
                            style={{ color: stage.color }} // Apply dynamic color
                        >
                            <span className=" text-xs sm:text-sm mx-2 font-medium whitespace-nowrap">{stage.name}</span>
                        </button>

                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ArtistPageButton;