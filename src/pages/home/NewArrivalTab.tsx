import ProductCard from "./ProductCard";

 

const NewArrivalTab = () => {
      const tabOptions = [
    { tabName: "  New Arrivals  " },
    { tabName: "  Featured Products" },
    { tabName: "  Best Selling" },
  ];

  return (
    <div>
      <ProductCard tabOptions={tabOptions}></ProductCard>
    </div>
  )
}

export default NewArrivalTab
