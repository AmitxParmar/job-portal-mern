import Achievements from "@/components/Landing/Achievements";
import LogoGrid from "@/components/Landing/LogoGrid";
import UsefulFor from "@/components/Landing/Role";
import ShowcaseSection from "@/components/Landing/ShowcaseSection";

const Home = () => {
  return (
    <div className="">
      <section>
        <LogoGrid />
      </section>
      <section>
        <UsefulFor />
      </section>
      <section>
        <ShowcaseSection />
      </section>
      <section>
        <Achievements />
      </section>
    </div>
  );
};

export default Home;
