/* получаем элементы приложения по ID */
const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

// console.log(inputElement.value);

/* Создаем массив */
//каждый элемент заметки будем описывать как объект
// const notes = [
//   {
//     title: "Записать блок про массивы",
//     completed: false, //выполнена заметка или нет
//   },
//   {
//     title: "Рассказать теорию объектов",
//     completed: true, //выполнена заметка или нет
//   },
// ];

//Вызовем функцию getNoteTemplate
// function render() {
//   //но тут проблемка: если будет много заметочек, то их нужно будет постоянно
//   // прописывать. Упростим задачку: используем цикл. Обычно цикл начинается 0,
//   // как массив. Далее мы говорим, до какого условия мы будем делать итерацию,
//   // до момента, пока i будет меньше длины массива. При каждой итерации необходимо
//   // увеличивать i на 1.

//   // for (let i = 0; i < notes.length; i++) {
//   //   listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i]));
//   // }

//   //более современная запись. Создаем саму заметку из цикла notes
//   for (let note of notes) {
//     listElement.insertAdjacentHTML("beforeend", getNoteTemplate(note));
//   }
// }

// render();

/* получаем обработчик события на кнопку Добавить */
// Обращаемся к списку (listElement). И далее используем свойство innerHTML = inputElement.value,
// то есть при клике мы Обращаемся к списку и берем значение его инпута.

// createBtn.onclick = function () {
//   if (inputElement.value.length === 0) {
//     //ввод значения в пустой инпут. При Клике он не добавляется.
//     return;
//   }
//   // listElement.innerHTML =
//   /* Чтобы не копировать сюда весь HTML-код и не загромождать, можно сделать проще! */
//   // первым параметром указываем, куда нам нужно положить данный html-код("beforeend"), т.е. перед тем, как
//   // закончится html-код данного элемента. И вторым параметром передаем саму строку.

//   //вызовем функцию создания шаблона getNoteTemplate и присвоем значению инпута
//   listElement.insertAdjacentHTML(
//     "beforeend",
//     getNoteTemplate(inputElement.value)
//   );
//   inputElement.value = ""; //очистка инпута
// };

/* функция, возвращающая шаблон заметки */
// Она принимает аргумент title.
// function getNoteTemplate(title) {
//   return `
//         <li
//           class="list-group-item d-flex justify-content-between align-items-center"
//         >
//           <span>${title}</span>
//           <span>
//             <span class="btn btn-small btn-success">&check;</span>
//             <span class="btn btn-small btn-danger">&times;</span>
//           </span>
//         </li>
//   `;
// }

const notes = [
  {
    title: "Записать блок про массивы",
    completed: false, //выполнена заметка или нет
  },
  {
    title: "Рассказать теорию объектов",
    completed: true, //выполнена заметка или нет
  },
];

function render() {
  listElement.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i));
  }

  // for (let note of notes) {
  //   listElement.insertAdjacentHTML("beforeend", getNoteTemplate(note));
  // }
}

render();

createBtn.onclick = function () {
  if (inputElement.value.length === 0) {
    //ввод значения в пустой инпут. При Клике он не добавляется.
    return;
  }

  //создадим заметку, это объект
  const newNote = {
    title: inputElement.value,
    completed: false,
  };
  notes.push(newNote);
  render();

  // listElement.innerHTML =
  /* Чтобы не копировать сюда весь HTML-код и не загромождать, можно сделать проще! */
  // первым параметром указываем, куда нам нужно положить данный html-код("beforeend"), т.е. перед тем, как
  // закончится html-код данного элемента. И вторым параметром передаем саму строку.

  //вызовем функцию создания шаблона getNoteTemplate и присвоем значению инпута

  inputElement.value = ""; //очистка инпута
};

listElement.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type === "toggle") {
      notes[index].completed = !notes[index].completed;
    } else if (type === "remove") {
      notes.splice(index, 1);
    }

    render();
  }
};

//в методе render мы получили заметку (note) и передаем ее в функции getNoteTemplate(note).
function getNoteTemplate(note, index) {
  return `
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span class="${
            //если note.completed находится в значении true, то ему добавляется клас text-decoration-line-through
            //а если нет, то ничего не добавляем.
            note.completed ? "text-decoration-line-through" : ""
          }">${note.title}</span>
          <span>
            <span class="btn btn-small btn-${
              note.completed ? "warning" : "success"
            }" data-index="${index}" data-type="toggle">&check;</span>
            <span class="btn btn-small btn-danger" data-type="remove"
            data-index="${index}">&times;</span>
          </span>
        </li>
  `;
}
