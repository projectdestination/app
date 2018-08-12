<template>
  <div class="content">
      <h1>Styling</h1>
      <p>
          Set your component's style here, find
          <br /> classes at <strong>bulma.io</strong> or use
          <br /> inline styles by coding your own css.
      </p>
      <div>
          <b-field label="Outer classes">
              <b-input v-on:input="handleChange" v-model="data.outerClass" v-bind:value="data.outerClass"></b-input>
          </b-field>
          <b-field label="Inner classes">
              <b-input v-on:input="handleChange" v-model="data.innerClass" v-bind:value="data.innerClass"></b-input>
          </b-field>
          <b-field label="Title classes">
              <b-input v-on:input="handleChange" v-model="data.titleClass" v-bind:value="data.titleClass"></b-input>
          </b-field>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    handleChange: Function,
    data: Object
  }
};
</script>
