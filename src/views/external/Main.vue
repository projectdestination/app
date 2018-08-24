<template>
  <div class="section container">
  <div class=" tile is-ancestor container">
    <div class="tile container is-fluid is-vertical is-10">
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <div class="tile is-child notification box tile-config-small">
            <article class="">
              <div class="content">
                <p class="title is-5">Welcome company</p>
                <div class="content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </article>
          </div>
          <div class="tile is-child notification box tile-config-small">
            <article class="">
              <div class="content">
                <p class="title is-5">Misc</p>
                <div class="content">
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile tile-config-large is-child is-vertical notification box">
            <div class="title is-5">Your events</div>
            <article v-bind:key="item.id" v-on:click="navigateToEvent(item.id)" class="article media" v-for="item in articles">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{item.type}}</strong>
                    <br>
                    {{item.text}}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: () => ({
    articles: [
      {
        host: "Soner Vergon",
        text: "Consectetur adipiscing elit. ",
        type: "Lunch lecture",
        id: "5"
      },
      {
        host: "Erik Tällberg",
        text: "Lorem ipsum dolor sit amet.",
        type: "Marketing",
        id: "4"
      },
      {
        host: "Erik Tällberg",
        text: "Lorem ipsum dolor sit amet.",
        type: "Marketing",
        id: "3"
      },
      {
        host: "Erik Tällberg",
        text: "Lorem ipsum dolor sit amet.",
        type: "Marketing",
        id: "2"
      },
      {
        host: "Erik Tällberg",
        text: "Lorem ipsum dolor sit amet.",
        type: "Marketing",
        id: "1"
      }
    ]
  }),
  methods: {
    navigateToEvent(id) {
      this.$router.push({ name: "event", params: { eventID: id } });
    }
  },
  created() {}
};
</script>

<style scoped>
.tile-config-large {
  height: 60vh !important;
}

.tile-config-small {
  height: 30vh !important;
  overflow: scroll;
}

.article {
  margin-top: 25px;
  padding-top: 10px;
  transition: transform 0.2s;
}

.article:hover {
  transform: scale(1.03);
  cursor: pointer;
}
</style>
