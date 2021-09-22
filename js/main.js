var $logo = document.querySelector('.searchbar');
var $form = document.querySelector('form');
var $submit = document.querySelector('.search-button');

function searchFunction() {
  event.preventDefault();
  $logo.append($form);
  $form.classList.remove('new');
  var searchValue = document.querySelector('.search-input');
  request(searchValue.value);
  searchValue.value = '';
}
$submit.addEventListener('click', searchFunction);

var arr = [];
function request(drinks) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + drinks
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
    for (var i = 0; i < xhr.response.drinks.length; i++) {
      var drinkID = xhr.response.drinks[i].idDrink;
      arr.push(drinkID);
    }
    console.log(arr);

  });
  xhr.send();
}
