const itemsContainer = document.getElementById("itemsContainer");
const lostTab = document.getElementById("lostTab");
const foundTab = document.getElementById("foundTab");
const searchInput = document.getElementById("searchInput");

let currentType = "lost";
let allItems = []; // store all loaded items for search & category filter

// Load initial items
loadItems(currentType);

// TAB SWITCHING
lostTab.onclick = () => {
    currentType = "lost";
    lostTab.classList.add("active");
    foundTab.classList.remove("active");
    loadItems("lost");
};

foundTab.onclick = () => {
    currentType = "found";
    foundTab.classList.add("active");
    lostTab.classList.remove("active");
    loadItems("found");
};

// SEARCH EVENT
searchInput.addEventListener("input", filterItems);

// LOAD ITEMS FROM FIRESTORE
function loadItems(type) {
    itemsContainer.innerHTML = "<p>Loading...</p>";

    db.collection("items")
      .where("type", "==", type)
      .orderBy("timestamp", "desc")
      .get()
      .then(snapshot => {

          itemsContainer.innerHTML = ""; 
          allItems = []; // reset list

          if (snapshot.empty) {
              itemsContainer.innerHTML = "<p>No items yet.</p>";
              return;
          }

          snapshot.forEach(doc => {
              const item = doc.data();
              allItems.push({ id: doc.id, ...item });
          });

          displayItems(allItems);
      })
      .catch(err => {
          console.error("Error loading items:", err);
          itemsContainer.innerHTML = "<p>Error loading items.</p>";
      });
}

// DISPLAY ITEMS ON HOMEPAGE
function displayItems(items) {
    itemsContainer.innerHTML = "";

    if (items.length === 0) {
        itemsContainer.innerHTML = "<p>No matching items.</p>";
        return;
    }

    items.forEach(item => {
        itemsContainer.innerHTML += `
        <div class="card" onclick="openItem('${item.id}')">
            <img src="${item.imageURL}" alt="Item image">
            <h4>${(item.category || "uncategorized").toUpperCase()}</h4>
            <p>${item.description.slice(0, 30)}...</p>
            <p>📍 ${item.location}</p>
        </div>
        `;
    });
}

// SEARCH FUNCTION
function filterItems() {
    const query = searchInput.value.toLowerCase();

    const filtered = allItems.filter(item =>
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.contact || "").toLowerCase().includes(query)
    );

    displayItems(filtered);
}

// OPEN ITEM DETAILS PAGE
function openItem(id) {
    window.location.href = `item.html?id=${id}`;
}
