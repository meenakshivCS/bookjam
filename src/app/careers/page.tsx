import { Briefcase, MapPin, Clock, Users, Heart, Zap, Coffee, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Careers - BookJam',
  description: 'Join the BookJam team! Explore exciting career opportunities in India\'s favorite online bookstore.',
};

const openPositions = [
  {
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Bangalore',
    type: 'Full-time',
    description: 'Build and scale our e-commerce platform using Next.js, React, and Node.js.',
  },
  {
    title: 'Content Curator',
    department: 'Editorial',
    location: 'Mumbai',
    type: 'Full-time',
    description: 'Curate book collections and write compelling descriptions for our catalog.',
  },
  {
    title: 'Digital Marketing Manager',
    department: 'Marketing',
    location: 'Bangalore',
    type: 'Full-time',
    description: 'Lead our digital marketing efforts across social media, email, and paid channels.',
  },
  {
    title: 'Customer Experience Associate',
    department: 'Support',
    location: 'Remote',
    type: 'Full-time',
    description: 'Provide exceptional support to our book-loving customers via chat, email, and phone.',
  },
  {
    title: 'Operations Manager',
    department: 'Operations',
    location: 'Delhi NCR',
    type: 'Full-time',
    description: 'Oversee warehouse operations and ensure smooth order fulfillment.',
  },
  {
    title: 'UX Designer',
    department: 'Design',
    location: 'Bangalore',
    type: 'Full-time',
    description: 'Create delightful user experiences for our web and mobile platforms.',
  },
];

const benefits = [
  { icon: BookOpen, title: 'Free Books', description: 'Monthly book allowance and employee discounts' },
  { icon: Heart, title: 'Health Coverage', description: 'Comprehensive health insurance for you and family' },
  { icon: Coffee, title: 'Flexible Work', description: 'Hybrid work model with flexible hours' },
  { icon: Zap, title: 'Learning Budget', description: 'Annual learning and development allowance' },
  { icon: Users, title: 'Great Team', description: 'Work with passionate book lovers' },
  { icon: Clock, title: 'Paid Time Off', description: 'Generous vacation and personal days' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-4 border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-white rounded-full" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Briefcase className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Story
          </h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto">
            Help us spread the joy of reading across India. We're always looking for passionate 
            people to join our team.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-charcoal text-center mb-12">
            Why Join BookJam?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white p-6 rounded-xl shadow-sm">
                <benefit.icon className="w-10 h-10 text-primary-500 mb-4" />
                <h3 className="font-display text-lg font-bold text-charcoal mb-2">{benefit.title}</h3>
                <p className="font-body text-secondary-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-charcoal text-center mb-4">
            Open Positions
          </h2>
          <p className="font-body text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our current openings and find your perfect role. Don't see a match? 
            Send us your resume anyway — we're always looking for great talent.
          </p>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <div 
                key={index} 
                className="bg-secondary-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                      {position.title}
                    </h3>
                    <p className="font-body text-secondary-600 mb-3">
                      {position.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm font-body text-secondary-600">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm font-body text-secondary-600">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm font-body text-secondary-600">
                        <Clock className="w-4 h-4" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="btn-primary whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-charcoal mb-4">
              Don't See a Fit?
            </h2>
            <p className="font-body text-secondary-600 mb-6">
              We're always interested in meeting talented people. Send us your resume and 
              we'll keep you in mind for future opportunities.
            </p>
            <Link href="mailto:careers@bookjam.in" className="btn-outline inline-block">
              Send Your Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


