<template>
  <nav class="navbar is-white" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" @click="navigateTo(`/`)" >
      <img src="@/assets/logo.png">
    </a>
  </div>
  <div class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item has-text-dark" v-if="button.text" @click="navigateTo(button.route)" v-for="button in buttons.left">
        {{button.text}}
      </a>
      </div>
      <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p v-bind:key="button.text" v-if="button.text" v-for="button in buttons.right" class="control">
            <b-tooltip v-bind:active="button.disabled" type="is-warning" label="Under development" position="is-bottom">
            <a class="button has-text-dark" v-bind:disabled="button.disabled" v-bind:class="button.class" @click="!button.disabled && handleClick(button.type,button.route)">
              <span>{{button.text}}</span>
              <span class="icon icon-modifier">
                <i class="material-icons">{{button.icon}}</i>
              </span>
            </a>
          </b-tooltip>
          </p>
        </div>
      </div>
    </div>
    </div>
</nav>
</template>
<script>
export default {
  name: "Navigation",
  props: {
    buttons: Object,
    iconURL: String,
    signUserOut: Function,
    handleClick: Function,
    navigateTo: Function
  }
};
</script>
