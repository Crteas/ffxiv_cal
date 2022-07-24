const itemList = document.getElementById("itemList");
const menu = document.querySelector(".menuBar");
const menuBtn = menu.querySelector("button");
const menuCounter = menu.querySelector("span:last-child");
const saveMemoBtn = document.getElementById("save-memo--btn");
const memoArea = document.querySelector(".memo--textarea");
const crystal_container = document.getElementById("crystal_container");
const crystal1 = crystal_container.querySelector("#crystal1");
const crystal2 = crystal_container.querySelector("#crystal2");

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

//메모
memoArea.addEventListener("change", () => {
  localStorage.setItem("memo", memoArea.value);
});
saveMemoBtn.addEventListener("click", () => {
  localStorage.setItem("memo", memoArea.value);
});

const addItemValue = () => {
  const itemValueList = itemList.querySelectorAll("form span");
  const crystalValue = crystal_container.querySelectorAll(
    "div span:last-child"
  );

  allValue = 0;
  itemValueList.forEach((item) => {
    allValue = allValue + parseInt(item.innerText);
  });
  crystalValue.forEach((item) => {
    allValue = allValue + parseInt(item.innerText);
  });
  menuCounter.innerText = `${allValue} 길`;
};

crystal_container.addEventListener("change", addItemValue);
itemList.addEventListener("change", addItemValue);
menuBtn.addEventListener("click", createForm);

//크리스탈 계산함수
const crystal_value = (event) => {
  const path = event.composedPath();
  const crystal_count = path[1].querySelector(".item-input__crystal--count");
  const crystal_price = path[1].querySelector(".item-input__crystal--price");
  const crystal_value = path[1].querySelector("span:last-child");
  crystal_value.innerHTML = crystal_count.value * crystal_price.value;
  console.log();
};

crystal1.addEventListener("change", crystal_value);
crystal2.addEventListener("change", crystal_value);
