const Philosophy = () => {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Philosophy</h2>

        <p className="text-2xl font-semibold text-green-700 mb-8">
          Healthy habits grow through connection, not control.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-red-500 mb-4">
              ❌ What We Don't Believe
            </h3>

            <ul className="space-y-3 text-left">
              <li>Control over communication</li>
              <li>Fear over understanding</li>
              <li>Punishment over guidance</li>
              <li>Surveillance over trust</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              ✅ What We Believe
            </h3>

            <ul className="space-y-3 text-left">
              <li>Guidance over control</li>
              <li>Communication over fear</li>
              <li>Healthy boundaries with love</li>
              <li>Awareness over surveillance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
