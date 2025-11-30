const itemsContainer = document.getElementById("itemsContainer");
const lostTab = document.getElementById("lostTab");
const foundTab = document.getElementById("foundTab");
const searchInput = document.getElementById("searchInput");

let currentType = "lost";
let allItems = []; // store all loaded items for search

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
          allItems = []; // reset for search

          if (snapshot.empty) {
              itemsContainer.innerHTML = "<p>No items yet.</p>";
              return;
          }

          snapshot.forEach(doc => {
              const item = doc.data();
              allItems.push({ id: doc.id, ...item }); // store for search
          });

          displayItems(allItems);
      });
}

// DISPLAY ITEMS IN HTML
function displayItems(items) {
    itemsContainer.innerHTML = "";

    if (items.length === 0) {
        itemsContainer.innerHTML = "<p>No matching items.</p>";
        return;
    }

    items.forEach(item => {
        itemsContainer.innerHTML += `
        <div class="card" onclick="openItem('${item.id}')">
            <img src="${item.imageURL}">
<h4>${item.category.toUpperCase()}</h4>
<p>${item.description.slice(0, 25)}...</p>

            <p>📍 ${item.location}</p>
        </div>
        `;
    });
}

// SEARCH FILTER FUNCTION
function filterItems() {
    const query = searchInput.value.toLowerCase();

    const filtered = allItems.filter(item =>
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        (item.contact || "").toLowerCase().includes(query)
    );

    displayItems(filtered);
}

// OPEN ITEM PAGE
function openItem(id) {
    window.location.href = `item.html?id=${id}`;
}
