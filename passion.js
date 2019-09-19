const spreadsheetID = "1GvrzSYpACOKpxCxOmdpSceRjgvSakQhB29ZRXb0T5BE";
const endpoint = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/od6/public/values?alt=json`;

fetch(endpoint).then(res => res.json()).then(showActivities);

function showActivities(data) {
    const myArray = data.feed.entry;
    myArray.forEach(showItems)
}

function showItems(itemData) {
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);


    copy.querySelector("button").textContent = itemData.gsx$activity.$t;
    copy.querySelector(".activityImg").src = `images/${itemData.gsx$image.$t}`;
    copy.querySelector(".activityImg").alt = `activity`;

    console.log(itemData)

    if (!itemData.gsx$id.$t) {
        copy.querySelector("button").classList.remove("title");
    }

    /*MODAL*/

    const modal = document.querySelector(".modal-bg");
    const myBtn = copy.querySelector("button");
    const closeModal = document.querySelector(".close");
    myBtn.addEventListener("click", showModal);
    closeModal.addEventListener("click", hideModal)

    function showModal() {
        modal.style.display = "block";
        modal.querySelector(".modal-title").textContent = itemData.gsx$activity.$t;
        modal.querySelector(".modal-description").textContent = itemData.gsx$description.$t;
        modal.querySelector(".modal-image").src = `images/modal/${itemData.gsx$modal.$t}`;
        modal.querySelector("a .modal-link").textContent = itemData.gsx$google.$t;
    }

    function hideModal() {
        modal.style.display = "none";
    }
    document.querySelector("main").appendChild(copy);
}
