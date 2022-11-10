
const addBtn = document.getElementById('add')
 console.log(add)
const notes = JSON.parse(localStorage.getItem('notes'))
 console.log(notes)
if(notes) {
    notes.forEach(note => addNewNote(note))
}
addBtn.addEventListener('click', () => addNewNote())
 
function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')
 
    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')
 
    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
      deleteNote(note)
    })

    editBtn.addEventListener('click', () => {
      editNote(main, textArea)
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target
 
        main.innerHTML = marked(value)
        updateLS()
    })
    document.body.appendChild(note)
}
 
function updateLS() {
    const notesText = document.querySelectorAll('textarea')
    const notes = []
 
    notesText.forEach(note => notes.push(note.value))
 
    localStorage.setItem('notes', JSON.stringify(notes))
    console.log(notes)
}

function deleteNote(note) {
  note.remove()

  updateLS()
}

function editNote(main, textArea) {

  main.classList.toggle('hidden')
  textArea.classList.toggle('hidden')
}


//function getNewNote() {
  //return  '<div class="note">' + 
          //'<input type="text">' +
          //'</div>';
//}
//$('#add-button').on('click', function(){
  //var note = getNewNote();
  //$('#sticky-note-container').append(note);
//}); 

//function getNewNote() {
  //return  '<div class="note">' + 
          //'<input type="text">' +
          //'</div>';
//}

//$('#add-button').on('click', function(){
  //var $note = $(getNewNote());
  //$note.draggable();$('#sticky-note-container').append($note)
//});