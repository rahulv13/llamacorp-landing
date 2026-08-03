import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/authors`);
      setAuthors(res.data);
    } catch (err) {
      console.error('Failed to fetch authors', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAuthor = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/authors/${id}`);
        setAuthors(authors.filter((a: any) => a._id !== id));
      } catch (err) {
        console.error('Failed to delete author', err);
        alert('Failed to delete author');
      }
    }
  };

  if (loading) return <div className="p-8 text-zinc-400">Loading authors...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2 drop-shadow-md">Authors</h1>
          <p className="text-zinc-400">Manage blog authors.</p>
        </div>
        <Link
          to="/admin/authors/new"
          className="liquid-glass-strong rounded-full text-white px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Author
        </Link>
      </div>

      <div className="liquid-glass rounded-[1.25rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="text-xs uppercase bg-black/40 border-b border-white/10 text-zinc-400">
              <tr>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider">Author</th>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider">Role</th>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-transparent">
              {authors.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-zinc-500">
                    No authors found. Create one to get started.
                  </td>
                </tr>
              ) : (
                authors.map((author: any) => (
                  <tr key={author._id} className="hover:bg-white/5 transition-colors duration-300">
                    <td className="px-6 py-5 flex items-center gap-4">
                      {author.avatar ? (
                        <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                          {author.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="font-medium text-white drop-shadow-sm">{author.name}</div>
                    </td>
                    <td className="px-6 py-5">{author.role}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          to={`/admin/authors/edit/${author._id}`}
                          className="p-2 liquid-glass rounded-full text-white hover:text-white transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteAuthor(author._id)}
                          className="p-2 liquid-glass rounded-full text-white hover:bg-white/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
