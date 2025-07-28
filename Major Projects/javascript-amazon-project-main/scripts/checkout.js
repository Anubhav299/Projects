import { renderOrderSummary } from "../scripts/Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./Checkout/checkoutHeader.js";

// import '../data/cart-class.js';

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();