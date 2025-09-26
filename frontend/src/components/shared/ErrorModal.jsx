// import { createPortal } from 'react-dom';

// const Modal = ({ title, message, onClose, onAccept, onDecline, showAcceptDecline }) => {
//     return createPortal(
//         <div className="fixed inset-0 flex font-[Inter] items-center justify-center p-4 z-50 backdrop-blur-lg drop-shadow-2xl bg-[rgba(0,0,0,0.5)]">
//             <div className="bg-[var(--color-surface-card)] text-white p-6 rounded-xl shadow-lg max-w-sm w-full">
//                 <h2 className="text-xl font-bold mb-2">{title}</h2>
//                 <p className="text-sm text-[var(--color-text-secondary)] mb-4">{message}</p>
                
//                 {/* Conditionally render Accept and Decline buttons */}
//                 {showAcceptDecline ? (
//                     <div className="flex justify-end space-x-4">
//                         <button
//                             onClick={onAccept}
//                             className="px-4 py-2 bg-[var(--color-primary)] cursor-pointer text-white rounded-md hover:opacity-80 transition-opacity duration-200"
//                         >
//                             Accept
//                         </button>
//                         <button
//                             onClick={onDecline}
//                             className="px-4 py-2 bg-[var(--color-text-secondary)] cursor-pointer text-white rounded-md hover:opacity-80 transition-opacity duration-200"
//                         >
//                             Decline
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="flex justify-end">
//                         <button
//                             onClick={onClose}
//                             className="px-4 py-2 bg-[var(--color-primary)] cursor-pointer text-white rounded-md hover:opacity-80 transition-opacity duration-200"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>,
//         document.body
//     );
// };

// export default Modal;
import { createPortal } from 'react-dom';

const Modal = ({ title, message, onClose, onAccept, onDecline, showAcceptDecline }) => {
    return createPortal(
        <div className="fixed inset-0 flex font-[Inter] items-start justify-center p-4 z-50 backdrop-blur-xs bg-[rgba(0,0,0,0.5)]">
            <div className="bg-[var(--color-surface-input)] text-white p-6 rounded-xl shadow-lg w-full max-w-md ">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">{message}</p>
                
                {/* Conditionally render Accept and Decline buttons */}
                {showAcceptDecline ? (
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={onAccept}
                            className="px-4 py-2 bg-[var(--color-primary)] cursor-pointer text-white rounded-md hover:opacity-80 transition-opacity duration-200"
                        >
                            Accept
                        </button>
                        <button
                            onClick={onDecline}
                            className="px-4 py-2 bg-[var(--color-text-secondary)] cursor-pointer text-white rounded-md hover:opacity-80 transition-opacity duration-200"
                        >
                            Decline
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-[var(--color-primary)] cursor-pointer text-white rounded-md hover:opacity-80 transition-opacity duration-200"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
