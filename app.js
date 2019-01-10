const {checkStock, payment, delivery} = require('./library.js');

const order = {
  items: [['catfood', 1], ['milk', 2]],
  giftcardBalance: 79.82
};

checkStock(order)
.then((resolvedValueArray) => {
 	return payment(resolvedValueArray);
})
.then((resolvedValueArray) => {
 return delivery(resolvedValueArray);
})
.then((successMessage) => {
  console.log(successMessage);
})
.catch((errorMessage) => {
  console.log(errorMessage);
});
