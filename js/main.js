var $logo = document.querySelector('.searchbar');
var $form = document.querySelector('form');
var $submit = document.querySelector('.search-button');
var $cardContainer = document.querySelector('.card-container');

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
      var drinkList = xhr.response.drinks[i];
      var drinkID = drinkList.idDrink;
      var list = {
        name: drinkList.strDrink,
        image: drinkList.strDrinkThumb
      };
      $cardContainer.appendChild(cocktailEntries(list));
      arr.push(drinkID);
    }
    console.log(arr);
  });
  xhr.send();
}
function cocktailEntries(list) {
  var $card = document.createElement('div');
  $card.className = 'card row justify-center';

  var $cardImg = document.createElement('div');
  $cardImg.className = 'card-img';
  $card.appendChild($cardImg);

  var $img = document.createElement('img');
  $img.setAttribute('src', list.image);
  $cardImg.appendChild($img);

  var $cardText = document.createElement('div');
  $cardText.className = 'card-text background-color height text-align';
  $card.appendChild($cardText);

  var $name = document.createElement('p');
  $name.className = 'highlight';
  $name.textContent = list.name;
  $cardText.appendChild($name);

  var $find = document.createElement('p');
  $find.textContent = 'Find Out More';
  $cardText.appendChild($find);

  return $card;
}
