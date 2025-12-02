console.log("item.js loaded!");

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

const itemContainer = document.getElementById("itemContainer");
const matchesContainer = document.getElementById("matchesContainer");

// If no ID → show error
if (!itemId) {
    itemContainer.innerHTML = "<p>Invalid item link.</p>";
    throw new Error("Missing item ID");
}

// Load item details
db.collection("items").doc(itemId).get().then(doc => {
    if (!doc.exists) {
        itemContainer.innerHTML = "<p>Item not found.</p>";
        return;
    }

    const item = doc.data();

    // Display main item details
    itemContainer.innerHTML = `
        <img src="${item.imageURL}" style="width:100%;border-radius:10px;">
        <h2>${(item.category || "uncategorized").toUpperCase()}</h2>
        <p><b>Type:</b> ${item.type}</p>
        <p><b>Description:</b> ${item.description}</p>
        <p><b>Location:</b> ${item.location}</p>
        <p><b>Contact:</b> ${item.contact || "None"}</p>
    `;

    loadSimilar(item);
});

// Load similar items intelligently
function loadSimilar(currentItem) {

    // Opposite type usually gives true matches:
    // e.g., LOST → show FOUND items of same category
    const oppositeType = currentItem.type === "lost" ? "found" : "lost";

    db.collection("items")
      .where("type", "==", oppositeType)
      .get()
      .then(snapshot => {

          matchesContainer.innerHTML = "";

          let matches = [];

          snapshot.forEach(doc => {
              if (doc.id === itemId) return;

              const item = doc.data();

              // Matching logic
              const sameCategory = item.category === currentItem.category;
              const similarWord = item.description
                                    .toLowerCase()
                                    .includes(currentItem.description.split(" ")[0].toLowerCase());
              const sameLocation = item.location.toLowerCase() === currentItem.location.toLowerCase();

              // If ANY of these match → it's a similar item
              if (sameCategory || similarWord || sameLocation) {
                  matches.push({ id: doc.id, ...item });
              }
          });

          if (matches.length === 0) {
              matchesContainer.innerHTML = "<p>No similar items found.</p>";
              return;
          }

          // Display similar items
          matches.forEach(item => {
              matchesContainer.innerHTML += `
                <div class="card" onclick="openItem('${item.id}')">
                    <img src="${item.imageURL}">
                    <h4>${item.category.toUpperCase()}</h4>
                    <p>${item.location}</p>
                </div>
              `;
          });
      });
}

// Go to another item
function openItem(id) {
    window.location.href = `item.html?id=${id}`;
}
