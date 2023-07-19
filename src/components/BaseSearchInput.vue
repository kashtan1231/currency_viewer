<template>
  <div class="base-search-input">
    <label :class="[
      'base-search-input__label',
      { 'move-label': isInputFocused || modelValue }
    ]" for="input">{{ label }}</label>
    <div class="base-search-input__wrapper">
      <input class="base-search-input__field-input" @input="onInput" @focus="focusInput" @blur="unfocusInput"
        :value="modelValue" id="input" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'BaseSearchInput',

  props: {
    modelValue: [String, Number],
    label: {
      default: ''
    }
  },

  setup(props, context) {
    const isInputFocused = ref(false)

    const focusInput = () => {
      isInputFocused.value = true
    }
    const unfocusInput = () => {
      isInputFocused.value = false
    }
    const onInput = (event) => {
      const target = event.target
      const regex = /[^0-9a-zA-Zа-яА-яҐґЄєІіЇїЁё]/u

      target.value = target.value.replace(regex, '')
      context.emit('update:modelValue', target.value)
    }

    return {
      isInputFocused,
      focusInput,
      unfocusInput,
      onInput
    }
  }
}
</script>

<style lang="scss" scoped>
.base-search-input {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 328px;

  &__label {
    @extend p;
    position: absolute;
    top: 14px;
    left: 16px;
    padding: 0 4px;
    border-radius: 30px;
    background-color: $white;
    color: $gray-dark;
    transition-duration: 0.2s;
    user-select: none;
    pointer-events: none;
  }

  &__wrapper {
    display: flex;
    box-shadow: inset 0 0 0 1px $gray-dark;
    border-radius: 4px;
  }

  &__field-input {
    @extend p;
    padding: 14px 16px;
    width: 100%;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      -webkit-text-fill-color: $black;
      transition: background-color 5000s ease-in-out 0s;
    }

    &::-webkit-calendar-picker-indicator {
      opacity: 0;
    }
  }
}

.move-label {
  top: -7px;
  left: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
}
</style>
