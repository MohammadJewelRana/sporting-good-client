 

const addToCart=(id:string)=>{
  const cart=getShoppingCartFromLocalStorage();
  const quantity=cart[id];
  // console.log(quantity);
  if(!quantity){
      cart[id]=1;
  }
  else{
      cart[id] =  quantity + 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

const getShoppingCartFromLocalStorage=()=>{
  let cart={};
  const getCart=localStorage.getItem('cart');
  if(getCart){
      cart=JSON.parse(getCart);
  }
  else{
      cart={};
  }
  return cart;
}

const removeFromDb = id => {
  const cart = getShoppingCartFromLocalStorage();
  if (id in cart) {
      delete cart[id];
      localStorage.setItem('cart', JSON.stringify(cart));
  }
}

const deleteShoppingCart = () => {
  localStorage.removeItem('cart');
}


export  {addToCart,getShoppingCartFromLocalStorage,deleteShoppingCart,removeFromDb}  ;

