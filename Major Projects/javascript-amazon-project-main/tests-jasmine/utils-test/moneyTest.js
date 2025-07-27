import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
    it('Converts Cents to Dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    })
    
    it('Deals with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    })
    
    it('Checks for rounding ', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
})