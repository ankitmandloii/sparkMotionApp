export const Button = ({ onClick, children = "Remind Me" }) => {
    return (
        <button
            onClick={onClick}
            className="button-bg-gradient hover:from-red-600 hover:to-red-700 text-white px-2 py-1.5 md:px-6 md:py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
            {children}
        </button>
    );
};
// background: linear-gradient(180deg, #E35254 0%, #A8272C 100%);