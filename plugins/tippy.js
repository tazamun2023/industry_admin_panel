// plugins/tippy.js
import Vue from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

Vue.directive('tippy', {
  bind(el, binding) {
    tippy(el, {
      content: binding.value,
      placement: binding.arg || 'top',
      animation: 'fade',
      theme: 'light',
      arrow: true,
      ...binding.modifiers
    });
  },
  update(el, binding) {
    if (binding.value !== binding.oldValue) {
      el._tippy.setContent(binding.value);
    }
  },
  unbind(el) {
    if (el._tippy) {
      el._tippy.destroy();
    }
  }
});
