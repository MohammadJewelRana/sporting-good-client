import ProductCard from "./ProductCard";

 

const NewArrivalTab = ({productData,refetch}) => {
  
      const tabOptions = [
    { tabName: "  New Arrivals  ",productData:productData,refetch:refetch },
    { tabName: "  Featured Products",productData:productData,refetch:refetch },
    { tabName: "  Best Selling",productData:productData,refetch:refetch },
  ];

  return (
    <div>
      <ProductCard tabOptions={tabOptions} refetch={refetch} ></ProductCard>
    </div>
  )
}

export default NewArrivalTab
