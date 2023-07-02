import { Task, Tasks } from '../types/models';
import passedIcon from '../assets/img/check_icon_no_border_green.svg';
import passedIconL from '../assets/img/check_icon_green.svg';
import basicIconL from '../assets/img/check_icon.svg';

class Game {
  menu: HTMLElement;
  menuContainer: HTMLDivElement;
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
  taskDescr: HTMLElement;
  decTaskBtn: HTMLButtonElement;
  incTaskBtn: HTMLButtonElement;
  passed: Array<number>;
  icon: HTMLImageElement;
  taskDescField: HTMLElement;

  constructor(tasks: Tasks) {
    this.tasks = tasks.map((t) => ({ ...t, isPassed: false }));
    this.taskDescr = document.querySelector(
      '.game__task-annotation'
    ) as HTMLElement;
    this.menu = document.querySelector('.info__burger-menu') as HTMLElement;
    this.menuContainer = document.querySelector(
      '.info__menu-container'
    ) as HTMLDivElement;
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
    this.incTaskBtn = document.querySelector(
      '#incTaskBtn'
    ) as HTMLButtonElement;
    this.decTaskBtn = document.querySelector(
      '#decTaskBtn'
    ) as HTMLButtonElement;
    this.passed = [];
    this.icon = document.querySelector('#taskStatusCheck') as HTMLImageElement;
    this.taskDescField = document.querySelector('.info__text') as HTMLElement;

    this.initiate();
  }

  toggleMenu = () => {
    if (this.menu.classList.contains('info__burger-menu_state_active')) {
      this.menu.classList.remove('info__burger-menu_state_active');
    } else {
      this.renderMenu;
      this.menu.classList.add('info__burger-menu_state_active');
    }
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
    if (item.id === this.curTaskNum) {
      menuItemElement.classList.add('info__burger-menu-item_current');
    }
    menuItemElement.addEventListener('click', () => {
      this.switchTask(item.id);
    });
    const icon = menuItemElement.querySelector('img');
    if (icon && this.passed.includes(item.id)) {
      icon.src = passedIcon;
    }
    return menuItemElement;
  };

  checkAnswerBlind = () => {
    if (this.answerField.value.length > 0) {
      this.answerField.classList.remove('code__input_style_blind');
    } else {
      this.answerField.classList.add('code__input_style_blind');
    }
  };

  checkAnswer = () => {
    const answer = this.answerField.value;
    const possiblyTaskNum = Number(answer);
    if (possiblyTaskNum > 0 && possiblyTaskNum <= this.tasks.length) {
      this.switchTask(possiblyTaskNum);
      this.resetAnswer();
    }
    if (this.curTaskItem.correct.includes(answer)) {
      if (!this.passed.includes(this.curTaskItem.id)) {
        this.passed.push(this.curTaskItem.id);
        this.table.querySelectorAll('.desired').forEach((e) => {
          const timeout = setTimeout(() => {
            this.switchNextTask();
            clearTimeout(timeout);
          }, 500);
          e.classList.add('desired_state_correct');
        });
      }
    } else {
      this.table.querySelectorAll('.desired').forEach((e) => {
        e.classList.add('desired_state_wrong');
        const timeout = setTimeout(() => {
          e.classList.remove('desired_state_wrong');
          clearTimeout(timeout);
        }, 500);
      });
    }
  };

  resetAnswer = () => (this.answerField.value = '');

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
    this.taskDescr.textContent = this.curTaskItem.title;
    this.htmlSyntCodeArea.textContent = this.curTaskItem.syntheticCode;
    this.taskDescField.textContent = this.curTaskItem.description;
    if (this.passed.includes(this.curTaskItem.id)) {
      this.icon.src = passedIconL;
    } else {
      this.icon.src = basicIconL;
    }
  };

  switchTask = (taskNum: number) => {
    this.curTaskNum = taskNum;
    this.switchTaskItem();
    this.renderMenu();
    this.renderTask();
    this.resetAnswer();
    this.checkAnswerBlind();
  };

  switchNextTask = () => {
    if (this.curTaskNum < this.tasks.length) {
      this.switchTask(this.curTaskNum + 1);
    }
  };

  switchPrevTask = () => {
    if (this.curTaskNum > 1) {
      this.switchTask(this.curTaskNum - 1);
    }
  };

  setListeners() {
    this.menuBtn.addEventListener('click', this.toggleMenu);
    this.closeMenuBtn.addEventListener('click', this.toggleMenu);
    this.answerField.addEventListener('input', this.checkAnswerBlind);
    this.enterBtn.addEventListener('click', this.checkAnswer);
    this.incTaskBtn.addEventListener('click', this.switchNextTask);
    this.decTaskBtn.addEventListener('click', this.switchPrevTask);
    window.addEventListener('keydown', this.handleClickEnterKey);
  }

  renderMenu = () => {
    this.menuContainer.innerHTML = '';
    this.tasks.forEach((t) => {
      const item = this.createMenuItem(t);

      if (item) {
        this.menuContainer.append(item);
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
