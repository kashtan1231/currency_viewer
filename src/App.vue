<template>
  <router-view />
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

#app {
  height: 100vh;
  font-family: $font-family-default;
  color: $black;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

input {
  border: none;
  outline: none;
  background-color: transparent;
}

a {
  text-decoration: none;
  color: $black;
}
</style>
