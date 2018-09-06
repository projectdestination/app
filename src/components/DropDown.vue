<template>
  <b-dropdown>
    <button class="button is-home" type="button" slot="trigger">
        <template>
            <span>Event actions</span>
            <i class="material-icons">expand_more</i>
        </template>
    </button>

    <b-dropdown-item :value="true">
        <div class="media">
            <i class="material-icons media-left drop-icon">date_range</i>
            <div class="media-content">
                <h3>New event</h3>
                <small>Create a new event</small>
            </div>
        </div>
    </b-dropdown-item>
    <b-dropdown-item :value="true">
        <div class="media">
            <i class="material-icons media-left drop-icon">flare</i>
            <div class="media-content">
                <h3>New event type</h3>
                <small>Create a new type of event</small>
            </div>
        </div>
    </b-dropdown-item>
</b-dropdown>
</template>
<script>
export default {
  name: "DropDown",
  props: {
    data: Object
  }
};
</script>
