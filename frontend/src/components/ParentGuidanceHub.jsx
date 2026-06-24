const ParentGuidanceHub = () => {
  const guides = [
    {
      title: "Healthy Nutrition",
      description:
        "Discover age-appropriate nutrition habits, balanced meals, healthy snacks, and hydration tips that support growth and development.",
      icon: "🥗",
    },
    {
      title: "Digital Wellness",
      description:
        "Learn how to build healthy screen habits, encourage educational technology use, and create meaningful screen-free family time.",
      icon: "📱",
    },
    {
      title: "Sleep & Daily Routine",
      description:
        "Understand the importance of sleep, consistent routines, and daily habits that contribute to healthy development.",
      icon: "😴",
    },
    {
      title: "Active Lifestyle",
      description:
        "Encourage outdoor play, physical activity, and movement-based learning to support overall wellbeing.",
      icon: "⚽",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Parent Guidance Hub
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Practical guidance designed to help parents build healthier
            routines, stronger relationships, and positive habits for their
            children.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">{guide.icon}</div>

              <h3 className="text-xl font-bold mb-3">{guide.title}</h3>

              <p className="text-gray-600">{guide.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParentGuidanceHub;
