// import React, { useEffect, useState } from 'react';
// import { IoMdEyeOff, IoMdEye } from "react-icons/io";
// import Modal from '../../components/shared/ErrorModal';
// import { useSelector } from 'react-redux';
// import { apiConnecter } from '../../services/apiConnector';
// import { useNavigate } from 'react-router';

// const CreateOrganizerForm = () => {
//     // State for all form fields
//     const userInfo = useSelector((state) => state.userInfo)
//     const navigate = useNavigate();
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [number, setNumber] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [expectAttendance, setExpectAttendance] = useState('');
//     const [location, setLocation] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [organizersList, setOrganizersList] = useState([]);
//     // State for field-specific validation errors
//     const [fieldErrors, setFieldErrors] = useState({});

//     // Function to toggle password visibility
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const createOrganizerHandler = async (data) => {
//         setLoading(true);
//         console.log("userInfo", userInfo)
//         // Simulate an API call with a delay
//         try {
//             const response = await apiConnecter("POSt", process.env.REACT_APP_GET_ACTIVE_ORGANIZER_LIST_END_POINT, null,
//                 {
//                     authorization: `Bearer ${userInfo.token}`
//                 });
//             console.log("data from server", response.data)
//             setSuccess(response.data.message);
//         } catch (err) {
//             setError(err?.response?.data?.message ?? err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleModalClose = () => {
//         setError('');
//         setSuccess('');
//     };

//     function validatePassword(password) {
//         let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
//         return regex.test(password);
//     }
//     function validateName(password) {
//         let regex = /^[A-Z a-z]+$/;
//         return regex.test(password);
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         let isValid = true;
//         const newFieldErrors = {};

//         // Validation for required fields
//         if (!name.trim()) {
//             newFieldErrors.name = 'Name is required.';
//             isValid = false;
//         }
//         else if (!validateName(name)) {
//             newFieldErrors.name = 'Please enter a valid name.';
//         }
//         if (!number.trim()) {
//             newFieldErrors.number = 'Number is required.';
//             isValid = false;
//         }

//         if (!email.trim()) {
//             newFieldErrors.email = 'Email is required.';
//             isValid = false;
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             newFieldErrors.email = 'Please enter a valid email address.';
//             isValid = false;
//         }
//         if (!password.trim()) {
//             newFieldErrors.password = 'Password is required.';
//             isValid = false;
//         } else if (!validatePassword(password)) {
//             newFieldErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number";
//             isValid = false;
//         }

//         setFieldErrors(newFieldErrors);

//         if (!isValid) {
//             console.log("Form has validation errors. Not submitting.");
//             return;
//         }

//         createOrganizerHandler({
//             userName: name, email, password, phoneNumber: number, role: "organizer", status: "active"
//         });
//         console.log('Form submitted successfully with the following data:');
//     };

//     const getInputBorderClass = (fieldName) => {
//         return fieldErrors[fieldName] ? "border-orange-600 focus:border-orange-600" : "border-transparent focus:border-[var(--color-primary)]";
//     };


//     return (
//         <div
//             className="min-h-screen font-[Inter] w-full flex justify-center items-center p-4 text-gray-200"
//         >

//             <div className='flex flex-col justify-center items-center p-4 w-full max-w-[517px]'>
//                 <div className="flex bg-[var(--color-surface-card)] w-full rounded-[12px] border-[#454343] border pb-4 shadow-2xl mx-auto flex-col justify-center items-center">
//                     <div className="p-[20px] w-full   ">
//                         <div className="w-full mb-2">
//                             <h2 className="text-start text-[23px] font-bold tracking-tight text-[var(--color-text-base)]" style={{ lineHeight: "32px" }}>
//                                 Organizer
//                             </h2>
//                             <p className="mt-1 text-start text-[14px] font-medium text-[var(--color-text-secondary)] leading-[20px]">
//                                 Create New Organizer
//                             </p>
//                         </div>
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {/* Organizer Name */}
//                             <div>
//                                 <label htmlFor="name" className="block text-sm font-bold text-[var(--color-text-base)]">
//                                     Organizer Name
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         id="name"
//                                         type="text"
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                         placeholder="Enter Organizer name"
//                                         className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('name')}`}
//                                     />
//                                     {fieldErrors.name && (
//                                         <p className="mt-1 text-xs text-orange-600">{fieldErrors.name}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             {/* Organizer Number */}
//                             <div>
//                                 <label htmlFor="number" className="block text-sm font-bold text-[var(--color-text-base)]">
//                                     Enter Organizer Contact Number
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         id="number"
//                                         type="text"
//                                         value={number}
//                                         onChange={(e) => setNumber(e.target.value)}
//                                         placeholder="Enter Organizer Contact Number"
//                                         className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('number')}`}
//                                     />
//                                     {fieldErrors.number && (
//                                         <p className="mt-1 text-xs text-orange-600">{fieldErrors.number}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             {/* Organizer Email */}
//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-bold text-[var(--color-text-base)]">
//                                     Enter Organizer Email Address
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         id="email"
//                                         type="text"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         placeholder="Enter Organizer Email"
//                                         className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('email')}`}
//                                     />
//                                     {fieldErrors.email && (
//                                         <p className="mt-1 text-xs text-orange-600">{fieldErrors.email}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             {/* Password */}
//                             <div>
//                                 <label htmlFor="password" className="block text-sm font-bold text-[var(--color-text-base)]">
//                                     Create Password
//                                 </label>
//                                 <div className="mt-2 relative">
//                                     <input
//                                         id="password"
//                                         type={showPassword ? "text" : "password"}
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         placeholder="Enter Password"
//                                         className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('password')}`}
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={togglePasswordVisibility}
//                                         className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-300 transition-colors duration-200 text-lg"
//                                         aria-label={showPassword ? "Hide password" : "Show password"}
//                                     >
//                                         {showPassword ? <IoMdEyeOff></IoMdEyeOff> : <IoMdEye></IoMdEye>}
//                                     </button>
//                                 </div>
//                                 {fieldErrors.password && (
//                                     <p className="mt-1 text-xs text-orange-600">{fieldErrors.password}</p>
//                                 )}
//                             </div>
//                         </form>
//                     </div>
//                     <div className="mt-3 flex justify-end px-5 space-x-4 w-full">
//                         <button
//                             type="button"
//                             onClick={() => navigate("/organizations")}
//                             className={`px-6 py-2 text-sm cursor-pointer font-semibold rounded-md border border-[#454343] text-[var(--color-text-base)] transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed ' : 'hover:bg-[#333333]'}`}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             onClick={handleSubmit}
//                             className={`px-6 py-2 text-sm cursor-pointer font-semibold rounded-md bg-[var(--color-primary)] text-white shadow-sm transition-opacity duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
//                         >
//                             {loading ? "Creating Organizer..." : "Create Organizer"}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {error && <Modal title="Failed to Create Organizer" message={error} onClose={handleModalClose} />}
//             {success && <Modal title="Organizer Created Successfully" message={success} onClose={handleModalClose} />}
//         </div>
//     );
// };

// export default CreateOrganizerForm;
import React, { useEffect, useRef, useState } from 'react';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import Modal from '../../components/shared/ErrorModal';
import { useSelector } from 'react-redux';
import { apiConnecter } from '../../services/apiConnector';
import { useNavigate } from 'react-router';

const CreateOrganizerForm = ({ organizerToUpdate = null }) => {
    const userInfo = useSelector((state) => state.userInfo);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState('active'); // Default to 'active'
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const allStatus = ["active", "inactive"]

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const statusRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statusRef.current && !statusRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    // Function to create a new organizer
    const createOrganizerHandler = async () => {
        setLoading(true);
        try {
            const response = await apiConnecter("POST", process.env.REACT_APP_CREATE_ORGANIZER_END_POINT, {
                userName: name, email, phoneNumber: number, password, role: "organizer", status: "active"
            }, { authorization: `Bearer ${userInfo.token}` });
            setSuccess(response.data.message);
        } catch (err) {
            setError(err?.response?.data?.message ?? err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to update an existing organizer
    const updateOrganizerHandler = async () => {
        setLoading(true);
        try {
            const response = await apiConnecter("PUT", `${process.env.REACT_APP_UPDATE_ORGANIZER_END_POINT}${organizerToUpdate._id}`, {
                userName: name, email, phoneNumber: number, role: "organizer", status
            }, { authorization: `Bearer ${userInfo.token}` });
            setSuccess(response.data.message);
        } catch (err) {
            console.log(err, "errror")
            setError(err?.response?.data?.error ?? err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newFieldErrors = {};

        // Validation for required fields
        if (!name.trim()) {
            newFieldErrors.name = 'Name is required.';
            isValid = false;
        }
        if (!number.trim()) {
            newFieldErrors.number = 'Number is required.';
            isValid = false;
        }
        if (!email.trim()) {
            newFieldErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newFieldErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }
        if (!password.trim() && !organizerToUpdate) {
            newFieldErrors.password = 'Password is required.';
            isValid = false;
        }

        setFieldErrors(newFieldErrors);

        if (!isValid) {
            console.log("Form has validation errors. Not submitting.");
            return;
        }

        if (organizerToUpdate) {
            updateOrganizerHandler();
        } else {
            createOrganizerHandler();
        }
    };

    // Auto-fill the form fields if it's an update
    useEffect(() => {
        if (organizerToUpdate) {
            setName(organizerToUpdate.userName || '');
            setEmail(organizerToUpdate.email || '');
            setNumber(organizerToUpdate.phoneNumber || '');
            setPassword(''); // Don't auto-fill password for security reasons
            setStatus(organizerToUpdate.status || 'active'); // Set the current status
        }
    }, [organizerToUpdate]);

    const getInputBorderClass = (fieldName) => {
        return fieldErrors[fieldName] ? "border-orange-600 focus:border-orange-600" : "border-transparent focus:border-[var(--color-primary)]";
    };

    return (
        <div className="min-h-screen font-[Inter] w-full flex justify-center items-center p-4 text-gray-200">
            <div className="flex flex-col justify-center items-center p-4 w-full max-w-[517px]">
                <div className="flex bg-[var(--color-surface-card)] w-full rounded-[12px] border-[#454343] border pb-4 shadow-2xl mx-auto flex-col justify-center items-center">
                    <div className="p-[20px] w-full">
                        <div className="w-full mb-2">
                            <h2 className="text-start text-[23px] font-bold tracking-tight text-[var(--color-text-base)]">
                                {organizerToUpdate ? "Update Organizer" : "Create Organizer"}
                            </h2>
                            <p className="mt-1 text-start text-[14px] font-medium text-[var(--color-text-secondary)]">
                                {organizerToUpdate ? "Update the organizer's details" : "Create New Organizer"}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Organizer Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Organizer Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Organizer name"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('name')}`}
                                    />
                                    {fieldErrors.name && <p className="mt-1 text-xs text-orange-600">{fieldErrors.name}</p>}
                                </div>
                            </div>

                            {/* Organizer Contact Number */}
                            <div>
                                <label htmlFor="number" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Enter Organizer Contact Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="number"
                                        type="text"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                        placeholder="Enter Organizer Contact Number"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('number')}`}
                                    />
                                    {fieldErrors.number && <p className="mt-1 text-xs text-orange-600">{fieldErrors.number}</p>}
                                </div>
                            </div>

                            {/* Organizer Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Enter Organizer Email Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Organizer Email"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('email')}`}
                                    />
                                    {fieldErrors.email && <p className="mt-1 text-xs text-orange-600">{fieldErrors.email}</p>}
                                </div>
                            </div>

                            {/* Password */}
                            {
                                !organizerToUpdate
                                &&
                                <div>
                                    <label htmlFor="password" className="block text-sm font-bold text-[var(--color-text-base)]">
                                        Create Password
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
                            }

                            {/* Status (Active/Inactive) */}
                            <div ref={statusRef}>
                                <label htmlFor="status" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Status
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        onFocus={() => setIsDropdownVisible(true)}
                                        className="block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    >
                                        {/* <option value="active">Active</option>
                                        <option value="inactive">Inactive</option> */}
                                    </input>
                                </div>{
                                    isDropdownVisible &&
                                    <ul className=" z-10 w-full mt-1 bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {allStatus.map((status, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    setStatus(status)
                                                    // setOrganizer(organizer.userName)
                                                    // setSelectedOrganizer(organizer)
                                                    setIsDropdownVisible(false)
                                                }}
                                                className="px-4 py-2 text-sm text-[var(--color-text-base)] cursor-pointer hover:bg-[var(--color-primary-dark)] transition-colors duration-200 hover:"
                                            >
                                                {status}
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </div>



                            {/* Submit Button */}
                            <div className="mt-3 flex justify-end  space-x-4 w-full">
                                <button
                                    type="button"
                                    onClick={() => navigate("/organizations")}
                                    className={`px-6 py-2 text-sm cursor-pointer font-semibold rounded-md border border-[#454343] text-[var(--color-text-base)] transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed ' : 'hover:bg-[#333333]'}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-6 py-2 text-sm cursor-pointer font-semibold rounded-md bg-[var(--color-primary)] text-white shadow-sm transition-opacity duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
                                >
                                    {loading ? "Saving..." : organizerToUpdate ? "Update Organizer" : "Create Organizer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {error && <Modal title="Failed" message={error} onClose={() => setError('')} />}
            {success && <Modal title="Success" message={success} onClose={() => setSuccess('')} />}
        </div>
    );
};

export default CreateOrganizerForm;

