/* eslint-disable compat/compat */
const url = 'https://private-9d5e37a-testassignment.apiary-mock.com/get-bears';
const list = document.querySelector('.item-wrapper');
const checkbox = document.querySelector('.checkbox');

function showReserveItem(listItem, className) {
  for (let i = 0; i < list.children.length; i += 1) {
    if (!listItem.children[i].className.includes(className)) {
      listItem.children[i].style.display = 'none';
    }
  }
}

function changeFilterValue(item, value) {
  item.dataset.filter = value;
}

function hideItem(item) {
  item.style.display = 'none';
}

function hideChildrenItem(items) {
  for (let i = 0; i < items.children.length; i += 1) {
    hideItem(items.children[i]);
  }
}

function showItem(item, styleValue) {
  item.style.display = styleValue;
}

function showFilterItem(items, filterStatus) {
  for (let i = 0; i < items.children.length; i += 1) {
    if (items.children[i].getAttribute('data-filter') === filterStatus) {
      showItem(items.children[i], 'flex');
    }
  }
}

function showAllItem(listItem) {
  for (let i = 0; i < listItem.children.length; i += 1) {
    listItem.children[i].style.display = 'flex';
  }
}

function postData(item, button, link, filterValue) {
  fetch(link, {
    method: 'POST',
  }).then((res) => {
    if (res.status === 200) {
      hideItem(item);
      hideItem(button.parentNode);
      changeFilterValue(item, filterValue);
    }
  });
}

function getData(urlLink) {
  return fetch(urlLink).then(response => response.json());
}

function createItem(item) {
  list.innerHTML += `
        <div data-filter="all" id="${item.id}" class="item ${
  item.in_reserve ? 'item--reserve' : ''
}">
        <div class="item__img"><img src="${item.image_url}" alt=""></div>
        <div class="item__info">
            <div class="item__title">${item.name}</div>
            <div class="item__type">${item.type}</div>
            <div class="item__gender">${item.gender}</div>
        </div>
        <button id="accept" class="btn btn-accept">Принять</button>
        <button id="reject" class="btn btn-reject">Отклонить</button>
</div>`;
}

function createData(data) {
  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    createItem(item);
  }
}

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    showReserveItem(list, 'reserve');
  } else {
    showAllItem(list);
  }
});

const selectbox = [...document.querySelectorAll('.select-box__input')];
selectbox.forEach(element => element.addEventListener('change', () => {
  const status = element.value;
  if (status === 'accept') {
    hideChildrenItem(list);
    showFilterItem(list, 'accept');
  } else if (status === 'reject') {
    hideChildrenItem(list);
    showFilterItem(list, 'reject');
  } else if (status === 'all') {
    hideChildrenItem(list);
    showFilterItem(list, 'all');
  }
}));

document.addEventListener('click', (event) => {
  if (event.target.matches('button')) {
    const button = event.target;
    const itemId = button.parentNode.id;
    const item = button.parentNode;
    const acceptLink = `https://private-9d5e37a-testassignment.apiary-mock.com/resolve-bear?id=${itemId}`;
    const rejectLink = `https://private-9d5e37a-testassignment.apiary-mock.com/reject-bear?id=${itemId}`;
    if (button.id === 'accept') {
      postData(item, button, acceptLink, 'accept');
    } else if (button.id === 'reject') {
      postData(item, button, rejectLink, 'reject');
    }
  }
});

getData(url)
  .then(data => createData(data.results.data))
  .catch((err) => {
    throw err;
  });
