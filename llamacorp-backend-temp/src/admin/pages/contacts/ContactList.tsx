import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Mail, Phone, Calendar, User, AlignLeft } from 'lucide-react';
import { format } from 'date-fns';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/contacts`);
      setContacts(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl backdrop-blur-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Contact Submissions</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage and view messages from your website's contact form.</p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="liquid-glass rounded-3xl p-12 text-center">
          <Mail className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No messages yet</h3>
          <p className="text-zinc-400">When users submit the contact form, they will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="liquid-glass rounded-3xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-4 flex-1">

                  {/* Header info */}
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{contact.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mt-1">
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                          <Mail className="w-3.5 h-3.5" /> {contact.email}
                        </a>
                        {contact.phone && (
                          <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <Phone className="w-3.5 h-3.5" /> {contact.phone}
                          </a>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(new Date(contact.createdAt), 'MMM d, yyyy • h:mm a')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div>
                    {contact.subject && (
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Subject</span>
                        <p className="text-zinc-200 font-medium">{contact.subject}</p>
                      </div>
                    )}

                    <div>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                        <AlignLeft className="w-3.5 h-3.5" /> Message
                      </span>
                      <p className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
                        {contact.message}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    contact.status === 'new' ? 'bg-white/20 text-white border-white/30 backdrop-blur-md shadow-sm' :
                    contact.status === 'contacted' ? 'bg-white/10 text-gray-300 border-white/20 backdrop-blur-md shadow-sm' :
                    'bg-white/5 text-gray-400 border-white/10 backdrop-blur-md shadow-sm'
                  }`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
