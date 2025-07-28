class Cart{
    cartItems;
    #localStorageKey;           //this is called a private property

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;

        this.#loadFromStorage();
    }

    #loadFromStorage()     //this is a shortcut for loadFromStorage: function() which is actually expected
    {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if (!this.cartItems) {
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }

    saveToStorage() {
            localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    
    addToCart(productId, quantity) {
            let matchingItem = this.cartItems.find(cartItem => cartItem.productId == productId);
    
            //checking if it already exists then only increasing quantity otherwise adding new to the cart 
            if (matchingItem) {
                matchingItem.quantity += quantity;
            }
            else {
                // cart.push({
                //     productId: productId,
                //     quantity: quantity
                // });
                this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionId: '1'
                
                });
            }
            
            this.saveToStorage();
    }
    removeFromCart(productId) {
            let newCart = [];
        
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
        
            this.cartItems = newCart;
        
            this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId)
                matchingItem = cartItem;
        })
    
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
    }

    updateCartQuantity() {
        //updates the cart quantity @ top right corner
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        })
        return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId == productId)
                matchingItem = cartItem;
        });
    
        matchingItem.quantity = newQuantity;
    
        this.saveToStorage();
    }

}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);