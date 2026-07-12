 import everImg from "../assets/images/prayering-flag.jpg";
import lumImg from "../assets/images/Lumbini.jpg";
import pokharaImg from "../assets/images/Fewalake.jpg";
import kathmanduImg from "../assets/images/Swayambhunath.jpg";
import bhaktapurImg from "../assets/images/Bhaktapur.jpg";
import bandipurImg from "../assets/images/Bandipur.jpg";
import hattiImg from "../assets/images/haatti.jpg";
import kanchImg from "../assets/images/Nepali_Mountainn.jpg";

import raraImg from "../assets/explore/rara.png";
import ilamImg from "../assets/explore/ilam.png";
import khaptadImg from "../assets/explore/khaptad.png";
import mustangImg from "../assets/explore/uppermustang.png";
import panchImg from "../assets/explore/panchpokhari.png";
import langtangImg from "../assets/explore/langtang.png";

export const places = [
  {
    id: "everest",
    name: "Mount Everest",
    tag: "Eastern Nepal",
    note: "World's Highest Peak",
    image: everImg,
    description: "Standing at 8,848.86 meters above sea level, Mount Everest is the highest mountain on Earth and Nepal's most iconic natural landmark. Located in the Khumbu region within Sagarmatha National Park, a UNESCO World Heritage Site, Everest attracts adventurers, trekkers, and mountaineers from around the globe. Visitors can experience breathtaking Himalayan panoramas, explore traditional Sherpa villages, visit ancient Buddhist monasteries, and trek to the famous Everest Base Camp, making it one of the world's greatest adventure destinations.",
    todo: ["Trekking", "Mountain Views", "Everest Base Camp", "Sherpa Culture", "Photography", "Himalayan Sunrise Views"],
    eat: ["Sherpa Stew (Syakpa)", "Tsampa Porridge", "High-Altitude Tea Houses", "Yak Cheese Patisseries"],
    stay: ["Namche Bazaar Lodges", "Luxury Everest Resorts", "Base Camp Tea Houses", "Local Sherpa Homestays"]
  },
  {
    id: "kanchenjunga",
    name: "Kanchenjunga",
    tag: "Eastern Nepal",
    note: "World's 3rd Highest Peak",
    image: kanchImg,
    description: "Towering at 8,586 meters, Kanchenjunga is the third-highest mountain on Earth and one of Nepal's most awe-inspiring natural wonders. Revered as a sacred mountain by local communities, its snow-covered peaks rise dramatically above the eastern Himalayas. The Kanchenjunga Conservation Area is home to pristine forests, alpine meadows, rare wildlife such as the red panda and snow leopard, and remote villages rich in Limbu and Rai culture.",
    todo: ["Trekking", "Mountain Views", "Wildlife Spotting", "Conservation Tours", "Photography", "Rai & Limbu Cultural Experiences"],
    eat: ["Limbu Traditional Dishes", "Tongba (Millet Beer)", "Rai Local Delicacies", "Alpine Wild Berry Jams"],
    stay: ["Remote Wilderness Camps", "Community Tea Houses", "Taplejung Guest Houses", "Eco-Lodges"]
  },
  {
    id: "lumbini",
    name: "Lumbini",
    tag: "Southern Nepal",
    note: "Birthplace of Lord Buddha",
    image: lumImg,
    description: "Lumbini, a UNESCO World Heritage Site, is revered as the birthplace of Siddhartha Gautama, who later became Lord Buddha, the founder of Buddhism. This sacred destination welcomes pilgrims and travelers from around the world to explore the Maya Devi Temple, the Ashoka Pillar, the Sacred Garden, and beautifully designed monasteries built by different countries. Surrounded by peaceful gardens and meditation centers, Lumbini offers a unique blend of spirituality, history, and cultural heritage, making it one of Nepal's most significant and inspiring destinations.",
    todo: ["UNESCO Heritage Sites", "Buddhist Monasteries", "Meditation Sessions", "Pilgrimage Walks", "History Museum Tours"],
    eat: ["Monastery Cafeterias", "Local Nepalese Thali", "Mithila Regional Food", "Vegan & Vegetarian Cafés"],
    stay: ["Buddhist Meditation Resorts", "Monastery Guest Houses", "Lumbini Peace Hotels", "Sacred Garden Eco-lodges"]
  },
  {
    id: "pokhara",
    name: "Pokhara",
    tag: "Western Nepal",
    note: "Lakes & Himalayas",
    image: pokharaImg,
    description: "Pokhara is Nepal's premiere adventure and leisure destination, beautifully set beside the tranquil Phewa Lake with breathtaking views of the Annapurna and Machhapuchhre (Fishtail) mountains. Visitors can enjoy boating, paragliding, zip-lining, ultralight flights, and world-class trekking routes leading to the Annapurna region. The city also features vibrant Lakeside cafés, peaceful temples, fascinating caves, waterfalls, and unforgettable Himalayan sunrises.",
    todo: ["Boating on Phewa Lake", "Paragliding", "Zip-lining", "Ultralight Flights", "Annapurna Trekking"],
    eat: ["Lakeside Cafés", "Fresh Lake Fish Dinners", "Continental Brunches", "Organic Juice Bars"],
    stay: ["Lakeside Luxury Resorts", "Backpacker Hostels", "Mountain View Hotels", "Peace Pagoda Retreats"]
  },
  {
    id: "kathmandu",
    name: "Kathmandu",
    tag: "Central Nepal",
    note: "Temples & Heritage",
    image: kathmanduImg,
    description: "Kathmandu, the capital city of Nepal, is the country's cultural and historical heart. Home to several UNESCO World Heritage Sites, it offers magnificent temples, ancient palaces, vibrant markets, traditional courtyards, and centuries-old architecture. Visitors can explore the iconic Swayambhunath (Monkey Temple), Kathmandu Durbar Square, Pashupatinath Temple, and Boudhanath Stupa while experiencing rich festivals, authentic Nepali cuisine, and a lively blend of tradition and modern city life.",
    todo: ["Swayambhunath Monkey Temple", "Historic Durbar Squares", "Pashupatinath Sightseeing", "Boudhanath Stupa Walks"],
    eat: ["Newari Street Food", "Thamel Rooftop Cafés", "Authentic Momo Spots", "Traditional Dal Bhat Places"],
    stay: ["Boutique Heritage Hotels", "Thamel Tourist Lodges", "Boudha Monastic Stays", "Luxury City Hotels"]
  },
  {
    id: "bhaktapur",
    name: "Bhaktapur",
    tag: "Central Nepal",
    note: "Ancient Newari City",
    image: bhaktapurImg,
    description: "Bhaktapur is one of Nepal's best-preserved medieval cities and a UNESCO World Heritage Site renowned for its remarkable Newari architecture and rich cultural heritage. Wander through beautifully paved brick streets lined with intricately carved wooden windows, majestic pagoda temples, historic courtyards, and traditional pottery squares. Visitors can witness local artisans at work, taste the famous Juju Dhau (King Curd), and experience centuries-old traditions that continue to thrive today.",
    todo: ["Architecture Photography", "Pottery Making", "Traditional Art Shopping", "Ancient Square Walks"],
    eat: ["Juju Dhau (King Curd)", "Bara & Chatamari Snacks", "Authentic Newari Feasts", "Traditional Tea Houses"],
    stay: ["Restored Brick Guest Houses", "Boutique Heritage Stays", "Local Traditional Homestays", "Quiet Courtyard Inns"]
  },
  {
    id: "bandipur",
    name: "Bandipur",
    tag: "Central-Western Nepal",
    note: "Quiet Hill Town",
    image: bandipurImg,
    description: "The historic hilltop town in the Tanahun District was developed into a prosperous trading hub in the 18th century by Newari merchants who migrated from Bhaktapur. Today, Bandipur is a living museum of traditional Newari architecture preserved along an isolated mountaintop ridge. Free from motorized vehicles, its clean main street is lined with beautifully restored 18th-century townhouses offering views of the central Himalayas. The vehicle-free main bazaar offers traditional houses, cozy cafés, boutique homestays, and panoramic views of the Annapurna, Dhaulagiri, Langtang, and Manaslu mountain ranges.",
    todo: ["Hill Station Exploration", "Himalayan Sunrise Views", "Siddha Cave Hiking", "Silk Farm Tours"],
    eat: ["Newari Bazaar Cafés", "Hilltop View Restaurants", "Local Organic Coffee Shops", "Traditional Snacks"],
    stay: ["Boutique Heritage Inns", "Traditional Townhouse Stays", "Scenic View Resorts", "Cozy Village Homestays"]
  },
  {
    id: "chitwan",
    name: "Chitwan National Park",
    tag: "Southern Nepal",
    note: "Wildlife & Jungle Safari",
    image: hattiImg,
    description: "Chitwan National Park, Nepal's first national park and a UNESCO World Heritage Site, is renowned for its rich biodiversity and unforgettable jungle experiences. Visitors can embark on jeep safaris, canoe rides, guided jungle walks, and birdwatching tours while spotting rare wildlife such as the one-horned rhinoceros, Bengal tiger, Asian elephant, gharial crocodile, and over 600 species of birds.",
    todo: ["Jeep Jungle Safari", "One-Horned Rhino Spotting", "Bird Watching Tours", "Rapti River Canoeing", "Tharu Cultural Dances"],
    eat: ["Tharu Traditional Cuisine", "Riverside Sunset Cafés", "Jungle Lodge Buffets", "Sauraha Village Street Food"],
    stay: ["Luxury Jungle Resorts", "Sauraha Riverside Lodges", "Eco-friendly Nature Camps", "Tharu Community Homestays"]
  },
  {
    id: "rara",
    name: "Rara Lake",
    tag: "Karnali Region",
    note: "Nepal's Hidden Blue Jewel",
    image: raraImg,
    description: "Nepal's hidden blue jewel — the largest lake, untouched and serene. Surrounded by Rara National Park, it features pine, spruce, and juniper forests with stunning alpine landscapes.",
    todo: ["Boating on Rara Lake", "Photography", "Jungle Walking", "Bird Watching", "Horse Riding around Lake"],
    eat: ["Local Organic Trout Fish", "Thakali Khana Sets", "Himalayan Herbal Teas", "Campfire Barbecues"],
    stay: ["Lakeside Tented Camps", "National Park Eco-Lodges", "Community Guest Houses", "Homestays in Murma Village"]
  },
  {
    id: "ilam",
    name: "Ilam",
    tag: "Eastern Nepal",
    note: "Nepal's Tea Capital",
    image: ilamImg,
    description: "Rolling tea gardens, misty mountains, and the peaceful charm of eastern Nepal. Famed for its agricultural innovations, unique landscape aesthetics, and pleasant climate settings.",
    todo: ["Tea Garden Walks", "Mai Pokhari Lake Excursions", "Antu Danda Sunrise Views", "Pathibhara Temple Visits"],
    eat: ["Local Cardamom Treats", "Ilam Tea Tastings", "Authentic Lollipop Sweets", "Chhurpi (Hard Cheese) Specialties"],
    stay: ["Tea Estate Heritage Resorts", "Fikkal Town Lodges", "Antu Danda Sunrise Homestays", "Agro Eco-farms"]
  },
  {
    id: "khaptad",
    name: "Khaptad National Park",
    tag: "Far-Western Nepal",
    note: "Sacred Highland Plateau",
    image: khaptadImg,
    description: "Mystical highland meadows, spiritual ashrams, and untouched wilderness. Home to the legendary Khaptad Baba Ashram, it is an pristine spiritual sanctuary stretching across rolling green paths.",
    todo: ["Khaptad Baba Ashram Pilgrimage", "Meadow Trekking", "Bird Watching Trails", "Meditation & Retreat Walks"],
    eat: ["Traditional Far-Western Cuisine", "Organic Millet Roti", "Medicinal Herbal Soups", "High-Altitude Wilderness Packings"],
    stay: ["National Park Camping Sites", "Pilgrim Guest Houses", "Shed Eco-Lodges", "Community Homestays"]
  },
  {
    id: "mustang",
    name: "Upper Mustang",
    tag: "Gandaki Region",
    note: "The Forbidden Kingdom",
    image: mustangImg,
    description: "The forbidden kingdom — ancient caves, Tibetan culture, and surreal arid landscapes. Explore Lo Manthang's medieval walled settlements and cliffside cave wonders.",
    todo: ["Lo Manthang Walled City Excursions", "Sky Cave Exploration", "Tiji Festival Sightseeing", "Horse Riding Safaris"],
    eat: ["Tibetan Khapse Biscuits", "Marpha Apricot Brandies", "Butter Tea (Su Chya)", "Himalayan Buckwheat Pancakes"],
    stay: ["Lo Manthang Traditional Inns", "Marpha Apple Orchards", "Jomsom Mountain Resorts", "Local Tibetan Tea Houses"]
  },
  {
    id: "panchpokhari",
    name: "Panch Pokhari",
    tag: "Sindhupalchok",
    note: "Five Sacred Alpine Lakes",
    image: panchImg,
    description: "Five sacred alpine lakes sitting above the clouds, rarely visited and breathtaking. An important religious pilgrimage site for Hindus and Buddhists alike during Janai Purnima.",
    todo: ["Five Sacred Lakes Circuit Trail", "Himalayan Pass Photography", "Pilgrimage Spiritual Shrining", "High-Altitude Base Camping"],
    eat: ["Sherpa Stew Snacks", "Energy Trail Mixes", "High-Altitude Mountain Porridges", "Local Sherpa Teas"],
    stay: ["Remote Wilderness Tents", "Basic High-Altitude Tea Houses", "Bhotang Village Homestays", "Community Shelters"]
  },
  {
    id: "langtang",
    name: "Langtang Valley",
    tag: "Bagmati Region",
    note: "The Valley of Glaciers",
    image: langtangImg,
    description: "The valley of glaciers — high alpine meadows, yak pastures, and traditional Tamang culture. Enjoy panoramic views of Langtang Lirung and nearby spectacular mountain valleys.",
    todo: ["Kyanjin Gompa Trekking", "Kyanjin Ri Peak Climbing", "Langtang Glacier Views", "Yak Cheese Factory Tours"],
    eat: ["Fresh Local Yak Cheese", "Tamang Butter Tea", "Tibetan Bread with Honey", "Warm Himalayan Thukpa"],
    stay: ["Kyanjin Gompa Tea Houses", "Lama Hotel Lodges", "Syabrubesi Riverside Hotels", "Tamang Community Heritage Stays"]
  }
];