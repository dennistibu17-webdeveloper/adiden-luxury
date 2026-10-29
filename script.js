// =============================================
// ADIDEN LUXURY - PRODUCT DATA AND STORE LOGIC
// =============================================

const products = [
    {
        id: 1,
        name: "New Balance 9060",
        category: "sneakers",
        price: 450,
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["As pictured"],
        image: "sneaker1.jpg",
        description: "Modern design. Everyday comfort."
    },
    {
        id: 2,
        name: "Adidas Samba",
        category: "sneakers",
        price: 350,
        sizes: ["40", "41", "42", "43"],
        colors: ["As pictured"],
        image: "sneaker2.jpg",
        description: "A classic streetwear essential."
    },
    {
        id: 3,
        name: "Nike Air Jordan 4",
        category: "sneakers",
        price: 350,
        sizes: ["41", "42", "43"],
        colors: ["Black", "Grey", "Off-White"],
        image: "sneaker3.jpg",
        description: "Iconic basketball-inspired style."
    },
    {
        id: 4,
        name: "Nike Air Force 1",
        category: "sneakers",
        price: 320,
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["Epic Grey"],
        image: "sneaker4.jpg",
        description: "A timeless everyday sneaker."
    },
    {
        id: 5,
        name: "Nike Air Max Zoom Winflo V2",
        category: "sneakers",
        price: 470,
        sizes: ["39", "40", "41", "42", "43"],
        colors: ["Triple Black"],
        image: "sneaker5.jpg",
        description: "Sport-inspired design and comfort."
    },
    {
        id: 6,
        name: "Nike SB Dunk Low Khaki",
        category: "sneakers",
        price: 450,
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["Khaki"],
        image: "sneaker6.jpg",
        description: "A standout low-top sneaker."
    },
    {
        id: 7,
        name: "Nike Free Metcon 6",
        category: "sneakers",
        price: 450,
        sizes: ["42", "43", "44"],
        colors: ["Black", "White", "Ash"],
        image: "sneaker7.jpg",
        description: "Training-inspired athletic style."
    },
    {
        id: 8,
        name: "Nike Air Max DN",
        category: "sneakers",
        price: 470,
        sizes: ["42", "43", "44"],
        colors: ["Black", "White", "Cool Grey"],
        image: "sneaker8.jpg",
        description: "Bold design for everyday wear."
    },
    {
        id: 9,
        name: "New Balance 740v2",
        category: "sneakers",
        price: 470,
        sizes: ["42", "43", "44", "45"],
        colors: ["Blue Agate", "Metallic Silver", "White"],
        image: "sneaker9.jpg",
        description: "Sporty styling with a retro feel."
    },
    {
        id: 10,
        name: "Air Jordan 1 Retro High OG Twist",
        category: "sneakers",
        price: 470,
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["Blue", "Black"],
        image: "sneaker10.jpg",
        description: "A high-top with a bold silhouette."
    },
    {
        id: 11,
        name: "BLACKOUT Motion in the Dark T-Shirt",
        category: "clothing",
        price: 100,
        sizes: ["L", "XL", "XXL"],
        colors: ["Black", "White"],
        image: "shirt1.jpg",
        description: "Everyday streetwear essential."
    },
    {
        id: 12,
        name: "TFT Cap",
        category: "accessories",
        price: 60,
        sizes: [],
        colors: ["Black", "Pink", "Red"],
        image: "cap1.jpg",
        description: "Complete your look with style."
    },
    {
        id: 13,
        name: "TFT Beanies",
        category: "accessories",
        price: 90,
        sizes: ["S", "L"],
        colors: ["Black", "White", "Pink", "Camo"],
        image: "beanie1.jpg",
        description: "A versatile streetwear accessory."
    },
    {
        id: 14,
        name: "TFT Singlet",
        category: "clothing",
        price: 150,
        sizes: ["L", "XL"],
        colors: ["Black", "Red", "Blue", "Dark Brown", "White"],
        image: "singlet1.jpg",
        description: "Simple, comfortable streetwear."
    }
];

// =============================================
// ELEMENTS
// =============================================

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const filterButtons = document.querySelectorAll(".filter-button");

const cartToggle = document.getElementById("cartToggle");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartButton = document.getElementById("closeCart");

const cartItemsContainer = document.getElementById("cartItems");
const cartCountElement = document.getElementById("cartCount");
const cartTotalElement = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const noResults = document.getElementById("noResults");

// =============================================
// STORE STATE
// =============================================

let selectedCategory = "all";
let searchTerm = "";
let sortMode = "featured";

let cart = [];

// =============================================
// CURRENCY FORMAT
// =============================================

function formatPrice(amount) {
    return "GH₵" + amount.toFixed(2);
}

// =============================================
// CREATE PRODUCT CARD
// =============================================

function createProductCard(product) {
    const card = document.createElement("article");

    card.className = "product-card";

    const categoryName = {
        sneakers: "Sneakers",
        clothing: "Clothing",
        accessories: "Accessories"
    }[product.category];

    const sizeOptions = product.sizes.length
        ? product.sizes.map(size =>
            `<option value="${size}">${size}</option>`
          ).join("")
        : `<option value="One Size">One Size</option>`;

    const colorOptions = product.colors.map(color =>
        `<option value="${color}">${color}</option>`
    ).join("");

    const icon = product.category === "sneakers"
        ? "👟"
        : product.category === "clothing"
            ? "👕"
            : "🧢";

    card.innerHTML = `
        <div class="product-image">

            <div class="image-placeholder">
                <span class="placeholder-icon">${icon}</span>
                <span>ADIDEN LUXURY</span>
            </div>

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <span class="product-badge">COLLECTION</span>
        </div>

        <div class="product-info">

            <p class="product-category">${categoryName}</p>

            <h3>${product.name}</h3>

            <p class="product-description">${product.description}</p>

            <p class="product-price">${formatPrice(product.price)}</p>

            <div class="product-options">

                ${product.sizes.length ? `
                    <label>
                        Size
                        <select class="size-select" aria-label="Choose size">
                            ${sizeOptions}
                        </select>
                    </label>
                ` : `
                    <label>
                        Size
                        <select class="size-select" aria-label="Choose size">
                            ${sizeOptions}
                        </select>
                    </label>
                `}

                <label>
                    Colour
                    <select class="color-select" aria-label="Choose colour">
                        ${colorOptions}
                    </select>
                </label>

            </div>

            <button
                class="add-to-cart"
                type="button"
                data-product-id="${product.id}"
            >
                ADD TO CART
            </button>

        </div>
    `;

    // Hide the placeholder when the product image loads.
    const image = card.querySelector("img");
    const placeholder = card.querySelector(".image-placeholder");

    image.addEventListener("load", () => {
        placeholder.style.display = "none";
    });

    // Keep the placeholder visible if an image is missing.
    image.addEventListener("error", () => {
        image.style.display = "none";
        placeholder.style.display = "flex";
    });

    // Add product to cart.
    const addButton = card.querySelector(".add-to-cart");

    addButton.addEventListener("click", () => {
        const size = card.querySelector(".size-select").value;
        const color = card.querySelector(".color-select").value;

        addToCart(product, size, color);
    });

    return card;
}

// =============================================
// DISPLAY PRODUCTS
// =============================================

function renderProducts() {
    let filteredProducts = products.filter(product => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const searchableText = (
            product.name + " " +
            product.category + " " +
            product.description + " " +
            product.colors.join(" ")
        ).toLowerCase();

        const matchesSearch = searchableText.includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    // Sorting
    if (sortMode === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortMode === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (sortMode === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    productGrid.innerHTML = "";

    filteredProducts.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });

    noResults.hidden = filteredProducts.length !== 0;
}

// =============================================
// CATEGORY FILTERS
// =============================================

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        renderProducts();
    });
});

// =============================================
// SEARCH
// =============================================

searchInput.addEventListener("input", event => {
    searchTerm = event.target.value.trim().toLowerCase();
    renderProducts();
});

// =============================================
// SORT PRODUCTS
// =============================================

sortSelect.addEventListener("change", event => {
    sortMode = event.target.value;
    renderProducts();
});

// =============================================
// SHOPPING CART
// =============================================

function addToCart(product, size, color) {
    const existingItem = cart.find(item =>
        item.id === product.id &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            color: color,
            quantity: 1
        });
    }

    renderCart();
    openCart();

    // Give the customer feedback.
    cartToggle.setAttribute(
        "aria-label",
        "Shopping cart updated"
    );
}

function changeQuantity(index, amount) {
    if (!cart[index]) return;

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// =============================================
// RENDER CART
// =============================================

function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <p class="empty-cart">Your cart is empty.</p>
        `;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        const details = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = item.name;

        const options = document.createElement("p");
        options.textContent =
            "Size: " + item.size + " | Colour: " + item.color;

        const price = document.createElement("p");
        price.className = "cart-item-price";
        price.textContent = formatPrice(item.price * item.quantity);

        const actions = document.createElement("div");
        actions.className = "cart-item-actions";

        const minus = document.createElement("button");
        minus.className = "quantity-button";
        minus.type = "button";
        minus.textContent = "−";
        minus.setAttribute("aria-label", "Decrease quantity");

        minus.addEventListener("click", () => {
            changeQuantity(index, -1);
        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.className = "quantity-button";
        plus.type = "button";
        plus.textContent = "+";
        plus.setAttribute("aria-label", "Increase quantity");

        plus.addEventListener("click", () => {
            changeQuantity(index, 1);
        });

        actions.append(minus, quantity, plus);

        details.append(name, options, price, actions);

        const remove = document.createElement("button");
        remove.className = "remove-button";
        remove.type = "button";
        remove.textContent = "Remove";

        remove.addEventListener("click", () => {
            removeFromCart(index);
        });

        cartItem.append(details, remove);

        cartItemsContainer.appendChild(cartItem);
    });

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    cartCountElement.textContent = totalQuantity;
    cartTotalElement.textContent = formatPrice(totalPrice);
}

// =============================================
// OPEN AND CLOSE CART
// =============================================

function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");

    cartDrawer.setAttribute("aria-modal", "true");
    cartDrawer.setAttribute("role", "dialog");
    document.body.style.overflow = "hidden";
}

function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");

    cartDrawer.removeAttribute("aria-modal");
    document.body.style.overflow = "";
}

cartToggle.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCart();
    }
});

// =============================================
// DEMO CHECKOUT
// =============================================

checkoutButton.addEventListener("click", async () => {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add a product first.");
        return;
    }

    const email = prompt(
        "Enter your email address for your Paystack test checkout:"
    );

    if (!email) return;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(email.trim())) {
        alert("Please enter a valid email address.");
        return;
    }

    checkoutButton.disabled = true;
    checkoutButton.textContent = "Connecting to Paystack...";

    try {
        const response = await fetch(
            "https://adiden-luxury-payments.dennistibu17.workers.dev/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.trim(),
                    amount: Math.round(
                        cart.reduce(
                            (total, item) =>
                                total + item.price * item.quantity,
                            0
                        ) * 100
                    )
                })
            }
        );

        const result = await response.json();

        if (!response.ok || !result.checkoutUrl) {
            throw new Error(
                result.error || "Could not start checkout."
            );
        }

        window.location.href = result.checkoutUrl;
    } catch (error) {
        console.error("Checkout error:", error);
        alert(
            "We couldn't start checkout. Please try again later."
        );
    } finally {
        checkoutButton.disabled = false;
        checkoutButton.textContent = "Checkout";
    }
});
renderProducts();
renderCart();
console.log("STORE SCRIPT RUNNING");
console.log("Product grid:", document.getElementById("productGrid"));