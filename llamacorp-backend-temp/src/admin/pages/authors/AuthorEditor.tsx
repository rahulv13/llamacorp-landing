import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';

export default function AuthorEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      fetchAuthor();
    }
  }, [id]);

  const fetchAuthor = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/authors/${id}`);
      setName(res.data.name);
      setRole(res.data.role);
      if (res.data.avatar) {
        setAvatarPreview(res.data.avatar);
      }
    } catch (err) {
      console.error('Failed to load author', err);
      alert('Failed to load author');
      navigate('/admin/authors');
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('role', role);

      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/authors${isEditing ? `/${id}` : ''}`;
      const method = isEditing ? 'put' : 'post';

      await axios({
        method,
        url,
        data: formData,
        // Let Axios set Content-Type for FormData
      });

      navigate('/admin/authors');
    } catch (err: any) {
      console.error('Failed to save author', err);
      alert(err.response?.data?.message || 'Failed to save author');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8 text-zinc-400">Loading author...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto h-screen overflow-y-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/authors" className="p-2.5 liquid-glass rounded-full text-white rounded-xl text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif text-white mb-2 drop-shadow-md">{isEditing ? 'Edit Author' : 'Create New Author'}</h1>
          <p className="text-zinc-400">Manage author profile.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="liquid-glass rounded-[1.25rem] p-8 space-y-8">

          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300">Avatar Image</label>
            <div className="flex items-start gap-6">
              <div className="relative group w-32 h-32 flex-shrink-0">
                {avatarPreview ? (
                  <>
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover rounded-full border-2 border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)]" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-0 right-0 p-1.5 liquid-glass-strong rounded-full text-white text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full rounded-full flex flex-col items-center justify-center text-zinc-400 liquid-glass rounded-full text-white cursor-pointer">
                    <Upload className="w-6 h-6 mb-2 text-zinc-300" />
                    <span className="text-xs font-medium text-zinc-300">Upload</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex-1 space-y-2 mt-4">
                <p className="text-sm text-zinc-400">Recommended size: 256x256px. Formats: JPG, PNG, WEBP.</p>
                <p className="text-xs text-zinc-500">Image will be cropped to a circle.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none transition-all"
                placeholder="e.g. Sarah T."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-zinc-300">Role</label>
              <input
                id="role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none transition-all"
                placeholder="e.g. VP Engineering, Aura"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <Link
            to="/admin/authors"
            className="px-6 py-3 rounded-xl liquid-glass rounded-full text-white text-zinc-300 hover:text-white font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl liquid-glass-strong rounded-full text-white text-white font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Author' : 'Save Author'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
