import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-r from-teal-600 to-indigo-300 text-white">

      <h1 className="text-5xl font-bold mb-6">
        Plan Smarter Trips with AI
      </h1>

      <p className="text-xl max-w-2xl mb-8">
        Get personalized travel recommendations, collaborate with friends,
        and discover destinations that match your budget and interests.
      </p>

      <Link to="/signup">
       <button className="bg-sky-500/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl">
 Get Started
</button>
      </Link>
    </section>
  );
}