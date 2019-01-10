const shop = {
    catfood: {
      inventory: 817, 
      cost: 1.99
    },
    milk: {
      inventory: 236, 
      cost: 1.69
    },
    catnip: {
      inventory: 17, 
      cost: 9.99
    }
  };
  
  const checkStock = (order) => {
    return new Promise ((resolve, reject) => {
     setTimeout(()=> {  
     const itemsArr = order.items;  
     let inStock = itemsArr.every(item => shop[item[0]].inventory >= item[1]);
     
     if (inStock){
       let total = 0;   
       itemsArr.forEach(item => {
         total += item[1] * shop[item[0]].cost
       });
       console.log(`All of the items are in stock. The total cost of the order is ${total}.`);
       resolve([order, total]);
     } else {
       reject(`The order could not be completed because some items are sold out.`);
     }     
  }, simulatedDelay());
   });
  };
  
  const payment = (responseArray) => {
    const order = responseArray[0];
    const total = responseArray[1];
    return new Promise ((resolve, reject) => { setTimeout(()=> {  
     let hasEnoughMoney = order.giftcardBalance >= total;
     if (hasEnoughMoney) {
       console.log(`Payment authorised, Generating order number.`);
       let trackingNum = orderNumber();
       resolve([order, trackingNum]);
     } else {
       reject(`Cannot process order: balance was insufficient.`);
     }
     
  }, simulatedDelay());
   });
  };
  
  
  const delivery = (responseArray) => {
    const order = responseArray[0];
    const trackingNum = responseArray[1];
    return new Promise ((resolve, reject) => {
     setTimeout(()=> {  
       resolve(`Your order is complete; your tracking number is: ${trackingNum}.`);
  }, simulatedDelay());
   });
  };
  
  
  function orderNumber() {
    return Math.floor(Math.random() * 1000000);
  }
  
  function simulatedDelay() {
    return Math.floor(Math.random() * 2000);
  }
  
  module.exports = {checkStock, payment, delivery};