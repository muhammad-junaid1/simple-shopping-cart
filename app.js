// Suppose this is coming from an API
const items = [
  {
    title: "iPhone",
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: "100$",
  },
  {
    title: "Samsung",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2Ftc3VuZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: "20$",
  },
  {
    title: "Google",
    image:
      "https://images.unsplash.com/photo-1510535043828-3d1edc68071e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: "150$",
  },
];

/**
 * Helper Function
 */

// createHTML() renders out required html for all items
const createHTML = (imgURL, headingText, priceText) => {
  // ALl required elements for an item
  const div = document.createElement("div"),
    img = document.createElement("img"),
    heading = document.createElement("h2"),
    price = document.createElement("span"),
    btnContainer = document.createElement("div"),
    incBtn = document.createElement("button"),
    decBtn = document.createElement("button"),
    delBtn = document.createElement("button"),
    instancesSpan = document.createElement("span");

  // Set text, src, classes of elements (insert/modify)
  img.src = imgURL;
  heading.textContent = headingText;
  price.textContent = priceText;
  incBtn.textContent = "+";
  incBtn.classList.add("inc-button");
  decBtn.textContent = "-";
  decBtn.classList.add("dec-button");
  delBtn.textContent = "Delete";
  btnContainer.append(incBtn, decBtn);
  delBtn.classList.add("delete-button");
  instancesSpan.id = "instances";

  // Append all elements to *item* container
  div.classList.add("item");
  div.append(img, heading, instancesSpan, price, btnContainer, delBtn);
  return div;
};

/**
 * Render all items to the *items* container (show on the page)
 */
const itemsContainer = document.querySelector(".items");
for (let item of items) {
  const itemHTML = createHTML(item.image, item.title, item.price);
  itemsContainer.append(itemHTML);
}

/**
 * Select elements and manage total amount varaible
 */
const incBtns = document.querySelectorAll(".inc-button");
const decBtns = document.querySelectorAll(".dec-button");
const deleteBtns = document.querySelectorAll(".delete-button");
const totalAmount = document.querySelector("#total");
let total = 0;

// An object for handling how many items are being added
const itemsInstances = {};
for (let item of items) {
  const title = Object.values(item)[0];
  itemsInstances[title] = 0;
}

/**
 * Add event listeners to inc and dec buttons
 */
incBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Select title, price and span for showing instances
    const price = e.target.parentElement.previousElementSibling;
    let title = price.previousElementSibling.previousElementSibling;
    const instancesSpan = price.previousElementSibling;

    // Increment item's instance and print out
    itemsInstances[title.textContent]++;
    instancesSpan.textContent = `${itemsInstances[title.textContent]}`;

    // Add item's price to the total and print out
    total += parseInt(price.textContent);
    totalAmount.textContent = `Total: ${total}$`;
  });
});

decBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Select title, price and span for showing instances
    const price = e.target.parentElement.previousElementSibling;
    const title = price.previousElementSibling.previousElementSibling;
    const instancesSpan = price.previousElementSibling;

    /**
     * Check whether item has already been added or not.
     * if it is added, then decrease price from total
     */
    if (itemsInstances[title.textContent] > 0) {
      itemsInstances[title.textContent]--;

      // Print out instance on the item container if it exists.
      if (itemsInstances[title.textContent]) {
        instancesSpan.textContent = `${itemsInstances[title.textContent]}`;
      } else {
        instancesSpan.textContent = "";
      }
      total -= parseInt(price.textContent);
      totalAmount.textContent = `Total: ${total}$`;
    }
  });
});

/**
 * Logic for deleting item
 */
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const elem = e.target.parentElement;
    const instances = elem.querySelector("#instances");
    const price = instances.nextElementSibling;
    /**
     * Check whether there is any instance of item or not.
     * If it exists, then decrease the amount of *n* number
     * of items from total
     */
    if (instances.textContent) {
      const totalPrice =
        Number(instances.textContent) * parseInt(price.textContent);
      total -= totalPrice;
      totalAmount.textContent = `Total: ${total}$`;
    }

    // And finally, remove the element from DOM
    elem.remove();
  });
});
