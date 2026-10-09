export const instant = false;
import HeroSectionPage from "@/component/HeroSection";
import HomePages from "./home/page";


const HomePage =()=> {
  return (
    <div>
      <HeroSectionPage/>
      <HomePages/>
    </div>
  );
}

export default HomePage;