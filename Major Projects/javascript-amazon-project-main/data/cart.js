export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1
}];

export function saveToStorage()
{
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity)
{
  const matchingItem = cart.find(cartItem => cartItem.productId == productId);

  //checking if it already exists then only increasing quantity otherwise adding new to the cart 
  if (matchingItem)
  {   
    matchingItem.quantity += quantity;
  }
  else
  {
    // cart.push({
    //     productId: productId,
    //     quantity: quantity
    // });
    cart.push({
        productId,
        quantity
    });
  }
    
    saveToStorage();
}

export function removeFromCart(productId)
{
    let newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}

export function updateCartQuantity()
{
  //updates the cart quantity @ top right corner
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
  })
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity)
{
    let matchingItem;
    cart.forEach((cartItem) => {
        if (cartItem.productId == productId)
            matchingItem = cartItem;
    });

    matchingItem.quantity = newQuantity;

    saveToStorage();
    // updateCartQuantity();
}   