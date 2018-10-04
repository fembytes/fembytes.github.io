window.Tether = require('tether');
require('bootstrap');
require('webcomponents.js/webcomponents-lite.js');
var throttle = require('lodash.throttle');

import './typekit';

if (typeof HTMLElement !== 'function') {
  var _HTMLElement = () => { };
  _HTMLElement.prototype = HTMLElement.prototype;
  HTMLElement = _HTMLElement;
}

export class FbNav extends HTMLElement {
  attachedCallback() {
    this.toggler = this.querySelector('.navbar-toggler');
    this.drawer = this.querySelector('.navbar-collapse');
    this.brand = this.querySelector('.navbar-brand');

    this.brand.addEventListener('click', (e) => {
      e.preventDefault();
      this.brand.querySelector('img').classList.add('rubberBand');
      setTimeout(() => {
        window.location = this.brand.getAttribute('href');
      }, 300);
    });

    this.toggler.addEventListener('click', () => {
      $(this.drawer).collapse('toggle');
    });

    $(this.drawer).on('show.bs.collapse', () => {
      this.toggler.classList.add('swing');
    });

    $(this.drawer).on('hide.bs.collapse', () => {
      this.toggler.classList.add('swing');
    });

    $(this.drawer).on('shown.bs.collapse', () => {
      this.toggler.classList.remove('swing');
      this.toggler.querySelector('i').classList.remove('mdi-dots-horizontal');
      this.toggler.querySelector('i').classList.add('mdi-close');
    });

    $(this.drawer).on('hidden.bs.collapse', () => {
      this.toggler.classList.remove('swing');
      this.toggler.querySelector('i').classList.remove('mdi-close');
      this.toggler.querySelector('i').classList.add('mdi-dots-horizontal');
    });
  }
}

document.registerElement('fb-nav', FbNav);

export class FbSidebar extends HTMLElement {
  attachedCallback() {
    this.adjust();
    window.addEventListener('scroll', throttle(this.adjust.bind(this), 100));
    window.addEventListener('resize', throttle(this.adjust.bind(this), 100));
  }

  adjust() {
    this.nextElementSibling.style.marginLeft = this.getBoundingClientRect().left + this.offsetWidth + 'px';
  }
}

document.registerElement('fb-sidebar', FbSidebar)

$(function() {
  let buttons = document.querySelectorAll('.btn');

  buttons.forEach((button) => {
    button.classList.add('animated');

    button.addEventListener('mouseover', () => {
      button.classList.add('pulse');
    });

    button.addEventListener('mouseleave', () => {
      button.classList.remove('pulse');
    });
  });
});
