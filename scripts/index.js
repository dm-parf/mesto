import { initialCards } from './constants.js';
import { validationOptions } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupEditBtn = document.querySelector('.profile__button_type_edit');
const popupAddBtn = document.querySelector('.profile__button_type_add');
const profileName = document.querySelector('.profile__name');
const profilePost = document.querySelector('.profile__post');

const popupEdit = document.querySelector('.popup_type_edit');
const popupCloseBtn = popupEdit.querySelector('.popup__close');
const popupEditContainer = popupEdit.querySelector('.popup__container');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_post');
const submitEdit = popupEdit.querySelector('.popup__submit');
addPopupListener(popupEdit);
const popupAdd = document.querySelector('.popup_type_add');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close');
const popupAddContainer = popupAdd.querySelector('.popup__container');
const nameAddInput = popupAdd.querySelector('.popup__input_type_name');
const linkInput = popupAdd.querySelector('.popup__input_type_post');
const submitAdd = popupAdd.querySelector('.popup__submit');
addPopupListener(popupAdd);
const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseBtn = popupImage.querySelector('.popup__close');
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
addPopupListener(popupImage);
const blocksContainer = document.querySelector('.elements__list');


function addPopupListener(popup)
{
    popup.addEventListener('mousedown', function (evt) {
      if (evt.target === popup) {
      togglePopup(popup); 
    }
  }); 
}

function toggleListener(elem, popup, callback){
  elem.addEventListener('click', function () {
    togglePopup(popup, callback); 
  });
}

function addBlock(nameValue, linkValue) {
    const card = new Card(nameValue, linkValue,'#block-template',function(nameValue, linkValue){
      popupImageImg.src = linkValue;
      popupImageImg.alt = nameValue;
      popupImageCaption.textContent = nameValue;
      togglePopup(popupImage);
      document.popupParam = popupImage;
    });
    const blockElement = card.generateCard();
    blocksContainer.prepend(blockElement); 
  }

function togglePopup(popupElement, callback = () => {}){
    callback();
    popupElement.classList.toggle('popup_opened');
    if (popupElement.classList.contains('popup_opened')) { 
      document.addEventListener('keydown',keyHandler);
   } else {
     document.removeEventListener('keydown',keyHandler); 
   }
}

function popupEditSubmitHandler (evt) {
      evt.preventDefault();
      //данная проверка необходимма для контроля срабатывания Submit формы по клавише Enter
        if(jobInput.validity.valid && nameInput.validity.valid)
        {
          profileName.textContent = nameInput.value; 
          profilePost.textContent = jobInput.value;
          togglePopup(popupEdit);
        }   
}

function popupAddSubmitHandler (evt) {
      evt.preventDefault();
      addBlock(nameAddInput.value, linkInput.value);
      clearPopupAddInputs();
      togglePopup(popupAdd);   
}

function clearPopupAddInputs(){
  nameAddInput.value = '';
  linkInput.value = '';
}


popupEditBtn.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profilePost.textContent;
    togglePopup(popupEdit);
    document.popupParam = popupEdit;
  });  

toggleListener(popupAddBtn, popupAdd, () => {
  document.popupParam = popupAdd;
});

toggleListener(popupCloseBtn, popupEdit);

toggleListener(popupAddCloseBtn, popupAdd, ()=> {
  clearPopupAddInputs();
});
toggleListener(popupImageCloseBtn, popupImage);
  
popupEditContainer.addEventListener('submit', popupEditSubmitHandler);
popupAddContainer.addEventListener('submit', popupAddSubmitHandler); 

function keyHandler(evt){
  if(evt.key==='Escape'){
    togglePopup(document.popupParam);
  }
}

const startValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(options,formElement);
    validator.enableValidation();
  });

};

initialCards.forEach(function (el) {
  addBlock(el.name, el.link);
});
startValidation(validationOptions); 