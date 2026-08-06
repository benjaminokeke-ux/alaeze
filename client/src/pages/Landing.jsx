import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiUsers, FiTrendingUp, FiRadio } from 'react-icons/fi';

const features = [
  {
    icon: FiPlay,
    title: 'Stream Bold Content',
    description: 'Docuseries, movies, mini-series, reels, podcasts, visual art & live streams — all in one place.',
  },
  {
    icon: FiUsers,
    title: 'Party Watch',
    description: 'Watch together with your crew in real-time. React, chat, and vibe together no matter where you are.',
  },
  {
    icon: FiTrendingUp,
    title: 'Creator Economy',
    description: 'Upload your content, grow your audience, and earn. Multiple engagement tiers to reward your hustle.',
  },
  {
    icon: FiRadio,
    title: 'Go Live',
    description: 'Stream live to your audience. Connect in real-time with the community that rocks with you.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-redd-950 via-dark-950 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-redd-600/20 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Nav */}
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-redd-600 rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-white font-display font-bold text-lg">A</span>
              </div>
              <span className="font-display font-bold text-2xl">
                <span className="text-redd-500">Alaeze</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="nav-link">Sign In</Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="py-20 md:py-32 text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight"
            >
              Stream{' '}
              <span className="gradient-text">Bold.</span>
              <br />
              Create{' '}
              <span className="gradient-text">Fearless.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-dark-300 max-w-2xl mx-auto"
            >
              The streaming platform that celebrates independent voices. Upload your story,
              build your audience, and get paid — all with that unapologetic Alaeze energy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/register" className="btn-primary text-lg py-4 px-8">
                Start Streaming Free
              </Link>
              <Link to="/register" className="btn-gold text-lg py-4 px-8">
                Start Creating
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-4 text-dark-500 text-sm"
            >
              No credit card required. Cancel anytime.
            </motion.p>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Everything You Need to{' '}
            <span className="gradient-text">Shine</span>
          </h2>
          <p className="mt-4 text-dark-400 max-w-xl mx-auto">
            Whether you're here to watch or create, Alaeze has the tools to make it happen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card-glow text-center p-6"
            >
              <div className="w-12 h-12 bg-redd-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon size={24} className="text-redd-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-dark-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-redd-950 to-dark-900 rounded-2xl p-12 border border-redd-800/30">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Join the Network?
          </h2>
          <p className="text-dark-300 mb-8 max-w-lg mx-auto">
            Join thousands of creators and viewers who are already part of the boldest streaming community.
          </p>
          <Link to="/register" className="btn-primary text-lg py-4 px-10 inline-block">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8 px-4 text-center text-dark-500 text-sm">
        <p>&copy; 2024 Alaeze. All rights reserved. Stream Bold.</p>
      </footer>
    </div>
  );
}
