import { currencyFormat } from "../../scripts/utilitys/money.js";

describe('test suite : currencyFormat' , () => {
    it('converts cents to dollars', () => {
        expect(currencyFormat(2095)).toEqual("20.95");
    });

    it('handles with 0 cents', () => {
        expect(currencyFormat(0)).toEqual("0.00");
    });

    it('rounds up to the nearest cents', () => {
        expect(currencyFormat(2000.5)).toEqual("20.01");
    });
});