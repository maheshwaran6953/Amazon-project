import { currencyFormat } from "../scripts/utilitys/money.js";

console.log("converts cents to dollars");

if(currencyFormat(2095) === "20.95") {
    console.log("passed");
}
else {
    console.log("failed");
}

console.log("handles with 0 cents");

if(currencyFormat(0) === "0.00") {
    console.log("passed");
}
else {
    console.log("failed");
}

console.log("rounds up to the nearest cents");

if(currencyFormat(2000.5) === "20.01") {
    console.log("passed");
}
else {
    console.log("failed");
}
