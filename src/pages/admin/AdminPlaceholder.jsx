import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/admin/AdminLayout';
import { Settings2 } from 'lucide-react';

export default function AdminPlaceholder({ title, description = 'This feature is currently under development.' }) {
  return (
    <AdminLayout>
      <Helmet>
        <title>{title} - Llamacorp Admin</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#111]">{title}</h1>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-black/5">
          <Settings2 size={32} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-[#111] mb-2">{title} Module</h2>
        <p className="text-[#555] max-w-md">{description}</p>
        <button className="mt-8 px-6 py-2.5 bg-[#111] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors">
          Notify when available
        </button>
      </div>
    </AdminLayout>
  );
}
