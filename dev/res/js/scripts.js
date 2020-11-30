(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

"use strict";

// import getData from "./my_components/data";
var url = "https://private-9d5e37a-testassignment.apiary-mock.com/get-bears";
var list = document.querySelector(".item-wrapper"); //тело для отрисовки карточек

var checkbox = document.querySelector(".checkbox");
var item = document.querySelector(".reserv");
var btn = document.querySelector("button");
checkbox.addEventListener("change", function () {
  checkbox.checked ? showReserveItem(list, "reserve") : showAllItem(list);
});
document.addEventListener("click", function (event) {
  if (event.target.matches(".select-box__list label")) {
    var status = event.target.getAttribute("data-filter");

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
}); //work with btn

document.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    var button = event.target;
    var itemId = button.parentNode.id;
    var _item = button.parentNode.parentNode;
    var dataFilter = button.parentNode.dataset.filter;
    var acceptLink = "https://private-9d5e37a-testassignment.apiary-mock.com/resolve-bear?id=".concat(itemId);
    var rejectLink = "https://private-9d5e37a-testassignment.apiary-mock.com/reject-bear?id=".concat(itemId);

    if (button.id === "accept") {
      postData(_item, button, acceptLink, "accept");
    } else if (button.id === "reject") {
      postData(_item, button, rejectLink, "reject");
    }
  }
});
getData(url).then(function (data) {
  return createData(data.results.data);
}).catch(function (err) {
  return console.log(err);
});

function showReserveItem(list, className) {
  for (var i = 0; i < list.children.length; i++) {
    list.children[i].className.includes(className) ? true : list.children[i].style.display = "none";
  }
}

function changeFilterValue(item, value) {
  item.dataset.filter = value;
}

function hideChildrenItem(items) {
  for (var i = 0; i < items.children.length; i++) {
    hideItem(items.children[i]);
    console.log(items.children[i].childNodes);
  }
}

function hideItem(item) {
  item.style.display = "none";
}

function showFilterItem(items, filterStatus) {
  for (var i = 0; i < items.children.length; i++) {
    if (items.children[i].getAttribute("data-filter") === filterStatus) {
      showItem(items.children[i], "flex");
    }
  }
}

function showItem(item, styleValue) {
  item.style.display = styleValue;
}

function showAllItem(list) {
  for (var i = 0; i < list.children.length; i++) {
    list.children[i].style.display = "flex";
  }
}

function postData(item, button, link, filterValue) {
  fetch(link, {
    method: "POST"
  }).then(function (res) {
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
  return fetch(url).then(function (response) {
    return response.json();
  });
} //create data in dom


function createData(data) {
  for (var i = 0; i < data.length; i++) {
    data[i].in_reserve ? createReserveItem(data, list, i) : createSimpleItem(data, list, i);
  }
}

function createReserveItem(data, element, index) {
  element.innerHTML += "\n  <div data-filter=\"all\" id=\"".concat(data[index].id, "\" class=\"item reserv reserve-bg-color\">\n  <div class=\"item__img img--in-reserve\"><img src=\"").concat(data[index].image_url, "\" alt=\"\"></div>\n  <div class=\"item__title-reserve reserve-title-color\">\u0412 \u0437\u0430\u043F\u043E\u0432\u0435\u0434\u043D\u0438\u043A\u0435</div>\n  <div class=\"item__info reserve-text-color\">\n      <div class=\"item__title\">").concat(data[index].name, "</div>\n      <div class=\"item__type\">").concat(data[index].type, "</div>\n      <div class=\"item__gender\">").concat(data[index].gender, "</div>\n  </div>\n  <div class=\"inner-btn\">\n      <button id=\"accept\" class=\"btn btn-accept\">\u041F\u0440\u0438\u043D\u044F\u0442\u044C</button>\n      <button id=\"reject\" class=\"btn btn-reject reserve-btn-reject-theme\">\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C</button>\n  </div>\n</div>");
}

function createSimpleItem(data, element, index) {
  element.innerHTML += "\n        <div data-filter=\"all\" id=\"".concat(data[index].id, "\" class=\"item\">\n        <div class=\"item__img\"><img src=\"").concat(data[index].image_url, "\" alt=\"\"></div>\n        <div class=\"item__info\">\n            <div class=\"item__title\">").concat(data[index].name, "</div>\n            <div class=\"item__type\">").concat(data[index].type, "</div>\n            <div class=\"item__gender\">").concat(data[index].gender, "</div>\n        </div>\n        <div class=\"inner-btn\">\n            <button id=\"accept\" class=\"btn btn-accept\">\u041F\u0440\u0438\u043D\u044F\u0442\u044C</button>\n            <button id=\"reject\" class=\"btn btn-reject\">\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C</button>\n        </div>\n    </div>");
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvcmVzL2pzLWRldi9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBLElBQU0sR0FBRyxxRUFBVDtBQUNBLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLENBQVgsQyxDQUFvRDs7QUFDcEQsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBZjtBQUNBLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLENBQVg7QUFDQSxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFWO0FBRUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLFFBQTFCLEVBQW9DLFlBQU07QUFDeEMsRUFBQSxRQUFRLENBQUMsT0FBVCxHQUFtQixlQUFlLENBQUMsSUFBRCxFQUFPLFNBQVAsQ0FBbEMsR0FBc0QsV0FBVyxDQUFDLElBQUQsQ0FBakU7QUFDRCxDQUZEO0FBSUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFVBQVUsS0FBVixFQUFpQjtBQUNsRCxNQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsT0FBYixDQUFxQix5QkFBckIsQ0FBSixFQUFxRDtBQUNuRCxRQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTixDQUFhLFlBQWIsQ0FBMEIsYUFBMUIsQ0FBYjs7QUFDQSxRQUFJLE1BQU0sS0FBSyxRQUFmLEVBQXlCO0FBQ3ZCLE1BQUEsZ0JBQWdCLENBQUMsSUFBRCxDQUFoQjtBQUNBLE1BQUEsY0FBYyxDQUFDLElBQUQsRUFBTyxRQUFQLENBQWQ7QUFDRCxLQUhELE1BR08sSUFBSSxNQUFNLEtBQUssUUFBZixFQUF5QjtBQUM5QixNQUFBLGdCQUFnQixDQUFDLElBQUQsQ0FBaEI7QUFDQSxNQUFBLGNBQWMsQ0FBQyxJQUFELEVBQU8s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QUksQ0FBQyxLQUFELENBQUosQ0FBWSxFQUQvQyw2RUFFeUMsSUFBSSxDQUFDLEtBQUQsQ0FBSixDQUFZLFNBRnJELDRHQUlxQyxJQUFJLENBQUMsS0FBRCxDQUFKLENBQVksSUFKakQsMkRBS29DLElBQUksQ0FBQyxLQUFELENBQUosQ0FBWSxJQUxoRCw2REFNc0MsSUFBSSxDQUFDLEtBQUQsQ0FBSixDQUFZLE1BTmxEO0FBYUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBpbXBvcnQgZ2V0RGF0YSBmcm9tIFwiLi9teV9jb21wb25lbnRzL2RhdGFcIjtcclxuY29uc3QgdXJsID0gYGh0dHBzOi8vcHJpdmF0ZS05ZDVlMzdhLXRlc3Rhc3NpZ25tZW50LmFwaWFyeS1tb2NrLmNvbS9nZXQtYmVhcnNgO1xyXG5sZXQgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaXRlbS13cmFwcGVyXCIpOyAvL9GC0LXQu9C+INC00LvRjyDQvtGC0YDQuNGB0L7QstC60Lgg0LrQsNGA0YLQvtGH0LXQulxyXG5sZXQgY2hlY2tib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoZWNrYm94XCIpO1xyXG5sZXQgaXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXJ2XCIpO1xyXG5sZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcclxuXHJcbmNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gIGNoZWNrYm94LmNoZWNrZWQgPyBzaG93UmVzZXJ2ZUl0ZW0obGlzdCwgXCJyZXNlcnZlXCIpIDogc2hvd0FsbEl0ZW0obGlzdCk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gIGlmIChldmVudC50YXJnZXQubWF0Y2hlcyhcIi5zZWxlY3QtYm94X19saXN0IGxhYmVsXCIpKSB7XHJcbiAgICBsZXQgc3RhdHVzID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZmlsdGVyXCIpO1xyXG4gICAgaWYgKHN0YXR1cyA9PT0gXCJhY2NlcHRcIikge1xyXG4gICAgICBoaWRlQ2hpbGRyZW5JdGVtKGxpc3QpO1xyXG4gICAgICBzaG93RmlsdGVySXRlbShsaXN0LCBcImFjY2VwdFwiKTtcclxuICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBcInJlamVjdFwiKSB7XHJcbiAgICAgIGhpZGVDaGlsZHJlbkl0ZW0obGlzdCk7XHJcbiAgICAgIHNob3dGaWx0ZXJJdGVtKGxpc3QsIFwicmVqZWN0XCIpO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IFwiYWxsXCIpIHtcclxuICAgICAgaGlkZUNoaWxkcmVuSXRlbShsaXN0KTtcclxuICAgICAgc2hvd0ZpbHRlckl0ZW0obGlzdCwgXCJhbGxcIik7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vd29yayB3aXRoIGJ0blxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LnRhcmdldC5tYXRjaGVzKFwiYnV0dG9uXCIpKSB7XHJcbiAgICBsZXQgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgbGV0IGl0ZW1JZCA9IGJ1dHRvbi5wYXJlbnROb2RlLmlkO1xyXG4gICAgbGV0IGl0ZW0gPSBidXR0b24ucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgbGV0IGRhdGFGaWx0ZXIgPSBidXR0b24ucGFyZW50Tm9kZS5kYXRhc2V0LmZpbHRlcjtcclxuICAgIGxldCBhY2NlcHRMaW5rID0gYGh0dHBzOi8vcHJpdmF0ZS05ZDVlMzdhLXRlc3Rhc3NpZ25tZW50LmFwaWFyeS1tb2NrLmNvbS9yZXNvbHZlLWJlYXI/aWQ9JHtpdGVtSWR9YDtcclxuICAgIGxldCByZWplY3RMaW5rID0gYGh0dHBzOi8vcHJpdmF0ZS05ZDVlMzdhLXRlc3Rhc3NpZ25tZW50LmFwaWFyeS1tb2NrLmNvbS9yZWplY3QtYmVhcj9pZD0ke2l0ZW1JZH1gO1xyXG5cclxuICAgIGlmIChidXR0b24uaWQgPT09IFwiYWNjZXB0XCIpIHtcclxuICAgICAgcG9zdERhdGEoaXRlbSwgYnV0dG9uLCBhY2NlcHRMaW5rLCBcImFjY2VwdFwiKTtcclxuICAgIH0gZWxzZSBpZiAoYnV0dG9uLmlkID09PSBcInJlamVjdFwiKSB7XHJcbiAgICAgIHBvc3REYXRhKGl0ZW0sIGJ1dHRvbiwgcmVqZWN0TGluaywgXCJyZWplY3RcIik7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbmdldERhdGEodXJsKVxyXG4gIC50aGVuKChkYXRhKSA9PiBjcmVhdGVEYXRhKGRhdGEucmVzdWx0cy5kYXRhKSlcclxuICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcblxyXG5mdW5jdGlvbiBzaG93UmVzZXJ2ZUl0ZW0obGlzdCwgY2xhc3NOYW1lKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsaXN0LmNoaWxkcmVuW2ldLmNsYXNzTmFtZS5pbmNsdWRlcyhjbGFzc05hbWUpXHJcbiAgICAgID8gdHJ1ZVxyXG4gICAgICA6IChsaXN0LmNoaWxkcmVuW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VGaWx0ZXJWYWx1ZShpdGVtLCB2YWx1ZSkge1xyXG4gIGl0ZW0uZGF0YXNldC5maWx0ZXIgPSB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZUNoaWxkcmVuSXRlbShpdGVtcykge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgIGhpZGVJdGVtKGl0ZW1zLmNoaWxkcmVuW2ldKTtcclxuICAgIGNvbnNvbGUubG9nKGl0ZW1zLmNoaWxkcmVuW2ldLmNoaWxkTm9kZXMpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZUl0ZW0oaXRlbSkge1xyXG4gIGl0ZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93RmlsdGVySXRlbShpdGVtcywgZmlsdGVyU3RhdHVzKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGl0ZW1zLmNoaWxkcmVuW2ldLmdldEF0dHJpYnV0ZShcImRhdGEtZmlsdGVyXCIpID09PSBmaWx0ZXJTdGF0dXMpIHtcclxuICAgICAgc2hvd0l0ZW0oaXRlbXMuY2hpbGRyZW5baV0sIFwiZmxleFwiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dJdGVtKGl0ZW0sIHN0eWxlVmFsdWUpIHtcclxuICBpdGVtLnN0eWxlLmRpc3BsYXkgPSBzdHlsZVZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QWxsSXRlbShsaXN0KSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsaXN0LmNoaWxkcmVuW2ldLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc3REYXRhKGl0ZW0sIGJ1dHRvbiwgbGluaywgZmlsdGVyVmFsdWUpIHtcclxuICBmZXRjaChsaW5rLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gIH0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlJlcXVlc3QgY29tcGxldGUhIHJlc3BvbnNlOlwiLCByZXMpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlN0YXR1cyBjb2RlOlwiLCByZXMuc3RhdHVzKTtcclxuICAgICAgaGlkZUl0ZW0oaXRlbSk7XHJcbiAgICAgIGhpZGVJdGVtKGJ1dHRvbi5wYXJlbnROb2RlKTtcclxuICAgICAgcG9zdERhdGEobGluaywgaXRlbSk7XHJcbiAgICAgIGNoYW5nZUZpbHRlclZhbHVlKGl0ZW0sIGZpbHRlclZhbHVlKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSh1cmwpIHtcclxuICByZXR1cm4gZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICB9KTtcclxufVxyXG5cclxuLy9jcmVhdGUgZGF0YSBpbiBkb21cclxuZnVuY3Rpb24gY3JlYXRlRGF0YShkYXRhKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBkYXRhW2ldLmluX3Jlc2VydmVcclxuICAgICAgPyBjcmVhdGVSZXNlcnZlSXRlbShkYXRhLCBsaXN0LCBpKVxyXG4gICAgICA6IGNyZWF0ZVNpbXBsZUl0ZW0oZGF0YSwgbGlzdCwgaSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSZXNlcnZlSXRlbShkYXRhLCBlbGVtZW50LCBpbmRleCkge1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MICs9IGBcclxuICA8ZGl2IGRhdGEtZmlsdGVyPVwiYWxsXCIgaWQ9XCIke2RhdGFbaW5kZXhdLmlkfVwiIGNsYXNzPVwiaXRlbSByZXNlcnYgcmVzZXJ2ZS1iZy1jb2xvclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJpdGVtX19pbWcgaW1nLS1pbi1yZXNlcnZlXCI+PGltZyBzcmM9XCIke2RhdGFbaW5kZXhdLmltYWdlX3VybH1cIiBhbHQ9XCJcIj48L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiaXRlbV9fdGl0bGUtcmVzZXJ2ZSByZXNlcnZlLXRpdGxlLWNvbG9yXCI+0JIg0LfQsNC/0L7QstC10LTQvdC40LrQtTwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJpdGVtX19pbmZvIHJlc2VydmUtdGV4dC1jb2xvclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaXRlbV9fdGl0bGVcIj4ke2RhdGFbaW5kZXhdLm5hbWV9PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpdGVtX190eXBlXCI+JHtkYXRhW2luZGV4XS50eXBlfTwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaXRlbV9fZ2VuZGVyXCI+JHtkYXRhW2luZGV4XS5nZW5kZXJ9PC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cImlubmVyLWJ0blwiPlxyXG4gICAgICA8YnV0dG9uIGlkPVwiYWNjZXB0XCIgY2xhc3M9XCJidG4gYnRuLWFjY2VwdFwiPtCf0YDQuNC90Y/RgtGMPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gaWQ9XCJyZWplY3RcIiBjbGFzcz1cImJ0biBidG4tcmVqZWN0IHJlc2VydmUtYnRuLXJlamVjdC10aGVtZVwiPtCe0YLQutC70L7QvdC40YLRjDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTaW1wbGVJdGVtKGRhdGEsIGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgZWxlbWVudC5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgIDxkaXYgZGF0YS1maWx0ZXI9XCJhbGxcIiBpZD1cIiR7ZGF0YVtpbmRleF0uaWR9XCIgY2xhc3M9XCJpdGVtXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1fX2ltZ1wiPjxpbWcgc3JjPVwiJHtkYXRhW2luZGV4XS5pbWFnZV91cmx9XCIgYWx0PVwiXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1fX3RpdGxlXCI+JHtkYXRhW2luZGV4XS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbV9fdHlwZVwiPiR7ZGF0YVtpbmRleF0udHlwZX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1fX2dlbmRlclwiPiR7ZGF0YVtpbmRleF0uZ2VuZGVyfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci1idG5cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImFjY2VwdFwiIGNsYXNzPVwiYnRuIGJ0bi1hY2NlcHRcIj7Qn9GA0LjQvdGP0YLRjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwicmVqZWN0XCIgY2xhc3M9XCJidG4gYnRuLXJlamVjdFwiPtCe0YLQutC70L7QvdC40YLRjDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+YDtcclxufVxyXG4iXX0=
