const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* CTA Section */}
        <div className="py-16 border-b border-slate-700 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start your journey with AnkurPath today!
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-8">
            Every child deserves healthy growth. Every parent deserves better
            guidance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold cursor-pointer">
              Get Started
            </button>

            <button className="border border-slate-500 hover:border-slate-300 px-8 py-3 rounded-xl font-semibold cursor-pointer">
              Explore Features
            </button>
          </div>
        </div>

        {/* Links Section */}
        <div className="py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-white text-xl font-bold mb-6">Quick Links</h3>

              <ul className="space-y-3">
                <li className="hover:text-white transition cursor-pointer">
                  Home
                </li>

                <li className="hover:text-white transition cursor-pointer">
                  Features
                </li>

                <li className="hover:text-white transition cursor-pointer">
                  How It Works
                </li>

                <li className="hover:text-white transition cursor-pointer">
                  Dashboard Preview
                </li>

                <li className="hover:text-white transition cursor-pointer">
                  Parent Guidance
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white text-xl font-bold mb-6">Resources</h3>

              <ul className="space-y-3">
                <li className="hover:text-white transition cursor-pointer">
                  Healthy Nutrition
                </li>

                <li className="hover:text-white transition cursor-pointer">
                  Digital Wellness
                </li>

                <li className="hover:text-white transition cursor-pointer">
                  Sleep Health
                </li>

                <li className="hover:text-white transition cursor-pointer">
                  Internet Safety
                </li>

                <li className="hover:text-white transition cursor-pointer">
                  Positive Parenting
                </li>
              </ul>
            </div>

            {/* Focus Areas */}
            <div>
              <h3 className="text-white text-xl font-bold mb-6">Focus Areas</h3>

              <ul className="space-y-3">
                <li className="hover:text-white transition">
                  Screen Time Balance
                </li>

                <li className="hover:text-white transition">Sleep Wellness</li>

                <li className="hover:text-white transition">
                  Outdoor Activity
                </li>

                <li className="hover:text-white transition">
                  Positive Parenting
                </li>

                <li className="hover:text-white transition">
                  Child Development
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 py-6 text-center text-sm text-slate-400">
          <p>© 2026 AnkurPath • Guiding Parents. Nurturing Children.</p>

          <p className="mt-2">
            Built to support healthier childhood development and positive family
            wellbeing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
