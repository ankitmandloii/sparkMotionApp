import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PlusIcon } from '../assets/icons/icons';
import ActionButton from '../components/shared/ActionButton';
import IconButton from '../components/shared/IconButton';
import { apiConnecter } from '../services/apiConnector';
import { useSelector } from 'react-redux';
import CreateOrganizerForm from '../components/forms/CreateOrganizerForm';
import Modal from '../components/shared/ErrorModal';
import { toast } from "sonner";
import { UserSearch, SearchIcon } from 'lucide-react';
import SearchBox from '../components/shared/SearchBox';

// --- CONSTANTS FOR LAYOUT OPTIMIZATION ---
// Adjust '250px' to account for the height of your navigation bar, header, and surrounding padding/margins.
const MAX_HEIGHT_CALC = 'max-h-[calc(100vh-370px)]';
const MAX_HEIGHT_CALC_MOBILE = 'max-h-[calc(100vh-320px)]'; // Adjusted for mobile view
const COL_WIDTH = 'w-1/4'; // Define width for column alignment on desktop

const Organizer = ({ setEditUserInfo, editUserInfo }) => {
    const userInfo = useSelector((state) => state.userInfo);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [organizers, setOrganizers] = useState([]);
    const [clickedOrganizer, setClickedOrganizer] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showForm, setShowForm] = useState(false);
    const [loadingId, setLoadingId] = useState(null);
    const [loadingText, setLoadingText] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrganizers, setFilteredOrganizers] = useState([]);


    // Fetch organizers list from API
    const getAllOrganizers = async () => {
        setLoading(true);
        try {
            const response = await apiConnecter("GET", process.env.REACT_APP_GET_ORGANIZER_LIST_END_POINT, "", { authorization: `Bearer ${userInfo.token}` });
            setOrganizers(response.data.result);
            setFilteredOrganizers(response.data.result);
            // setSuccess(response.data.message);
        } catch (err) {
            console.error(err, "error fetching organizers");
            setError(err?.response?.data?.message ?? err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete an organizer via API
    const deleteOrganizer = async (id) => {
        const toastId = Modal({
            title: "Deleting Organizer...",
            loading: true,
            loadingText: "Please wait while the organizer is being deleted...",
        });
        try {
            await apiConnecter("DELETE", `${process.env.REACT_APP_DELETE_ORGANIZER_END_POINT}${id}`, "", { authorization: `Bearer ${userInfo.token}` });
            setOrganizers(prevOrganizers => prevOrganizers.filter(organizer => organizer._id !== id));
            setFilteredOrganizers(prevOrganizers => prevOrganizers.filter(organizer => organizer._id !== id));
            setLoading(false);
            toast.dismiss(toastId);
            setSuccess({ "message": "Organizer removed successfully", title: "Success" });
            setShowModal(false)
        } catch (err) {
            setError({ "message": err?.response?.data?.message ?? err.message, title: "Error" });
            console.error(err, "error deleting organizer");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllOrganizers();
    }, []);

    const handleEditClick = (organizer) => {
        setEditUserInfo(organizer);
        setClickedOrganizer(organizer);
        setShowForm(true);
    };

    const handleDeleteClick = (organizer) => {
        setShowModal(true);
        setClickedOrganizer(organizer);
    };

    const renderEvents = (assignedEvents) => {
        return (
            <div className="flex flex-wrap gap-2">
                {assignedEvents?.length > 0 ? (
                    assignedEvents.map((event, eventIndex) => (
                        <span key={eventIndex} className="text-gray-300 px-2 py-1 rounded-2xl text-xs border border-[var(--border-color)]">
                            {event?.eventName}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-400 text-sm">No events assigned</span>
                )}
            </div>
        );
    };
    useEffect(() => {
        if (error) {
            Modal({
                title: error.title || "Error",
                message: error.message,
            });
        }
        if (success) {
            Modal({
                title: success.title || "Success",
                message: success.message,
            });

        }
        if (showModal && clickedOrganizer) {
            Modal({
                title: "Do You Want To Delete ?",
                message: error,
                //iwant to give the two  buttons here text 
                buttontxt: { accept: "Yes, Delete", decline: "No, Cancel" },
                onClose: () => setError(''),
                onAccept: () => { deleteOrganizer(clickedOrganizer._id) },
                onDecline: () => setShowModal(false),
                showAcceptDecline: true
            });
        }

        setTimeout(() => {
            setSuccess('');
            setError('');
        }, 3000);
    }, [error, success, showModal, clickedOrganizer, loading]);

    function searchOrganizers() {
        const filteredOrganizers = organizers.filter((organizer) => {
            const nameMatch = organizer.userName?.toLowerCase().includes(searchTerm.toLowerCase());
            const emailMatch = organizer.email?.toLowerCase().includes(searchTerm.toLowerCase());
            const eventMatch = organizer.assignedEvents?.some(event =>
                event.eventName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return nameMatch || emailMatch || eventMatch;
        });
        if (searchTerm === '') {
            setFilteredOrganizers(organizers);
            return;
        }
        setFilteredOrganizers(filteredOrganizers);
    }

    useEffect(() => {
        searchOrganizers();
    }, [searchTerm]);
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
                        setEditUserInfo(null)
                        setClickedOrganizer(null)
                        setShowForm(true)
                    }}
                    hoverColor="hover:bg-orange-600"
                />
            </div>

            {/* Main Container for List/Table */}
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search organizers, email or event..." />

            <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] overflow-hidden">

                {/* -------------------- 1. DESKTOP/TABLET VIEW (md:block) -------------------- */}
                <div className="hidden md:block">
                    {/* Fixed Header Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700 sticky top-0 bg-[var(--color-surface-background)] z-10">
                                    <th className={`text-left py-4 px-6 text-gray-400 text-sm font-medium ${COL_WIDTH}`}>Organizer</th>
                                    <th className={`text-left py-4 px-6 text-gray-400 text-sm font-medium ${COL_WIDTH}`}>Email</th>
                                    <th className={`text-left py-4 px-6 text-gray-400 text-sm font-medium ${COL_WIDTH}`}>Assigned Events</th>
                                    <th className={`text-left py-4 px-6 text-gray-400 text-sm font-medium ${COL_WIDTH}`}>Actions</th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    {/* Scrollable Body Container */}
                    <div className={`overflow-x-auto overflow-y-auto ${MAX_HEIGHT_CALC}  custom-scrollbar`}>
                        <table className="w-full">
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center py-4"><div className="loader"></div></td></tr>
                                ) : (
                                    filteredOrganizers?.map((organizer, index) => (
                                        <tr key={index} className="border-b border-gray-700 hover:bg-gray-750">
                                            <td className={`py-4 px-6 ${COL_WIDTH}`}><div className="text-white font-medium">{organizer.userName}</div></td>
                                            <td className={`py-4 px-6 text-gray-300 ${COL_WIDTH}`}>{organizer.email}</td>
                                            <td className={`py-4 px-6 ${COL_WIDTH}`}>{renderEvents(organizer.assignedEvents)}</td>
                                            <td className={`py-4 px-6 ${COL_WIDTH}`}>
                                                <div className="flex space-x-2">
                                                    <ActionButton label="Edit" onClick={() => handleEditClick(organizer)} type="edit" />
                                                    <ActionButton label="Remove" onClick={() => handleDeleteClick(organizer)} type="remove" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* No data message for Desktop */}
                        {!loading && filteredOrganizers?.length === 0 && <p className="text-center text-gray-400 py-4">No organizers found.</p>}
                    </div>
                </div>

                {/* -------------------- 2. MOBILE VIEW (md:hidden - Card List) -------------------- */}
                {/* -------------------- 2. MOBILE VIEW (md:hidden - Card List with Scroll) -------------------- */}
                <div className={`md:hidden p-4 space-y-4 overflow-y-auto ${MAX_HEIGHT_CALC_MOBILE} custom-scrollbar`}>
                    {loading ? (
                        <div className="text-center py-4"><div className="loader"></div></div>
                    ) : (
                        filteredOrganizers?.map((organizer, index) => (
                            <div key={index} className="bg-[var(--color-surface-background)] p-4 rounded-lg border border-[var(--border-color)]">

                                {/* Organizer Name & Email */}
                                <div className="text-white font-bold text-lg mb-1">{organizer.userName}</div>
                                <div className="text-gray-400 text-sm mb-3">{organizer.email}</div>

                                {/* Assigned Events */}
                                <div className="mb-3">
                                    <span className="text-gray-500 text-xs uppercase block mb-1">Assigned Events:</span>
                                    {renderEvents(organizer.assignedEvents)}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end space-x-2 pt-2 border-t border-gray-800">
                                    <ActionButton label="Edit" onClick={() => handleEditClick(organizer)} type="edit" />
                                    <ActionButton label="Remove" onClick={() => handleDeleteClick(organizer)} type="remove" />
                                </div>
                            </div>
                        ))
                    )}
                    {/* No data message for Mobile */}
                    {!loading && filteredOrganizers?.length === 0 && <p className="text-center text-gray-400 py-4">No organizers found.</p>}
                </div>

            </div>

            {/* Modals and Forms */}
            {showForm && <CreateOrganizerForm organizerToUpdate={clickedOrganizer} onCancel={() => setShowForm(false)} setSuccess={setSuccess} setError={setError} />}
        </div>
    );
};

export default Organizer;