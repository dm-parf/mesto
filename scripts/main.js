let popup = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.profile__button_type_edit');
let popupCloseBtn = popup.querySelector('.popup__close');
let popupContainer = popup.querySelector('.popup__container');

let profileName = document.querySelector('.profile__name');
let profilePost = document.querySelector('.profile__post');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_post');

function togglePopup(){
    popup.classList.toggle('popup_opened')
}

function editUserProfile(){
    nameInput.value = profileName.textContent;
    jobInput.value = profilePost.textContent;
    togglePopup();
}

function popupSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profilePost.textContent = jobInput.value;
    togglePopup();
}

popupOpenBtn.addEventListener('click', editUserProfile);
popupCloseBtn.addEventListener('click', togglePopup);
popupContainer.addEventListener('submit', popupSubmitHandler); 