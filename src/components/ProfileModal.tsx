
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import axios from "axios";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { toast } from "react-toastify";

export default function ProfileModal({ open, closeModal, userData, updateProfile}: any) {

    const [currentData, setCurrentData] = useState({
        fullName: userData.fullName,
        bio: userData.bio
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCurrentData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            await axios.post(`/api/user/${userData.username}`, {
                username: userData.username,
                fullName: currentData.fullName,
                bio: currentData.bio
            })
            toast.success("Your profile has been updated!");
            closeModal();
            updateProfile();
        }
        catch(err){
            toast.error("Something went wrong!");
        }
    }

    return (
        <Modal
            className="flex justify-center items-center"
            open={open}
            onClose={closeModal}
            aria-labelledby="profile-modal"
            aria-describedby="profile-modal-description"
        >
            <div className="relative py-6 w-[90vw] sm:w-[550px] m-auto h-96 bg-neutral-900 shadow-sm shadow-indigo-600 outline-none">
                <button className="absolute right-3 top-3" onClick={closeModal}>
                    <CloseIcon className="text-indigo-500" />
                </button>
                <form onSubmit={handleSubmit} className="flex flex-col w-2/3 m-auto items-center gap-y-4 p-4">
                    <div className="flex justify-center items-center image-container w-32 h-32 rounded-full bg-neutral-800">
                        <button><AddAPhotoIcon /></button>
                    </div>
                    <input maxLength={25} onChange={e => handleChange(e)} name="fullName" defaultValue={userData.fullName} placeholder="Full name" className="p-3 w-full h-10 mb-2 outline-none bg-neutral-800" />
                    <input maxLength={40} onChange={e => handleChange(e)} name="bio" defaultValue={userData.bio} placeholder="Bio:" className="p-3 w-full h-10 outline-none bg-neutral-800" />
                    <button className="w-full h-10 mt-3 bg-gradient-to-r from-purple-500 to-blue-500">Save</button>
                </form>
            </div>
        </Modal>
    )
}
