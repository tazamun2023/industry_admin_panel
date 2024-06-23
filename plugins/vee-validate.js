import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required or your custom error message"
});

extend('min', {
  validate(value, {length}) {
    return value.length >= length;
  },
  params: ['length'],
  message: 'The {_field_} field must have at least {length} characters'
});
extend('uniqueSku', {
  validate: (value, {exsist}) => {
    return exsist;
  },
  params: ['uniqueSku'], // Define the parameter name as allSKus
  message: 'SKU must be unique'
});
extend('validatePrice', {
  validate: (value, {allPrices}) => {
    for (let i = 0; i < allPrices.length; i++) {
      const up = allPrices[i]?.unit_price;
      const usp = allPrices[i]?.selling_price;
      if (!(up && usp && usp <= up)) {
        return false; // If any item doesn't meet the condition, return false
      }
    }
    return true; // If all items meet the condition, return true
  },
  params: ['allPrices'],
  message: 'Selling price must be smaller than or equal to the unit price'
});
// Custom rule for quantity comparison
extend('quantityComparison', {
  validate(value, {first, second, third}) {
    if (!first || !second) {
      return true; // If any quantity is missing, let required rule handle it
    }

    if (first > second) {
      return 'Second quantity must be greater than the first';
    }

    if (third && second > third) {
      return 'Third quantity must be greater than the second';
    }

    return true;
  },
  params: ['first', 'second', 'third'],
  message: 'Invalid quantities comparison'
});
// Custom rule for quantity comparison
extend('priceComparison', {
  validate(value, {unit_prices, selling_prices}) {
    for (let i = 0; i < unit_prices.length; i++) {
      if (selling_prices[i] >= unit_prices[i]) {
        return 'The selling price must be smaller than the unit price!';
      }
    }
    return true;
  },
  params: ['unit_prices', 'selling_prices'],
  message: 'Invalid price comparison'
});
