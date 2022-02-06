module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.counter = oldCart.counter || 0;
  this.unitPrice = oldCart.unitPrice || 0;
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        item: item,
        qty: 0,
        price: 0,
        unitPrice: 0,
      };
    }
    storedItem.unitPrice = storedItem.item.salePrice;
    storedItem.qty++;
    storedItem.price = storedItem.item.salePrice * storedItem.qty;
    storedItem.price = storedItem.price.toFixed(2);
    this.totalQty++;
    this.totalPrice = +this.totalPrice + +storedItem.item.salePrice;
    this.totalPrice = this.totalPrice.toFixed(2);
  };
  // this.IncreaseBydetailInput = function (item, id, numItem) {
  //   var storedItem = this.items[id];
  //   if (!storedItem) {
  //     storedItem = this.items[id] = {
  //       item: item,
  //       qty: 0,
  //       price: 0,
  //       unitPrice: 0,
  //     };
  //   }
  //   storedItem.unitPrice = storedItem.item[0].price;
  //   storedItem.qty = +storedItem.qty + +numItem;
  //   this.totalQty = +this.totalQty + +numItem;

  //   if (this.items[id].price == 0) {
  //     this.items[id].price = 0;
  //     this.items[id].price =
  //       +this.items[id].price + +storedItem.unitPrice * +numItem;
  //     this.totalPrice = +this.totalPrice + +this.items[id].price;
  //     this.totalPrice = this.totalPrice.toFixed(2);
  //   } else {
  //     this.items[id].price =
  //       +storedItem.unitPrice * +numItem - this.items[id].price;
  //     this.items[id].price = storedItem.unitPrice * storedItem.qty;
  //     this.totalPrice =
  //       +this.totalPrice +
  //       +this.items[id].price -
  //       storedItem.unitPrice * numItem;
  //     this.totalPrice = this.totalPrice.toFixed(2);
  //   }
  // };
  this.generateArray = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };

  // this.removeItem = function (id) {
  //   this.totalQty -= this.items[id].qty;
  //   this.totalPrice -= this.items[id].price;
  //   this.totalPrice = this.totalPrice.toFixed(2);
  //   delete this.items[id];
  // };
  // this.increaseByOne = function (id) {
  //   this.items[id].qty++;
  //   this.items[id].price =
  //     +this.items[id].price + +this.items[id].item[0].price;
  //   this.items[id].price = this.items[id].price.toFixed(2);
  //   this.totalQty++;
  //   this.totalPrice = +this.totalPrice + +this.items[id].item[0].price;
  //   this.totalPrice = this.totalPrice.toFixed(2);
  // };
  // this.reduceByOne = function (id) {
  //   if (this.items[id].qty < 2) return;
  //   this.items[id].qty--;
  //   this.items[id].price -= this.items[id].item[0].price;
  //   this.items[id].price = this.items[id].price.toFixed(2);
  //   this.totalQty--;
  //   this.totalPrice = +this.totalPrice - +this.items[id].item[0].price;
  //   this.totalPrice = this.totalPrice.toFixed(2);
  // };

  // // @TODO
  // this.IncreaseByInput = function (productId, numOfItems) {
  //   if (numOfItems < 1) return;
  //   this.parseMidTotalprice = +this.totalPrice - +this.items[productId].price;

  //   this.totalQty = +this.totalQty - +this.items[productId].qty;
  //   this.totalQty = +this.totalQty + +numOfItems; //total quantity
  //   this.items[productId].qty = numOfItems; //individual quantity
  //   this.items[productId].price =
  //     +this.items[productId].item[0].price * numOfItems; //aggregate price of a number of a particular item
  //   this.totalPrice = +this.parseMidTotalprice + this.items[productId].price;
  //   this.totalPrice = this.totalPrice.toFixed(2);
  // };
};
