const ResourcesCenter = () => {
  const resources = [
    {
      title: "Healthy Nutrition",
      description:
        "Learn about balanced meals, healthy snacks, hydration, and age-appropriate nutrition habits.",
      icon: "🥗",
    },
    {
      title: "Digital Wellness",
      description:
        "Build healthier screen habits and encourage meaningful technology use.",
      icon: "📱",
    },
    {
      title: "Sleep Health",
      description:
        "Understand the role of sleep in growth, learning, and emotional wellbeing.",
      icon: "😴",
    },
    {
      title: "Active Lifestyle",
      description:
        "Discover ways to encourage outdoor play, movement, and physical activity.",
      icon: "⚽",
    },
    {
      title: "Internet Safety",
      description:
        "Help children navigate the online world safely and responsibly.",
      icon: "🛡️",
    },
    {
      title: "Positive Parenting",
      description:
        "Strengthen communication, routines, and positive family relationships.",
      icon: "❤️",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Resources & Learning Center
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explore practical resources designed to help parents support healthy
            development, digital wellbeing, and positive daily habits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div
              key={resource.title}
              className="bg-slate-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition flex flex-col min-h-[320px]"
            >
              <div className="text-5xl mb-4">{resource.icon}</div>

              <h3 className="text-xl font-bold mb-3">{resource.title}</h3>

              <p className="text-gray-600 flex-grow">{resource.description}</p>

              <button className="mt-4 text-blue-600 font-medium hover:underline cursor-pointer">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesCenter;
