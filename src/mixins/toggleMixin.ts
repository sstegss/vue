import  { defineComponent } from "vue"

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits:['update:show'],
  methods: {
    hideDialog() :void {
      this.$emit("update:show", false);
    },
  },
});
