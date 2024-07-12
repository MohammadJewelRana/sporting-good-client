import delivery from "../../assets/icons/feature/delivery.jpg";
import returnImg from "../../assets/icons/feature/return.jpg";
import trade from "../../assets/icons/feature/trade.png";
import reward from "../../assets/icons/feature/reward.jpg";
import finance from "../../assets/icons/feature/finance.png";

const Feature = () => {
  const featureData = [
    {
      icon: delivery,
      heading: "Free Delivery",
      text: "We'll even bring it into your home for free*.",
    },
    {
      icon: finance,
      heading: "Special Financing",
      text: "Up to 24 Months. Apply for an Appliances Connection.",
    },
    {
      icon: returnImg,
      heading: "30 Day Returns",
      text: "Return your items for free* within 30 Days of purchase.",
    },
    {
      icon: reward,
      heading: "Rewards Program",
      text: "Join our loyalty program and earn money by shopping with us.",
    },
    {
      icon: trade,
      heading: "Trade Program",
      text: "We offer exclusive pricing and resources to registered.",
    },
 
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  ">
      {featureData?.map((item) => (
        <>
          <div className="flex items-center justify-center gap-8  p-8 border">
            <div>
              <img src={item.icon} className="h-12 w-12 rounded-full " alt="" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold ">     {item.heading}</h1>
              <p className="text-gray-500 max-w-40">
             {item.text}
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Feature;
