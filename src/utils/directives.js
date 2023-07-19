import { directive } from 'vue'

export const focus = directive((el) => {
  el.focus()
})
