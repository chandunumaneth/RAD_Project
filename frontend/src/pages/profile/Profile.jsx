import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../profile/Profile.css';


function Profile() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { url, setToken } = useContext(StoreContext);
    const [profile, setProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    });
    const [deletePassword, setDeletePassword] = useState('');

    const fetchProfile = async () => {
        const email = localStorage.getItem('email');
        try {
            const response = await axios.get(`${url}/api/user/profile/${email}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProfile(response.data);
        } catch (error) {
            console.error('Failed to fetch profile:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setFormData({
                name: '',
                currentPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            });
        } else {
            setFormData({ ...formData, name: profile.name });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDeletePasswordChange = (event) => {
        setDeletePassword(event.target.value);
        setMessage(''); // Clear the error message when the user starts typing
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = localStorage.getItem('email');
        const updateData = {
            name: formData.name,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
        };

        try {
            const response = await axios.patch(`${url}/api/user/profile/${email}`, updateData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setProfile((prevProfile) => ({ ...prevProfile, name: formData.name }));
            handleEditToggle();
        } catch (error) {
            console.error('Failed to update profile:', error.response?.data || error.message);
        }
    };

    const handleDelete = async () => {
        const email = localStorage.getItem('email');
        try {
            const response = await axios.delete(`${url}/api/user/profile/${email}`, {
                data: {
                    email,
                    password: deletePassword
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                localStorage.setItem('token', '');
                alert('Profile deleted successfully');
                console.log('Profile deleted successfully');
                navigate('/');
                
            } else {
                setMessage(response.data.message);
                console.error('Failed to delete profile');
            }
        } catch (error) {
            setMessage(error.response?.data.message || 'Failed to delete profile');
            console.error('Failed to delete profile:', error.response?.data || error.message);
        }
    };

    const handleDeleteToggle = () => {
        setMessage(''); // Clear the error message when toggling the delete confirmation
        setIsDeleting(!isDeleting);
        setDeletePassword('');
    };

    const logout =()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setToken("");
        navigate("/")
      }

    return (
        <div>
            <h1>Profile</h1>

            <div className='profile'>
                <div className='profile__left'>
                    <div className='profile__left__info'>
                        <h3>Name: <span>{profile.name}</span></h3>
                        <h3>Email: <span>{profile.email}</span></h3>
                    </div>

                    <div>
                        <button onClick={handleEditToggle}>{isEditing ? 'Cancel' : 'Edit Profile'}</button>
                    </div>
                </div>

                <Link to={`/myOrders/${profile.email}`} className='profile__right'>
                    <button>View Orders</button>
                </Link>

                {isEditing && (
                    <div className='edit-profile'>
                    <form onSubmit={handleSubmit}>
                        <h2>Edit Profile</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="New Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="repeatNewPassword"
                            placeholder="Repeat New Password"
                            value={formData.repeatNewPassword}
                            onChange={handleChange}
                        />
                        <button type="submit">Update Profile</button>
                    </form>
                    </div>
                )}

                <div>
                    <button onClick={handleDeleteToggle}>Delete Profile</button>
                </div>

                {isDeleting && (
                    <div className="delete-confirmation">
                        <h3>Delete Profile?</h3>
                        <p>Please enter your password to confirm deletion:</p>
                        <input
                            type="password"
                            name="deletePassword"
                            placeholder="Password"
                            value={deletePassword}
                            onChange={handleDeletePasswordChange}
                            required
                        />
                        {message && <p style={{ color: "red"}}>{message}</p>}
                        <div className='buttons'>
                            <button onClick={handleDelete} className='delete'>Confirm Delete</button>
                            <button onClick={handleDeleteToggle}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            <button onClick={logout} className='logout-button'>Logout</button>
        </div>
    );
}

export default Profile;
