const cloudName = "dp79ktf9n"; 
const uploadPreset = "unsigned_preset";

async function uploadImageToCloudinary(file) {
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
const category = document.getElementById("category").value;


    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(url, {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    return data.secure_url; 
}

document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = document.getElementById("imageFile").files[0];

    // Upload to Cloudinary
    const imageURL = await uploadImageToCloudinary(file);

    const type = document.querySelector('input[name="type"]:checked').value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const contact = document.getElementById("contact").value;

await db.collection("items").add({
    type,
    location,
    description,
    contact,
    category,   // ⭐ NEW FIELD ADDED
    imageURL,
    timestamp: Date.now()
});



    alert("Item posted successfully!");
    window.location.href = "index.html";
});
