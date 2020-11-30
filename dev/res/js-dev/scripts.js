// import getData from "./my_components/data";
const url = `https://private-9d5e37a-testassignment.apiary-mock.com/get-bears`;
let list = document.querySelector(".item-wrapper"); //тело для отрисовки карточек
let checkbox = document.querySelector(".checkbox");
let item = document.querySelector(".reserv");
let btn = document.querySelector("button");

checkbox.addEventListener("change", () => {
  checkbox.checked ? showReserveItem(list, "reserve") : showAllItem(list);
});

document.addEventListener("click", function (event) {
  if (event.target.matches(".select-box__list label")) {
    let status = event.target.getAttribute("data-filter");
    if (status === "accept") {
      hideChildrenItem(list);
      showFilterItem(list, "accept");
    } else if (status === "reject") {
      hideChildrenItem(list);
      showFilterItem(list, "reject");
    } else if (status === "all") {
      hideChildrenItem(list);
      showFilterItem(list, "all");
    }
  }
});

//work with btn
document.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    let button = event.target;
    let itemId = button.parentNode.id;
    let item = button.parentNode.parentNode;
    let dataFilter = button.parentNode.dataset.filter;
    let acceptLink = `https://private-9d5e37a-testassignment.apiary-mock.com/resolve-bear?id=${itemId}`;
    let rejectLink = `https://private-9d5e37a-testassignment.apiary-mock.com/reject-bear?id=${itemId}`;

    if (button.id === "accept") {
      postData(item, button, acceptLink, "accept");
    } else if (button.id === "reject") {
      postData(item, button, rejectLink, "reject");
    }
  }
});

getData(url)
  .then((data) => createData(data.results.data))
  .catch((err) => console.log(err));

function showReserveItem(list, className) {
  for (let i = 0; i < list.children.length; i++) {
    list.children[i].className.includes(className)
      ? true
      : (list.children[i].style.display = "none");
  }
}

function changeFilterValue(item, value) {
  item.dataset.filter = value;
}

function hideChildrenItem(items) {
  for (let i = 0; i < items.children.length; i++) {
    hideItem(items.children[i]);
    console.log(items.children[i].childNodes);
  }
}

function hideItem(item) {
  item.style.display = "none";
}

function showFilterItem(items, filterStatus) {
  for (let i = 0; i < items.children.length; i++) {
    if (items.children[i].getAttribute("data-filter") === filterStatus) {
      showItem(items.children[i], "flex");
    }
  }
}

function showItem(item, styleValue) {
  item.style.display = styleValue;
}

function showAllItem(list) {
  for (let i = 0; i < list.children.length; i++) {
    list.children[i].style.display = "flex";
  }
}

function postData(item, button, link, filterValue) {
  fetch(link, {
    method: "POST",
  }).then((res) => {
    if (res.status === 200) {
      console.log("Request complete! response:", res);
      console.log("Status code:", res.status);
      hideItem(item);
      hideItem(button.parentNode);
      postData(link, item);
      changeFilterValue(item, filterValue);
    }
  });
}

function getData(url) {
  return fetch(url).then((response) => {
    return response.json();
  });
}

//create data in dom
function createData(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].in_reserve
      ? createReserveItem(data, list, i)
      : createSimpleItem(data, list, i);
  }
}

function createReserveItem(data, element, index) {
  element.innerHTML += `
  <div data-filter="all" id="${data[index].id}" class="item reserv reserve-bg-color">
  <div class="item__img img--in-reserve"><img src="${data[index].image_url}" alt=""></div>
  <div class="item__title-reserve reserve-title-color">В заповеднике</div>
  <div class="item__info reserve-text-color">
      <div class="item__title">${data[index].name}</div>
      <div class="item__type">${data[index].type}</div>
      <div class="item__gender">${data[index].gender}</div>
  </div>
  <div class="inner-btn">
      <button id="accept" class="btn btn-accept">Принять</button>
      <button id="reject" class="btn btn-reject reserve-btn-reject-theme">Отклонить</button>
  </div>
</div>`;
}

function createSimpleItem(data, element, index) {
  element.innerHTML += `
        <div data-filter="all" id="${data[index].id}" class="item">
        <div class="item__img"><img src="${data[index].image_url}" alt=""></div>
        <div class="item__info">
            <div class="item__title">${data[index].name}</div>
            <div class="item__type">${data[index].type}</div>
            <div class="item__gender">${data[index].gender}</div>
        </div>
        <div class="inner-btn">
            <button id="accept" class="btn btn-accept">Принять</button>
            <button id="reject" class="btn btn-reject">Отклонить</button>
        </div>
    </div>`;
}
