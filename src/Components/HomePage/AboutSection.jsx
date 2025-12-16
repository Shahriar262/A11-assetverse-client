import { FaChartLine, FaUsers, FaShieldAlt, FaClock } from "react-icons/fa";

const AboutSection = () => {
  const benefits = [
    { icon: <FaChartLine />, text: "Centralized asset tracking" },
    { icon: <FaUsers />, text: "Efficient employee management" },
    { icon: <FaShieldAlt />, text: "Secure role-based access" },
    { icon: <FaClock />, text: "Time-saving approval workflow" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why Choose AssetVerse?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="p-6 border rounded-lg text-center">
              <div className="text-indigo-600 text-3xl mb-3">{b.icon}</div>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
