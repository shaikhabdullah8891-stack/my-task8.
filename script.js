const dragList = document.getElementById("dragList");
const message = document.getElementById("message");

let draggedItem = null;

const items = dragList.querySelectorAll("li");

items.forEach(function (item) {

    // When dragging starts
    item.addEventListener("dragstart", function () {
        draggedItem = item;
        item.classList.add("dragging");
    });

    // When dragging ends
    item.addEventListener("dragend", function () {
        item.classList.remove("dragging");
        draggedItem = null;
    });

    // Allow dropping
    item.addEventListener("dragover", function (event) {
        event.preventDefault();

        const currentItem = event.currentTarget;

        if (currentItem === draggedItem) {
            return;
        }

        const rect = currentItem.getBoundingClientRect();
        const middle = rect.top + rect.height / 2;

        if (event.clientY < middle) {
            dragList.insertBefore(draggedItem, currentItem);
        } else {
            dragList.insertBefore(
                draggedItem,
                currentItem.nextElementSibling
            );
        }
    });

    // Drop event
    item.addEventListener("drop", function (event) {
        event.preventDefault();
        message.textContent = "List order updated successfully!";
    });

});