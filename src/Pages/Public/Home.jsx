import AboutSection from "../../Components/HomePage/AboutSection";
import ContactCTA from "../../Components/HomePage/ContactCTA";
import FeaturesShowcase from "../../Components/HomePage/FeaturesShowcase";
import HeroBanner from "../../Components/HomePage/HeroBanner";
import HowItWorks from "../../Components/HomePage/HowItWorks";
import PackagesSection from "../../Components/HomePage/PackagesSection";
import TestimonialsStats from "../../Components/HomePage/TestimonialsStats";


const Home = () => {
  // Predefined packages (acts like DB data)
  const packagesFromDB = [
    {
      name: "Basic",
      employeeLimit: 5,
      price: 5,
      features: ["Asset Tracking", "Employee Management", "Basic Support"],
    },
    {
      name: "Standard",
      employeeLimit: 10,
      price: 8,
      features: [
        "All Basic features",
        "Advanced Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Premium",
      employeeLimit: 20,
      price: 15,
      features: [
        "All Standard features",
        "Custom Branding",
        "24/7 Support",
      ],
    },
  ];

  return (
    <main className="overflow-x-hidden">
      <HeroBanner />
      <AboutSection />
      <PackagesSection packages={packagesFromDB} />
      {/* 

      
      <FeaturesShowcase />
      <TestimonialsStats />
      <HowItWorks />
      <ContactCTA /> */}
    </main>
  );
};

export default Home;
