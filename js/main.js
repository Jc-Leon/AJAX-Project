var $logo = document.querySelector('.searchbar');
var $form = document.querySelector('form');
var $submit = document.querySelector('.search-button');

$submit.addEventListener('click', function (event) {
  event.preventDefault();
  $logo.append($form);
  document.querySelector('.search-input').value = '';

  $form.classList.remove('new');
});
