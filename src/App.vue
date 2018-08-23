<template>
  <div>

<router-view/>
</div>
</template>

<script>
export default {
  data: () => ({
    active: false,
    actives: 2
  })
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #bdbdbd;
$primary-invert: findColorInvert($primary);

$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

$success: #66bb6a;
$success-invert: findColorInvert($success);

$danger: #ef5350;
$danger-invert: findColorInvert($danger);

$warning: #ffee58;
$warning-invert: findColorInvert($warning);

$info: #42a5f5;
$info-invert: findColorInvert($info);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

.con-example-sidebar {
  height: 100vh;
}

.primary-color {
  color: $primary;
}
</style>
