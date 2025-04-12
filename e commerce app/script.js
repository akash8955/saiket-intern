let cart = [];

// Function to add a product to the cart
function addToCart(name, price) {
  const existingProduct = cart.find((item) => item.name === name);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

// Function to update the cart display
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let total = 0;

  // Clear the cart display
  cartItems.innerHTML = "";

  // Add each item to the cart display
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button onclick="deleteFromCart(${index})">Delete</button>
        `;
    cartItems.appendChild(li);

    // Calculate total price
    total += item.price * item.quantity;
  });

  // Update the total price
  cartTotal.textContent = total.toFixed(2);
}

// Function to delete a product from the cart
function deleteFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
