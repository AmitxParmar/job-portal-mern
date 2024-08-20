import LogoGrid from "@/components/Landing/LogoGrid";
import UsefulFor from "@/components/Landing/Role";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <section>
        <LogoGrid />
      </section>
      <section>
        <UsefulFor />
      </section>
    </div>
  );
};

export default Home;
