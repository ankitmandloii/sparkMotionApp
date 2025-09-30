// import logo from '../../assets/logos/sparkMotionLogo.png'
// import backgroundImageLogin from "../../assets/images/backgroundImageLogin.png"
// import React, { useState, useEffect } from 'react';
// import { useDispatch } from "react-redux"
// import { apiConnecter } from '../../services/apiConnector';
// import Modal from '../../components/shared/ErrorModal';
// import { login, setUserInfo } from '../../redux/slices/userInfoSlice';
// import { useNavigate } from 'react-router';
// import API_ENDPOINTS from '../../data/EndPoints';


// const SparkMotionLogo = () => (
//     <img src={logo} className='mb-3 w-[160px] h-[50px]'></img>
// );

// // A simple modal component to use instead of window.alert()


// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const dispatch = useDispatch()

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
//             const response = await apiConnecter("POST", API_ENDPOINTS.REACT_APP_LOGIN_END_POINT, { email, password });
//             setSuccess("Redirecting To Dashboard...");
//             console.log(response.data.result);
//             setTimeout(() => {
//                 navigate("/Overview");
//                 dispatch(login({ user: response?.data?.result?.user, token: response?.data?.result?.token }))
//             }, 2000);
//             // const response = await apiConnecter("POST", "login", { email, password })

//         } catch (err) {
//             console.log(err)
//             setError(err?.response?.data?.message ?? err.message);
//         } finally {
//             setLoading(false);
//         }
//     };


//     const handleModalClose = () => {
//         setError('');
//         setSuccess('');
//     };

//     const getInputBorderClass = (fieldName) => {
//         return fieldErrors[fieldName] ? "border-orange-600 focus:border-orange-600" : "border-transparent focus:border-[var(--color-primary)]";
//     };
//     useEffect(() => {
//         if (error) {
//             Modal({
//                 title: "Login Failed",
//                 message: error,
//             });
//         }
//         if (success) {
//             Modal({
//                 title: "Login Successful",
//                 message: success,
//             });
//         }
//     }, [error, success]);

//     return (
//         <div className="min-h-screen w-full font-[Inter] flex justify-center items-center p-4"
//             style={{
//                 backgroundColor: 'var(--color-surface-background)',
//                 // backfaceVisibility:"visible",
//                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImageLogin})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center'
//             }}>

//             <div className='flex flex-col justify-center items-center'>
//                 <SparkMotionLogo />
//                 <div className="flex bg-[var(--color-surface-card)] rounded-[12px] border-[#454343] border pb-4   shadow-2xl  w-[434px]  mx-auto flex-col justify-center items-center">
//                     <div className=" h-[49px] w-full max-w-[402px]  flex flex-col items-center justify-center mb-3">

//                         <h2 className="mt-5  text-center text-[20px] tracking-tight text-[var(--color-text-base)]">
//                             Welcome back
//                         </h2>
//                         <p className="mt-1 text-center text-[13px] text-[var(--color-text-base)]"
//                             style={{
//                                 lineHeight: "20px"
//                             }}>

//                             Sign in to your SparkMotion dashboard
//                         </p>
//                     </div>

//                     <div className="mt-5 w-full  max-w-[382px]  ">
//                         <form onSubmit={handleLogin} className="space-y-6">
//                             {/* Organizer Email */}
//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-text-base)]">
//                                     Email Address
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         id="email"
//                                         type="text"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         placeholder="Enter Your Email"
//                                         className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('email')}`}
//                                     />
//                                     {fieldErrors.email && (
//                                         <p className="mt-1 text-xs text-orange-600">{fieldErrors.email}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Password */}
//                             <div>
//                                 <label htmlFor="password" className="block text-sm font-semibold text-[var(--color-text-base)]">
//                                     Password
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         id="password"
//                                         type="password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         placeholder="Enter Your Password"
//                                         className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('password')}`}
//                                     />
//                                     {fieldErrors.password && (
//                                         <p className="mt-1 text-xs text-orange-600">{fieldErrors.password}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div>
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className={`flex w-full justify-center rounded-md bg-[var(--color-primary)]  px-[12px] py-[6px] text-sm font-semibold text-white shadow-sm transition-opacity cursor-pointer duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
//                                         }`}
//                                 >
//                                     {loading ? 'Signing in...' : 'Sign in'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//             {/* {error && <Modal title="Login Failed" message={error} onClose={handleModalClose} />} */}
//             {/* {success && <Modal title="Login Successful" message={success} onClose={handleModalClose} />} */}
//         </div>
//     );
// };


// export default Login

import logo from '../../assets/logos/sparkMotionLogo.png'
import backgroundImageLogin from "../../assets/images/backgroundImageLogin.png"
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import { apiConnecter } from '../../services/apiConnector';
import Modal from '../../components/shared/ErrorModal';
import { login } from '../../redux/slices/userInfoSlice';
import { useNavigate } from 'react-router';
import API_ENDPOINTS from '../../data/EndPoints';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const SparkMotionLogo = () => (
    <img src={logo} className='mb-3 w-[160px] h-[50px] object-contain'></img>
);

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()

    const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

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

        if (!isValid) return;

        setLoading(true);
        try {
            const response = await apiConnecter("POST", API_ENDPOINTS.REACT_APP_LOGIN_END_POINT, { email, password });
            setSuccess("Redirecting To Dashboard...");
            setTimeout(() => {
                navigate("/Overview");
                dispatch(login({ user: response?.data?.result?.user, token: response?.data?.result?.token }))
            }, 2000);
        } catch (err) {
            setError(err?.response?.data?.message ?? err.message);
        } finally {
            setLoading(false);
        }
    };

    const getInputBorderClass = (fieldName) => {
        return fieldErrors[fieldName]
            ? "border-orange-600 focus:border-orange-600"
            : "border-transparent focus:border-[var(--color-primary)]";
    };

    useEffect(() => {
        if (error) {
            Modal({ title: "Login Failed", message: error });
        }
        if (success) {
            Modal({ title: "Login Successful", message: success });
        }
    }, [error, success]);

    return (
        <>
            <div
                className="min-h-screen w-full font-[Inter] flex justify-center items-center p-4"
                style={{
                    backgroundColor: 'var(--color-surface-background)',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImageLogin})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className='flex flex-col justify-center items-center w-full max-w-md'>
                    <SparkMotionLogo />
                    <div className="flex flex-col bg-[var(--color-surface-card)] rounded-[12px] border-[#454343] border pb-6 shadow-2xl w-full px-6 sm:px-8">

                        {/* Header */}
                        <div className="text-center mt-5 ">
                            <h2 className="text-[20px] tracking-tight text-[var(--color-text-base)]">
                                Welcome back
                            </h2>
                            <p className="mt-1 text-[13px] text-[var(--color-text-base)] leading-5">
                                Sign in to your SparkMotion dashboard
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="mt-2 space-y-4">

                            {/* Email */}
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
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-3 py-2 text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('email')}`}
                                    />
                                    {fieldErrors.email && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.email}</p>
                                    )}
                                </div>
                            </div>



                            {/* Password */}
                            {/* <div>
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
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-3 py-2 text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('password')}`}
                                    />
                                    {fieldErrors.password && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.password}</p>
                                    )}
                                </div>
                            </div> */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Password
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter Password"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('password')}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-300 transition-colors duration-200 text-lg"
                                    >
                                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </button>
                                </div>
                                {fieldErrors.password && <p className="mt-1 text-xs text-orange-600">{fieldErrors.password}</p>}
                            </div>

                            {/* Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-opacity cursor-pointer duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
                                        }`}
                                >
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

// import logo from '../../assets/logos/sparkMotionLogo.png';
// import backgroundImageLogin from "../../assets/images/backgroundImageLogin.png";
// import React, { useState, useEffect } from 'react';
// import { useDispatch } from "react-redux";
// import { apiConnecter } from '../../services/apiConnector';
// import Modal from '../../components/shared/ErrorModal';
// import { login } from '../../redux/slices/userInfoSlice';
// import { useNavigate } from 'react-router';

// const SparkMotionLogo = () => (
//   <img src={logo} className='mb-3 w-40 sm:w-44 md:w-48 h-12 sm:h-14 md:h-16' alt="SparkMotion Logo" />
// );

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(''); setSuccess('');

//     let isValid = true;
//     const newFieldErrors = { email: '', password: '' };

//     if (!email.trim()) {
//       newFieldErrors.email = 'Email is required.'; isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newFieldErrors.email = 'Please enter a valid email address.'; isValid = false;
//     }
//     if (!password) {
//       newFieldErrors.password = 'Password is required.'; isValid = false;
//     }
//     setFieldErrors(newFieldErrors);
//     if (!isValid) return;

//     setLoading(true);
//     try {
//       const response = await apiConnecter("POST", API_ENDPOINTS.REACT_APP_LOGIN_END_POINT, { email, password });
//       setSuccess("Redirecting to Dashboard...");
//       setTimeout(() => {
//         navigate("/Overview");
//         dispatch(login({ user: response?.data?.result?.user, token: response?.data?.result?.token }));
//       }, 2000);
//     } catch (err) {
//       setError(err?.response?.data?.message ?? err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (error) Modal({ title: "Login Failed", message: error });
//     if (success) Modal({ title: "Login Successful", message: success });
//   }, [error, success]);

//   const getInputBorderClass = (fieldName) => (
//     fieldErrors[fieldName] ? "border-orange-600 focus:border-orange-600" : "border-transparent focus:border-[var(--color-primary)]"
//   );

//   return (
//     <div
//       className="min-h-screen w-full font-[Inter] flex justify-center items-center  bg-cover bg-center"
//       style={{
//         backgroundColor: 'var(--color-surface-background)',
//         backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImageLogin})`
//       }}
//     >
//       <div className='flex flex-col justify-center items-center w-full max-w-md sm:max-w-lg md:max-w-lg mx-4'>
//         <SparkMotionLogo />
//         <div className="flex flex-col justify-center items-center bg-[var(--color-surface-card)] rounded-xl border border-[#454343] shadow-2xl w-full  sm:p-5">
//           <div className="flex flex-col items-center mb-4 text-center">
//             <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--color-text-base)]">Welcome back</h2>
//             <p className="mt-1 text-sm sm:text-base md:text-base text-[var(--color-text-base)] leading-5">
//               Sign in to your SparkMotion dashboard
//             </p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-4 w-full">
//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-text-base)]">Email Address</label>
//               <input
//                 id="email"
//                 type="text"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter Your Email"
//                 className={`mt-2 block w-full rounded-md bg-[var(--color-surface-input)] px-3 py-2 text-sm sm:text-base text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('email')}`}
//               />
//               {fieldErrors.email && <p className="mt-1 text-xs text-orange-600">{fieldErrors.email}</p>}
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-semibold text-[var(--color-text-base)]">Password</label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter Your Password"
//                 className={`mt-2 block w-full rounded-md bg-[var(--color-surface-input)] px-3 py-2 text-sm sm:text-base text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('password')}`}
//               />
//               {fieldErrors.password && <p className="mt-1 text-xs text-orange-600">{fieldErrors.password}</p>}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full flex justify-center px-4 py-2 text-white font-semibold rounded-md shadow-sm transition-opacity duration-200 ${loading ? 'bg-[var(--color-primary)] opacity-50 cursor-not-allowed' : 'bg-[var(--color-primary)] hover:opacity-80'}`}
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
