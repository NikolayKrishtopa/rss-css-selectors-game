import { Task, Tasks } from '../types/models';

class Game {
  menu: HTMLButtonElement;
  menuBtn: HTMLButtonElement;
  closeMenuBtn: HTMLButtonElement;
  answerField: HTMLInputElement;
  enterBtn: HTMLButtonElement;
  tasks: Tasks;
  curTaskNum: number;
  curTaskItem: Task;
  table: HTMLDivElement;
  htmlSyntCodeArea: HTMLParagraphElement;
  curLvlArea: HTMLSpanElement;
  totalLvlQtyArea: HTMLSpanElement;
  menuItemTemmplate: HTMLTemplateElement;

  constructor(tasks: Tasks) {
    this.tasks = tasks;
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
    this.curTaskNum = 1;
    this.curTaskItem = this.tasks.find((e) => e.id === this.curTaskNum) as Task;
    this.table = document.querySelector('.game__table') as HTMLDivElement;
    this.htmlSyntCodeArea = document.querySelector(
      '#htmlCode'
    ) as HTMLParagraphElement;
    this.totalLvlQtyArea = document.querySelector(
      '#totalLvls'
    ) as HTMLSpanElement;
    this.curLvlArea = document.querySelector('#curLvl') as HTMLSpanElement;
    this.menuItemTemmplate = document.querySelector(
      '#menuItemTemmplate'
    ) as HTMLTemplateElement;

    this.initiate();
  }

  toggleMenu = () => {
    this.menu.classList.contains('info__burger-menu_state_active')
      ? this.menu.classList.remove('info__burger-menu_state_active')
      : this.menu.classList.add('info__burger-menu_state_active');
  };

  createMenuItem = (item: Task) => {
    const element = this.menuItemTemmplate.content.cloneNode(
      true
    ) as HTMLElement;

    const menuItemElement = element.querySelector(
      '.info__burger-menu-item'
    ) as HTMLDivElement;

    const title = menuItemElement.querySelector(
      '.info__burger-menu-item-title'
    );
    const num = menuItemElement.querySelector('.info__burger-menu-item-num');
    if (title && num) {
      title.textContent = item.title;
      num.textContent = item.id.toString();
    }
    return menuItemElement;
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

  switchTaskItem = () => {
    this.curTaskItem = this.tasks.find((e) => e.id === this.curTaskNum) as Task;
  };

  renderTask = () => {
    this.table.innerHTML = this.curTaskItem.htmlCode;
    this.totalLvlQtyArea.textContent = this.tasks.length.toString();
    this.curLvlArea.textContent = this.curTaskNum.toString();
    // this.htmlSyntCodeArea.textContent = this.curTaskItem.syntheticCode;
  };

  setListeners() {
    this.menuBtn.addEventListener('click', this.toggleMenu);
    this.closeMenuBtn.addEventListener('click', this.toggleMenu);
    this.answerField.addEventListener('input', this.checkAnswerBlind);
    this.enterBtn.addEventListener('click', this.checkAnswer);
    window.addEventListener('keydown', this.handleClickEnterKey);
  }

  renderMenu = () => {
    this.tasks.forEach((t) => {
      const item = this.createMenuItem(t);

      if (item) {
        this.menu.append(item);
      }
    });
  };

  initiate = () => {
    this.renderTask();
    this.setListeners();
    this.renderMenu();
  };
}

export default Game;
