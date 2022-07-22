const itemList = document.getElementById("itemList");
const menu = document.querySelector(".menuBar");
const menuBtn = menu.querySelector("button");
const menuCounter = menu.querySelector("span:last-child");
const saveMemoBtn = document.getElementById("save-memo--btn");
const memoArea = document.querySelector(".memo--textarea");

let allValue = 0;
let maxCount = 0;

const loadMemo = () => {
  const memo = localStorage.getItem("memo");
  return memo;
};

memoArea.value = loadMemo();

const paintContent = () => {
  const newForm = document.createElement("form");
  const itemNameInput = document.createElement("input");
  const itemCountInput = document.createElement("input");
  const itemPriceInput = document.createElement("input");
  const itemValueSpan = document.createElement("span");
  itemNameInput.type = "text";
  itemCountInput.type = "number";
  itemPriceInput.type = "number";
  newForm.classList = "itme-form";
  itemNameInput.classList = "item-input item-input__name";
  itemCountInput.classList = "item-input item-input__count";
  itemPriceInput.classList = "item-input item-input__price";
  itemNameInput.placeholder = "아이템 이름";
  itemCountInput.placeholder = "갯수";
  itemPriceInput.placeholder = "아이템 가격";
  itemValueSpan.innerText = "0";
  newForm.appendChild(itemNameInput);
  newForm.appendChild(itemCountInput);
  newForm.appendChild(itemPriceInput);
  newForm.appendChild(itemValueSpan);
  itemList.appendChild(newForm);
  newForm.addEventListener("change", () => {
    itemValueSpan.innerHTML = `${parseInt(
      itemCountInput.value * itemPriceInput.value
    )}`;
  });
};

function createForm() {
  if (maxCount === 7) {
    menuBtn.disabled = true;
    return;
  }
  paintContent();
  maxCount += 1;
}
createForm();

memoArea.addEventListener("change", () => {
  localStorage.setItem("memo", memoArea.value);
});
saveMemoBtn.addEventListener("click", () => {
  localStorage.setItem("memo", memoArea.value);
});

itemList.addEventListener("change", () => {
  const a = itemList.querySelectorAll("form span");
  allValue = 0;
  a.forEach((item) => {
    allValue = allValue + parseInt(item.innerText);
  });
  menuCounter.innerText = `${allValue} 길`;
});
menuBtn.addEventListener("click", createForm);
