import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogOut, Edit2, User, Mail, Camera, Save } from 'lucide-react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

interface UserProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ isOpen, onClose }) => {
  const { user, logout, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset state when closing/opening or when user data changes
  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, isOpen]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/me`, {
        name,
        email
      });
      updateUser(response.data.user);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-2xl relative overflow-hidden text-white"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center mt-4">
                {/* Avatar */}
                <div className="relative mb-6 group">
                  <div className="w-24 h-24 rounded-full border-2 border-white/20 overflow-hidden bg-zinc-800 flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-white/50" />
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors shadow-lg">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {error && (
                  <div className="w-full bg-red-500/20 border border-red-500/30 text-red-200 text-sm p-3 rounded-xl mb-4 text-center">
                    {error}
                  </div>
                )}

                {/* Info / Edit Form */}
                <div className="w-full space-y-4">
                  {isEditing ? (
                    <>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-white/40" />
                        </div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/40"
                          placeholder="Name"
                        />
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-white/40" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/40"
                          placeholder="Email Address"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="text-center space-y-2 mb-6">
                      <h3 className="text-2xl font-semibold tracking-tight">{user?.name}</h3>
                      <p className="text-white/60 flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" /> {user?.email}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium uppercase tracking-wider mt-2">
                        {user?.role || 'User'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="w-full flex flex-col gap-3 mt-8">
                  {isEditing ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 py-3 px-4 rounded-xl transition-all duration-200 text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex-1 bg-white text-black hover:bg-zinc-200 py-3 px-4 rounded-xl transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        {isLoading ? 'Saving...' : <><Save className="w-4 h-4" /> Save</>}
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white py-3 px-4 rounded-xl transition-all duration-200"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 py-3 px-4 rounded-xl transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
