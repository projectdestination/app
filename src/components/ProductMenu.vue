<template>
  <aside class="menu pd-font uppercase spacing">
    <div class="title pd-font">
      Products
    </div>

      <ul class="menu-list">
        <li>
          <a :class="$route.path.includes(`start`)  && `is-active`" @click="handleClick(`start`)" >Start</a>
        </li>
      </ul>
    <span :key="item.text" v-if="item.list.length >0" v-for="item in list">
      <p class="menu-label">
        {{item.text}}
      </p>
      <ul class="menu-list">
        <li :key="event.key" v-for="event in item.list" >
          <a :class="$route.path.includes(event.key)  && `is-active`" @click="handleClick(event.key)" >{{event.title}}
            <b-tag v-if="event.isRecomended" class="is-pulled-right tag" type="is-pd-green" size="is-small">Recomended</b-tag></a>
        </li>
      </ul>
    </span>
    <footer class="footer has-background-white">
      <b-message type="is-pd-pink" class="message">Feel that you have learned enough? Then it's time to get an event. Enter the app below.</b-message>
      <a @click="login" class="button is-pd-pink is-rounded">{{user ? "Enter app" : "Log in"}}</a>
      <a @click="$router.push(`/create`)" class="button is-pd-green is-rounded is-pulled-right">Create user</a>
    </footer>
</aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProductMenu",
  computed: {
    ...mapState({
      list: state => {
        const products = state.content.product_types;
        const events = { text: "Events", list: [] };
        const marketing = { text: "Marketing", list: [] };
        const other = { text: "Other", list: [] };
        Object.keys(products).map(key => {
          if (products[key].type === "event") events.list.push(products[key]);
          if (products[key].type === "marketing")
            marketing.list.push(products[key]);
          if (products[key].type === "other") other.list.push(products[key]);
        });
        return { events, marketing, other };
      },
      user: state => state.user.userIsAuthenticated
    })
  },
  methods: {
    handleClick(route) {
      if (route === "/") {
        this.$router.push("/products");
      } else if (route === "start") {
        this.$router.push("/products/start");
      } else {
        this.$router.push({
          name: "product",
          params: { routeID: route }
        });
      }
    },
    login() {
      this.$store.dispatch("login/openModal");
    }
  },
  created() {
    this.$store.dispatch("content/getProductTypes");
    this.$store.dispatch("content/getProductContent");
  }
};
</script>

<style lang="css">
.footer {
      padding: 1rem 0rem !important;
}
.button {
  text-transform: none;
  letter-spacing: normal;
}
.message {
  text-transform: none;
  letter-spacing: normal;
}
.tag {
  font-size: 50% !important;
  letter-spacing: 1px;
}
.menu-label {
  margin-top: 20px !important;
}
</style>
