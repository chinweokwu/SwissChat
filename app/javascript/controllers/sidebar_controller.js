import {Controller} from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['sidebar', 'openButton', 'closeButton'];

  connect() {
    this.closeSidebar();
  }

  toggleSidebar() {
    if (this.sidebarTarget.style.transform === 'translateX(0px)') {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  openSidebar() {
    this.sidebarTarget.style.transform = 'translateX(0px)';
    this.openButtonTarget.classList.add('hidden');
    this.closeButtonTarget.classList.remove('hidden');
  }

  closeSidebar() {
    this.sidebarTarget.style.transform = 'translateX(-260px)';
    this.closeButtonTarget.classList.add('hidden');
    this.openButtonTarget.classList.remove('hidden');
  }
}