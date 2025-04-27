import { IPopup } from '../types/models';
import SELECTORS from '../utils/selectors';
import { OpenAlert } from '../types/models';

class Popup implements IPopup {
  window: HTMLElement;
  resetBtn: HTMLElement;

  constructor(public reset: OpenAlert) {
    this.window = document.querySelector(SELECTORS.POPUP) as HTMLElement;
    this.resetBtn = document.querySelector(SELECTORS.POPUP_BTN) as HTMLElement;
    this.initiate();
  }

  open = () => {
    this.window.classList.add(SELECTORS.POPUP_ACTIVE);
  };

  close = () => {
    this.window.classList.remove(SELECTORS.POPUP_ACTIVE);
  };

  setListeners() {
    this.resetBtn.addEventListener('click', () => {
      this.close();
      this.reset();
    });
  }

  initiate = () => {
    this.setListeners();
  };
}

export default Popup;
