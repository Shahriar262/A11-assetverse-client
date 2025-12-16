import { motion } from "framer-motion";

const FeaturesShowcase = () => {
  const features = [
    "Asset Requests & Approvals",
    "Returnable & Non-returnable Assets",
    "Employee Asset History",
    "Company-wise Asset Tracking",
    "PDF Export & Printing",
    "Stripe Payments",
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: f * 0.2 }}
              className="border p-6 rounded-lg cursor-pointer  hover:-translate-y-2"
            >
              {f}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
