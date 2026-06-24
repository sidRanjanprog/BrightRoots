import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyAnkurPath from "../components/WhyAnkurPath";
import Philosophy from "../components/Philosophy";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import DashboardPreview from "../components/landing/DashboardPreview";
import ParentGuidanceHub from "../components/ParentGuidanceHub";
import ResourcesCenter from "../components/ResourcesCenter";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyAnkurPath />
      <Philosophy />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <ParentGuidanceHub />
      <ResourcesCenter />
      <Footer />
    </>
  );
};

export default LandingPage;
