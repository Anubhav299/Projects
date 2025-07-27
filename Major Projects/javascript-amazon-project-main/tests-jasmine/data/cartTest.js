import { addToCart, cart } from "../../data/cart.js";

describe('test suite : addToCart', () => {
    it('checks adding an existing product into cart', () => {
        
    })

    it('checks adding a new product into cart', () => {
        addToCart('id1');
        expect(cart.length).toEqual(1);
    })


})