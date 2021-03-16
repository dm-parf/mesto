export default class FormValidator {
	constructor(options, formElement) {
        this._formElement = formElement;
        this._options = options;
	}

  _showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  _hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };
  
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }; 

  _setEventListeners(inputList, buttonElement) {
    const closeElement = this._formElement.querySelector(this._options.closeButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input',  () => {
          this._checkInputValidity(this._formElement, inputElement,this._options.inputErrorClass ,this._options.errorClass);
          this._toggleButtonState(inputList, buttonElement, this._options.inactiveButtonClass);
        });
  
        closeElement.addEventListener('click', () => {
          this._hideInputError(this._formElement, inputElement, this._options.inputErrorClass , this._options.errorClass);
        });
      });
  
      this._options.mainPageBtns.forEach((btnClass) => {
          const popupBtn = document.querySelector(btnClass);
          popupBtn.addEventListener('click', () => {
              this._toggleButtonState(inputList, buttonElement, this._options.inactiveButtonClass);
            });
      });
  }

  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement, this._options.inactiveButtonClass);
    this._setEventListeners(inputList, buttonElement);
    }
}


