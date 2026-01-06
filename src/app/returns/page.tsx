import { RefreshCw, CheckCircle, XCircle, Clock, Package, CreditCard } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Returns & Refunds - BookJam',
  description: 'Learn about BookJam return policy, refund process, and how to return items.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <RefreshCw className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Returns & Refunds
          </h1>
          <p className="font-body text-xl text-white/90">
            Hassle-free returns, guaranteed satisfaction
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Return Policy Overview */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Return Policy</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="font-display font-bold text-charcoal mb-1">7-Day Returns</h3>
                <p className="font-body text-secondary-600 text-sm">Return within 7 days of delivery</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="font-display font-bold text-charcoal mb-1">Easy Pickup</h3>
                <p className="font-body text-secondary-600 text-sm">We'll pick up from your doorstep</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="font-display font-bold text-charcoal mb-1">Quick Refunds</h3>
                <p className="font-body text-secondary-600 text-sm">Refund within 5-7 business days</p>
              </div>
            </div>
          </section>

          {/* Eligible for Return */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-charcoal mb-4">Eligible for Return</h2>
            <ul className="font-body text-secondary-600 space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Books in original, unused condition with all packaging intact</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Wrong item delivered</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Damaged or defective books</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Missing pages or printing errors</span>
              </li>
            </ul>
          </section>

          {/* Not Eligible */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-charcoal mb-4">Not Eligible for Return</h2>
            <ul className="font-body text-secondary-600 space-y-3">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>E-books and digital downloads</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Books with visible wear, highlighting, or writing</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Gift cards and promotional items</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Items returned after 7 days</span>
              </li>
            </ul>
          </section>

          {/* How to Return */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-charcoal mb-6">How to Return</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-display font-bold text-charcoal mb-1">Initiate Return</h3>
                  <p className="font-body text-secondary-600">Go to your Orders page and click "Return" next to the item. Or contact our support team.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-display font-bold text-charcoal mb-1">Pack the Item</h3>
                  <p className="font-body text-secondary-600">Pack the book securely in its original packaging if possible. Include any accessories or freebies.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-display font-bold text-charcoal mb-1">Schedule Pickup</h3>
                  <p className="font-body text-secondary-600">Our courier partner will pick up the item from your address within 2-3 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-display font-bold text-charcoal mb-1">Receive Refund</h3>
                  <p className="font-body text-secondary-600">Once we receive and verify the item, your refund will be processed within 5-7 business days.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Methods */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-charcoal mb-4">Refund Methods</h2>
            <div className="font-body text-secondary-600 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-secondary-200">
                      <th className="text-left py-3 px-4 font-bold text-charcoal">Payment Method</th>
                      <th className="text-left py-3 px-4 font-bold text-charcoal">Refund To</th>
                      <th className="text-left py-3 px-4 font-bold text-charcoal">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-secondary-100">
                      <td className="py-3 px-4">Credit/Debit Card</td>
                      <td className="py-3 px-4">Original card</td>
                      <td className="py-3 px-4">5-7 business days</td>
                    </tr>
                    <tr className="border-b border-secondary-100">
                      <td className="py-3 px-4">UPI</td>
                      <td className="py-3 px-4">Original UPI ID</td>
                      <td className="py-3 px-4">3-5 business days</td>
                    </tr>
                    <tr className="border-b border-secondary-100">
                      <td className="py-3 px-4">Net Banking</td>
                      <td className="py-3 px-4">Bank account</td>
                      <td className="py-3 px-4">5-7 business days</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Cash on Delivery</td>
                      <td className="py-3 px-4">Bank account / BookJam Credit</td>
                      <td className="py-3 px-4">7-10 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Need Help */}
          <section className="bg-primary-50 rounded-xl p-8 text-center">
            <h2 className="font-display text-xl font-bold text-charcoal mb-4">Need Help with Returns?</h2>
            <p className="font-body text-secondary-600 mb-6">
              Our customer support team is here to help you with any return-related queries.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Support
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}


