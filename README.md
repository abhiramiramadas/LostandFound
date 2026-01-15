**Lost & Found – The App for People Who Keep Losing Things**(not completed.. working on the ui n stuff)
===============================================================

_(because apparently pockets are optional)_

Welcome to **Lost & Found**, a website built for one specific purpose:

👉 To help students find the items they lost👉 Which they definitely _didn’t lose_, because _“I kept it in my bag I swear.”_

This project is basically Google Photos, but instead of your memories, it stores your poor life decisions.

🎒 **What This App Does**
=========================

*   Lets you **post lost or found items**
    
    *   Phone? ✔
        
    *   Wallet? ✔
        
    *   Dignity? ❌ _(coming soon)_
        
*   Automatically uploads photos to **Cloudinary**
    
    *   Your blurry 0.5x canteen picture will be safe
        
*   Saves everything to **Firestore**
    
    *   Also known as “Google’s diary of your chaos”
        
*   Has **search**, because scrolling is too much effort
    
*   Has **categories**, because humans like boxes
    
*   Has **item details + similar items**, in case someone else lost the same thing (statistically likely)
    

🧠 **Tech Stack (a.k.a Why This Project Looks Smart)**
======================================================

*   **HTML** – ancient but reliable
    
*   **CSS** – modern but annoying
    
*   **JavaScript** – because you hate yourself
    
*   **Firebase Firestore** – database that cries when you forget security rules
    
*   **Cloudinary** – image storage for your 4000px selfies of… an ID card
    
*   **Neobrutalism + Minimalism** – because vibes matter
    

🗂️ **Folder Structure (Totally Organized, I Promise)**
=======================================================

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   project/  │── index.html        # homepage where chaos begins  │── post.html         # upload lost/found item  │── item.html         # item details page  │── assets/  │    ├── css/  │    │    └── style.css  │    └── js/  │         ├── main.js  │         ├── post.js  │         └── item.js  └── firebase.js       # the chosen one   `

🚀 **How to Use It**
====================

### 1\. Lose something

Preferably something important.Bonus points if your friends laugh at you.

### 2\. Open “Lost & Found”

Pretend you’re competent.

### 3\. Post the item

Write a description like:

> “Black phone, looks like every other black phone.”

### 4\. Wait

Miracles happen.Not often, but still.

🔥 **Features That Make This Project Look Expensive™**
======================================================

✔ Bento-grid vibe✔ Glassmorphism✔ Neobrutal buttons✔ Rounded everything✔ Looks like a startup✔ Costs ₹0 because Firebase free tier

🛡️ **Security (lol)**
======================

The current Firestore rule is:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   allow read, write: if request.time < timestamp.date(2025, 12, 30);   `

Which basically means:

> “Let everyone do anything, but only until December 2025.”

Future you:Please fix this before someone uploads their math notes to your database.

🤡 **Why This Project Exists**
==============================

Because every college has:

*   That one kid who loses their ID weekly
    
*   That one senior who finds everyone’s ID
    
*   That one admin who gives up and prints duplicates
    

Now they can meet… digitally.

📸 **Screenshots**
==================

_(not done)_
---
## 👩‍💻 Author

**Abhirami Ramadas**

B.Tech Information Technology

LBS Institute of Technology for Women
---


🙃 **Contributing**
===================

If you want to help, send:

*   CSS fixes
    
*   UI ideas
    
*   Snacks
    

But not bugs. We have enough.Just don’t break anything.Or do.Who am I to stop you


But at least now there's a website for it.You're welcome. 😌💛

