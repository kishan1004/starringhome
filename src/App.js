import "./App.css";
import HeroSection from "./components/HeroSection";
import NewArrivalsSection from "./components/NewArrivalsSection";
import TrendingSection from "./components/TrendingSection";
import BannerSection from "./components/BannerSection";
import FeatureSection from "./components/FeatureSection";
import FooterSection from "./components/FooterSection";

function App() {
  return (
    <div className="App bg-[#FAFAFA]">
      <HeroSection />
      <NewArrivalsSection />
      <TrendingSection />
      <BannerSection />
      <FeatureSection />
      <FooterSection />
    </div>
  );
}

export default App;
