import LogoGrid from "@/components/Landing/LogoGrid";
import UsefulFor from "@/components/Landing/Role";
import ShowcaseSection from "@/components/Landing/ShowcaseSection";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <section>
        <LogoGrid />
      </section>
      <section>
        <UsefulFor />
      </section>
      <section>
        <ShowcaseSection />
      </section>
    </div>
  );
};

export default Home;
