import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.ts";
import directives from "./directives/index.ts";
import store from "./store/index.ts";
import MyButton from "./components/UI/MyButton.vue";
import MyInput from "./components/UI/MyInput.vue";
import MyDialog from "./components/UI/MyDialog.vue";
import MySelect from "./components/UI/MySelect.vue";
const app = createApp(App);
app.component(`MyButton`, MyButton);
app.component(`MyInput`, MyInput);
app.component(`MyDialog`, MyDialog);
app.component(`MySelect`, MySelect);
directives.map((directive) => {
  app.directive(directive.name, directive);
});

app.use(router).use(store).mount("#app");
