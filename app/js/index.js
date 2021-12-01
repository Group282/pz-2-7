let start = document.querySelector('.virsta-start');
let main = document.querySelector('.virsta-main');
let finish = document.querySelector('.virsta-finish');
let play = document.querySelector('.virsta-play');
let timer = document.querySelector("#virsta-timer");
let play_parts = document.querySelectorAll('.virsta-play-part');

let flag = false;
let count_number = 1;
let win_time = 0;
let timerId;
let settimerId;

let list_colors = ["black", "pink", "silver", "maroon", "red", "purple", "fuchsia", "green",
  "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "orange", "aquamarine", "brown",
  "chartreuse", "chocolate", "coral", "cornflowerblue", "crimson", "darkgoldenrod", "gold"];

$("#virsta-button-started").on("click", (event) => {
  start.classList.toggle('virsta-display-none');
  main.classList.toggle('virsta-display-none');

  let random_number = randomUniqueNum(25, 25);
  let count = 0;

  play.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let div = document.createElement('div');
      div.className = 'virsta-play-part';
      div.innerHTML = `<strong style=\"font-size: ${getRandomInt(15, 61)}px; color: ${list_colors[getRandomInt(0, list_colors.length)]};\"><b>${random_number[count++]}</b></strong>`;
      play.append(div);
    }
  }

  play_parts = document.querySelectorAll('.virsta-play-part');

  let timer_count = 60;
  flag = true;

  timerId = setInterval(() => {
    timer.textContent = `Залишилось: ${timer_count--}`;
  }, 1000);

  count_number = 1;

  for (let i = 0; i < play_parts.length; i++) {
    play_parts[i].addEventListener("click", (event) => {
      if (flag) {
        play_parts[i].classList.add('virsta-play-part-click');
        if (parseInt(play_parts[i].outerHTML.match(/>\d+</)[0].match(/\d+/)[0]) === count_number) {
          if (count_number === 10) {
            clearInterval(settimerId);
            clearInterval(timerId);
            alert('Ви виграли!!!!');
            win_time = 60 - parseInt(timer.textContent.match(/\d+/)[0]);

            localStorage.setItem(`Гра ${localStorage.length + 1}`, `${win_time}`);

            for(let i = 0; i < localStorage.length; i++) {
              let key = localStorage.key(i);
              $('#virsta-table').append(`<tr><td>${i + 1}</td><td>${key}</td><td>${localStorage.getItem(key)} c</td></tr>`);
            }

            main.classList.toggle('virsta-display-none');
            finish.classList.toggle('virsta-display-none');

          } else count_number++;
        } else {
          clearInterval(settimerId);
          clearInterval(timerId);
          alert('Ви програли(');
          flag = false;
          main.classList.toggle('virsta-display-none');
          start.classList.toggle('virsta-display-none');
        }
      }
    });
  }

  settimerId = setTimeout(() => {
    clearInterval(timerId);
    alert('Ви програли(');
    main.classList.toggle('virsta-display-none');
    start.classList.toggle('virsta-display-none');
    flag = false;
  }, 61000);
});

$('#virsta-button-restart').on("click", (event) => {
  clearInterval(timerId);
  start.classList.toggle('virsta-display-none');
  main.classList.toggle('virsta-display-none');
});

$('#virsta-button-restart2').on("click", (event) => {
  clearInterval(timerId);
  start.classList.toggle('virsta-display-none');
  finish.classList.toggle('virsta-display-none');
});

function randomUniqueNum(range, outputCount) {

  let arr = [];
  for (let i = 1; i <= range; i++) {
    arr.push(i)
  }

  let result = [];

  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(arr[random]);
    arr[random] = arr[range - i];
  }

  return result;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
