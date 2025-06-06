import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.ts";
import directives from "./directives/index.ts";
import store from "./store/index.ts";
const app = createApp(App);

directives.map((directive) => {
  app.directive(directive.name, directive);
});

app.use(router).use(store).mount("#app");
