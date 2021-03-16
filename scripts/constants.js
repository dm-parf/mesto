export const initialCards = [
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

 export const validationOptions = {
    formSelector: '.popup__container_type_form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    closeButtonSelector: '.popup__close',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    mainPageBtns: ['.profile__button_type_edit', '.profile__button_type_add']
  };