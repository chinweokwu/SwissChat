import consumer from "channels/consumer";

let resetMthd;
let timer = 0;

consumer.subscriptions.create("AppearanceChannel", {
  initialized() {},

  connected() {
    // Called when the subscription is ready for use on the server
    console.log("connected");
    resetMthd = () => this.resetTimeMthd(this.uninstall);
    this.install();
    window.addEventListener("turbo:load", () => this.resetTimeMthd());
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("disconnected");
    this.uninstall();
  },

  rejected() {
    console.log("rejected");
    this.uninstall();
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
  },

  online() {
    console.log("online");
    this.perform('online');
  },

  away() {
    console.log("away");
    this.perform("away");
  },

  offline() {
    console.log("offline");
    this.perform('offline');
  },

  uninstall() {
    const run = document.getElementById("appearance_channel");
    if(!run) {
      clearTimeout(timer);
      this.perform("offline")
    }
  },

  install() {
    window.removeEventListener("load", resetMthd);
    window.removeEventListener("DOMContentLoaded", resetMthd);
    window.removeEventListener("click", resetMthd);
    window.removeEventListener("keydown", resetMthd);

    window.addEventListener("load", resetMthd);
    window.addEventListener("DOMContentLoaded", resetMthd);
    window.addEventListener("click", resetMthd);
    window.addEventListener("keydown", resetMthd);
    this.resetTimeMthd();
  },

  resetTimeMthd() {
    this.uninstall();
    const run = document.getElementById("appearance_channel");
    if(!!run) {
      this.online()
      clearTimeout(timer);
      const secs = 1;
      const milliSecs = 1000;
      const mins= secs * milliSecs * 60;
      const numOfMins = 5
      const timeInMilliSecs = mins * numOfMins;

      timer = setTimeout(this.away.bind(this), timeInMilliSecs);

    }
  },
});
