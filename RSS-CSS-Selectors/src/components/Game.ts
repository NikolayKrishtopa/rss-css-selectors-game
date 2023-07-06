import { IGame, Task, Tasks } from '../types/models';
import passedIcon from '../assets/img/check_icon_no_border_green.svg';
import passedIconL from '../assets/img/check_icon_green.svg';
import basicIconL from '../assets/img/check_icon.svg';
import SELECTORS from '../utils/selectors';
import LOC_STRG_KEYS from '../utils/locStrgKeys';

class Game implements IGame {
  menu: HTMLElement;
  menuContainer: HTMLDivElement;
  menuBtn: HTMLButtonElement;
  closeMenuBtn: HTMLButtonElement;
  answerField: HTMLInputElement;
  enterBtn: HTMLButtonElement;
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
  resetBtn: HTMLButtonElement;
  alertWindow: HTMLElement;
  alertBtn: HTMLElement;
  helpBtn: HTMLButtonElement;
  promptUsed: boolean;

  constructor(public tasks: Tasks) {
    this.taskDescr = document.querySelector(
      SELECTORS.TASK_DESCR
    ) as HTMLElement;
    this.menu = document.querySelector(SELECTORS.MENU) as HTMLElement;
    this.menuContainer = document.querySelector(
      SELECTORS.MENU_CONTAINER
    ) as HTMLDivElement;
    this.menuBtn = document.querySelector(
      SELECTORS.BURGER_MENU_BTN
    ) as HTMLButtonElement;
    this.closeMenuBtn = document.querySelector(
      SELECTORS.CLOSE_MENU_BTN
    ) as HTMLButtonElement;
    this.answerField = document.querySelector(
      SELECTORS.ANSWER_FIELD
    ) as HTMLInputElement;
    this.enterBtn = document.querySelector(
      SELECTORS.ENTER_BTN
    ) as HTMLButtonElement;
    this.curTaskNum =
      Number(localStorage.getItem(LOC_STRG_KEYS.CUR_TASK_NUM)) || 1;
    this.curTaskItem = this.tasks.find((e) => e.id === this.curTaskNum) as Task;
    this.table = document.querySelector(SELECTORS.TABLE) as HTMLDivElement;
    this.htmlSyntCodeArea = document.querySelector(
      SELECTORS.HTML_SYNT_CODE_AREA
    ) as HTMLParagraphElement;
    this.totalLvlQtyArea = document.querySelector(
      SELECTORS.TOTAL_TASK_QTY_FIELD
    ) as HTMLSpanElement;
    this.curLvlArea = document.querySelector(
      SELECTORS.CUR_LVL_FIELD
    ) as HTMLSpanElement;
    this.menuItemTemmplate = document.querySelector(
      SELECTORS.MENU_ITEM_TEMPLATE
    ) as HTMLTemplateElement;
    this.incTaskBtn = document.querySelector(
      SELECTORS.INC_TASK_BTN
    ) as HTMLButtonElement;
    this.decTaskBtn = document.querySelector(
      SELECTORS.DEC_TASK_BTN
    ) as HTMLButtonElement;
    this.passed =
      localStorage
        .getItem(LOC_STRG_KEYS.PASSED)
        ?.split(LOC_STRG_KEYS.SEPARATOR)
        .map((e) => Number(e)) || [];
    this.icon = document.querySelector(
      SELECTORS.TASK_STATUS_ICON
    ) as HTMLImageElement;
    this.taskDescField = document.querySelector(
      SELECTORS.TASK_DESC_FIELD
    ) as HTMLElement;
    this.resetBtn = document.querySelector(
      SELECTORS.RESET_BTN
    ) as HTMLButtonElement;
    this.alertWindow = document.querySelector(SELECTORS.POPUP) as HTMLElement;
    this.alertBtn = document.querySelector(SELECTORS.POPUP_BTN) as HTMLElement;
    this.helpBtn = document.querySelector(
      SELECTORS.HELP_BTN
    ) as HTMLButtonElement;
    this.promptUsed = false;

    this.initiate();
  }

  toggleMenu = () => {
    if (this.menu.classList.contains(SELECTORS.MENU_ACTIVE)) {
      this.menu.classList.remove(SELECTORS.MENU_ACTIVE);
    } else {
      this.renderMenu;
      this.menu.classList.add(SELECTORS.MENU_ACTIVE);
    }
  };

  createMenuItem = (item: Task) => {
    const element = this.menuItemTemmplate.content.cloneNode(
      true
    ) as HTMLElement;

    const menuItemElement = element.querySelector(
      SELECTORS.MENU_ITEM_ELEMENT
    ) as HTMLDivElement;

    const title = menuItemElement.querySelector(SELECTORS.MENU_ITEM_ELEM_TITLE);
    const num = menuItemElement.querySelector(SELECTORS.MENU_ITEM_ELEM_NUM);
    if (title && num) {
      title.textContent = item.title;
      num.textContent = item.id.toString();
    }
    if (item.id === this.curTaskNum) {
      menuItemElement.classList.add(SELECTORS.MENU_ITEM_CURRENT);
    }
    menuItemElement.addEventListener('click', () => {
      this.switchTask(item.id);
    });
    const icon = menuItemElement.querySelector(
      SELECTORS.MENU_ITEM_ELEM_ICON
    ) as HTMLImageElement;
    if (icon && this.passed.includes(item.id)) {
      icon.src = passedIcon;
    }
    return menuItemElement;
  };

  checkAnswerBlind = () => {
    if (this.answerField.value.length > 0) {
      this.answerField.classList.remove(SELECTORS.BLINK);
    } else {
      this.answerField.classList.add(SELECTORS.BLINK);
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
        localStorage.setItem(
          LOC_STRG_KEYS.PASSED,
          this.passed.join(LOC_STRG_KEYS.SEPARATOR)
        );
      }
      this.table.querySelectorAll(SELECTORS.DESIRED).forEach((e, i) => {
        if (i === 0) {
          const timeout = setTimeout(() => {
            this.switchNextTask();
            clearTimeout(timeout);
          }, 500);
        }
        e.classList.add(SELECTORS.DESIRED_CORRECT);
      });
    } else {
      this.table.querySelectorAll(SELECTORS.DESIRED).forEach((e) => {
        e.classList.add(SELECTORS.DESIRED_WRONG);
        const timeout = setTimeout(() => {
          e.classList.remove(SELECTORS.DESIRED_WRONG);
          clearTimeout(timeout);
        }, 500);
      });
    }
    if (this.passed.length === this.tasks.length) {
      this.openAlert();
    }
  };

  openAlert = () => {
    this.alertWindow.classList.add(SELECTORS.POPUP_ACTIVE);
  };

  closeAlert = () => {
    this.alertWindow.classList.remove(SELECTORS.POPUP_ACTIVE);
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
    this.promptUsed = false;

    this.curTaskNum = taskNum;
    localStorage.setItem(
      LOC_STRG_KEYS.CUR_TASK_NUM,
      this.curTaskNum.toString()
    );
    this.resetAnswer();
    this.switchTaskItem();
    this.renderMenu();
    this.renderTask();
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

  reset = () => {
    this.passed = [];
    this.switchTask(1);
  };

  showPrompt = () => {
    if (this.promptUsed) return;
    this.promptUsed = true;
    this.curTaskItem.correct[0].split('').forEach((e, i) => {
      const timeout = setTimeout(() => {
        this.answerField.value += e;
        clearTimeout(timeout);
      }, 200 * i);
    });
  };

  setListeners() {
    this.menuBtn.addEventListener('click', this.toggleMenu);
    this.closeMenuBtn.addEventListener('click', this.toggleMenu);
    this.answerField.addEventListener('input', this.checkAnswerBlind);
    this.enterBtn.addEventListener('click', this.checkAnswer);
    this.incTaskBtn.addEventListener('click', this.switchNextTask);
    this.decTaskBtn.addEventListener('click', this.switchPrevTask);
    this.resetBtn.addEventListener('click', this.reset);
    this.helpBtn.addEventListener('click', this.showPrompt);
    this.alertBtn.addEventListener('click', () => {
      this.closeAlert();
      this.reset();
    });
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
