class Game {
  menu: HTMLButtonElement;
  menuBtn: HTMLButtonElement;
  closeMenuBtn: HTMLButtonElement;
  answerField: HTMLInputElement;
  enterBtn: HTMLButtonElement;

  constructor() {
    this.menu = document.querySelector(
      '.info__burger-menu'
    ) as HTMLButtonElement;
    this.menuBtn = document.querySelector(
      '#burgerMenuBtn'
    ) as HTMLButtonElement;
    this.closeMenuBtn = document.querySelector(
      '#closeMenuBtn'
    ) as HTMLButtonElement;
    this.answerField = document.querySelector('#answer') as HTMLInputElement;
    this.enterBtn = document.querySelector(
      '.code__enter-btn'
    ) as HTMLButtonElement;

    this.initiate();
  }

  toggleMenu = () => {
    this.menu.classList.contains('info__burger-menu_state_active')
      ? this.menu.classList.remove('info__burger-menu_state_active')
      : this.menu.classList.add('info__burger-menu_state_active');
    console.log('ХУЙ');
  };

  checkAnswerBlind = () => {
    if (this.answerField.value.length > 0) {
      this.answerField.classList.remove('code__row-text_style_blind');
    } else {
      this.answerField.classList.add('code__row-text_style_blind');
    }
  };

  checkAnswer = () => {
    console.log('Ну норм');
  };

  handleClickEnterKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.checkAnswer();
    }
  };

  setListeners() {
    this.menuBtn.addEventListener('click', this.toggleMenu);
    this.closeMenuBtn.addEventListener('click', this.toggleMenu);
    this.answerField.addEventListener('input', this.checkAnswerBlind);
    this.enterBtn.addEventListener('click', this.checkAnswer);
    window.addEventListener('keydown', this.handleClickEnterKey);
  }

  initiate = () => {
    this.setListeners();
  };
}

export default Game;
