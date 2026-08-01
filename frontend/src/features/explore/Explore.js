// src/pages/Explore.js
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import MapComponent from "../../components/destinations/MapComponent";
import { MapPin, Clock, Mountain, Plus, Check, ArrowLeft } from "lucide-react";

import raraImg     from "../../assets/explore/rara.png";
import ilamImg     from "../../assets/explore/ilam.png";
import bandipurImg from "../../assets/explore/bandipur.png";
import khaptadImg  from "../../assets/explore/khaptad.png";
import mustangImg  from "../../assets/explore/uppermustang.png";
import panchImg    from "../../assets/explore/panchpokhari.png";
import pokharaImg  from "../../assets/explore/pokhara.png";
import chitwanImg  from "../../assets/explore/chitwan.png";
import langtangImg from "../../assets/explore/langtang.png";

import everImg      from "../../assets/images/prayering-flag.jpg";
import lumImg       from "../../assets/images/Lumbini.jpg";
import kathmanduImg from "../../assets/images/Swayambhunath.jpg";
import bhaktapurImg from "../../assets/images/Bhaktapur.jpg";
import kanchImg     from "../../assets/images/Nepali_Mountainn.jpg";

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
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeTab, setActiveTab] = useState("todo");

  useEffect(() => {
    API.get("/trips/my").then((res) => setTrips(res.data)).catch(() => {});
  }, []);

  const filtered = places.filter((p) => selectedType === "All" || p.type.includes(selectedType));

  const handleAddToTrip = async (tripId, place, e) => {
    if (e) e.stopPropagation();
    setAddingTo(`${tripId}-${place.name}`);
    try {
      await API.post(`/trips/${tripId}/places`, {
        name: place.name,
        address: `${place.region}, Nepal`,
        lat: null,
        lng: null,
        place_id: null,
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

  const detailTabClasses = (tab) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
      activeTab === tab ? "bg-[#FFEBE7] text-[#FF5A5F]" : "text-slate-600 hover:bg-slate-100"
    }`;

  if (selectedPlace) {
    const activeCategories = selectedPlace[activeTab] || [];
    return (
      <DashboardLayout>
        <div className="fade-up flex h-[calc(100vh-120px)] w-full overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <div className="w-full lg:w-[55%] h-full overflow-y-auto flex flex-col bg-white">
            <div
              className="relative min-h-[45vh] flex flex-col justify-end bg-cover bg-center px-10 py-10"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url(${selectedPlace.img})`,
              }}
            >
              <button
                onClick={() => {
                  setSelectedPlace(null);
                  setActiveTab("todo");
                }}
                className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition-transform duration-200 hover:scale-105"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="mb-2 text-xs uppercase tracking-[0.15em] text-[#FFEBE7]">
                📍 {selectedPlace.region}
              </div>
              <h1 className="cinzel text-4xl font-bold text-white sm:text-5xl">
                {selectedPlace.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base italic leading-7 text-white/90">
                "{selectedPlace.desc}"
              </p>
            </div>

            <div className="px-10 py-8">
              <h3 className="cinzel mb-3 text-2xl font-bold text-slate-900">Historical & Regional Overview</h3>
              <p className="text-sm leading-7 text-slate-600 text-justify">{selectedPlace.history}</p>
            </div>

            <div className="px-10 pb-8 pt-4">
              <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-5">
                {['todo', 'eat', 'stay'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={detailTabClasses(tab)}>
                    {tab === 'todo' && '📍 What to do'}
                    {tab === 'eat' && '🍴 What to eat'}
                    {tab === 'stay' && '🛏️ Where to stay'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 px-10 pb-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {activeCategories.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-800">
                    {getTabIcon()}
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[45%] h-full border-l border-slate-200">
            <MapComponent selectedDestination={selectedPlace.name} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="fade-up">
        <div className="mb-8">
          <h1 className="section-title">Explore Hidden Nepal</h1>
          <p className="section-sub">Discover extraordinary destinations beyond the ordinary</p>
        </div>

        <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-dim)]">Type</span>
            {ALL_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition-all ${
                  selectedType === type
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--border)] bg-transparent text-[var(--text-dim)] hover:border-[var(--accent)]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((place) => (
            <div
              key={place.name}
              onClick={() => setSelectedPlace(place)}
              className="card card-hover flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={place.img}
                  alt={place.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="cinzel text-2xl font-bold text-white leading-tight">{place.name}</h2>
                  <div className="mt-1 flex items-center gap-1 text-xs text-white/70">
                    <MapPin size={12} />
                    <span>{place.region}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 px-3 py-1.5 text-xs font-medium text-[var(--accent)]">
                  ✨ {place.highlight}
                </div>
                <p className="text-sm leading-relaxed text-[var(--text-dim)]">{place.desc}</p>

                <div className="flex gap-3">
                  <div className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs">
                    <Clock size={13} className="text-[var(--accent)]" />
                    <div>
                      <p className="uppercase tracking-widest text-[var(--text-dim)]">Best Time</p>
                      <p className="font-medium text-[var(--text)]">{place.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs">
                    <Mountain size={13} className="text-[var(--accent)]" />
                    <div>
                      <p className="uppercase tracking-widest text-[var(--text-dim)]">Duration</p>
                      <p className="font-medium text-[var(--text)]">{place.days}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {place.type.map((t) => (
                    <span key={t} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--text-dim)]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4" onClick={(e) => e.stopPropagation()}>
                  {showTripPicker === place.name ? (
                    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
                      <p className="border-b border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs font-medium text-[var(--text-dim)]">
                        Add to which trip?
                      </p>
                      {trips.length === 0 ? (
                        <p className="px-3 py-3 text-xs text-[var(--text-dim)]">No trips yet.</p>
                      ) : (
                        trips.map((trip) => {
                          const key = `${trip.id}-${place.name}`;
                          const done = addedPlaces[key];
                          return (
                            <button
                              key={trip.id}
                              onClick={(e) => !done && handleAddToTrip(trip.id, place, e)}
                              disabled={addingTo === key || done}
                              className="flex w-full items-center justify-between border-b border-[var(--border)] px-4 py-2.5 text-left text-sm text-[var(--text)] transition-colors hover:bg-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <span>{trip.name}</span>
                              {done ? (
                                <Check size={14} className="text-emerald-500" />
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
                        className="w-full border-t border-[var(--border)] bg-transparent px-4 py-2 text-xs font-medium text-red-500 transition hover:bg-slate-50"
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
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-2)]"
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