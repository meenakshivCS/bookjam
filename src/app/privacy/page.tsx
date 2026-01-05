import { Shield, Lock, Eye, Database, Bell, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - BookJam',
  description: 'Learn how BookJam protects your privacy and handles your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
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
              At BookJam, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website or make a purchase. 
              Please read this privacy policy carefully. By using our services, you consent to the practices 
              described in this policy.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">Information We Collect</h2>
              </div>
              <div className="font-body text-secondary-600 space-y-4">
                <p>We collect information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Order history and preferences</li>
                  <li>Communication preferences</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">How We Use Your Information</h2>
              </div>
              <div className="font-body text-secondary-600 space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about orders, products, and services</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Improve our website and customer experience</li>
                  <li>Detect and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">Data Security</h2>
              </div>
              <div className="font-body text-secondary-600 space-y-4">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. These 
                  measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure payment processing through certified partners</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information by employees</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">Cookies & Tracking</h2>
              </div>
              <div className="font-body text-secondary-600 space-y-4">
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and 
                  hold certain information. Cookies are files with a small amount of data that may include 
                  an anonymous unique identifier.
                </p>
                <p>You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.</p>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">Your Rights</h2>
              </div>
              <div className="font-body text-secondary-600 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact us at{' '}
                  <a href="mailto:privacy@bookjam.in" className="text-primary-500 hover:underline">
                    privacy@bookjam.in
                  </a>
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="font-display text-xl font-bold text-charcoal mb-4">Contact Us</h2>
              <div className="font-body text-secondary-600">
                <p>If you have questions about this Privacy Policy, please contact us:</p>
                <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
                  <p><strong>BookJam Privacy Team</strong></p>
                  <p>Email: privacy@bookjam.in</p>
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

