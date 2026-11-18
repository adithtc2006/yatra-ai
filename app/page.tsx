import AIPlanner from "./AIPlanner";
import DelhiMap from "./DelhiMap";
const destinations = [
  {
    name: "India Gate",
    category: "Iconic Landmark",
    image:
      "https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?w=800",
  },
  {
    name: "Red Fort",
    category: "Historical Heritage",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
  },
  {
    name: "Humayun's Tomb",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1765025711245-d049883c8d24?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#183b32]">
     {/* Navigation */}
<nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 py-5 bg-white/95 backdrop-blur-lg shadow-sm">

  {/* Logo */}
  <a href="#home" className="text-3xl font-bold tracking-tight">
    YATRA<span className="text-[#c49348]">AI.</span>
  </a>

  {/* Desktop Navigation */}
  <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
    <a href="#home" className="hover:text-[#bd914f] transition">
      Home
    </a>

    <a href="#destinations" className="hover:text-[#bd914f] transition">
      Destinations
    </a>

    <a href="#planner" className="hover:text-[#bd914f] transition">
      AI Planner
    </a>
  </div>

  {/* Desktop Button */}
  <a
    href="#planner"
    className="hidden md:inline-block bg-[#183b32] text-white px-7 py-3 rounded-full text-sm hover:bg-[#c49348] hover:text-[#183b32] transition"
  >
    Plan My Trip →
  </a>

  {/* Mobile Menu */}
  <details className="md:hidden relative">
    <summary className="list-none cursor-pointer text-3xl text-[#183b32]">
      ☰
    </summary>

    <div className="absolute right-0 top-12 w-56 bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-5 text-sm font-semibold">

      <a href="#home">Home</a>

      <a href="#destinations">Destinations</a>

      <a href="#planner">AI Planner</a>

      <a
        href="#planner"
        className="bg-[#183b32] text-white text-center py-3 rounded-full"
      >
        Plan My Trip →
      </a>

    </div>
  </details>

</nav>

      {/* Hero Section */}
<section
  id="home"
  className="relative min-h-[650px] md:min-h-[750px] flex items-center overflow-hidden"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?w=1800')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10"></div>

  {/* Hero Content */}
  <div className="relative z-10 px-8 md:px-20 max-w-5xl text-white">

    <div className="inline-block border border-[#e9c68d]/60 rounded-full px-5 py-2 mb-8">
      <p className="text-[#e9c68d] text-xs md:text-sm uppercase tracking-[3px]">
        ✦ Discover Delhi with YATRA AI
      </p>
    </div>

    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
      Your City.
      <br />
      Your Journey.
      <br />
      <span className="text-[#e9c68d]">
        Your Story.
      </span>
    </h2>

    <p className="mt-8 text-base md:text-xl text-gray-200 max-w-2xl leading-8">
      Explore iconic landmarks, discover hidden gems and
      experience Delhi like never before with your
      intelligent AI travel companion.
    </p>

    <div className="flex flex-wrap gap-4 mt-10">

      <a
        href="#planner"
        className="bg-[#d2a45e] text-[#183b32] font-bold px-9 py-4 rounded-full hover:bg-white transition-all duration-300 hover:-translate-y-1"
      >
        Plan Your Journey →
      </a>

      <a
        href="#destinations"
        className="border border-white text-white px-9 py-4 rounded-full hover:bg-white hover:text-[#183b32] transition-all duration-300"
      >
        Explore Delhi
      </a>

    </div>

    <div className="flex gap-10 mt-16">

      <div>
        <h3 className="text-3xl font-bold text-[#e9c68d]">01</h3>
        <p className="text-xs uppercase tracking-widest mt-2 text-gray-300">
          City
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-[#e9c68d]">AI</h3>
        <p className="text-xs uppercase tracking-widest mt-2 text-gray-300">
          Powered
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-[#e9c68d]">∞</h3>
        <p className="text-xs uppercase tracking-widest mt-2 text-gray-300">
          Experiences
        </p>
      </div>

    </div>

  </div>
</section>

      {/* Introduction */}
      <section className="py-20 px-8 md:px-20 text-center">
        <p className="text-[#bd914f] uppercase tracking-[4px] text-xs font-bold">
          Travel Smarter
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mt-5">
          Delhi, Your Way.
        </h2>

        <p className="max-w-2xl mx-auto mt-6 text-gray-600 leading-8">
          From centuries-old monuments to vibrant streets and
          unforgettable food, discover the capital through
          experiences designed around you.
        </p>
      </section>

      {/* Destinations */}
      <section id="destinations" className="px-8 md:px-20 pb-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[#bd914f] uppercase tracking-widest text-xs">
              Explore the Capital
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Popular Destinations
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {destinations.map((place) => (
            <div
  key={place.name}
  className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
>
  <div className="relative overflow-hidden">
    <img
      src={place.image}
      alt={place.name}
      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

    <span className="absolute bottom-5 left-5 bg-[#d2a45e] text-[#183b32] text-xs font-bold px-4 py-2 rounded-full">
      {place.category}
    </span>
  </div>

  <div className="p-7">
    <h3 className="text-2xl font-bold group-hover:text-[#bd914f] transition">
      {place.name}
    </h3>

    <p className="text-sm text-gray-500 mt-3 leading-7">
      Discover the beauty, culture and fascinating history of {place.name}.
    </p>

    <a
      href="#planner"
      className="inline-flex items-center gap-2 mt-6 text-[#183b32] font-bold hover:text-[#bd914f] transition"
    >
      Explore Destination →
    </a>
  </div>
</div>
          ))}
        </div>
      </section>

      <AIPlanner />
<DelhiMap />
     {/* Footer */}
      <footer className="bg-[#102c25] text-white px-8 md:px-20 py-10 text-center">
        <h2 className="text-2xl font-bold">
          YATRA<span className="text-[#d2a45e]">AI.</span>
        </h2>
        <p className="text-gray-400 mt-3 text-sm">
          Discover Delhi. Travel Beyond Ordinary.
        </p>
        <p className="text-gray-500 text-xs mt-6">
          © 2026 YATRA AI. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
