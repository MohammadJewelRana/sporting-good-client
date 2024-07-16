const addToCart = (id: string, operation: string) => {
  const cart = getShoppingCartFromLocalStorage();
  let quantity = cart[id];
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

const removeFromDb = (id) => {
  const cart = getShoppingCartFromLocalStorage();
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
