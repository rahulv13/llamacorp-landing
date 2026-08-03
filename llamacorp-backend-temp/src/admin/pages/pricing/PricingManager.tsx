import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Check } from 'lucide-react';

interface PricingPlan {
  _id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
}

export default function PricingManager() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    interval: 'month',
    description: '',
    features: [''],
    isPopular: false,
    isActive: true,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/pricing/admin`);
      setPlans(res.data);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (plan?: PricingPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        name: plan.name,
        price: plan.price,
        interval: plan.interval,
        description: plan.description || '',
        features: plan.features.length ? plan.features : [''],
        isPopular: plan.isPopular,
        isActive: plan.isActive,
      });
    } else {
      setEditingPlan(null);
      setFormData({
        name: '',
        price: 0,
        interval: 'month',
        description: '',
        features: [''],
        isPopular: false,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Filter out empty features
      const cleanedFeatures = formData.features.filter(f => f.trim() !== '');
      const dataToSave = { ...formData, features: cleanedFeatures };

      if (editingPlan) {
        await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/pricing/${editingPlan._id}`, dataToSave);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/pricing`, dataToSave);
      }
      fetchPlans();
      closeModal();
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Error saving pricing plan');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this pricing plan?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/pricing/${id}`);
        setPlans(plans.filter(p => p._id !== id));
      } catch (error) {
        console.error('Error deleting plan:', error);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">Pricing Plans</h2>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all bg-white/10 text-white hover:bg-white/20 border border-white/20 h-10 px-4 py-2 gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.1)] backdrop-blur-md"
        >
          <Plus size={16} />
          Add Plan
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading pricing plans...</div>
      ) : plans.length === 0 ? (
        <div className="liquid-glass rounded-[1.25rem] p-12 text-center">
           <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
           <h3 className="text-lg font-medium text-white mb-2 drop-shadow-sm">No pricing plans yet</h3>
           <p className="text-gray-400 mb-6">Create your first pricing tier to start showing it to customers.</p>
           <button onClick={() => openModal()} className="liquid-glass-strong rounded-full text-white px-4 py-2 h-10 rounded-xl text-sm font-medium text-white flex items-center gap-2">
             Create Plan
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan._id} className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col relative group overflow-hidden ${plan.isPopular ? 'border-white/30 bg-white/10' : 'border-white/10 hover:border-white/20'}`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${plan.isPopular ? 'from-blue-500/10' : ''}`} />
              {plan.isPopular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 z-10">
                  <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg backdrop-blur-md">
                    Popular
                  </span>
                </div>
              )}
              {!plan.isActive && (
                 <div className="absolute top-4 right-4 z-10">
                 <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm">
                   Inactive
                 </span>
               </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm relative z-10">{plan.name}</h3>
              <div className="mb-4 relative z-10">
                <span className="text-3xl font-extrabold text-white drop-shadow-md">${plan.price}</span>
                <span className="text-gray-300 text-sm">/{plan.interval}</span>
              </div>
              <p className="text-gray-300 text-sm mb-6 flex-1 relative z-10">{plan.description}</p>

              <ul className="space-y-3 mb-6 relative z-10">
                {plan.features.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-white mr-2 shrink-0 drop-shadow-sm opacity-80" />
                    <span className="text-sm text-gray-200">{feature}</span>
                  </li>
                ))}
                {plan.features.length > 4 && (
                    <li className="text-sm text-gray-400 italic">+ {plan.features.length - 4} more features</li>
                )}
              </ul>

              <div className="flex gap-2 pt-4 border-t border-white/10 mt-auto relative z-10">
                <button
                  onClick={() => openModal(plan)}
                  className="flex-1 liquid-glass rounded-full text-white py-2 rounded-xl text-sm font-medium text-white flex justify-center items-center gap-2"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="liquid-glass-strong rounded-full text-white py-2 px-4 rounded-xl"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
          <div className="liquid-glass rounded-[1.25rem] w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-transparent">
              <h3 className="text-xl font-bold text-white drop-shadow-sm">{editingPlan ? 'Edit Plan' : 'New Plan'}</h3>
              <button onClick={closeModal} className="p-2 liquid-glass rounded-full text-white text-gray-400 hover:text-white rounded-xl">
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <form id="pricing-form" onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Plan Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Price ($)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Interval</label>
                    <select
                      value={formData.interval}
                      onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
                      className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all [&>option]:bg-gray-900"
                    >
                      <option value="month">Per Month</option>
                      <option value="year">Per Year</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>
                  <div className="space-y-2 flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.isPopular}
                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                        className="rounded border-white/20 bg-white/10 text-white focus:ring-white/30 focus:ring-offset-0 focus:ring-2 transition-all w-4 h-4"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Highlight as Popular</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="rounded border-white/20 bg-white/10 text-white focus:ring-white/30 focus:ring-offset-0 focus:ring-2 transition-all w-4 h-4"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Active</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-500"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300">Features</label>
                    <button type="button" onClick={addFeature} className="liquid-glass rounded-full text-white px-3 py-1.5 rounded-lg text-xs font-medium text-white">
                      + Add Feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder="e.g. 5 team members"
                          className="flex-1 liquid-glass rounded-full text-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-3 liquid-glass rounded-full text-white hover:bg-white/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-transparent">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2.5 liquid-glass rounded-full text-white rounded-xl text-sm font-medium text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="pricing-form"
                className="px-6 py-2.5 liquid-glass-strong rounded-full text-white rounded-xl text-sm font-medium text-white"
              >
                Save Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Temporary inline DollarSign icon component for the empty state
const DollarSign = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);
