export default function DestinationCards() {
  const places = [
    "Pokhara",
    "Bali",
    "Tokyo",
    "Paris",
  ];

  return (
    <section className="py-20 px-10">
      <h2 className="text-4xl font-bold text-center mb-10">
        Popular Destinations
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {places.map((place) => (
          <div
            key={place}
            className="rounded-lg shadow p-6 text-center"
          >
            <h3 className="font-semibold text-xl">
              {place}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}