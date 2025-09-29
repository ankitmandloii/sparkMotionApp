  // import { toast } from "sonner";

  //  const showCustomModal = ({ 
  //   title, 
  //   buttontxt,
  //   message, 
  //   onAccept, 
  //   onDecline, 
  //   showAcceptDecline = false,
  //   loading = false,
  //   loadingText = "Processing..."
  // }) => {
  //  return toast.custom((t) => (
  //     <div className="bg-[var(--color-surface-input)] text-white font-[Inter] rounded-xl shadow-lg p-6  w-[300px] ">
  //       <h2 className="text-xl font-bold mb-2">{title}</h2>
  //       <p className="text-sm text-[var(--color-text-secondary)] mb-4">{message}</p>  

  //       {showAcceptDecline ? (
  //         <div className="flex justify-end space-x-4">
  //           <button
  //             onClick={() => {
  //               onAccept?.();
  //               toast.dismiss(t.id);
  //             }}
  //             className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:opacity-80 transition-opacity duration-200"
  //           >
  //             {buttontxt?.accept || "Accept"}
  //           </button>
  //           <button
  //             onClick={() => {
  //               onDecline?.();
  //               toast.dismiss(t.id);
  //             }}
  //             className="px-4 py-2 bg-[var(--color-text-secondary)] text-white rounded-md hover:opacity-80 transition-opacity duration-200"
  //           >
  //             {buttontxt?.decline || "Decline"}
  //           </button>
  //         </div>
  //       ) :loading ? (
  //           <div className="flex flex-col items-center justify-center py-2 space-y-2">
  //             <div className="relative flex items-center justify-center">
  //               {/* Outer glow ring */}
  //               {/* <div className="absolute w-10 h-10 rounded-full bg-[var(--color-primary)] opacity-20 animate-ping"></div> */}
  //               {/* Spinner */}
  //               <div className="w-6 h-6 border-[3px] border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
  //             </div>
  //             <p className="text-sm text-[var(--color-text-secondary)] animate-pulse">
  //               {loadingText}
  //             </p>
  //           </div>
  //         ) : (
  //         <div className="flex justify-end">
  //           <button
  //             onClick={() => toast.dismiss(t.id)}
  //             className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:opacity-80 transition-opacity duration-200"
  //           >
  //             Close
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   ), {
  //     position: "bottom-right",
  //     duration: Infinity, // stays until user clicks
  //   });
  // };
  // export default showCustomModal;
  import { toast } from "sonner";

  const showCustomModal = ({ 
    title, 
    buttontxt,
    message, 
    onAccept, 
    onDecline, 
    showAcceptDecline = false,
    loading = false,
    loadingText = "Processing..."
  }) => {
    return toast.custom((t) => (
      <div className="
        bg-[var(--color-surface-input)] 
        text-white 
        font-[Inter] 
        rounded-xl 
        shadow-lg 
        p-6
        w-full
        max-w-sm    sm:max-w-sm    md:max-w-md    lg:max-w-lg 
        mr-7 sm:mr-6 md:mr-8
      ">
      {/* {max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
    mr-7 sm:mr-6 md:mr-8} */} 
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">{message}</p>  

        {showAcceptDecline ? (
          <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-2 sm:space-y-0">
            <button
              onClick={() => {
                onAccept?.();
                toast.dismiss(t.id);
              }}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:opacity-80 transition-opacity duration-200"
            >
              {buttontxt?.accept || "Accept"}
            </button>
            <button
              onClick={() => {
                onDecline?.();
                toast.dismiss(t.id);
              }}
              className="px-4 py-2 bg-[var(--color-text-secondary)] text-white rounded-md hover:opacity-80 transition-opacity duration-200"
            >
              {buttontxt?.decline || "Decline"}
            </button>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-2 space-y-2">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 sm:border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] animate-pulse mt-2 text-center">{loadingText}</p>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:opacity-80 transition-opacity duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    ), {
      position: "bottom-right",
      duration: !loading && !showAcceptDecline ? 3000 : Infinity, // stays until user clicks
    });
  };

  export default showCustomModal;
