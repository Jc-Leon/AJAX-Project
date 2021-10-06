var $logo = document.querySelector('.searchbar');
var $form = document.querySelector('form');
var $submit = document.querySelector('.search-button');
var $cardContainer = document.querySelector('.card-container');
var $drinkContainer = document.querySelector('.drink-container');

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
  while ($cardContainer.lastChild) {
    $cardContainer.removeChild($cardContainer.lastChild);
  }
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
        image: drinkList.strDrinkThumb,
        drinkID: drinkList.idDrink
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
  $card.setAttribute('data-view', 'drink-list');
  $card.id = list.drinkID;

  var $cardImg = document.createElement('div');
  $cardImg.className = 'card-img';
  $cardImg.setAttribute('data-view', 'drink-list');
  $card.appendChild($cardImg);

  var $img = document.createElement('img');
  $img.setAttribute('src', list.image);
  $img.setAttribute('data-view', 'drink-list');
  $cardImg.appendChild($img);

  var $cardText = document.createElement('div');
  $cardText.className = 'card-text background-color height text-align';
  $cardText.setAttribute('data-view', 'drink-list');
  $card.appendChild($cardText);


  var $name = document.createElement('p');
  $name.className = 'highlight';
  $name.textContent = list.name;
  $name.setAttribute('data-view', 'drink-list');
  $cardText.appendChild($name);

  var $find = document.createElement('p');
  $find.className = 'info';
  $find.textContent = 'Find Out More';
  $card.setAttribute('data-view', 'drink-list');
  $cardText.appendChild($find);

  return $card;
}

function getFullAlcohol() {
  var $cardID = event.target.closest('.card').id;
  alcoholDetail($cardID);
}

$cardContainer.addEventListener('click', getFullAlcohol);

function alcoholDetail(id) {
  while ($drinkContainer.lastChild) {
    $drinkContainer.removeChild($drinkContainer.lastChild);
  }
  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var ingredients = [];
    var measurements = [];

    for (var o = 1; o < 16; o++) {
      if (
        xhr.response.drinks[0][`strIngredient${o}`] === null ||
        xhr.response.drinks[0][`strIngredient${o}`] === ''
      ) {
        break;
      }
      ingredients[o - 1] = xhr.response.drinks[0][`strIngredient${o}`];
      measurements[o - 1] = xhr.response.drinks[0][`strMeasure${o}`];
    }
    for (var j = 0; j < xhr.response.drinks.length; j++) {
      var drinkList = xhr.response.drinks[j];
      var fullDrinkList = {
        name: drinkList.strDrink,
        image: drinkList.strDrinkThumb,
        instructions: drinkList.strInstructions,
        newIngredients: ingredients,
        newMeasurements: measurements
      };
    }
    $drinkContainer.appendChild(createDrink(fullDrinkList));

  });
  xhr.send();
}

function createDrink(fullDrinkList) {
  var $drinkRow = document.createElement('div');
  $drinkRow.className = 'row justify-center';

  var $drinkFirstColumn = document.createElement('div');
  $drinkFirstColumn.className = 'column-half';
  $drinkRow.appendChild($drinkFirstColumn);

  var $drinkImage = document.createElement('img');
  $drinkImage.className = 'border-radius';
  $drinkFirstColumn.appendChild($drinkImage);
  $drinkImage.setAttribute('src', fullDrinkList.image);

  var $drinkSecondColumn = document.createElement('div');
  $drinkSecondColumn.className = 'column-half text-align';
  $drinkRow.appendChild($drinkSecondColumn);

  var $drinkHeader = document.createElement('div');
  $drinkHeader.className =
    'background-color border-radius padding drinkMargin drinkPadding';
  $drinkSecondColumn.appendChild($drinkHeader);

  var $drinkName = document.createElement('h1');
  $drinkName.textContent = fullDrinkList.name;
  $drinkHeader.appendChild($drinkName);

  var $drinkIngredient = document.createElement('div');
  $drinkIngredient.className =
    'background-color text-align border-radius padding drinkMargin drinkPadding';
  $drinkSecondColumn.appendChild($drinkIngredient);

  var $drinkIngredientTitle = document.createElement('h1');
  $drinkIngredientTitle.textContent = 'What you will need:';
  $drinkIngredient.appendChild($drinkIngredientTitle);

  var $drinkUl = document.createElement('ul');
  $drinkUl.className =
    'ingredient-list text-align border-radius justify-center row';
  $drinkIngredient.appendChild($drinkUl);

  for (var i = 0; i < fullDrinkList.newIngredients.length; i++) {
    var whatINeed = document.createElement('li');
    whatINeed.textContent = `${fullDrinkList.newIngredients[i]} ${fullDrinkList.newMeasurements[i]}`;
    if (fullDrinkList.newMeasurements[i] === null) {
      whatINeed.textContent = `${fullDrinkList.newIngredients[i]} to your liking `;
    }
    $drinkUl.append(whatINeed);
  }

  var $drinkInstructions = document.createElement('div');
  $drinkInstructions.className =
    'background-color border-radius padding drinkMargin drinkPadding';
  $drinkSecondColumn.appendChild($drinkInstructions);

  var $prepare = document.createElement('h1');
  $prepare.textContent = 'How to prepare:';
  $drinkInstructions.appendChild($prepare);

  var $drinkInstructionDetail = document.createElement('p');
  $drinkInstructionDetail.className = 'card-font instructions';
  $drinkInstructionDetail.textContent = fullDrinkList.instructions;
  $drinkInstructions.appendChild($drinkInstructionDetail);

  return $drinkRow;
}

var $view = document.querySelectorAll('.view');

console.log($view);
function switchView(view) {
  for (var i = 0; i < $view.length; i++) {
    var views = $view[i];
    if (views.getAttribute('data-view') === view) {
      views.className = 'view';
    } else {
      views.className = 'view hidden';
    }
  }
}
function handleViewNavigation(event) {
  if (!event.target.getAttribute('data-view')) {
    return;
  }
  var views = event.target.getAttribute('data-view');
  switchView(views);
}

document.addEventListener('click', handleViewNavigation);

document.addEventListener('click', function (event) {
  console.log(event.target);

});
