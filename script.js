// Selecting elements from the DOM
const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// Function to save notes to localStorage
const saveNotes = () => {
    const notes = document.querySelectorAll(".note .content");
    const titles = document.querySelectorAll(".note .title");
    const dates = document.querySelectorAll(".note .date");

    const data = [];

    notes.forEach((note, index) => {
        const content = note.value;
        const title = titles[index].value;
        const date = dates[index].textContent;
        
        if (content.trim() !== "") {
            data.push({ title, content, date });
        }
    });

    localStorage.setItem("notes", JSON.stringify(data));
};

// Function to add a new note
const addNote = (text = "", title = "") => {
    const note = document.createElement("div");
    note.classList.add("note");

    // Get current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    note.innerHTML = `
    <div class="icons">
        <i class="save fas fa-save" style="color:red"></i>
        <i class="trash fas fa-trash" style="color:yellow"></i>
    </div>
    <div class="title-div">
        <textarea class="title" placeholder="Write the title ...">${title}</textarea>
    </div>
    <textarea class="content" placeholder="Note down your thoughts ...">${text}</textarea>
    <div class="date">${formattedDate}</div> <!-- Add date stamp -->
    `;

    // Event listeners for save and delete buttons
    function handleTrashClick() {
        note.remove();
        saveNotes();
    }

    function handleSaveClick() {
        saveNotes();
    }

    const delBtn = note.querySelector(".trash");
    const saveButton = note.querySelector(".save");

    delBtn.addEventListener("click", handleTrashClick);
    saveButton.addEventListener("click", handleSaveClick);

    main.appendChild(note);
    saveNotes();
};

// Function to load saved notes from localStorage
const loadNotes = () => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    savedNotes.forEach(({ title, content, date }) => {
        addNote(content, title, date);
    });
};

// Event listener for the add note button
addBtn.addEventListener("click", () => {
    addNote();
});

// Load existing notes on page load
loadNotes();
