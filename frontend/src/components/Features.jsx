const Features = () => {
  const featureGroups = [
    {
      title: "Child Wellness",
      items: [
        "Screen Time Tracking",
        "Sleep Tracking",
        "Outdoor Activities",
        "Wellness Analytics",
      ],
    },
    {
      title: "Parent Guidance",
      items: [
        "Parenting Guidance",
        "Resource Library",
        "Personalized Tips",
        "Positive Discipline",
      ],
    },
    {
      title: "Family Wellness",
      items: [
        "Family Goals",
        "Weekly Reports",
        "Habit Challenges",
        "Risk Detection",
      ],
    },
    {
      title: "Healthy Nutrition",
      items: [
        "Age-wise Nutrition Tips",
        "Healthy Meal Ideas",
        "Food Habit Guidance",
        "Better Eating Habits",
      ],
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          What AnkurPath Offers
        </h2>

        <p className="text-center text-gray-600 mb-12">
          A complete platform for parents, children and families.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {featureGroups.map((group, index) => (
            <div key={index} className="bg-green-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-700 mb-4">
                {group.title}
              </h3>

              <ul className="space-y-2">
                {group.items.map((item, i) => (
                  <li key={i}>✅ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
