<template>
  <b-dropdown>
    <button class="button is-home" type="button" slot="trigger">
        <template>
            <span>Event actions</span>
            <i class="material-icons">expand_more</i>
        </template>
    </button>
    <b-dropdown-item :value="false" @click="button.method" :key="button.text" v-for="button in data">
        <div class="media">
            <i class="material-icons media-left drop-icon">{{button.icon}}</i>
            <div class="media-content">
                <h3>{{button.text}}</h3>
                <small>{{button.subText}}</small>
            </div>
        </div>
    </b-dropdown-item>
  </b-dropdown>
</template>
<script>
export default {
  name: "DropDown",
  props: {
    data: Array
  }
};
</script>
