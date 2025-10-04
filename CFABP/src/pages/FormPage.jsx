import React, { useEffect, useRef, useState } from 'react';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import BgImage from "../assets/images/HomePage.png";
import { CrossIcon } from '../assets/customSvg';
import { apiConnecter } from '../service/apiConnector';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const FormPage = ({ onCancel, }) => {
    // const userInfo = useSelector((state) => state.userInfo);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [position, setPosition] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    // Function to create a new organizer
    const storeDataToDb = async () => {
        setLoading(true);
        try {
            const response = await apiConnecter("POST", "CFA/AddFeedback", {
                name: name, email, position, organization
            });
            console.log(response, "resp ")
            setLoading(false);
            onCancel();
            navigate("/home")
            toast.success(response.data.message)

        } catch (err) {
            console.log(err.response.data.message, "error");
            toast.error(err.response.data.message)
        } finally {
            setLoading(false);
        }
    };
    // Disable scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'; // Disable scrolling

        // Clean up when component unmounts or modal closes
        return () => {
            document.body.style.overflow = ''; // Re-enable scrolling
        };
    }, []);

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

        // Email validation
        if (!email.trim()) {
            newFieldErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newFieldErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        // Organization validation
        if (!organization.trim()) {
            newFieldErrors.organization = 'Organization is required.';
            isValid = false;
        }

        // Position validation
        if (!position.trim()) {
            newFieldErrors.position = 'Position is required.';
            isValid = false;
        } else if (position.length > 25) {
            newFieldErrors.position = 'Position must be less than 25 characters.';
            isValid = false;
        } else if (!/^[a-zA-Z0-9-]+$/.test(position)) {
            newFieldErrors.position = 'Position can only contain alphanumeric characters and dashes.';
            isValid = false;
        }

        setFieldErrors(newFieldErrors);

        if (!isValid) {
            console.log("Form has validation errors. Not submitting.");
            return;
        }

        storeDataToDb();
    };

    const getInputBorderClass = (fieldName) => {
        return fieldErrors[fieldName] ? "border-white focus:border-white" : "border white focus:border-[var(--color-white)]";
    };

    return (
        //i want to place in center of the screen
        <div className="fixed inset-0 z-100 flex justify-center items-center backdrop-blur-sm bg-opacity-50 p-4 w-full mx-auto">
            <div className="fixed inset-0 z-100 flex justify-center items-center backdrop-blur-sm bg-opacity-50 p-4 max-w-[400px] mx-auto">

                <div className="p-[20px] w-full use-border rounded-2xl backdrop-blur-3xl ">
                    <div className='flex justify-between '>
                        <legend className='font-semibold text-2xl text-white uppercase'>dive into your festival experience</legend>
                        <div className="cursor-pointer" 
                            onClick={() => { }}
                        //  onClick={oncancel}
                        >
                            <CrossIcon />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-1 ">
                        {/* Organizer Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium font-base text-[var(--color-text-base)]  ">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`bg-transparent block w-full rounded-lg px-[12px] py-[4px] text-white placeholder-gray-500 outline-none border transition-colors duration-200 ${getInputBorderClass('name')}`}
                                />
                                {fieldErrors.name && <p className="mt-1 text-xs text-[var(--color-gradient-stop1)]">{fieldErrors.name}</p>}
                            </div>
                        </div>

                        {/* Organizer Email */}
                        <div>
                            <label htmlFor="email" className="font-base block text-sm font-medium text-[var(--color-text-base)]">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[4px] text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('email')}`}
                                />
                                {fieldErrors.email && <p className="mt-1 text-xs text-[var(--color-gradient-stop1)]">{fieldErrors.email}</p>}
                            </div>
                        </div>

                        {/* Organization */}
                        <div>
                            <label htmlFor="organization" className="font-base block text-sm font-medium text-[var(--color-text-base)]">
                                Organization
                            </label>
                            <div className="mt-1">
                                <input
                                    id="organization"
                                    type="text"
                                    value={organization}
                                    onChange={(e) => setOrganization(e.target.value)}
                                    className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[4px] text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('organization')}`}
                                />
                                {fieldErrors.organization && <p className="mt-1 text-xs text-[var(--color-gradient-stop1)]">{fieldErrors.organization}</p>}
                            </div>
                        </div>

                        {/* Position */}
                        <div>
                            <label htmlFor="position" className="font-base block text-sm font-medium text-[var(--color-text-base)]">
                                Position
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="position"
                                    type="text"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[4px] text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('position')}`}
                                />
                                {fieldErrors.position && <p className="mt-1 text-xs text-[var(--color-gradient-stop1)]">{fieldErrors.position}</p>}
                                <p className='text-white text-xs py-1.5'>25 characters max, no symbols except dashes</p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-3 w-full">
                            <button
                                type="submit"
                                className="button-bg-gradient hover:from-red-600 hover:to-red-700 text-white px-6 w-full cursor-pointer py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                {loading ? "SIGN IN..." : "SIGN UP"}
                            </button>
                            <p className='text-white text-xs text-center py-1.5'>Your email is safe and secure. Read our privacy policy.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormPage;
