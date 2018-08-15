new Vue({
    el: '#app',
    data: {
      isShowingCart: false,
      cart: {
        items: []
      },
        products: [
            {
                id: 1,
                name: 'iPhoneX',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 1150,
                inStock: 50
            },
            {
                id: 2,
                name: 'iphone8',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 850,
                inStock: 755
            },
            {
                id: 3,
                name: 'iphone8 plus',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 950,
                inStock: 5
            },
            {
                id: 4,
                name: 'iPhone7 plus',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 700,
                inStock: 42
            },
            {
                id: 5,
                name: 'iphone7',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 650,
                inStock: 0
            },
            {
                id: 6,
                name: 'iphone6',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 600,
                inStock: 81
            }
        ]
    },
    methods: {
      addProductToCart: function(product) {
        var cartItem = this.getCartItem(product);
        if(cartItem != null) {
            cartItem.quantity++;
          } else {
            this.cart.items.push({
              product: product,
              quantity: 1
          });
        }
        product.inStock--;
      },
      getCartItem: function(product) {
        for (var i = 0; i < this.cart.items.length; i++) {
          if (this.cart.items[i].product.id === product.id) {
            return this.cart.items[i];
          }
        }
        return null;
      },
      increaseQuantity: function(cartItem) {
        cartItem.product.inStock--;
        cartItem.quantity++;
      },
      decreaseQuantity: function(cartItem) {
        cartItem.quantity--;
        cartItem.product.inStock++;
        if (cartItem.quantity == 0) {
          this.removeItemFromCart(cartItem);
        }
      },
      removeItemFromCart: function(cartItem) {
        var index = this.cart.items.indexOf(cartItem);
        if (index !== -1) {
          this.cart.items.splice(index, 1);
        }

      },
      checkout: function() {
        if (confirm('Are Your sure you want to buy these products?')) {
          this.cart.items.forEach(function(item) {
            item.product.inStock += item.quantity;
          });
          this.cart.items = [];
        }
      }

    },
    computed: {
      cartTotal: function() {
        var total = 0;
        this.cart.items.forEach(function(item) {
          total += item.quantity * item.product.price;
        });
        return total;
    },
      taxAmount:function() {
        return ((this.cartTotal * 10)/100);

      }

    },
    filters: {
      currency: function(value) {
        var formatter = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
        });
        return formatter.format(value);
      }
    }
});
