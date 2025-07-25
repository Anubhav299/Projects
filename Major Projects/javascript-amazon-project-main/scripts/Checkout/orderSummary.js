import { cart, removeFromCart, updateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";     //can remove {}, if importing only 1 parameter

import { deliveryOptions, getDelivery, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


export function renderOrderSummary() {

    let cartSummaryHTML = "";

    cart.forEach((cartItem) => {
        const { productId } = cartItem;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDelivery(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);


        cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}
                </span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" value="1">
                <span tabindex="0" class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>`;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';
    
        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);

            const priceString = deliveryOption.priceCents === 0 ? 'FREE ' : `$${formatCurrency(deliveryOption.priceCents)} - `;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html +=
                `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}" 
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString}Shipping
            </div>
            </div>
        </div>
        `
        })
        return html;
    }

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;


    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {
            const { productId } = link.dataset;
            removeFromCart(productId);

            const itemToRemove = document.querySelector(`.js-cart-item-container-${productId}`);
            itemToRemove.remove();
            
            const cartQuantity = updateCartQuantity();
            document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;

            renderPaymentSummary();
            renderOrderSummary();
            renderCheckoutHeader();
        });
    });


    document.querySelectorAll('.js-update-link').forEach((item) => {
        item.addEventListener('click', () => {
            const { productId } = item.dataset;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');
        })
    })

    document.querySelectorAll('.js-save-link').forEach((item) => {
        const { productId } = item.dataset;
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

        item.addEventListener('click', () => {
            handleUpdateQuantity(productId, quantityInput);
            
            renderPaymentSummary();

        });
    
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter')
                handleUpdateQuantity(productId, quantityInput);
            
            renderPaymentSummary();
            
        });
    });

    function handleUpdateQuantity(productId, quantityInput) {
        const newQuantity = Number(quantityInput.value);
        if (newQuantity == 0) {
            removeFromCart(productId);
            const itemToRemove = document.querySelector(`.js-cart-item-container-${productId}`);
            itemToRemove.remove();
            
            const cartQuantity = updateCartQuantity();
            document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
            return;
        }

        if (newQuantity < 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }
        updateQuantity(productId, newQuantity);

        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = newQuantity;
    
        const cartQuantity = updateCartQuantity();
        document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');


    }

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);

            renderPaymentSummary();
            renderOrderSummary();
        });
    });

}

/*this concept is called MVC = {Model, View, Control}
  Firstly, we model the data (refers to all code in the data folder eg. Cart.js, Products.js) as this code saves and manages the data

  Secondly, we view the data (refers to our looping over cart, delivery options and all )

  Thirdly, Controller runs the code when we interact with the page (refers to the eventListeners as they do something when we interact with the page)

  So, Model ---> View ---> Control ---> Model again and continues in a loop
  We do this because it makes sure the page always matches the data.

  Many JS Frameworks work on MVC Principle
*/