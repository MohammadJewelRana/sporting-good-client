export const cartCalculation = (cartArray:[]) => {
  let subtotal = cartArray.reduce((acc, item) => {
    return acc + item.price * item.itemQuantity;
  }, 0);

  let totalQuantity = 0;
  cartArray.forEach((element) => {
    totalQuantity += element.itemQuantity;
  });
  subtotal = Number(subtotal.toFixed(2));

  const vat: number = Number((subtotal * 0.15).toFixed(2));
  const shippingCost =  cartArray.length ? 20 : 0;


  const totalCost = Number((subtotal + shippingCost + vat).toFixed(2));

  return { subtotal, totalQuantity, vat, totalCost, shippingCost };
};
