/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "./ProductCard";

const TopRange = ({productData,refetch}:{productData:any,refetch:any}) => {
  const tabOptions = [{ tabName: "  Top Range  " ,productData:productData}];
  return (
    <div>
      <ProductCard tabOptions={tabOptions} refetch={refetch}></ProductCard>
    </div>
  );
};

export default TopRange;
