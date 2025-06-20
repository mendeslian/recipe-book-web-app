const Footer = () => {
  return (
    <footer className="bg-[#191919] text-gray-300 py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12">
        {/* Logo */}
        <div className="flex items-center font-bold text-xl tracking-widest text-orange-600 select-none">
          <span>H U M</span>
          <span className="bg-orange-600 text-black px-2 py-1 mx-1">AI</span>
          <span>N</span>
        </div>

        {/* ADDRESS */}
        <div className="min-w-[160px]">
          <h4 className="text-orange-600 font-semibold mb-4">ADDRESS</h4>
          <div>
            <p className="font-bold">ANTWERP OFFICE</p>
            <p>VELDKANT 4</p>
            <p>2550 KONTICH</p>
            <p>BELGIUM</p>
          </div>
          <div className="mt-4">
            <p className="font-bold">GHENT OFFICE</p>
            <p>GASTON CROMMENLAAN 8</p>
            <p>9050 GHENT</p>
            <p>BELGIUM</p>
          </div>
        </div>

        {/* SOCIALS */}
        <div className="min-w-[120px]">
          <h4 className="text-orange-600 font-semibold mb-4">SOCIALS</h4>
          <ul className="space-y-2 cursor-pointer">
            <li>INSTAGRAM</li>
            <li>LINKEDIN</li>
            <li>MEDIUM</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="min-w-[140px]">
          <h4 className="text-orange-600 font-semibold mb-4">CONTACT</h4>
          <p>HELLO@HUMAIN.AI</p>
          <p>+32 479 22 76 13</p>
          <p>HUMAIN NV</p>
          <p>BE 0782.674.588</p>
        </div>

        {/* PAGES */}
        <div className="min-w-[120px]">
          <h4 className="text-orange-600 font-semibold mb-4">PAGES</h4>
          <ul className="space-y-2 cursor-pointer">
            <li>PURPOSE</li>
            <li>SERVICES</li>
            <li>JOBS</li>
            <li>BLOG</li>
            <li>CASES</li>
          </ul>
        </div>
      </div>

      {/* Bottom small text */}
      <div className="max-w-7xl mx-auto mt-16 text-center text-gray-600 text-xs space-y-2">
        <div className="flex justify-center gap-8 opacity-50 uppercase tracking-widest select-none">
          <span>PRIVACY</span>
          <span>COOKIES</span>
        </div>
        <p>
          COPYRIGHT © 2022 HUMAIN NV. ALL RIGHTS RESERVED. WEBSITE MADE WITH
          LOVE BY FRANS HULET.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
