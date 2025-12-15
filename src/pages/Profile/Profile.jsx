import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/authService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [updateLoading, setUpdateLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            const result = await getUserProfile();

            if (result.success) {
                setProfile(result.data);
                setEditData({
                    email: result.data.email || '',
                    phone: result.data.phone || '',
                    dob: result.data.dob || ''
                });
            } else {
                setError(result.error);
                // If token invalid, redirect to login
                if (result.error.includes('Token') || result.error.includes('đăng nhập')) {
                    setTimeout(() => navigate('/login'), 2000);
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, [navigate]);

    const handleEdit = () => {
        setIsEditing(true);
        setError('');
        setSuccessMessage('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({
            email: profile.email || '',
            phone: profile.phone || '',
            dob: profile.dob || ''
        });
        setError('');
        setSuccessMessage('');
    };

    const handleSave = async () => {
        setUpdateLoading(true);
        setError('');
        setSuccessMessage('');

        const result = await updateUserProfile(
            editData.phone,
            editData.dob,
            editData.email
        );

        if (result.success) {
            setProfile(result.data);
            setSuccessMessage('Cập nhật thành công!');
            setIsEditing(false);

            // Update localStorage if needed
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            storedUser.email = result.data.email;
            localStorage.setItem('user', JSON.stringify(storedUser));
        } else {
            setError(result.error);
        }

        setUpdateLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-[450px]">
                    <CardContent className="pt-6">
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                            {error}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl">
            <Card className="shadow-lg overflow-hidden py-0 m-auto">
                <CardHeader className="bg-gradient-to-r from-[#0255D1] to-[#BE3EFC] text-white rounded-t-lg">
                    <CardTitle className="text-6xl font-bold text-center">Profile</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {successMessage && (
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                            {successMessage}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                            {error}
                        </div>
                    )}
                    <div className="space-y-6">
                        {/* Avatar Section */}
                        <div className="flex items-center justify-between pb-6 border-b dark:border-gray-700">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                                    {profile?.username ? profile.username.slice(0, 2).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <h2 className="text-5xl font-bold text-gray-800 dark:text-white">{profile?.username}</h2>
                                    <div>
                                        {!isEditing ? (
                                            <Button
                                                onClick={handleEdit}
                                                className=" text-black hover:text-[#BE3EFC] font-semibold mt-4 dark:text-white dark:hover:text-[#BE3EFC]"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                                Edit
                                            </Button>
                                        ) : (
                                            <div className="flex gap-4 mt-4">
                                                <Button
                                                    onClick={handleCancel}
                                                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 w-12"
                                                    disabled={updateLoading}
                                                >
                                                    Hủy
                                                </Button>
                                                <Button
                                                    onClick={handleSave}
                                                    className="bg-green-500 text-white hover:bg-green-600 w-12"
                                                    disabled={updateLoading}
                                                >
                                                    {updateLoading ? 'Đang lưu...' : 'Lưu'}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoItem
                                label="Username"
                                value={profile?.username || '-----'}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                }
                                editable={false}
                            />

                            <EditableInfoItem
                                label="Email"
                                value={editData.email}
                                isEditing={isEditing}
                                onChange={(value) => setEditData({ ...editData, email: value })}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                }
                            />

                            <EditableInfoItem
                                label="Phone"
                                value={editData.phone}
                                isEditing={isEditing}
                                onChange={(value) => setEditData({ ...editData, phone: value })}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                }
                            />

                            <EditableInfoItem
                                label="Date of Birth"
                                value={editData.dob}
                                isEditing={isEditing}
                                onChange={(value) => setEditData({ ...editData, dob: value })}
                                type="date"
                                displayValue={editData.dob ? new Date(editData.dob).toLocaleDateString('vi-VN') : '-----'}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                }
                            />
                        </div>

                        {/* Favourite Link */}
                        <Link to="/favourite" className="block">
                            <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r from-[#0255D1] to-[#BE3EFC] transition-colors cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-base font-medium text-gray-900 dark:text-white">Go to Favourite Movies</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function InfoItem({ label, value, icon }) {
    return (
        <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-500">{icon}</span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</span>
            </div>
            <p className="text-base font-medium text-gray-900 dark:text-white pl-7">{value}</p>
        </div>
    );
}

function EditableInfoItem({ label, value, isEditing, onChange, icon, type = "text", displayValue }) {
    return (
        <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-500">{icon}</span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</span>
            </div>
            {isEditing ? (
                <Input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-7 h-10 bg-white dark:bg-gray-700 dark:text-white"
                />
            ) : (
                <p className="text-base font-medium text-gray-900 dark:text-white pl-7">
                    {displayValue || value || '-----'}
                </p>
            )}
        </div>
    );
}
