var productName = document.getElementById("productName");
var producCategory = document.getElementById("producCategory");
var producPrice = document.getElementById("producPrice");
var productDescription = document.getElementById("productDescription");

var addProducts = document.getElementById("add");
var tBody = document.querySelector("tbody");
var clear = document.getElementById("clear");
var search = document.getElementById("search");
var index = 0;
var pNameValidate = document.getElementById("pNameValidate");
var alert = document.getElementById('alert');
var alldata = document.getElementById('alldata');


var productsList = JSON.parse(localStorage.getItem('productData'));
if (localStorage.getItem('productData') == null) {
    var productsList = [];
}
displayProducts();






addProducts.addEventListener("click", function () {
    if (validateProductName && producCategory.value != '' && producPrice.value != '' && productDescription.value != '') {
        if (addProducts.innerHTML == "Add product") {
            var product = {
                pName: productName.value,
                pCategory: producCategory.value,
                price: producPrice.value,
                desecription: productDescription.value
            }
    
            productsList.push(product);
            localStorage.setItem("productData", JSON.stringify(productsList));
            displayProducts();
            clearform();
            alldata.classList.add("d-none");
            productName.classList.remove("is-valid");
    
        } else {
            update();
            clearform();
            alldata.classList.add("d-none");
            productName.classList.remove("is-valid");
            
        }
    } else {
        alldata.classList.remove("d-none");
    }

    


})


function displayProducts() {
    var trs = "";
    for (var i = 0; i < productsList.length; i++) {
        index = i;
        trs += `<tr>
            <td>${i}</td>
            <td>${productsList[i].pName}</td>
            <td>${productsList[i].pCategory}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].desecription}</td>
            <td>
                <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">
                <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
            <td>
                <button onclick="updateGetDate(${i})"  class="btn btn-outline-warning"  >
                <i class="fa-solid fa-pen"></i>
                </button>
            </td>
        </tr>`
    }
    tBody.innerHTML = trs;
}

function clearform() {
    productName.value = "";
    producCategory.value = "";
    producPrice.value = "";
    productDescription.value = "";

}


clear.addEventListener("click", clearform);


search.addEventListener("keyup", function () {
 
    var trs = "";
    for (var i = 0; i < productsList.length; i++) {
        if (productsList[i].pName.includes(search.value)) {
            trs += `<tr>
            <td>${i}</td>
            <td>${productsList[i].pName}</td>
            <td>${productsList[i].pCategory}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].desecription}</td>
            <td>
                <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">
                <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
            <td>
                <button onclick="updateGetDate(${i})" class="btn btn-outline-warning">
                <i class="fa-solid fa-pen"></i>
                </button>
            </td>
        </tr>`
        }

    }
    tBody.innerHTML = trs;
})


function deleteProduct(index) {
    productsList.splice(index, 1);
    localStorage.setItem("productData", JSON.stringify(productsList));
    displayProducts();

}

function updateGetDate(index) {
    productName.value = productsList[index].pName;
    producCategory.value = productsList[index].pCategory;
    producPrice.value = productsList[index].price;
    productDescription.value = productsList[index].desecription;

    addProducts.innerHTML = 'Update';
    validateProductName();
}


function update() {
    productsList[index].pName = productName.value;
    productsList[index].pCategory = producCategory.value;
    productsList[index].price = producPrice.value;
    productsList[index].desecription = productDescription.value;
    localStorage.setItem("productData", JSON.stringify(productsList));
    addProducts.innerHTML = 'Add product';
    displayProducts();
}


function validateProductName() {
    var pname = productName.value;
    if (/^[A-Z]/.test(pname) == false) {
        productName.classList.add("is-invalid");
        pNameValidate.classList.remove("d-none");
        alert.innerHTML = "start with capital letter";
        return false;
    } else if (/^[A-Z][a-z]{3,10}/.test(pname) == false) {
        productName.classList.add("is-invalid");
        pNameValidate.classList.remove("d-none");
        alert.innerHTML = "increase number of small letters";
        return false;
    } else if (/^[A-Z][a-z]{3,10}[0-9]{0,4}$/.test(pname) == false) {
        productName.classList.add("is-invalid");
        pNameValidate.classList.remove("d-none");
        alert.innerHTML = "decrease number of numbers";
        return false;
    } else {
        productName.classList.remove("is-invalid");
        productName.classList.add("is-valid")
        pNameValidate.classList.add("d-none")
      
        return true;
    }
}

productName.addEventListener("blur", validateProductName);












