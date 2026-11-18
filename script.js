const hero = document.getElementById("hero");
const game = document.getElementById("game");
const result = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const choices = document.getElementById("choices");
const question = document.getElementById("question");
const hint = document.getElementById("hint");
const stepLabel = document.getElementById("stepLabel");
const progressFill = document.getElementById("progressFill");
const micro = document.getElementById("micro");
const toast = document.getElementById("toast");

const rounds = [
  {
    title: "Что сегодня выбирает твоё настроение?",
    hint: "Выбери то, что больше откликается ♡",
    options: [["Медленное и уютное утро", "☁"], ["Много улыбок и приключений", "✧"], ["Немного волшебства", "✿"]]
  },
  {
    title: "Что могло бы сделать утро ещё лучше?",
    hint: "Представь, что можно выбрать что угодно.",
    options: [["Любимый напиток и вкусный завтрак", "☕"], ["Объятия на целую вечность", "♡"], ["Сообщение от важного человека", "✉"]]
  },
  {
    title: "И последний вопрос, малыш…",
    hint: "Отвечай сердцем, тут всё правильно.",
    options: [["Улыбнуться прямо сейчас", "☺"], ["Получить ещё один комплимент", "✧"], ["Узнать, насколько я тебя обожаю", "♡"]]
  }
];

let current = 0;
let toastTimer;

function showToast() {
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function renderRound() {
  const round = rounds[current];
  question.textContent = round.title;
  hint.textContent = round.hint;
  stepLabel.textContent = `МИНУТКА СЧАСТЬЯ · 0${current + 1} / 03`;
  progressFill.style.width = `${((current + 1) / 3) * 100}%`;
  micro.textContent = current === 2 ? "Остался всего один маленький шаг ♡" : "Тут нет неправильных ответов.";
  choices.innerHTML = "";

  round.options.forEach(([label, icon]) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.innerHTML = `${label} <span>${icon}</span>`;
    button.addEventListener("click", () => {
      if (current < rounds.length - 1) {
        current += 1;
        renderRound();
      } else {
        game.classList.add("hidden");
        result.classList.remove("hidden");
      }
    });
    choices.appendChild(button);
  });
}

startBtn.addEventListener("click", () => {
  hero.classList.add("hidden");
  game.classList.remove("hidden");
  current = 0;
  renderRound();
});

document.getElementById("againBtn").addEventListener("click", () => {
  result.classList.add("hidden");
  hero.classList.remove("hidden");
  current = 0;
  window.scrollTo({ top: 0, behavior: "smooth" });
});
