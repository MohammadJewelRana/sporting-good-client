import ProductCard from "./ProductCard";

const TopRange = ({productData,refetch}) => {
  const tabOptions = [{ tabName: "  Top Range  " ,productData:productData}];
  return (
    <div>
      <ProductCard tabOptions={tabOptions} refetch={refetch}></ProductCard>
    </div>
  );
};

export default TopRange;
