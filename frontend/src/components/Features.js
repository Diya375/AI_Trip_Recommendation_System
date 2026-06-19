export default function Features() {
  const features = [
    "AI Travel Recommendations",
    "Budget-Based Planning",
    "Collaborative Trip Creation",
    "Destination Insights",
  ];

  return (
    <section className="py-20 px-10">
      <h2 className="text-4xl font-bold text-center mb-10">
        Features
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="shadow p-6 rounded-lg text-center"
          >
            <h3 className="font-semibold">{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}