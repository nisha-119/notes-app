
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let title = document.getElementById("title");
    let tag = document.getElementById("tag");

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    console.log(tag);
    notesObj.push([addTxt.value, title.value, tag.value]);
    console.log(notesObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    title.value = "";
    addTxt.value = "";
    showNotes();
})
function showNotes() {
    let addNoteBox = document.getElementById("addNoteBox");
    addNoteBox.style.display = "none";
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {


        html +=
            ` 
     <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
             <div class="card-body">
                 <h5 class="card-title"> ${element[1]} </h5>
                 <p class="card-text"> ${element[0]}</p>
                 
                 <a class="btn btn-primary" id = "${index}" onClick=deleteNode(this.id) >Delete Note</a>
                 <button type="button" class="btn btn-outline-dark btn-sm" id="tag${index}" onClick=searchTag(this.id)>${element[2]}</button>
             </div>
         </div>`;


    });
    let notesElm = document.getElementById('notes');
    if (notes != 0) {
        notesElm.innerHTML = html;
    }
}

//display the add note box
addNewNoteBtn = document.getElementById('addNewNoteBtn')
addNewNoteBtn.addEventListener('click', function () {
    addNoteBox.style.display = 'block';
})

//show all nodes
showAllNotes = document.getElementById('showNotesBtn');
showAllNotes.addEventListener('click', function () {
    console.log("clicked");
    showNotes();
});

//delet a node
function deleteNode(index) {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

search = document.getElementById("searchInput");
search.addEventListener("input", function () {
    let inputVal = search.value;
    //console.log("input fired", inputVal);
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        txt = element.getElementsByTagName("p")[0].innerText;
        //console.log(txt, inputVal);
        if (txt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

})

function searchTag(tag) {

    let noteCard = document.getElementsByClassName("noteCard");
    tagTxt = document.getElementById(tag).innerHTML;
    console.log(tagTxt);

    Array.from(noteCard).forEach(function (element) {
        txt = element.getElementsByTagName("button")[0].innerHTML;
        console.log(txt);

        if (txt === tagTxt) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })
}

