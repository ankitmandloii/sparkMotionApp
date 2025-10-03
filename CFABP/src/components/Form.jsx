import React, { useEffect, useRef, useState } from 'react';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import CloseIcon from '@mui/icons-material/Close';


const CreateOrganizerForm = ({ organizerToUpdate = null, onCancel, setSuccess, setError, getAllOrganizers }) => {
    // const userInfo = useSelector((state) => state.userInfo);
    // const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState('active'); // Default to 'active'
    // const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');
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
        // setLoading(true);
        // try {
        //     const response = await apiConnecter("POST", API_ENDPOINTS.REACT_APP_CREATE_ORGANIZER_END_POINT, {
        //         userName: name, email, phoneNumber: number, password, role: "organizer", status: "active"
        //     }, { authorization: `Bearer ${userInfo.token}` });
        //     // setSuccess({ "message": response.data.message, title: "Success" });
        //     onCancel();
        //     Modal({
        //         "message": response.data.message,
        //         title: "Success"
        //     })
        //     setLoading(false);
        //     getAllOrganizers()

        // } catch (err) {
        //     console.log(err, "error");
        //     Modal({
        //         "message": err?.response?.data?.message,
        //         title: "Error"
        //     })
        //     setError({ "message": err?.response?.data?.message ?? err.message, title: "Error" });
        // } finally {
        //     setLoading(false);
        // }
    };

    // Function to update an existing organizer
    const updateOrganizerHandler = async () => {
        // setLoading(true);
        // try {
        //     const response = await apiConnecter("PUT", `${API_ENDPOINTS.REACT_APP_UPDATE_ORGANIZER_END_POINT}/${organizerToUpdate._id}`, {
        //         userName: name, email, phoneNumber: number, role: "organizer", status
        //     }, { authorization: `Bearer ${userInfo.token}` });
        //     Modal({
        //         "message": response.data.message,
        //         title: "Success"
        //     })
        //     setLoading(false);
        //     getAllOrganizers()

        // } catch (err) {
        //     console.log(err, "errror")
        //     Modal({
        //         "message": err?.response?.data?.message,
        //         title: "Error"
        //     })

        // } finally {
        //     setLoading(false);
        //     onCancel();
        // }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newFieldErrors = {};

        // Name validation
        if (!name.trim()) {
            newFieldErrors.name = 'Name is required.';
            isValid = false;
        }

        // Number validation
        if (!number.trim()) {
            newFieldErrors.number = 'email is required.';
            isValid = false;
        } else if (!/^\d{10}$/.test(number)) { // assuming 10-digit numbers
            newFieldErrors.number = 'Please enter a valid 10-digit number.';
            isValid = false;
        }

        // Email validation
        if (!email.trim()) {
            newFieldErrors.email = 'Organizations is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newFieldErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        // Password validation (only for creation)
        if (!password.trim() && !organizerToUpdate) {
            newFieldErrors.password = 'Position is required.';
            isValid = false;
        } else if (password && password.length < 6) { // optional strength check
            newFieldErrors.password = 'Password must be at least 6 characters.';
            isValid = false;
        }

        setFieldErrors(newFieldErrors);

        if (!isValid) {
            console.log("Form has validation errors. Not submitting.");
            return;
        }

        // Call the appropriate handler
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
        return fieldErrors[fieldName] ? "border-white focus:border-white" : "border white focus:border-[var(--color-white)]";
    };
    //  useEffect(() => {
    //     if (error) {
    //         Modal({
    //             title: error.title || "Error"   ,
    //             message: error.message,
    //         });
    //     }
    //     if (success) {
    //         Modal({
    //             title: success.title || "Success",
    //             message: success.message,
    //         });   
    //     }
    //     setTimeout(() => {
    //             setSuccess('');
    //             setError('');
    //         }, 3000);
    // }, [error, success]);

    const [showForm, setShowForm] = useState(true);
    const hideButton = () => {
        setShowForm(prev => !prev);
    }

    return (
        //i want to place in center of the screen
        <div className=" absolute  inset-0 backdrop-blur-xs z-50  min-h-screen w-full flex justify-center items-center p-4 text-white bg-red-200">
            <div className="flex absolute top-1/2 transform -translate-y-1/2 flex-col  justify-center items-center p-4 w-full max-w-[517px]">
                <div className="flex bg-[var(--color-surface-background)] w-full rounded-[12px] border-[#454343] border pb-4 shadow-2xl mx-auto flex-col justify-center items-center">
                    <div className="p-[20px] w-full">
                        {/* <div className="w-full mb-2">
                            <h2 className="text-start text-[23px] font-bold tracking-tight text-[var(--color-text-base)]">
                                {organizerToUpdate ? "Update Organizer" : "Create Organizer"}
                            </h2>
                            <p className="mt-1 text-start text-[14px] font-medium text-[var(--color-text-secondary)]">
                                {organizerToUpdate ? "Update the organizer's details" : "Create New Organizer"}
                            </p>
                        </div> */}
                        <div className='flex justify-between pb-6'>   <legend className='font-semibold text-3xl text-white uppercase'>dive into your festival exprience</legend>
                            <button
                                onClick={hideButton}
                                className="bg-white text-black h-9 w-12 rounded-full flex justify-center items-center shadow-md hover:scale-105 transition"
                                aria-label="Close form"
                            >
                                <CloseIcon className="text-lg" /> {/* Adjust icon size if needed */}
                            </button>

                        </div>
                        {showForm && (<form onSubmit={handleSubmit} className="space-y-2">
                            {/* Organizer Name */}

                            <div>
                                <label htmlFor="name" className="block text-2xl font-bold font-base text-[var(--color-text-base)]  ">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Your Name"
                                        className={` bg-transparent block w-full rounded-lg   px-[12px]  
                      outline-none border transition-colors
                                          py-[6px]   text-white placeholder-[var(--color-input-placeholder)]     duration-200 ${getInputBorderClass('name')}`}
                                    />
                                    {fieldErrors.name && <p className="mt-1 text-xs text-orange-600">{fieldErrors.name}</p>}
                                </div>
                            </div>

                            {/* Organizer Contact Number */}
                            <div>
                                <label htmlFor="number" className="text-2xl font-bold font-base block text-sm font-bold text-[var(--color-text-base)]">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="number"
                                        type="email"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                        placeholder="Enter Your email"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px]   text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('number')}`}
                                    />
                                    {fieldErrors.number && <p className="mt-1 text-xs text-orange-600">{fieldErrors.number}</p>}
                                </div>
                            </div>

                            {/* Organizer Email */}
                            <div>
                                <label htmlFor="email" className="text-2xl font-bold font-base block text-sm font-bold text-[var(--color-text-base)]">
                                    Orgnaizations
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Your Organizations"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px]   text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('email')}`}
                                    />
                                    {fieldErrors.email && <p className="mt-1 text-xs text-orange-600">{fieldErrors.email}</p>}
                                </div>
                            </div>

                            {/* Password */}
                            {
                                !organizerToUpdate
                                &&
                                <div>
                                    <label htmlFor="password" className="text-2xl font-bold font-base block text-sm font-bold text-[var(--color-text-base)]">
                                        Position
                                    </label>
                                    <div className="mt-2 relative">
                                        <input
                                            id="password"
                                            type="text"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter Your Position"
                                            className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px]   text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('password')}`}
                                        />


                                        {fieldErrors.password && <p className="mt-1 text-xs text-orange-600">{fieldErrors.password}</p>}
                                        <p className='text-white text-sm'>25 characters max, no symbol except dashes</p>
                                    </div>
                                </div>
                            }

                            {/* Status (Active/Inactive) */}
                            {organizerToUpdate && <div ref={statusRef}>
                                <label htmlFor="status" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Status
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        onFocus={() => setIsDropdownVisible(true)}
                                        className="block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none  transition-colors duration-200 focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
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
                            </div>}



                            {/* Submit Button */}
                            <div className="mt-3     w-full">

                                <button
                                    type="submit"
                                    className={`px-6 py-2 text-sm cursor-pointer font-semibold rounded-md bg-[var(--color-primary)] text-white shadow-sm transition-opacity duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80  w-full'}`}
                                >
                                    {loading ? "Saving..." : organizerToUpdate ? "Update Organizer" : "SIGN UP"}
                                </button>
                                <p className='text-white text-sm text-center'>Your email is safe and secure. Read our privacy policy.</p>


                            </div>
                        </form>)}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default CreateOrganizerForm;