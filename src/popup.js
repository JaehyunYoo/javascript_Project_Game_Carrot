'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop_up");
    this.popUpMsg = document.querySelector(".pop_up__meassage");
    this.popUpRefreshBtn = document.querySelector(".pop_up__refresh");

    this.popUpRefreshBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpMsg.innerText = text;
    this.popUp.classList.remove("pop-up--hide");
  }
  hide(){
      this.popUp.classList.add("pop-up--hide");
     
  }
}
