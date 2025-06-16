const Footer = () => {
  return (
    <footer className="bg-black border-t border-red-900/20 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-950/10"></div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-red-500 mb-4">ARMWATCH</h3>
            <p className="text-white/80">
              Tracking global military developments and promoting peace through informed discussion.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Sections</h4>
            <ul className="space-y-2">
              <li>
                <a href="#military" className="text-white/80 hover:text-red-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  Military Expansion
                </a>
              </li>
              <li>
                <a href="#nuclear" className="text-white/80 hover:text-red-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  Nuclear Threats
                </a>
              </li>
              <li>
                <a href="#peace" className="text-white/80 hover:text-red-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  Peace Initiatives
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="/topics" className="text-white/80 hover:text-red-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  Discussion Topics
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-red-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-red-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  Data Sources
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-red-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-red-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  Contributors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-red-900/20 mt-8 pt-8 text-center">
          <p className="text-white/80">
            © 2024 ARMWATCH. Dedicated to promoting global peace and security awareness.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
