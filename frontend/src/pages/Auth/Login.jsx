import logo from '../../assets/logos/sparkMotionLogo.png'
import backgroundImageLogin from "../../assets/images/backgroundImageLogin.png"
import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { apiConnecter } from '../../services/apiConnector';
import Modal from '../../components/shared/ErrorModal';
import { login, setUserInfo } from '../../redux/slices/userInfoSlice';
import { useNavigate } from 'react-router';

const SparkMotionLogo = () => (
    <img src={logo} className='mb-3 w-[160px] h-[50px]'></img>
);

// A simple modal component to use instead of window.alert()


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch()

    const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });

    const handleLogin = async (e) => {
        // Prevent the browser's default form submission and validation
        e.preventDefault();

        setError('');
        setSuccess('');

        // --- CUSTOM FRONTEND VALIDATION ---
        let isValid = true;
        const newFieldErrors = { email: '', password: '' };

        if (!email.trim()) {
            newFieldErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newFieldErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!password) {
            newFieldErrors.password = 'Password is required.';
            isValid = false;
        }

        setFieldErrors(newFieldErrors);

        if (!isValid) {
            return; // Stop login attempt if validation fails
        }
        // -----------------------------------

        setLoading(true);

        // Simulate an API call with a delay
        try {
            // A simple validation/check
            const response = await apiConnecter("POST", process.env.REACT_APP_LOGIN_END_POINT, { email, password });
            setSuccess(response.data.message);
            console.log(response.data.result);
            dispatch(login({ user: response?.data?.result?.user, token: response?.data?.result?.token }))
            navigate("/Overview")
            // const response = await apiConnecter("POST", "login", { email, password })

        } catch (err) {
            console.log(err)
            setError(err?.response?.data?.message ?? err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleModalClose = () => {
        setError('');
        setSuccess('');
    };

    const getInputBorderClass = (fieldName) => {
        return fieldErrors[fieldName] ? "border-orange-600 focus:border-orange-600" : "border-transparent focus:border-[var(--color-primary)]";
    };

    return (
        <div className="min-h-screen w-full font-[Inter] flex justify-center items-center p-4"
            style={{
                backgroundColor: 'var(--color-surface-background)',
                // backfaceVisibility:"visible",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImageLogin})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>

            <div className='flex flex-col justify-center items-center'>
                <SparkMotionLogo />
                <div className="flex bg-[var(--color-surface-card)] rounded-[12px] border-[#454343] border pb-4   shadow-2xl  w-[434px]  mx-auto flex-col justify-center items-center">
                    <div className=" h-[49px] w-[402px]  flex flex-col items-center justify-center mb-3">

                        <h2 className="mt-5  text-center text-[20px] tracking-tight text-[var(--color-text-base)]">
                            Welcome back
                        </h2>
                        <p className="mt-1 text-center text-[13px] text-[var(--color-text-base)]"
                            style={{
                                lineHeight: "20px"
                            }}>

                            Sign in to your SparkMotion dashboard
                        </p>
                    </div>

                    <div className="mt-5   w-[382px]  ">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Organizer Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-text-base)]">
                                    Email Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Your Email"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('email')}`}
                                    />
                                    {fieldErrors.email && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.email}</p>
                                    )}
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-[var(--color-text-base)]">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter Your Password"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('password')}`}
                                    />
                                    {fieldErrors.password && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.password}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md bg-[var(--color-primary)]  px-[12px] py-[6px] text-sm font-semibold text-white shadow-sm transition-opacity cursor-pointer duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
                                        }`}
                                >
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {error && <Modal title="Login Failed" message={error} onClose={handleModalClose} />}
            {success && <Modal title="Login Successful" message={success} onClose={handleModalClose} />}
        </div>
    );
};


export default Login

// import logo from '../../assets/logos/sparkMotionLogo.png'
// import backgroundImageLogin from "../../assets/images/backgroundImageLogin.png"
// import React, { useState } from 'react';
// import { createPortal } from 'react-dom';

// const SparkMotionLogo = () => (
//     <img src={logo} className='mb-3 w-[160px] h-[50px]'></img>
// );

// // A simple modal component to use instead of window.alert()
// const Modal = ({ title, message, onClose }) => {
//     return createPortal(
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-[var(--color-surface-card)] text-white p-6 rounded-xl shadow-lg max-w-sm w-full">
//                 <h2 className="text-xl font-bold mb-2">{title}</h2>
//                 <p className="text-sm text-[var(--color-text-secondary)] mb-4">{message}</p>
//                 <div className="flex justify-end">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:opacity-80 transition-opacity duration-200"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>,
//         document.body
//     );
// };

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     // State to hold custom field-level validation errors
//     const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });

//     const handleLogin = async (e) => {
//         // Prevent the browser's default form submission and validation
//         e.preventDefault();

//         setError('');
//         setSuccess('');

//         // --- CUSTOM FRONTEND VALIDATION ---
//         let isValid = true;
//         const newFieldErrors = { email: '', password: '' };

//         if (!email.trim()) {
//             newFieldErrors.email = 'Email is required.';
//             isValid = false;
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             newFieldErrors.email = 'Please enter a valid email address.';
//             isValid = false;
//         }

//         if (!password) {
//             newFieldErrors.password = 'Password is required.';
//             isValid = false;
//         }

//         setFieldErrors(newFieldErrors);

//         if (!isValid) {
//             return; // Stop login attempt if validation fails
//         }
//         // -----------------------------------

//         setLoading(true);

//         // Simulate an API call with a delay
//         try {
//             // A simple validation/check
//             if (email === 'test@sparkmotion.com' && password === 'password123') {
//                 await new Promise(resolve => setTimeout(resolve, 1500));
//                 setSuccess('Login successful! Welcome back.');
//             } else {
//                 await new Promise(resolve => setTimeout(resolve, 1500));
//                 setError('Invalid email or password. Please try again.');
//             }
//         } catch (err) {
//             setError('An unexpected error occurred. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleModalClose = () => {
//         setError('');
//         setSuccess('');
//     };

//     return (
//         <div className="min-h-screen w-full font-[Inter] flex justify-center items-center p-4"
//             style={{
//                 backgroundColor: 'var(--color-surface-background)',
//                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImageLogin})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center'
//             }}>

//             <div className='flex flex-col justify-center items-center'>
//                 <SparkMotionLogo />
//                 <div className="flex bg-[var(--color-surface-card)] rounded-[12px] border-[#454343] border pb-2.5   shadow-2xl  w-[434px] h-[350px]   mx-auto flex-col justify-center items-center">
//                     <div className=" h-[49px] w-[402px]  flex flex-col items-center justify-center mb-3">

//                         <h2 className="mt-5  text-center text-[20px] tracking-tight text-[var(--color-text-base)]">
//                             Welcome back
//                         </h2>
//                         <p className="mt-1 text-center text-[13px] text-[var(--color-text-base)]"
//                             style={{
//                                 lineHeight: "20px"
//                             }}>

//                             Sign in to your SparkMotion dashboard
//                         </p>
//                     </div>

//                     <div className="mt-5     w-[382px]  ">
//                         <form onSubmit={handleLogin} className="space-y-4"> {/* Decreased space-y to account for error messages */}
//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-bold  text-[var(--color-text-base)]">
//                                     Email
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         id="email"
//                                         name="email"
//                                         type="email"
//                                         // REMOVED required attribute
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         placeholder='Enter your email'
//                                         className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${fieldErrors.email ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-[var(--color-primary)]'}`}
//                                     />
//                                     {/* Custom Error Message for Email */}
//                                     {fieldErrors.email && (
//                                         <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div>
//                                 <label htmlFor="password" className="block text-sm font-bold text-[var(--color-text-base)]">
//                                     Password
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         id="password"
//                                         name="password"
//                                         type="password"
//                                         // REMOVED required attribute
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         placeholder='Enter your password'
//                                         className={`block w-full rounded-md bg-[var(--color-surface-input)]  px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${fieldErrors.password ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-[var(--color-primary)]'}`}
//                                     />
//                                     {/* Custom Error Message for Password */}
//                                     {fieldErrors.password && (
//                                         <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div>
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className={`flex w-full justify-center rounded-md bg-[var(--color-primary)]  px-[12px] py-[6px] text-sm font-semibold text-white shadow-sm transition-opacity cursor-pointer duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
//                                         }`}
//                                 >
//                                     {loading ? 'Signing in...' : 'Sign in'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//             {/* Existing Modal for server/API errors */}
//             {error && <Modal title="Login Failed" message={error} onClose={handleModalClose} />}
//             {success && <Modal title="Login Successful" message={success} onClose={handleModalClose} />}
//         </div>
//     );
// };


// export default Login;