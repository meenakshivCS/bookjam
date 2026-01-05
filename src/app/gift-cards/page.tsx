'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CreditCard, Mail, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const giftCardAmounts = [500, 1000, 2000, 5000];

const giftCardDesigns = [
  { id: 1, name: 'Classic Books', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', color: '#8B4513' },
  { id: 2, name: 'Colorful Reading', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', color: '#4A90A4' },
  { id: 3, name: 'Cozy Corner', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400', color: '#2D5A27' },
  { id: 4, name: 'Modern Library', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400', color: '#6B5B95' },
];

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white rounded-full" />
          <div className="absolute bottom-10 left-10 w-48 h-48 border-4 border-white rounded-full" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Gift className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            BookJam Gift Cards
          </h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto">
            Give the gift of reading! Perfect for birthdays, holidays, or just because.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gift Card Preview */}
            <div>
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Preview</h2>
              <motion.div 
                className="relative aspect-[1.6/1] rounded-2xl overflow-hidden shadow-xl"
                style={{ backgroundColor: giftCardDesigns.find(d => d.id === selectedDesign)?.color }}
              >
                <Image
                  src={giftCardDesigns.find(d => d.id === selectedDesign)?.image || ''}
                  alt="Gift Card"
                  fill
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="font-display text-2xl font-bold">BookJam</h3>
                    <p className="font-body text-sm opacity-80">Gift Card</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold">₹{finalAmount || 0}</p>
                    {recipientName && (
                      <p className="font-body mt-2">For: {recipientName}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Design Selection */}
              <div className="mt-6">
                <h3 className="font-body font-medium text-charcoal mb-3">Choose Design</h3>
                <div className="grid grid-cols-4 gap-3">
                  {giftCardDesigns.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => setSelectedDesign(design.id)}
                      className={`relative aspect-[1.6/1] rounded-lg overflow-hidden border-2 transition-all ${
                        selectedDesign === design.id ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={design.image}
                        alt={design.name}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Gift Card Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Customize Your Gift</h2>
              
              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block font-body font-medium text-charcoal mb-3">Select Amount</label>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {giftCardAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                      className={`py-3 rounded-lg font-body font-medium transition-all ${
                        selectedAmount === amount && !customAmount
                          ? 'bg-primary-500 text-white'
                          : 'bg-white border border-secondary-200 text-charcoal hover:border-primary-300'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Or enter custom amount (₹100 - ₹25,000)"
                    className="w-full pl-8 pr-4 py-3 bg-white border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none"
                  />
                </div>
              </div>

              {/* Recipient Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block font-body font-medium text-charcoal mb-2">Recipient's Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Who is this gift for?"
                    className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-body font-medium text-charcoal mb-2">Recipient's Email</label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-body font-medium text-charcoal mb-2">Your Name</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="From..."
                    className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-body font-medium text-charcoal mb-2">Personal Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Add a personal message..."
                    className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Purchase Button */}
              <button className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Buy Gift Card - ₹{finalAmount || 0}
              </button>

              {/* Features */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 font-body text-secondary-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Delivered instantly via email</span>
                </div>
                <div className="flex items-center gap-2 font-body text-secondary-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Never expires</span>
                </div>
                <div className="flex items-center gap-2 font-body text-secondary-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Redeemable on any book</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

