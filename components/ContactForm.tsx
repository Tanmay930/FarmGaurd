import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 bg-green-900 text-white">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">Connect with Suppliers</h2>
        <p className="mb-8 text-green-100">Need a quote for bulk orders? Fill out the form below and we'll connect you with trusted local vendors.</p>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-2xl text-left">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Inquiry</label>
            <textarea 
              id="message" 
              rows={4}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status !== 'idle'}
            className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
              status === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-green-700 text-white hover:bg-green-800'
            } disabled:opacity-70`}
          >
            {status === 'idle' && 'Send Request'}
            {status === 'sending' && 'Sending...'}
            {status === 'success' && 'Sent Successfully!'}
          </button>
        </form>
      </div>
    </section>
  );
};