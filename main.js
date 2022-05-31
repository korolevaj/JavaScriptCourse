function makeGETRequest(url, callback) { 
  var xhr;
  if (window.XMLHttpRequest) { 
  xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
    xhr.onreadystatechange = function () { if (xhr.readyState === 4) {
      callback(xhr.responseText); 
    }
  }
  xhr.open('GET', url, true);
  xhr.send(); 
};

const API_URL =
'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/re sponses';
'catalogData.json' //получить список товаров;
'getBasket.json' //получить содержимое корзины;

const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

class GoodsItem {
  constructor({ title, price }) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  } 
};


class GoodsList {
  items = [];
  fetchGoods(cb) { 
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
    this.goods = JSON.parse(goods);
    cb(); 
    })
   }
  render() {
    let listHtml = ''; this.goods.forEach(good => {
    const goodItem = new GoodsItem(good.product_name, good.price);
    listHtml += goodItem.render(); });
    document.querySelector('.goods-list').innerHTML = listHtml; 
  }
  calculatePrice() {
    return this.items.reduce((previousValue, {price}) => previousValue + price, 0)
  };
}

class BasketGoods {
  items = [];
  fetchGoods(cb) { 
    makeGETRequest(`${API_URL}/getBasket.json`, (goods) => {
    this.goods = JSON.parse(goods);
    cb(); 
    })
  }
  render() {
    let listHtml = ''; this.goods.forEach(good => {
    const goodItem = new GoodsItem(good.product_name, good.price);
    listHtml += goodItem.render(); });
    document.querySelector('.goods-list').innerHTML = listHtml; 
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();

