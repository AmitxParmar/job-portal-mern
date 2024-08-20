import Marquee from "react-fast-marquee";
import Icon from "./Icon";
import GoogleIcon from "@/assets/Icons/GoogleIcon.png";
import MetaIcon from "@/assets/Icons/MetaIcon.png";
import MicrosoftIcon from "@/assets/Icons/MicrosoftIcon.png";
import AmazonIcon from "@/assets/Icons/AmazonIcon.png";
import NetflixIcon from "@/assets/Icons/NetflixIcon.png";
import AppleIcon from "@/assets/Icons/AppleIcon.png";
import TeslaIcon from "@/assets/Icons/TeslaIcon.png";
import IonIcon from "@/assets/Icons/IonIcon.png";
import CoinIcon from "@/assets/Icons/CoinIcon.png";

const MarqueeIcons = () => {
  const rowOne = [
    GoogleIcon,
    MetaIcon,
    MicrosoftIcon,
    GoogleIcon,
    MetaIcon,
    MicrosoftIcon,
  ];

  const rowTwo = [
    AmazonIcon,
    NetflixIcon,
    AppleIcon,
    AmazonIcon,
    NetflixIcon,
    AppleIcon,
  ];

  const rowThree = [TeslaIcon, IonIcon, CoinIcon, TeslaIcon, IonIcon, CoinIcon];

  return (
    <>
      <Marquee>
        <div className="!my-auto grid grid-cols-6 last:mr-8 lg:mb-4 gap-x-7 md:gap-[50px] md:last:mr-[39px]">
          {rowOne.map((item, index) => (
            <Icon key={index} src={item} />
          ))}
        </div>
      </Marquee>
      <Marquee direction="right">
        <div className="!my-auto grid grid-cols-6 last:mr-8 lg:mb-4 gap-x-7 md:gap-[50px] md:last:mr-[39px]">
          {rowTwo.map((item, index) => (
            <Icon key={index} src={item} />
          ))}
        </div>
      </Marquee>
      <Marquee>
        <div className="!my-auto grid grid-cols-6 last:mr-8 lg:mb-4 gap-x-7 md:gap-[50px] md:last:mr-[39px]">
          {rowThree.map((item, index) => (
            <Icon key={index} src={item} />
          ))}
        </div>
      </Marquee>
    </>
  );
};

export default MarqueeIcons;
