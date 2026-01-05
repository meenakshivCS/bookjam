import { FileText, ShoppingCart, CreditCard, Truck, RefreshCw, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service - BookJam',
  description: 'Read the terms and conditions for using BookJam online bookstore.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <FileText className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="font-body text-white/90">
            Last updated: January 1, 2026
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <p className="font-body text-secondary-600 leading-relaxed">
              Welcome to BookJam! These Terms of Service govern your use of our website and services. 
              By accessing or using BookJam, you agree to be bound by these terms. Please read them carefully 
              before making any purchase or using our services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="font-display text-xl font-bold text-charcoal mb-4">1. General Terms</h2>
              <div className="font-body text-secondary-600 space-y-4">
                <p>By using BookJam, you represent that:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are at least 18 years old or have parental consent</li>
                  <li>You have the legal capacity to enter into binding contracts</li>
                  <li>You will provide accurate and complete information</li>
                  <li>You will not use our services for any illegal purposes</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">2. Orders & Purchases</h2>
              </div>
              <div className="font-body text-secondary-600 space-y-4">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All orders are subject to availability and confirmation</li>
                  <li>Prices are in Indian Rupees (₹) and include applicable taxes</li>
                  <li>We reserve the right to refuse or cancel any order</li>
                  <li>Product descriptions and images are for illustration purposes</li>
                  <li>We make every effort to display accurate pricing, but errors may occur</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">3. Payment Terms</h2>
              </div>
              <div className="font-body text-secondary-600 space-y-4">
                <p>We accept the following payment methods:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Credit/Debit Cards (Visa, MasterCard, RuPay)</li>
                  <li>UPI payments</li>
                  <li>Net Banking</li>
                  <li>Cash on Delivery (COD) for eligible orders</li>
                </ul>
                <p>
                  All payments are processed securely through our payment partners. We do not store 
                  your complete credit card information on our servers.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">4. Shipping & Delivery</h2>
              </div>
              <div className="font-body text-secondary-600 space-y-4">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Delivery times are estimates and may vary based on location</li>
                  <li>Standard delivery: 5-7 business days</li>
                  <li>Express delivery: 2-3 business days (where available)</li>
                  <li>Free shipping on orders above ₹499</li>
                  <li>We are not responsible for delays due to unforeseen circumstances</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">5. Returns & Refunds</h2>
              </div>
              <div className="font-body text-secondary-600 space-y-4">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Returns accepted within 7 days of delivery</li>
                  <li>Books must be in original, unused condition</li>
                  <li>Refunds processed within 5-7 business days</li>
                  <li>Return shipping costs may apply unless the item is defective</li>
                  <li>E-books and digital products are non-refundable</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">6. Limitation of Liability</h2>
              </div>
              <div className="font-body text-secondary-600 space-y-4">
                <p>
                  BookJam shall not be liable for any indirect, incidental, special, or consequential 
                  damages arising from your use of our services. Our total liability shall not exceed 
                  the amount paid for the product or service in question.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="font-display text-xl font-bold text-charcoal mb-4">7. Changes to Terms</h2>
              <div className="font-body text-secondary-600">
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting. Your continued use of BookJam after any changes constitutes 
                  acceptance of the modified terms.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="font-display text-xl font-bold text-charcoal mb-4">8. Contact Information</h2>
              <div className="font-body text-secondary-600">
                <p>For questions about these Terms of Service, please contact us:</p>
                <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
                  <p><strong>BookJam Legal Team</strong></p>
                  <p>Email: legal@bookjam.in</p>
                  <p>Address: 42 Book Street, Indiranagar, Bangalore 560038</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

