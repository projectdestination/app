<template>
  <div class="form">
        <b-field horizontal label="Adress">
              <b-input rounded placeholder="Street"></b-input>
              <b-input rounded placeholder="Number"></b-input>
              <b-input rounded placeholder="Box number"></b-input>
          </b-field>
          <b-field horizontal>
                <b-input rounded placeholder="City"></b-input>
                <b-input rounded placeholder="Postal code"></b-input>
            </b-field>
            <a v-on:click="createUser" class="button">Send</a>
  </div>
</template>

<style scoped lang="scss">
h2 {
  color: rgba(0, 0, 0, 0.7);
}
.form {
  background-color: rgba(#bdbdbd, 0.2);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0 100px rgba(#000, 0.7);
}
.divider {
  height: 1px;
  margin: 5% 0;
}
</style>
