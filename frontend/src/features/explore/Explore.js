// src/pages/Explore.js
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import MapComponent from "../../components/destinations/MapComponent";
import { MapPin, Clock, Mountain, Plus, Check, ArrowLeft } from "lucide-react";

// Asset imports from explore folder
import raraImg     from "../../assets/explore/rara.png";
import ilamImg     from "../../assets/explore/ilam.png";
import bandipurImg from "../../assets/explore/bandipur.png";
import khaptadImg  from "../../assets/explore/khaptad.png";
import mustangImg  from "../../assets/explore/uppermustang.png";
import panchImg    from "../../assets/explore/panchpokhari.png";
import pokharaImg  from "../../assets/explore/pokhara.png";
import chitwanImg  from "../../assets/explore/chitwan.png";
import langtangImg from "../../assets/explore/langtang.png";

// Asset cross-imports from image folders 
import everImg     from "../../assets/images/prayering-flag.jpg";
import lumImg      from "../../assets/images/Lumbini.jpg";
import kathmanduImg from "../../assets/images/Swayambhunath.jpg";
import bhaktapurImg from "../../assets/images/Bhaktapur.jpg";
import kanchImg    from "../../assets/images/Nepali_Mountainn.jpg";

// Enhanced consolidated database with deep descriptions and structural categories
const places = [
  {
    id: "everest",
    name: "Mount Everest",
    region: "Eastern Nepal",
    desc: "Standing at the roof of the world — breathtaking Himalayan vistas and legendary Sherpa high trails.",
    history: "Mount Everest, historically known as Sagarmatha in Nepal and Chomolungma in Tibet, stands as the ultimate icon of human endurance and geographical majesty. Located inside the UNESCO-listed Sagarmatha National Park, the area encapsulates centuries of Sherpa culture, alpine traditions, and spiritual Buddhist monasteries. From early map makers to modern expeditions, its deep icy valleys and high base camps carry historical chronicles of triumph and wilderness survival.",
    bestTime: "Mar – May, Oct – Nov",
    days: "12–16 days",
    cost: "Rs. 60,000–1,10,000",
    difficulty: "Hard",
    type: ["Trekking", "Adventure", "Nature"],
    highlight: "World's Highest Peak (8,848.86m)",
    img: everImg,
    todo: ["Trekking to Everest Base Camp", "Sherpa Cultural Museum Tour", "Tengboche Monastery Visit", "Himalayan Sunrise Photography"],
    eat: ["Sherpa Stew (Syakpa)", "Tsampa Porridge", "High-Altitude Tea House Cuisine", "Local Yak Cheese Platters"],
    stay: ["Namche Bazaar Luxury Resorts", "High-Altitude Base Camp Tea Houses", "Traditional Sherpa Homestays"]
  },
  {
    id: "kanchenjunga",
    name: "Kanchenjunga",
    region: "Eastern Nepal",
    desc: "An unspoiled alpine paradise circling the third-highest mountain peak on planet Earth.",
    history: "Revered as a sacred mountain by local communities, Kanchenjunga rises dramatically above the eastern Himalayas. The region's historical value lies in its pristine isolation, acting as a natural sanctuary for rare species like the red panda and snow leopard. The deep alpine valleys are rich with the cultural heritage of the Limbu and Rai indigenous tribes, who have protected the conservation area's ecosystems and trade passes for centuries.",
    bestTime: "Mar – May, Oct – Nov",
    days: "15–22 days",
    cost: "Rs. 75,000–1,30,000",
    difficulty: "Hard",
    type: ["Trekking", "Adventure", "Nature"],
    highlight: "World's 3rd Highest Mountain",
    img: kanchImg,
    todo: ["North & South Base Camp Circuit", "Limbu Cultural Immersion Walks", "Red Panda Spotting Trails", "Glacier Field Explorations"],
    eat: ["Traditional Tongba (Millet Beer)", "Rai Local Delicacies", "Wild Himalayan Berry Jams", "Organic Agro-meals"],
    stay: ["Remote Wilderness Camps", "Community Tea Houses", "Taplejung Eco-lodges"]
  },
  {
    id: "lumbini",
    name: "Lumbini",
    region: "Southern Nepal",
    desc: "A timeless global sanctuary of peace, historical shrines, and beautiful international monastic spaces.",
    history: "Lumbini is globally revered as the birthplace of Siddhartha Gautama in 623 BC, who later attained enlightenment as Lord Buddha. Recognized as a core UNESCO World Heritage Site, it stands as an ancient historical capital of peace and spirituality. Visitors can explore the centuries-old Maya Devi Temple, the archaeological marvel of the Emperor Ashoka Pillar erected in 249 BC, and an expansive monastic zone containing architecture funded by Buddhist nations worldwide.",
    bestTime: "Oct – Mar",
    days: "1–3 days",
    cost: "Rs. 4,000–10,000",
    difficulty: "Easy",
    type: ["Cultural", "Relaxing"],
    highlight: "Birthplace of Lord Buddha",
    img: lumImg,
    todo: ["Maya Devi Temple Archeological Walk", "Ashoka Pillar Historical Study", "Monastic Zone Cycling", "International Meditation Retreats"],
    eat: ["Monastery Wellness Cafeterias", "Mithila Regional Platters", "Pure Vegan Health Foods"],
    stay: ["Buddhist Peace Resorts", "Sacred Garden Eco-lodges", "Monastery Guest Houses"]
  },
  {
    id: "kathmandu",
    name: "Kathmandu",
    region: "Central Nepal",
    desc: "Nepal's cultural and historical heart, filled with ancient UNESCO squares and royal heritage.",
    history: "Kathmandu, the bustling capital of Nepal, is a vibrant living museum of medieval artistry, sacred temples, and centuries-old architectural squares. Historically governed by the Malla and Shah dynasties, it sits at the intersection of old trans-Himalayan trade routes. The city's legendary Kathmandu Durbar Square, Swayambhunath Stupa, and the holy Pashupatinath temple reflect a sophisticated amalgamation of Newari craftmanship, Hinduism, and Buddhist philosophy.",
    bestTime: "Sep – May",
    days: "2–4 days",
    cost: "Rs. 5,000–15,000",
    difficulty: "Easy",
    type: ["Cultural", "Relaxing"],
    highlight: "City of Ancient Temples",
    img: kathmanduImg,
    todo: ["Swayambhunath Monkey Temple Walk", "Pashupatinath Aarati Sightseeing", "Thamel Bazaar Shopping", "Durbar Square Heritage Tour"],
    eat: ["Authentic Buffalo Momos", "Traditional Newari Street Food", "Rooftop Garden Dining", "Classic Dal Bhat"],
    stay: ["Boutique Heritage Mansions", "Thamel Tourist Lodges", "Luxury Urban Hotels"]
  },
  {
    id: "bhaktapur",
    name: "Bhaktapur",
    region: "Central Nepal",
    desc: "A beautifully preserved medieval town famed for intricate wood carvings and brick-paved lanes.",
    history: "Known historically as Khwopa, Bhaktapur is celebrated as an ancient Newari kingdom that serves as Nepal's cultural capital. Its brick-paved layout, towering multi-roofed wooden pagodas, and majestic royal palaces look exactly as they did in the 15th century. This UNESCO World Heritage city is protected against motorized traffic, preserving its old potters squares, intricate open-air ponds, and rich Newari cultural traditions.",
    bestTime: "Sep – May",
    days: "1–2 days",
    cost: "Rs. 3,000–8,000",
    difficulty: "Easy",
    type: ["Cultural", "Relaxing"],
    highlight: "Ancient Walled Newari City",
    img: bhaktapurImg,
    todo: ["55-Window Palace Photography", "Traditional Clay Pottery Making", "Nyatapola Temple Architectural Tour", "Ancient Courtyard Exploration"],
    eat: ["Juju Dhau (King Curd)", "Traditional Bara & Chatamari Snacking", "Authentic Newari Feasts"],
    stay: ["Restored Brick Guest Houses", "Boutique Courtyard Inns", "Local Heritage Homestays"]
  },
  {
    id: "rara",
    name: "Rara Lake",
    region: "Karnali",
    desc: "Nepal's hidden blue jewel — the largest lake, untouched and serene.",
    history: "Historically known as Mahendra Tal, Rara Lake is Nepal's deepest and largest freshwater body, sitting peacefully at an altitude of 2,990 meters within Mugu district. Formally protected by the establishment of Rara National Park in 1976, the area is an untouched wilderness surrounded by pine and spruce forests. The deep blue lake contains endemic snowtrout variants and is surrounded by ancient trails where indigenous Karnali agriculture survives.",
    bestTime: "Oct – Nov",
    days: "7–10 days",
    cost: "Rs. 25,000–40,000",
    difficulty: "Moderate",
    type: ["Trekking", "Nature"],
    highlight: "Deepest blue lake in Nepal",
    img: raraImg,
    todo: ["Lakeside Horseback Riding", "Boating on Crystal Waters", "Murma Top Viewpoint Trekking", "Wild Landscape Photography"],
    eat: ["Fresh Mountain Snowtrout", "Karnali Organic Rice Sets", "Himalayan Herbal Teas"],
    stay: ["Lakeside Tented Eco-Camps", "National Park Eco-Lodges", "Murma Village Rustic Homestays"]
  },
  {
    id: "ilam",
    name: "Ilam",
    region: "Eastern Nepal",
    desc: "Rolling tea gardens, misty mountains, and the peaceful charm of eastern Nepal.",
    history: "The rich history of Ilam began in 1863 when the Ilam Tea Estate was established, introducing early Chinese tea plants to Nepal's high-altitude terroir. Nestled between misty green ridges at heights up to 7,200 feet, Ilam's landscape is famous for organic Orthodox tea production. It functions as an agricultural paradise producing ginger, cardamom, and cheese while preserving ancestral Rai and Lepcha community traditions.",
    bestTime: "Mar – May, Sep – Nov",
    days: "3–5 days",
    cost: "Rs. 8,000–15,000",
    difficulty: "Easy",
    type: ["Nature", "Cultural", "Relaxing"],
    highlight: "Nepal's tea capital",
    img: ilamImg,
    todo: ["Kanyam Tea Estate Hiking", "Antu Danda Himalayan Sunrise View", "Mai Pokhari Sacred Wetland Tour", "Tea Factory Processing Guide"],
    eat: ["Organic Orthodox Green Tea", "Local Ilam Lollipops", "Chhurpi Hard Cheese Snacks", "Local Ethnic Thali"],
    stay: ["Tea Garden Heritage Manor Resorts", "Antu Danda Sunrise Homestays", "Agro-tourism Farm Lodges"]
  },
  {
    id: "bandipur",
    name: "Bandipur",
    region: "Gandaki",
    desc: "A perfectly preserved hilltop town with Newari architecture and Himalayan views.",
    history: "Perched along an isolated mountain ridge in Tanahun, Bandipur developed in the 18th century as a prosperous trans-Himalayan trade checkpoint for Newari merchants from Bhaktapur. When the national highway bypassed the ridge in the 1970s, time stood completely still, preserving its clean vehicle-free main bazaar, restored 18th-century townhouses, and uninterrupted panoramic views of the central Himalayas.",
    bestTime: "Oct – Apr",
    days: "2–3 days",
    cost: "Rs. 5,000–12,000",
    difficulty: "Easy",
    type: ["Cultural", "Relaxing"],
    highlight: "Frozen in time medieval town",
    img: bandipurImg,
    todo: ["Medieval Main Bazaar Walks", "Siddha Cave Spelunking", "Thani Mai Hilltop Sunrise Hike", "Silk Farming Tour"],
    eat: ["Newari Hillside Cafeteria Treats", "Organic Coffee Blends", "Traditional Kachila & Chhoyela"],
    stay: ["Boutique Townhouse Inns", "Scenic Ridge Mountain Resorts", "Cozy Newari Homestays"]
  },
  {
    id: "khaptad",
    name: "Khaptad",
    region: "Far-Western Nepal",
    desc: "Mystical highland meadows, spiritual ashrams, and untouched wilderness.",
    history: "Khaptad National Park spans a stunning high-altitude plateau ranging from 1,400 to 3,300 meters across four remote western districts. The region carries deep spiritual significance due to the legendary Hindu saint Khaptad Baba, who arrived in the 1940s and spent 50 years meditating in total solitude. Officially protected since 1984, the park contains rolling green meadows, rare medicinal flora, and pristine conifer forests.",
    bestTime: "Apr – Jun, Sep – Nov",
    days: "5–7 days",
    cost: "Rs. 20,000–35,000",
    difficulty: "Moderate",
    type: ["Trekking", "Cultural"],
    highlight: "Sacred plateau at 3,300m",
    img: khaptadImg,
    todo: ["Khaptad Baba Ashram Pilgrimage", "Triveni Confluence Temple Visit", "Rolling Alpine Meadow Hikes", "Bird Watching Trails"],
    eat: ["Organic Millet Roti", "Far-Western Traditional Dhido", "Medicinal Wild Herb Soups"],
    stay: ["National Park Camping Sites", "Basic Wilderness Shelters", "Silgarhi Base Guest Houses"]
  },
  {
    id: "mustang",
    name: "Upper Mustang",
    region: "Gandaki",
    desc: "The forbidden kingdom — ancient caves, Tibetan culture, and surreal landscapes.",
    history: "Upper Mustang, historically known as the semi-autonomous Kingdom of Lo founded in 1380 by Ame Pal, is an arid trans-Himalayan desert hidden in the rain shadow of the Annapurnas. Closed to outside visitors until 1992, its isolation completely preserved centuries-old Tibetan Buddhist traditions. The terrain features deep canyons, 3,000-year-old cliffside sky caves, and the walled capital city of Lo Manthang.",
    bestTime: "Mar – Nov",
    days: "10–14 days",
    cost: "Rs. 80,000–1,20,000",
    difficulty: "Hard",
    type: ["Adventure", "Trekking", "Cultural"],
    highlight: "Last forbidden kingdom of Nepal",
    img: mustangImg,
    todo: ["Lo Manthang Walled Settlement Tour", "Cliff Sky Caves Archeological Walk", "Tiji Masked Dance Festival View", "Horse Safari Trails"],
    eat: ["Tibetan Butter Tea (Su Chya)", "Marpha Apricot Distillery Brandies", "Buckwheat Mountain Pancakes"],
    stay: ["Traditional Mud-Brick Himalayan Inns", "Marpha Orchard Lodges", "Mountain View Tea Houses"]
  },
  {
    id: "panchpokhari",
    name: "Panch Pokhari",
    region: "Sindhupalchok",
    desc: "Five sacred alpine lakes sitting above the clouds, rarely visited and breathtaking.",
    history: "Panch Pokhari comprises five sacred high-altitude alpine lakes sitting at 4,100 meters above sea level within the Sindhupalchok district. The region is historically renowned as an essential spiritual pilgrimage destination where thousands of devotees gather during the Janai Purnima festival. The pristine wetland remains off-the-beaten-path, preserving natural mountain passes and rich biological corridors.",
    bestTime: "May – Jun, Sep – Oct",
    days: "5–7 days",
    cost: "Rs. 15,000–25,000",
    difficulty: "Hard",
    type: ["Trekking", "Adventure"],
    highlight: "Five sacred Himalayan lakes",
    img: panchImg,
    todo: ["Five Sacred Lakes Circuit Trek", "High-Altitude Pass Photography", "Alpine Wilderness Ridge Walks"],
    eat: ["Sherpa Alpine Stews", "Energy High-Altitude Porridges", "Warm Ginger Lemon Drinks"],
    stay: ["High Wilderness Tent Campsites", "Rustic Community Tea Sheds"]
  },
  {
    id: "pokhara",
    name: "Pokhara",
    region: "Gandaki",
    desc: "Nepal's tourism capital — lakes, mountains, paragliding, and endless café culture.",
    history: "Pokhara has transitioned from an old commercial trade route connecting India and Tibet into Nepal's premier leisure and adventure center. Nestled right beside the tranquil Phewa Lake, its history is tied to spectacular views of the Annapurna and Machhapuchhre ranges. The vibrant lakeside sector has hosted mountaineers and backpackers for generations, serving as the universal gateway to the Annapurna sanctuary.",
    bestTime: "Oct – Apr",
    days: "3–5 days",
    cost: "Rs. 10,000–25,000",
    difficulty: "Easy",
    type: ["Relaxing", "Adventure", "Nature"],
    highlight: "Gateway to the Annapurnas",
    img: pokharaImg,
    todo: ["Boating on Phewa Lake", "Sarangkot Paragliding Adventure", "Peace Pagoda Hiking", "Davis Falls Exploration"],
    eat: ["Lakeside Trout Fish Dinners", "Continental Brunch Cafés", "Organic Espresso and Fruit Bars"],
    stay: ["Lakeside Luxury Waterfront Resorts", "Backpacker Hostels", "Peace Pagoda Retreat Centers"]
  },
  {
    id: "chitwan",
    name: "Chitwan",
    region: "Bagmati",
    desc: "Jungle safaris, one-horned rhinos, tigers, and elephant experiences in the Terai.",
    history: "Chitwan National Park, established in 1973 as Nepal's very first national park, was awarded UNESCO World Heritage status for its pristine subtropical biodiversity. Historically serving as a royal hunting reserve, it now stands as an international conservation success story. The subtropical inner Terai floodplain has protected the indigenous Tharu communities along with rare one-horned rhinos and Bengal tigers.",
    bestTime: "Oct – Mar",
    days: "3–4 days",
    cost: "Rs. 12,000–30,000",
    difficulty: "Easy",
    type: ["Wildlife", "Nature"],
    highlight: "UNESCO World Heritage jungle",
    img: chitwanImg,
    todo: ["Jeep Jungle Safaris", "Rapti River Canoeing", "One-Horned Rhino Spotting Walk", "Tharu Stick Dance Cultural Performance"],
    eat: ["Tharu Traditional Cuisine Platters", "Riverside Sunset Buffet Dinners", "Sauraha Street Barbecues"],
    stay: ["Subtropical Jungle Luxury Resorts", "Sauraha Riverside Wildlife Lodges", "Tharu Community Eco-Homestays"]
  },
  {
    id: "langtang",
    name: "Langtang Valley",
    region: "Bagmati",
    desc: "The valley of glaciers — high alpine meadows, yak pastures, and Tamang culture.",
    history: "Langtang Valley is famously celebrated as the valley of glaciers, located near the Tibetan border inside Langtang National Park. Historically influenced by old Tibetan lifestyle traits, its rich cultural heritage is preserved by the indigenous Tamang and Sherpa communities. The scenic path follows ancient yak grazing trails up to the ancient Kyanjin Gompa monastery, framed by ice falls and mountain walls.",
    bestTime: "Mar – May, Oct – Nov",
    days: "7–10 days",
    cost: "Rs. 20,000–35,000",
    difficulty: "Moderate",
    type: ["Trekking", "Adventure"],
    highlight: "Closest trekking from Kathmandu",
    img: langtangImg,
    todo: ["Kyanjin Gompa Monastic Exploration", "Kyanjin Ri Peak View Trek", "Yak Cheese Factory Tour", "Glacial Valley Walks"],
    eat: ["Fresh Local Yak Cheese Artisans", "Tamang Butter Tea Sets", "Warm Tibetan Noodle Thukpa"],
    stay: ["Kyanjin Gompa Mountain Lodges", "Lama Hotel Alpine Tea Houses", "Syabrubesi Riverside Hubs"]
  }
];

const ALL_TYPES = ["All", "Trekking", "Adventure", "Nature", "Cultural", "Relaxing", "Wildlife"];

export default function Explore() {
  const [selectedType, setSelectedType] = useState("All");
  const [trips, setTrips] = useState([]);
  const [addedPlaces, setAddedPlaces] = useState({});
  const [addingTo, setAddingTo] = useState(null);
  const [showTripPicker, setShowTripPicker] = useState(null);
  
  // New States for managing the appealing after-click view layout
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeTab, setActiveTab] = useState("todo"); // "todo", "eat", "stay"

  useEffect(() => {
    API.get("/trips/my").then((res) => setTrips(res.data)).catch(() => {});
  }, []);

  const filtered = places.filter((p) =>
    selectedType === "All" || p.type.includes(selectedType)
  );

  const handleAddToTrip = async (tripId, place, e) => {
    if (e) e.stopPropagation(); // Stops parent card click triggering when adding trip
    setAddingTo(`${tripId}-${place.name}`);
    try {
      await API.post(`/trips/${tripId}/places`, {
        name: place.name,
        address: `${place.region}, Nepal`,
        lat: null, lng: null, place_id: null,
      });
      setAddedPlaces((prev) => ({ ...prev, [`${tripId}-${place.name}`]: true }));
      setShowTripPicker(null);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add place");
    } finally {
      setAddingTo(null);
    }
  };

  const getTabIcon = () => {
    if (activeTab === "eat") return "🍲 Try ";
    if (activeTab === "stay") return "🏨 Book ";
    return "🌟 Explore ";
  };

  // RENDERS SPLIT SCREEN VIEW AFTER CLICK EFFECT ACTIVATES
  if (selectedPlace) {
    const activeCategories = selectedPlace[activeTab] || [];
    return (
      <DashboardLayout>
        <div style={{
          display: "flex",
          width: "100%",
          height: "calc(100vh - 120px)",
          background: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.06)"
        }} className="fade-up">
          
          {/* LEFT CONTENT TRAVEL GUIDE PANEL */}
          <div style={{ width: "55%", height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", background: "#fff" }}>
            
            {/* Big Hero Image View */}
            <div style={{
              position: "relative",
              minHeight: "45vh",
              backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url(${selectedPlace.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "2.5rem"
            }}>
              {/* Appealing Back Button */}
              <button 
                onClick={() => { setSelectedPlace(null); setActiveTab("todo"); }}
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  left: "1.5rem",
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "50% 50% 50% 50%",
                  width: "42px",
                  height: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <ArrowLeft size={18} color="#2B3E34" />
              </button>

              <div style={{ textTransform: "uppercase", letterSpacing: "0.15em", color: "#FFEBE7", fontSize: "0.8rem", fontWeight: "700", marginBottom: "0.4rem" }}>
                📍 {selectedPlace.region}
              </div>
              <h1 className="cinzel" style={{ color: "#fff", fontSize: "2.5rem", margin: "0 0 0.5rem 0", fontWeight: "700" }}>
                {selectedPlace.name}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.9)", margin: 0, fontSize: "1rem", fontStyle: "italic", maxWidth: "90%" }}>
                "{selectedPlace.desc}"
              </p>
            </div>

            {/* Deep Historical Background Content Block */}
            <div style={{ padding: "2rem 2.5rem 1rem" }}>
              <h3 className="cinzel" style={{ fontSize: "1.25rem", color: "#2B3E34", fontWeight: "700", marginBottom: "0.75rem", letterSpacing: "0.02em" }}>
                Historical & Regional Overview
              </h3>
              <p style={{ color: "#4A5568", fontSize: "0.95rem", lineHeight: "1.7", margin: 0, textAlign: "justify" }}>
                {selectedPlace.history}
              </p>
            </div>

            {/* Structured Interactive Tabs Section */}
            <div style={{ padding: "1.5rem 2.5rem 0" }}>
              <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid #E2E8F0", paddingBottom: "1rem" }}>
                {["todo", "eat", "stay"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      backgroundColor: activeTab === tab ? "#FFEBE7" : "transparent",
                      color: activeTab === tab ? "#FF5A5F" : "#4A5568",
                      border: "none",
                      padding: "0.6rem 1.2rem",
                      borderRadius: "20px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      transition: "all 0.2s"
                    }}
                  >
                    {tab === "todo" && "📍 What to do"}
                    {tab === "eat" && "🍴 What to eat"}
                    {tab === "stay" && "🛏️ Where to stay"}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Content Grid Block */}
            <div style={{ padding: "1.5rem 2.5rem 2.5rem", flex: 1 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {activeCategories.map((item, index) => (
                  <div key={index} style={{
                    padding: "1.1rem 1.25rem",
                    background: "#F8FAFC",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "#4A5568",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    {getTabIcon()}{item}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANORAMIC INTERACTIVE MAP PANEL */}
          <div style={{ width: "45%", height: "100%", borderLeft: "1px solid rgba(0,0,0,0.08)" }}>
            <MapComponent selectedDestination={selectedPlace.name} />
          </div>

        </div>
      </DashboardLayout>
    );
  }

  // STANDARD DISCOVER PLATFORM LAYOUT INDEX SCREEN
  return (
    <DashboardLayout>
      <div className="fade-up">

        {/* Top Header */}
        <div className="mb-8">
          <h1 className="section-title">Explore Hidden Nepal</h1>
          <p className="section-sub">Discover extraordinary destinations beyond the ordinary</p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--text-dim)] uppercase tracking-widest mr-1">Type</span>
            {ALL_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full text-sm border transition-all cursor-pointer
                  ${selectedType === type
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "border-[var(--border)] text-[var(--text-dim)] bg-transparent hover:border-[var(--accent)]"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Adaptive Two-Column Interactive Card Canvas */}
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
          gap: "2rem",
        }}>
          {filtered.map((place) => (
            <div 
              key={place.name} 
              onClick={() => setSelectedPlace(place)}
              className="card card-hover overflow-hidden flex flex-col" 
              style={{ padding: 0, cursor: "pointer" }}
            >
              {/* Photo Banner Component */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={place.img}
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="cinzel text-2xl font-bold text-white leading-tight">{place.name}</h2>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-white/70" />
                    <span className="text-xs text-white/70">{place.region}</span>
                  </div>
                </div>
              </div>

              {/* Discovery Context Box */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div className="inline-flex items-center gap-1.5 bg-[var(--accent)]/10 text-[var(--accent)] text-xs px-3 py-1.5 rounded-full w-fit font-medium">
                  ✨ {place.highlight}
                </div>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">{place.desc}</p>

                {/* Performance Facts Badge Grid */}
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 flex-1">
                    <Clock size={13} className="text-[var(--accent)] shrink-0" />
                    <div>
                      <p className="text-[0.6rem] text-[var(--text-dim)] uppercase tracking-wider">Best Time</p>
                      <p className="text-xs text-[var(--text)] font-medium">{place.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 flex-1">
                    <Mountain size={13} className="text-[var(--accent)] shrink-0" />
                    <div>
                      <p className="text-[0.6rem] text-[var(--text-dim)] uppercase tracking-wider">Duration</p>
                      <p className="text-xs text-[var(--text)] font-medium">{place.days}</p>
                    </div>
                  </div>
                </div>

                {/* Subtag Array Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {place.type.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-dim)]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Floating Trip Planner Panel Component */}
                <div className="mt-auto pt-4" onClick={(e) => e.stopPropagation()}>
                  {showTripPicker === place.name ? (
                    <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-white shadow-sm">
                      <p className="text-xs text-[var(--text-dim)] px-3 py-2 border-b border-[var(--border)] bg-[var(--bg)] font-medium">
                        Add to which trip?
                      </p>
                      {trips.length === 0 ? (
                        <p className="text-xs text-[var(--text-dim)] px-3 py-3">No trips yet.</p>
                      ) : (
                        trips.map((trip) => {
                          const key = `${trip.id}-${place.name}`;
                          const done = addedPlaces[key];
                          return (
                            <button
                              key={trip.id}
                              onClick={(e) => !done && handleAddToTrip(trip.id, place, e)}
                              disabled={addingTo === key || done}
                              className="w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-[var(--bg)] transition-colors border-b border-[var(--border)] last:border-0 text-[var(--text)] disabled:opacity-60 cursor-pointer bg-transparent"
                            >
                              <span>{trip.name}</span>
                              {done ? (
                                <Check size={14} className="text-green-500" />
                              ) : addingTo === key ? (
                                <span className="text-xs text-[var(--text-dim)]">Adding...</span>
                              ) : (
                                <Plus size={14} className="text-[var(--text-dim)]" />
                              )}
                            </button>
                          );
                        })
                      )}
                   <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTripPicker(null);
                        }}
                        className="w-full text-xs text-red-500 py-2 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent border-none font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTripPicker(place.name);
                      }}
                      className="w-full bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border-none cursor-pointer"
                    >
                      <Plus size={16} />
                      Add to Trip
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}