const WhyAnkurPath = () => {
  const problems = [
    {
      title: "Excessive Screen Exposure",
      icon: "📱",
      description: "Affecting focus, sleep and emotional wellbeing.",
    },
    {
      title: "Poor Sleep Habits",
      icon: "😴",
      description: "Impacting growth, mood and daily energy.",
    },
    {
      title: "Reduced Outdoor Play",
      icon: "⚽",
      description: "Leading to less physical activity and exploration.",
    },
    {
      title: "Parent-Child Communication Gaps",
      icon: "💬",
      description: "Creating misunderstandings and emotional distance.",
    },
    {
      title: "Information Overload",
      icon: "🧠",
      description: "Parents often struggle to find trustworthy guidance.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Why AnkurPath Exists
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Modern families face challenges that previous generations never
          experienced. AnkurPath helps parents understand, guide and support
          healthier habits through awareness and education.
        </p>

        <div className="grid md:grid-cols-5 gap-6">
          {problems.map((problem, index) => (
            <div key={index} className="bg-green-50 rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-4">{problem.icon}</div>

              <h3 className="font-bold mb-2">{problem.title}</h3>

              <p className="text-gray-600 text-sm">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAnkurPath;
