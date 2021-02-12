const popupEditBtn = document.querySelector('.profile__button_type_edit');
const popupAddBtn = document.querySelector('.profile__button_type_add');
const profileName = document.querySelector('.profile__name');
const profilePost = document.querySelector('.profile__post');

const popupEdit = document.querySelector('.popup_type_edit');
const popupCloseBtn = popupEdit.querySelector('.popup__close');
const popupEditContainer = popupEdit.querySelector('.popup__container');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_post');
addPopupListener(popupEdit);
const popupAdd = document.querySelector('.popup_type_add');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close');
const popupAddContainer = popupAdd.querySelector('.popup__container');
const nameAddInput = popupAdd.querySelector('.popup__input_type_name');
const linkInput = popupAdd.querySelector('.popup__input_type_post');
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
    popup.addEventListener('click', function (evt) {
      if (evt.target === popup) {
      togglePopup(popup); 
    }
  }); 
}

function toggleListener(elem, popup){
  elem.addEventListener('click', function () {
    togglePopup(popup); 
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

function togglePopup(popupElement){
    popupElement.classList.toggle('popup_opened')
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
    nameAddInput.value = '';
    linkInput.value = '';
    
    togglePopup(popupAdd);
}
function imageElementClickHandler(nameValue, linkValue) {
  popupImageImg.src = linkValue;
  popupImageImg.alt = nameValue;
  popupImageCaption.textContent = nameValue;
  togglePopup(popupImage); 
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
    togglePopup(popupEdit); 
  });  

toggleListener(popupAddBtn, popupAdd);
toggleListener(popupCloseBtn, popupEdit);
toggleListener(popupAddCloseBtn, popupAdd);
toggleListener(popupImageCloseBtn, popupImage);
  
popupEditContainer.addEventListener('submit', popupEditSubmitHandler);
popupAddContainer.addEventListener('submit', popupAddSubmitHandler); 

initialCards.forEach(function (el) {
    addBlock(el.name, el.link);
});
