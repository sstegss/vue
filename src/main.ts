import { createApp } from "vue";
import App from "./App.vue";
import components from "./components/UI/index.ts";
import router from "./router/router.ts";
import directives from "./directives/index.ts";
import store from "./store/index.ts";
const app = createApp(App);

components.map((component) => {
  if (component.name) {
    app.component(component.name, component);
  }
});

directives.map((directive) => {
  app.directive(directive.name, directive);
});

app.use(router).use(store).mount("#app");
