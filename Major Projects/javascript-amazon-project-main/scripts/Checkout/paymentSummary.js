import { cart, updateCartQuantity } from "../../data/cart.js";
import { getDelivery } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js"

export function renderPaymentSummary()
{
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const delivery = getDelivery(cartItem.deliveryOptionId);
        shippingPriceCents += delivery.priceCents;                //not dependent on quantity
    });
  
        const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
        const taxCents = totalBeforeTaxCents * 0.1;              //10% tax rate 
        
        const totalCents = totalBeforeTaxCents + taxCents;


  const paymentSummaryHTML = `
        
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

        `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;    
  
    // renderPaymentSummary();
}



