const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
let mode = "create";
let temp;
let searchMode = "title";
// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
//  save local
let dataPro;
if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.products);
} else {
  dataPro = [];
}
// create product
submit.addEventListener("click", () => {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 100
  ) {
    if (mode == "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[temp] = newPro;
      mode = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataPro));

  showData();
});

// clear data

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateItem(${i})" id="update">update</button></td>
    <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()">delete all (${dataPro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();
// delete
function deleteItem(item) {
  dataPro.splice(item, 1);
  localStorage.products = JSON.stringify(dataPro);
  showData();
}
// delete all
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
// update
function updateItem(item) {
  title.value = dataPro[item].title;
  price.value = dataPro[item].price;
  taxes.value = dataPro[item].taxes;
  ads.value = dataPro[item].ads;
  discount.value = dataPro[item].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[item].category;
  submit.innerHTML = "Update";
  mode = "update";
  temp = item;
  scroll({
    top: 0,
    behavior: "smooth4",
  });
}
// search
function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = "search by " + searchMode;
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMode == "title") {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `<tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateItem(${i})" id="update">update</button></td>
          <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
        </tr>`;
      }
    } else {
      if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `<tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateItem(${i})" id="update">update</button></td>
              <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
