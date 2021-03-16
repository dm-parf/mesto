export default class Card {
	constructor(nameValue, linkValue, cardSelector,imageElementClickHandler) {
        this._cardSelector = cardSelector;
        this._nameValue = nameValue;
        this._linkValue = linkValue;
        this._imageElementClickHandler = imageElementClickHandler;
	}

  _getTemplate() {
  	const blockElement = document.querySelector(this._cardSelector).content.querySelector('.elements__block').cloneNode(true);
    this._imageElement = blockElement.querySelector('.elements__image');
    this._likeBtn = blockElement.querySelector('.elements__button_type_like');
    this._trashBtn = blockElement.querySelector('.elements__button_type_trash');
    const nameElement = blockElement.querySelector('.elements__name');

    this._imageElement.src = this._linkValue;
    this._imageElement.alt = this._nameValue;
    nameElement.textContent = this._nameValue;

    return blockElement;
  }

	_setEventListeners() {
		this._likeBtn.addEventListener('click', () => {
			this._likeBtnClickHandler();
		});
        this._trashBtn.addEventListener('click', () => {
			this._trashBtnClickHandler();
		});
        this._imageElement.addEventListener('click', () => {
            this._imageElementClickHandler(this._nameValue, this._linkValue)
          });
	}


  _likeBtnClickHandler () {
    this._likeBtn.classList.toggle('elements__button_type_like-active');
 }
  _trashBtnClickHandler () {
  const evtTarget = this._trashBtn.closest('.elements__block');
  evtTarget.remove();
 }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

  	return this._element;
  }
}
