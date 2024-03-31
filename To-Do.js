const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

function displayDate() {
    let date = new Date();
    date = date.toString().split(" ");
    document.querySelector('#date').innerHTML = date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
    displayDate();
    displayItem();
};

document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item");
    createItem(item.value);
});

function createItem(itemValue) {
    const item = document.querySelector("#item")

    if (itemValue === "") {
        alert("Enter A Task!!!");
    } else {
        itemsArray.push(itemValue);
        localStorage.setItem("items", JSON.stringify(itemsArray));
        displayItem(); // Display updated list
        item.value =""; // Reset the input value
    }
}

function displayItem() {
    let items = "";
    for (let i = 0; i < itemsArray.length; i++) {
        items += `<div class="item">
                    <div class="input-controller">
                        <input type="checkbox" class="item-checkbox">
                        <textarea class="line-through-textarea" disabled>${itemsArray[i]}</textarea>
                        <div class="edit-controller">
                            <i class="fas fa-edit editBtn"></i> <!-- Changed Font Awesome classes -->
                            <i class="fas fa-trash deleteBtn"></i> <!-- Changed Font Awesome classes -->
                        </div>
                    </div>
                    <div class="update-controller" style="display: none;">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`;
    }
    activateCheckboxListeners();
    document.querySelector('.to-do-list').innerHTML = items;
    activateEditListeners();
    activateDeleteListeners();
    activateSaveListeners();
    activateCancelListeners();
    activateCompletedTasks();
    activateCheckboxListeners();
}

function activateCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', toggleLineThrough)
    });
}

function activateCompletedTasks() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach((checkbox) => {
        const itemContainer = checkbox.closest('.item');
        const textarea = itemContainer.querySelector('textarea');
        if (checkbox.checked) {
            textarea.classList.add('line-through-textarea');
        } else {
            textarea.classList.remove('line-through-textarea'); // Remove the line-through effect
        }
    });
}

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => { deleteItem(i); });
    }); 
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn");
    editBtn.forEach((eb, i) =>{
        eb.addEventListener("click", () =>{
            document.querySelectorAll(".update-controller")[i].style.display = "block";
            document.querySelectorAll(".input-controller textarea")[i].disabled = false;
        });
    });
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i) =>{
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i);
        });
    });
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cb, i) =>{
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none";
            inputs[i].disabled = true;
        });
    });
}

function updateItem(text, i){
     itemsArray[i] = text;
     localStorage.setItem("items", JSON.stringify(itemsArray));
     displayItem();
}

function deleteItem(i){
    itemsArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    displayItem();
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const item = document.querySelector("#item");
        createItem(item.value);
    }
});

function toggleLineThrough(event) {
    const checkbox = event.target;
    var itemContainer = checkbox.closest('.item');
    var textarea = itemContainer.querySelector('textarea');
    if (checkbox.checked) {
        textarea.classList.add('line-through-textarea');
    } else {
        textarea.classList.remove('line-through-textarea');
    }
}
