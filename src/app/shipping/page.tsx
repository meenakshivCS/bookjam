import { Truck, Clock, MapPin, Package, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Shipping Information - BookJam',
  description: 'Learn about BookJam shipping policies, delivery times, and shipping charges.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <Truck className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Shipping Information
          </h1>
          <p className="font-body text-xl text-white/90">
            Fast, reliable delivery across India
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Shipping Options */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Shipping Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-8 h-8 text-primary-500" />
                  <h3 className="font-display text-lg font-bold text-charcoal">Standard Delivery</h3>
                </div>
                <ul className="font-body text-secondary-600 space-y-2">
                  <li>• Delivery in 5-7 business days</li>
                  <li>• FREE for orders above ₹499</li>
                  <li>• ₹49 for orders below ₹499</li>
                  <li>• Available across India</li>
                </ul>
              </div>
              <div className="p-6 bg-primary-50 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-8 h-8 text-primary-500" />
                  <h3 className="font-display text-lg font-bold text-charcoal">Express Delivery</h3>
                </div>
                <ul className="font-body text-secondary-600 space-y-2">
                  <li>• Delivery in 2-3 business days</li>
                  <li>• ₹99 additional charge</li>
                  <li>• Available in select cities</li>
                  <li>• Priority handling</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Delivery Times */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Estimated Delivery Times</h2>
            <div className="overflow-x-auto">
              <table className="w-full font-body">
                <thead>
                  <tr className="border-b border-secondary-200">
                    <th className="text-left py-3 px-4 font-bold text-charcoal">Region</th>
                    <th className="text-left py-3 px-4 font-bold text-charcoal">Standard</th>
                    <th className="text-left py-3 px-4 font-bold text-charcoal">Express</th>
                  </tr>
                </thead>
                <tbody className="text-secondary-600">
                  <tr className="border-b border-secondary-100">
                    <td className="py-3 px-4">Metro Cities (Delhi, Mumbai, Bangalore, etc.)</td>
                    <td className="py-3 px-4">3-5 days</td>
                    <td className="py-3 px-4">1-2 days</td>
                  </tr>
                  <tr className="border-b border-secondary-100">
                    <td className="py-3 px-4">Tier 2 Cities</td>
                    <td className="py-3 px-4">5-7 days</td>
                    <td className="py-3 px-4">2-3 days</td>
                  </tr>
                  <tr className="border-b border-secondary-100">
                    <td className="py-3 px-4">Tier 3 Cities & Towns</td>
                    <td className="py-3 px-4">7-10 days</td>
                    <td className="py-3 px-4">3-5 days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Remote Areas</td>
                    <td className="py-3 px-4">10-15 days</td>
                    <td className="py-3 px-4">Not available</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tracking */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary-500" />
              <h2 className="font-display text-2xl font-bold text-charcoal">Order Tracking</h2>
            </div>
            <div className="font-body text-secondary-600 space-y-4">
              <p>Once your order is shipped, you'll receive:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email notification with tracking number</li>
                <li>SMS updates on delivery status</li>
                <li>Real-time tracking on our website</li>
              </ul>
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="font-medium text-charcoal">Track your order anytime at:</p>
                <a href="/track-order" className="text-primary-500 hover:underline">bookjam.in/track-order</a>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-primary-500" />
              <h2 className="font-display text-2xl font-bold text-charcoal">Important Notes</h2>
            </div>
            <ul className="font-body text-secondary-600 space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Business days exclude Sundays and public holidays</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Delivery times start after order confirmation and payment verification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Multiple items in one order may be shipped separately</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Delays may occur during sale periods or unforeseen circumstances</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Someone must be available to receive the package at the delivery address</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}


