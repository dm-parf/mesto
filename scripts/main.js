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

const initialCards = [
    {
      name: 'Алтай',
      link: './images/altay.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Валдай',
      link: './images/valday.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Красная поляна',
      link: './images/polyana.jpg'
    }
  ]; 

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

function createCard(nameValue, linkValue)
{
  const blockTemplate = document.querySelector('#block-template').content;
  const blockElement = blockTemplate.querySelector('.elements__block').cloneNode(true);
  const imageElement = blockElement.querySelector('.elements__image');
  const likeBtn = blockElement.querySelector('.elements__button_type_like');
  const trashBtn = blockElement.querySelector('.elements__button_type_trash');
  const nameElement = blockElement.querySelector('.elements__name');

  imageElement.src = linkValue;
  imageElement.alt = nameValue;
  nameElement.textContent = nameValue;

  likeBtn.addEventListener('click', likeBtnClickHandler);
  trashBtn.addEventListener('click', trashBtnClickHandler);
  imageElement.addEventListener('click', () => {
    imageElementClickHandler(nameValue, linkValue)
  });
  return blockElement;
}

function addBlock(nameValue, linkValue) {
    const blockElement = createCard(nameValue, linkValue);
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
      profileName.textContent = nameInput.value;
      profilePost.textContent = jobInput.value;
      togglePopup(popupEdit);
}
function popupAddSubmitHandler (evt) {
      evt.preventDefault();
      addBlock(nameAddInput.value, linkInput.value);
      clearPopupAddInputs();
      togglePopup(popupAdd);
}
function imageElementClickHandler(nameValue, linkValue) {
  popupImageImg.src = linkValue;
  popupImageImg.alt = nameValue;
  popupImageCaption.textContent = nameValue;
  togglePopup(popupImage);
  document.popupParam = popupImage;
}

function clearPopupAddInputs(){
  nameAddInput.value = '';
  linkInput.value = '';
}
function likeBtnClickHandler (evt) {
    const evtTarget = evt.target;
    evtTarget.classList.toggle('elements__button_type_like-active');
}
function trashBtnClickHandler (evt) {
  const evtTarget = evt.target.closest('.elements__block');
  evtTarget.remove();
}

popupEditBtn.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profilePost.textContent;
    toggleButtonState([nameInput, jobInput], submitEdit, options.inactiveButtonClass);
    
    togglePopup(popupEdit);
    document.popupParam = popupEdit;
  });  

toggleListener(popupAddBtn, popupAdd, () => {
  
  toggleButtonState([nameAddInput, linkInput], submitAdd, options.inactiveButtonClass);
  document.popupParam = popupAdd;
});
toggleListener(popupCloseBtn, popupEdit, ()=> {
  hideInputError(popupEditContainer, nameInput, options.inputErrorClass, options.errorClass);
  hideInputError(popupEditContainer, jobInput, options.inputErrorClass, options.errorClass);
});
toggleListener(popupAddCloseBtn, popupAdd, ()=> {
  clearPopupAddInputs();
  hideInputError(popupAddContainer, nameAddInput, options.inputErrorClass, options.errorClass);
  hideInputError(popupAddContainer, linkInput, options.inputErrorClass, options.errorClass);
});
toggleListener(popupImageCloseBtn, popupImage);
  
popupEditContainer.addEventListener('submit', popupEditSubmitHandler);
popupAddContainer.addEventListener('submit', popupAddSubmitHandler); 

function keyHandler(evt){
  if(evt.key==='Escape'){
    togglePopup(document.popupParam);
  }
}

initialCards.forEach(function (el) {
    addBlock(el.name, el.link);
});