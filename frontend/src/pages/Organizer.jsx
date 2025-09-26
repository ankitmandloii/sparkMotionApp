import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PlusIcon } from '../assets/icons/icons';
import ActionButton from '../components/shared/ActionButton';
import IconButton from '../components/shared/IconButton';
import { apiConnecter } from '../services/apiConnector';
import { useSelector } from 'react-redux';
import CreateOrganizerForm from '../components/forms/CreateOrganizerForm';
import Modal from '../components/shared/ErrorModal';
const Organizer = ({ setEditUserInfo, editUserInfo }) => {
    const userInfo = useSelector((state) => state.userInfo);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);  // Set loading true initially
    const [organizers, setOrganizers] = useState([]);
    const [clickedOrganizer, setClickedOrganizer] = useState(null)
    const [showModal, setShowModal] = useState(false)


    // Fetch organizers list from API
    const getAllOrganizers = async () => {
        setLoading(true);
        try {
            const response = await apiConnecter("GET", process.env.REACT_APP_GET_ORGANIZER_LIST_END_POINT, "", { authorization: `Bearer ${userInfo.token}` });
            console.log(response)
            setOrganizers(response.data.result);  // Assuming the response has a list of organizers
            setSuccess(response.data.message);
        } catch (err) {
            console.log(err, "errror")
            setError(err?.response?.data?.message ?? err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete an organizer via API
    const deleteOrganizer = async (id) => {
        try {
            await apiConnecter("DELETE", `${process.env.REACT_APP_DELETE_ORGANIZER_END_POINT}${id}`, "", { authorization: `Bearer ${userInfo.token}` });
            setOrganizers(prevOrganizers => prevOrganizers.filter(organizer => organizer._id !== id));
            setSuccess("Organizer removed successfully");
            setShowModal(false)
        } catch (err) {
            setError(err?.response?.data?.message ?? err.message);
        }
    };

    useEffect(() => {
        getAllOrganizers(); // Fetch organizers data when the component mounts
    }, []); // Empty dependency array to fetch data only on mount

    return (
        <div className='flex flex-col w-full m-5'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-white">Organizers</h2>
                    <p className="text-[var(--color-grey)] text-sm mt-1">Manage event organizers and their permissions</p>
                </div>
                <IconButton
                    icon={PlusIcon}
                    label="Add Organizer"
                    onClick={() => {
                        navigate("/organizations/createOrganizer")
                        setEditUserInfo(null)
                    }}
                    hoverColor="hover:bg-orange-600"
                />
            </div>

            {/* Organizers Table */}
            <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)]">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left py-4 px-6 text-gray-400 text-sm font-medium">Organizer</th>
                                <th className="text-left py-4 px-6 text-gray-400 text-sm font-medium">Email</th>
                                <th className="text-left py-4 px-6 text-gray-400 text-sm font-medium">Assigned Events</th>
                                <th className="text-left py-4 px-6 text-gray-400 text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        <div className="loader"></div> {/* Add your loader component here */}
                                    </td>
                                </tr>
                            ) : (
                                organizers?.map((organizer, index) => (
                                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-750">
                                        <td className="py-4 px-6">
                                            <div className="text-white font-medium">{organizer.userName}</div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-300">{organizer.email}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-wrap gap-2">
                                                {organizer?.assignedEvents?.length > 0 ? (
                                                    organizer?.assignedEvents?.map((event, eventIndex) => (
                                                        <span key={eventIndex} className="text-gray-300 px-2 py-1 rounded-2xl text-xs border border-[var(--border-color)]">
                                                            {event?.eventName}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400 text-sm">No events assigned</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex space-x-2">
                                                <ActionButton label="Edit" onClick={() => {
                                                    setEditUserInfo(organizer)
                                                    navigate("/organizations/createOrganizer")
                                                }} type="edit" />
                                                <ActionButton label="Remove" onClick={() => {
                                                    setShowModal(true)
                                                    setClickedOrganizer(organizer)
                                                    // deleteOrganizer(organizer._id)
                                                }} type="remove" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && <Modal title="Do You Want To Delete ?" message={error} onClose={() => setError('')} onAccept={() => { deleteOrganizer(clickedOrganizer._id) }} onDecline={() => setShowModal(false)} showAcceptDecline={true} />}
        </div>
    );
};

export default Organizer;
