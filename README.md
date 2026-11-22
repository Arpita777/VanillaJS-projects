# Vanilla JavaScript Projects 🚀

A collection of interactive frontend projects built using **HTML5, CSS3, and Vanilla JavaScript (ES6+)**.

This repository showcases practical implementations of core JavaScript concepts, browser APIs, DOM manipulation, event handling, asynchronous operations, and frontend UI patterns — without relying on frontend frameworks or libraries.

The goal is to strengthen core JavaScript fundamentals through hands-on implementation of real-world UI components and interactive applications.

## 🛠️ Tech Stack

- **HTML5** – Semantic markup and application structure
- **CSS3** – Styling, layouts, and UI interactions
- **JavaScript (ES6+)** – Application logic, DOM manipulation, and event handling
- **Browser APIs** – Local Storage, FileReader, Clipboard API, Picture-in-Picture API, and Drag and Drop API
- **Fetch API** – Asynchronous data fetching and API integration

## 📂 Projects

### 1. Kanban Board

A task management board that allows users to organise and manage tasks across different workflow stages.

**Features:**
- Four workflow columns: Backlog, In Progress, Completed, and On Hold.
- Drag-and-drop functionality to move and reorder tasks across columns.
- Add, edit, and delete tasks.
- Persist task data using Local Storage.
- Dynamically update the UI based on user interactions.

**Concepts:** HTML Drag and Drop API, DOM manipulation, array operations, event handling, Local Storage.

[View Source Code](./KanbanBoard)

### 2. Nested Comments with CRUD Operations

A nested commenting interface supporting hierarchical replies and comment management.

**Features:**
- Add new comments.
- Reply to existing comments at multiple nesting levels.
- Edit existing comments.
- Delete comments and their nested replies.
- Dynamically render nested comment structures.

**Concepts:** Recursion, nested data structures, CRUD operations, DOM manipulation, event handling.

[View Source Code](./nested-comment-with-crud-operations)

### 3. Autocomplete / Typeahead

An autocomplete search component that dynamically suggests matching products while the user types.

**Features:**
- Fetch product suggestions using the DummyJSON API.
- Implement debouncing to reduce unnecessary API requests.
- Highlight matching search text.
- Keyboard navigation using Arrow Up, Arrow Down, and Enter.
- Select suggestions using mouse interactions.

**Concepts:** Debouncing, Fetch API, async/await, keyboard events, DOM manipulation, array methods.

[View Source Code](./autocomplete-typeahead)

### 4. File Upload

An image upload interface supporting both file selection and drag-and-drop interactions.

**Features:**
- Upload images using the file picker or drag-and-drop.
- Support PNG, JPG, and JPEG formats.
- Validate file types and prevent duplicate file uploads.
- Preview uploaded images in a separate browser tab.
- Remove uploaded files.
- Persist uploaded image data using Local Storage.
- Display success and error notifications.

**Concepts:** File API, FileReader API, Drag and Drop API, Local Storage, event handling, file validation.

[View Source Code](./FileUpload)

### 5. Vedic Quotes Generator

A quote generator that displays randomly selected quotes and allows users to copy them.

**Features:**
- Fetch quotes from an external API.
- Display a randomly selected quote and its author.
- Generate a new quote on demand.
- Copy quotes using the Clipboard API.
- Display loading indicators and success notifications.

**Concepts:** Fetch API, async/await, Promise handling, Clipboard API, randomisation, DOM manipulation.

[View Source Code](./quote-generator)

### 6. Picture-in-Picture

A browser-based Picture-in-Picture implementation using the native browser APIs.

**Features:**
- Capture a screen or display stream.
- Render the captured stream in a video element.
- Enable Picture-in-Picture mode.
- Handle asynchronous browser API operations.

**Concepts:** MediaDevices API, Screen Capture API, Picture-in-Picture API, async/await.

[View Source Code](./picture-in-picture)

### 7. Modal Popup

A simple modal component demonstrating overlay-based UI interactions.

**Features:**
- Open a modal using a trigger button.
- Close the modal using a close button.
- Toggle modal visibility dynamically.

**Concepts:** DOM manipulation, event listeners, UI state through CSS properties.

[View Source Code](./modal-popup)

### 8. Progress Bar

An animated progress bar that visually represents progress over time.

**Features:**
- Start progress using a button.
- Dynamically update progress percentage.
- Animate progress in incremental steps.
- Stop the interval when progress reaches 100%.

**Concepts:** setInterval, clearInterval, DOM manipulation, dynamic CSS updates.

[View Source Code](./ProgressBar)

## 🚀 Getting Started

These projects use plain HTML, CSS, and JavaScript. No build tools, package installations, or framework dependencies are required.

### Prerequisites

- A modern web browser.
- Git installed on your machine.
- A code editor such as VS Code (optional).

### Clone the Repository

```bash
git clone https://github.com/Arpita777/VanillaJS-projects.git

cd VanillaJS-projects
```

### Run a Project

Navigate to any project directory and open its `index.html` file in your browser.

For example:

```bash
cd KanbanBoard
```

You can also use the VS Code Live Server extension to serve the projects locally.

**Note:** Projects that use external APIs or browser capabilities such as screen capture and Picture-in-Picture may require an internet connection, browser permissions, and a secure context (HTTPS or localhost).

## 🧠 JavaScript Concepts Covered

This repository explores several important frontend development concepts:

| Category | Concepts |
|---|---|
| DOM Manipulation | Selecting elements, creating elements, updating DOM dynamically |
| Event Handling | Click, keyboard, drag-and-drop, input events |
| JavaScript Functions | Callbacks, closures, reusable functions |
| Asynchronous JavaScript | Promises, async/await, Fetch API |
| Performance | Debouncing |
| Data Structures | Arrays, nested objects, recursive traversal |
| Browser Storage | Local Storage |
| Browser APIs | FileReader, Clipboard, MediaDevices, Picture-in-Picture |
| UI Development | Modals, autocomplete, progress indicators, Kanban boards |

## 🎯 Purpose

These projects are part of my continuous learning and practice in frontend engineering.

They help reinforce core JavaScript fundamentals, understand browser APIs, explore UI interaction patterns, and improve problem-solving skills through practical implementations.

## 👩‍💻 Author

**Arpita Biswal**

- GitHub: [Arpita777](https://github.com/Arpita777)
- Portfolio: [Visit My Portfolio](https://arpitabiswalportfolio.netlify.app/)

---

⭐ If you find these projects useful, feel free to explore the repository!
