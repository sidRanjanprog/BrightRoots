const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Create Parent Account",
      description:
        "Register and securely access your family's wellness dashboard.",
    },
    {
      number: "2",
      title: "Add Child Profile",
      description:
        "Create profiles with age, gender and other important details.",
    },
    {
      number: "3",
      title: "Track Daily Habits",
      description:
        "Record screen time, sleep, outdoor activities and wellness data.",
    },
    {
      number: "4",
      title: "Receive Insights",
      description:
        "Get recommendations, reports and guidance tailored to your family.",
    },
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>

        <p className="text-center text-gray-600 mb-12">
          Start improving family wellness in four simple steps.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 text-center"
            >
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.number}
              </div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>

              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
