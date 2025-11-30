console.log("item.js loaded!");

// Get ID
const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

const itemContainer = document.getElementById("itemContainer");
const matchesContainer = document.getElementById("matchesContainer");

// If no ID provided
if (!itemId) {
    itemContainer.innerHTML = "<p>Invalid item URL.</p>";
    throw new Error("missing item id");
}

// Load item details
db.collection("items").doc(itemId).get().then(doc => {
    if (!doc.exists) {
        itemContainer.innerHTML = "<p>Item not found.</p>";
        return;
    }

    const item = doc.data();

    itemContainer.innerHTML = `
        <img src="${item.imageURL}" style="width:100%;border-radius:8px;">
        <h2>${item.type.toUpperCase()}</h2>
        <p><b>Description:</b> ${item.description}</p>
        <p><b>Location:</b> ${item.location}</p>
        <p><b>Contact:</b> ${item.contact || "None"}</p>
    `;

    loadSimilar(item);
});

// Load similar items intelligently
function loadSimilar(currentItem) {

    // Opposite type increases chance of real match
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

              // Simple matching logic
              const descMatch = item.description.toLowerCase().includes(
                    currentItem.description.split(" ")[0].toLowerCase()
              );

              const locMatch = item.location.toLowerCase() === currentItem.location.toLowerCase();

              if (descMatch || locMatch) {
                  matches.push({ id: doc.id, ...item });
              }
          });

          // If still no matches, show nothing
          if (matches.length === 0) {
              matchesContainer.innerHTML = "<p>No similar items found.</p>";
              return;
          }

          // Display matches
          matches.forEach(item => {
              matchesContainer.innerHTML += `
                <div class="card" onclick="openItem('${item.id}')">
                    <img src="${item.imageURL}">
                    <p>${item.location}</p>
                </div>
              `;
          });
      });
}

function openItem(id) {
    window.location.href = `item.html?id=${id}`;
}
