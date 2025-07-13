import { renderOrderSummary } from "../scripts/Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./Checkout/checkoutHeader.js";


renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();