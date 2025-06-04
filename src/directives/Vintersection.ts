import type { DirectiveBinding } from "vue";

export default {
  mounted(element: HTMLElement, binding: DirectiveBinding) {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);
  },
  name: "intersection",
};
