import ProductCard from "./ProductCard";

 

const NewArrivalTab = ({productData}) => {
  
      const tabOptions = [
    { tabName: "  New Arrivals  ",productData:productData },
    { tabName: "  Featured Products",productData:productData },
    { tabName: "  Best Selling",productData:productData },
  ];

  return (
    <div>
      <ProductCard tabOptions={tabOptions}  ></ProductCard>
    </div>
  )
}

export default NewArrivalTab
