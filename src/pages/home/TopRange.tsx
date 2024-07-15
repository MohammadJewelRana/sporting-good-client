import ProductCard from "./ProductCard";

const TopRange = ({productData}) => {
  const tabOptions = [{ tabName: "  Top Range  " ,productData:productData}];
  return (
    <div>
      <ProductCard tabOptions={tabOptions}></ProductCard>
    </div>
  );
};

export default TopRange;
