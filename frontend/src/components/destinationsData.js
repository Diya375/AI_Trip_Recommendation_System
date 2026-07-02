// // src/data/destinationsData.js
// import pokharaImg from "../assets/images/Fewalake.jpg";
// import kathmanduImg from "../assets/images/Swayambhunath.jpg";
// import bhaktapurImg from "../assets/images/Bhaktapur.jpg";
// import bandipurImg from "../assets/images/Bandipur.jpg";
// import hattiImg from "../assets/images/haatti.jpg";
// import mountainImg from "../assets/images/mount.jpg";
// import kanchImg from "../assets/images/Nepali_Mountainn.jpg"

// export const places = [
//   {
//     id: "pokhara",
//     name: "Pokhara",
//     note: "Lakes & Himalayas",
//     image: pokharaImg,
//     description: "Nestled at the base of the Annapurna range, Pokhara is Nepal's ultimate adventure hub and relaxation sanctuary. Pristine lakes perfectly reflect snow-capped mountain peaks, offering unmatched paragliding, trekking trail access, and peaceful boating experiences on Phewa Lake.",
//     categories: ["Boating", "Trekking", "Paragliding", "Cafes"]
//   },
//   {
//     id: "kathmandu",
//     name: "Kathmandu",
//     note: "Temples & Heritage",
//     image: kathmanduImg,
//     description: "The historic capital of Nepal is a vibrant, living museum of ancient architecture, sacred shrines, and bustling spiritual squares. From the massive mandala of Swayambhunath to medieval royal courtyards, heritage comes alive here.",
//     categories: ["Temples", "Historic Squares", "Street Food", "Museums"]
//   },
//   {
//     id: "bhaktapur",
//     name: "Bhaktapur",
//     note: "Ancient Newari City",
//     image: bhaktapurImg,
//     description: "Step back in time inside this meticulously preserved UNESCO World Heritage town. Celebrated for its timeless brick streets, towering multi-roof wooden pagodas, exquisite pottery craft, and rich Newari cultural traditions.",
//     categories: ["Architecture", "Pottery", "Traditional Food", "Crafts"]
//   },
//   {
//     id: "bandipur",
//     name: "Bandipur",
//     note: "Quiet Hill Town",
//     image: bandipurImg,
//     description: "A living museum of traditional Newari architecture preserved along an isolated mountaintop ridge. Free from motorized vehicles, its clean main street is lined with beautifully restored 18th-century townhouses offering views of the central Himalayas.",
//     categories: ["Hill Stations", "Views", "Hiking", "Homestays"]
//   }
// ];
// src/data/destinationsData.js


import everImg from "../assets/images/prayering-flag.jpg";
import lumImg from "../assets/images/Lumbini.jpg";
import pokharaImg from "../assets/images/Fewalake.jpg";
import kathmanduImg from "../assets/images/Swayambhunath.jpg";
import bhaktapurImg from "../assets/images/Bhaktapur.jpg";
import bandipurImg from "../assets/images/Bandipur.jpg";
import hattiImg from "../assets/images/haatti.jpg";
import kanchImg from "../assets/images/Nepali_Mountainn.jpg";

export const places = [
{
  id: "everest",
  name: "Mount Everest",
  tag: "Eastern Nepal",
  note: "World's Highest Peak",
  image: everImg,
  description:
    "Standing at 8,848.86 meters above sea level, Mount Everest is the highest mountain on Earth and Nepal's most iconic natural landmark. Located in the Khumbu region within Sagarmatha National Park, a UNESCO World Heritage Site, Everest attracts adventurers, trekkers, and mountaineers from around the globe. Visitors can experience breathtaking Himalayan panoramas, explore traditional Sherpa villages, visit ancient Buddhist monasteries, and trek to the famous Everest Base Camp, making it one of the world's greatest adventure destinations.",
  categories: [
    "Trekking",
    "Mountain Views",
    "Everest Base Camp",
    "Sherpa Culture",
    "Photography"
  ]
},

{
  id: "kanchenjunga",
  name: "Kanchenjunga",
  tag: "Eastern Nepal",
  note: "World's 3rd Highest Peak",
  image: kanchImg,
  description:
    "Towering at 8,586 meters, Kanchenjunga is the third-highest mountain on Earth and one of Nepal's most awe-inspiring natural wonders. Revered as a sacred mountain by local communities, its snow-covered peaks rise dramatically above the eastern Himalayas. The Kanchenjunga Conservation Area is home to pristine forests, alpine meadows, rare wildlife such as the red panda and snow leopard, and remote villages rich in Limbu and Rai culture. Trekkers seeking an unspoiled Himalayan adventure are rewarded with breathtaking scenery, glaciers, and one of Nepal's most spectacular mountain landscapes.",
  categories: [
    "Trekking",
    "Mountain Views",
    "Wildlife",
    "Conservation",
    "Photography"
  ]
},

{
  id: "lumbini",
  name: "Lumbini",
  tag: "Southern Nepal",
  note: "Birthplace of Lord Buddha",
  image: lumImg,
  description:
    "Lumbini, a UNESCO World Heritage Site, is revered as the birthplace of Siddhartha Gautama, who later became Lord Buddha, the founder of Buddhism. This sacred destination welcomes pilgrims and travelers from around the world to explore the Maya Devi Temple, the Ashoka Pillar, the Sacred Garden, and beautifully designed monasteries built by different countries. Surrounded by peaceful gardens and meditation centers, Lumbini offers a unique blend of spirituality, history, and cultural heritage, making it one of Nepal's most significant and inspiring destinations.",
  categories: [
    "UNESCO Heritage",
    "Buddhist Monasteries",
    "Meditation",
    "Pilgrimage",
    "History"
  ]
},

  {
    id: "pokhara",
    name: "Pokhara",
    tag: "Western Nepal",
    note: "Lakes & Himalayas",
    image: pokharaImg,
    description:
      "Pokhara is Nepal's premier adventure and leisure destination, beautifully set beside the tranquil Phewa Lake with breathtaking views of the Annapurna and Machhapuchhre (Fishtail) mountains. Visitors can enjoy boating, paragliding, zip-lining, ultralight flights, and world-class trekking routes leading to the Annapurna region. The city also features vibrant Lakeside cafés, peaceful temples, fascinating caves, waterfalls, and unforgettable Himalayan sunrises.",
    categories: ["Boating", "Trekking", "Paragliding", "Cafes"]
  },

  {
    id: "kathmandu",
    name: "Kathmandu",
    tag: "Central Nepal",
    note: "Temples & Heritage",
    image: kathmanduImg,
    description:
      "Kathmandu, the capital city of Nepal, is the country's cultural and historical heart. Home to several UNESCO World Heritage Sites, it offers magnificent temples, ancient palaces, vibrant markets, traditional courtyards, and centuries-old architecture. Visitors can explore the iconic Swayambhunath (Monkey Temple), Kathmandu Durbar Square, Pashupatinath Temple, and Boudhanath Stupa while experiencing rich festivals, authentic Nepali cuisine, and a lively blend of tradition and modern city life.",
    categories: ["Temples", "Historic Squares", "Street Food", "Museums"]
  },

  {
    id: "bhaktapur",
    name: "Bhaktapur",
    tag: "Central Nepal",
    note: "Ancient Newari City",
    image: bhaktapurImg,
    description:
      "Bhaktapur is one of Nepal's best-preserved medieval cities and a UNESCO World Heritage Site renowned for its remarkable Newari architecture and rich cultural heritage. Wander through beautifully paved brick streets lined with intricately carved wooden windows, majestic pagoda temples, historic courtyards, and traditional pottery squares. Visitors can witness local artisans at work, taste the famous Juju Dhau (King Curd), and experience centuries-old traditions that continue to thrive today.",
    categories: ["Architecture", "Pottery", "Traditional Food", "Crafts"]
  },

  {
    id: "bandipur",
    name: "Bandipur",
    tag:"Central-Western Nepal",
    note: "Quiet Hill Town",
    image: bandipurImg,
    description:
      "Perched atop a scenic hill between Kathmandu and Pokhara, Bandipur is a charming heritage town celebrated for its beautifully preserved Newari architecture and peaceful atmosphere. The vehicle-free main bazaar offers traditional houses, cozy cafés, boutique homestays, and panoramic views of the Annapurna, Dhaulagiri, Langtang, and Manaslu mountain ranges. Visitors can enjoy sunrise viewpoints, hiking trails, Siddha Cave exploration, and an authentic glimpse into Nepal's traditional hill-town lifestyle.",
    categories: ["Hill Stations", "Views", "Hiking", "Homestays"]
  },
  {
  id: "chitwan",
  name: "Chitwan National Park",
  tag: "Southern Nepal",
  note: "Wildlife & Jungle Safari",
  image: hattiImg,
  description:
    "Chitwan National Park, Nepal's first national park and a UNESCO World Heritage Site, is renowned for its rich biodiversity and unforgettable jungle experiences. Visitors can embark on jeep safaris, canoe rides, guided jungle walks, and birdwatching tours while spotting rare wildlife such as the one-horned rhinoceros, Bengal tiger, Asian elephant, gharial crocodile, and over 600 species of birds. The park also offers an opportunity to experience the vibrant culture and hospitality of the indigenous Tharu community.",
  categories: [
    "Jungle Safari",
    "Wildlife",
    "Bird Watching",
    "Canoeing",
    "Tharu Culture"
  ]
}


];