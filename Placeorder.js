// Define the cart object
const cart = {
    items: [],
    addItem: function(item) {
      const index = this.items.findIndex(i => i.id === item.id);
      if (index === -1) {
        this.items.push(item);
      } else {
        this.items[index].quantity += item.quantity;
      }
    },
    removeItem: function(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
    },
    getTotal: function() {
      let total = 0;
      for (let item of this.items) {
        total += item.price * item.quantity;
      }
      return total;
    }
  };
  
  // Add event listener to Add to Cart button
  const addToCartBtn = document.getElementById("addToCartBtn");
  addToCartBtn.addEventListener("click", function() {
    const item = {
      id: 1, // replace with a unique identifier for the product
      name: "Product Name", // replace with the actual product name
      price: 10.00, // replace with the actual product price
      quantity: 1 // set the default quantity to 1
    };
    cart.addItem(item);
    updateCartView();
  });
  
  // Add event listener to Place Order button
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  placeOrderBtn.addEventListener("click", function() {
    // Check if the cart is empty
    if (cart.items.length === 0) {
      alert("Your cart is empty. Please add some items before placing your order.");
      return;
    }
  
    // Retrieve additional order details (e.g., name, address, payment)
    const orderDetails = {
      // add any additional order details here
    };
  
    // Prepare the order data
    const order = {
      items: cart.items,
      total: cart.getTotal(),
      details: orderDetails
    };
  
    // Send the order to the server for processing
    // You can use AJAX, fetch API, or any other method to send the data to the server
    // ...
  
    // Clear the cart and update the cart view
    cart.items = [];
    updateCartView();
  
    // Display a success message or perform any other necessary actions
    alert("Thank you for your order!");
  });
  
  // Update the cart view
  function updateCartView() {
    const cartItemsEl = document.getElementById("cartItems");
    cartItemsEl.innerHTML = "";
  
    if (cart.items.length === 0) {
      cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    const tableEl = document.createElement("table");
    const theadEl = document.createElement("thead");
    const tbodyEl = document.createElement("tbody");
    const tfootEl = document.createElement("tfoot");
    const trHeadEl = document.createElement("tr");
    const thNameEl = document.createElement("th");
    const thPriceEl = document.createElement("th");
    const thQuantityEl = document.createElement("th");
    const thTotalEl = document.createElement("th");
    const trFootEl = document.createElement("tr");
    const tdTotalLabelEl = document.createElement("td");
    const tdTotalValueEl = document.createElement("td");
  
    thNameEl.textContent = "Product Name";
    thPriceEl.textContent = "Price";
    thQuantityEl.textContent = "Quantity";
    thTotalEl.textContent = "Total";
    tdTotalLabelEl.textContent = "Total:";
    tdTotalValueEl.textContent = "$" + cart.getTotal().toFixed(2);
  
    trHeadEl.appendChild(thNameEl);
    trHeadEl.appendChild(thPriceEl);
    trHeadEl.appendChild(thQuantityEl);
    trHeadEl.appendChild(thTotalEl);
    trFootEl.appendChild(tdTotalLabelEl);
    trFootEl.appendChild(tdTotalValueEl);
    theadEl.appendChild(trHeadEl);
    tfootEl.appendChild(trFootEl);
  
    for (let item of cart.items) {
      const trEl = document.createElement("tr");
      const tdNameEl = document.createElement("td");
      const tdPriceEl = document.createElement("td");
      const tdQuantityEl = document.createElement("td");
      const tdTotalEl = document.createElement("td");
  
      tdNameEl.textContent = item.name;
      tdPriceEl.textContent = "$" + item.price.toFixed(2);
      tdQuantityEl.textContent = item.quantity;
      tdTotalEl.textContent = "$" + (item.price * item.quantity).toFixed(2);
  
      trEl.appendChild(tdNameEl);
      trEl.appendChild(tdPriceEl);
      trEl.appendChild(tdQuantityEl);
      trEl.appendChild(tdTotalEl);
      tbodyEl.appendChild(trEl);
    }
  
    tableEl.appendChild(theadEl);
    tableEl.appendChild(tbodyEl);
    tableEl.appendChild(tfootEl);
    cartItemsEl.appendChild(tableEl);
  }
  