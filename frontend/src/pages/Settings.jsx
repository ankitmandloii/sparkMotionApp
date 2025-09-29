import React, { useState } from 'react';
import IconButton from '../components/shared/IconButton';
import UrlInput from '../components/shared/UrlInput';
import { PlusIcon } from 'lucide-react';
import logo from "../assets/logos/WhiteLogo.png";
import { apiConnecter } from '../services/apiConnector';
import { useSelector } from 'react-redux';
import Modal from '../components/shared/ErrorModal';

const Settings = () => {
    const userInfo = useSelector((state) => state.userInfor);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({ oldPassword: '', newPassword: '' });

    const handleChangePassword = async () => {
        setMessage(''); 
        setFieldErrors({ oldPassword: '', newPassword: '' });
        // Simple validation
        if (!oldPassword) {
            setFieldErrors((prev) => ({ ...prev, oldPassword: 'Old password is required.' }));
        }
        if (!newPassword) {
            setFieldErrors((prev) => ({ ...prev, newPassword: 'New password is required.' }));
        }
        if (!oldPassword || !newPassword) return;
        try {
            setLoading(true);
            const payload = {
                oldPassword,
                newPassword,
            };

           const response = await apiConnecter("PUT", "/Admin/change-password", payload,{Authorization: `Bearer ${userInfo.token}`});
                Modal({
                    title: "Success",
                    message: "Password changed successfully.",
                });
                setOldPassword('');
                setNewPassword('');
                setFieldErrors({ oldPassword: '', newPassword: '' });
         
        } catch (error) {
            Modal({
                title: "Error",
                message: error?.response?.data?.message || "An error occurred while changing the password.",
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getInputBorderClass = (fieldName) => (
        fieldErrors[fieldName] ? "border-orange-600 focus:border-orange-600" : "border-transparent focus:border-[var(--color-primary)]"
    );

    return (
        <div className='w-full m-4'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-white">Settings</h2>
                    <p className="text-gray-400 text-sm mt-1">Configure SparkMotion platform settings</p>
                </div>
            </div>

            <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-6">
                <h3 className="text-md font-bold text-[#fafafa]">Change Password</h3>

                <div className="space-y-4 mt-4">
                    <div>
                        <label htmlFor="oldPassword" className="block text-sm font-semibold text-[var(--color-text-base)]">Old Password</label>
                        <input
                            id="oldPassword"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter Your Password"
                            className={`mt-2 block w-full rounded-md bg-[var(--color-surface-input)] px-3 py-2 text-sm sm:text-base text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('oldPassword')}`}
                        />
                        {fieldErrors.oldPassword && <p className="mt-1 text-xs text-orange-600">{fieldErrors.oldPassword}</p>}
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-semibold text-[var(--color-text-base)]">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter Your Password"
                            className={`mt-2 block w-full rounded-md bg-[var(--color-surface-input)] px-3 py-2 text-sm sm:text-base text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('newPassword')}`}
                        />
                        {fieldErrors.newPassword && <p className="mt-1 text-xs text-orange-600">{fieldErrors.newPassword}</p>}
                    </div>

                    {message && <p className="text-sm text-orange-400">{message}</p>}

                    <IconButton
                        icon={PlusIcon}
                        label={loading ? "Updating..." : "Change Password"}
                        onClick={handleChangePassword}
                        disabled={loading}
                        hoverColor="hover:bg-orange-600"
                    />
                </div>
            </div>

            <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-6 mt-3">
                <h3 className="text-md text-[#fafafa]">Brand Settings</h3>
                <p className="text-gray-400 text-sm mt-1">Customize the SparkMotion brand appearance</p>

                <div className="flex items-center space-x-3 mt-4">
                    <div className="w-10 h-10 bg-[var(--color-primary)] rounded flex items-center justify-center">
                        <img className="h-6" src={logo} alt="SparkMotion Logo" />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-white">SparkMotion Logo</h1>
                        <p className="text-sm text-gray-400">Current brand mark</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
