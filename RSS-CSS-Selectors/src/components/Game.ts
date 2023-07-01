class Game {
  menu: HTMLButtonElement;
  menuBtn: HTMLButtonElement;
  closeMenuBtn: HTMLButtonElement;
  answerField: HTMLInputElement;

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

  setListeners() {
    this.menuBtn.addEventListener('click', this.toggleMenu);
    this.closeMenuBtn.addEventListener('click', this.toggleMenu);
    this.answerField.addEventListener('input', this.checkAnswerBlind);
  }

  initiate = () => {
    this.setListeners();
  };
}

export default Game;
