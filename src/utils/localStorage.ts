export type Operation = "increase" | "decrease"; // Define possible operation values
interface Cart {
  [id: string]: number; // Index signature allowing string keys and number values
}

const addToCart = (id: string, operation:Operation) => {
  const cart:Cart = getShoppingCartFromLocalStorage();
  const quantity = cart[id];
  let message;
  // console.log(quantity);
  if (!quantity) {
    cart[id] = 1;
    message = "new";
  } else {
    cart[id] = quantity + 1;
    message = "added";
  }

  if (operation === "decrease") {
    if (quantity < 2) {
      cart[id] = 1;
    } else {
      cart[id] = quantity - 1;
    }
  }

  if (operation === "increase") {
    if (quantity > 4) {
      cart[id] = 5;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return message;
};

const getShoppingCartFromLocalStorage = () => {
  let cart = {};
  const getCart = localStorage.getItem("cart");
  if (getCart) {
    cart = JSON.parse(getCart);
  } else {
    cart = {};
  }
  return cart;
};

const removeFromDb = (id:string) => {
  const cart:Cart = getShoppingCartFromLocalStorage();
  if (id in cart) {
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const deleteShoppingCart = () => {
  localStorage.removeItem("cart");
};

export {
  addToCart,
  getShoppingCartFromLocalStorage,
  deleteShoppingCart,
  removeFromDb,
};
