<template>
  <section class="hero pd-intro is-medium background2 is-bold">
    <div class="section has-text-centered">
      <h1 class="title pd-font uppercase spacing">Its all about quality and having fun</h1>
      <div class="hero-body has-text-center">
        <div class="container has-text-left">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <div class="tile is-5 is-child">
                <h1 class="title is-4 pd-font uppercase spacing">
                  project destination
                </h1>
                <p>
                  <span class="content-intro">
                    {{PD_TEXT}}
                  </span>
                </p>
              </div>
              <div  class="tile is-child">
                <div class="container">
                </div>
              </div>
            </div>
          </div>
          <div class="tile is-ancestor margin">
            <div class="tile is-parent">
              <div class="tile is-child">
              </div>
              <div class="tile has-text-right is-5 is-child">
                <h1 class="title is-4 pd-font uppercase spacing">
                  For students by students
                </h1>
                <p>
                  <span class="content-intro">
                    {{FOR_STUDENTS}}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <div class="tile is-5 is-child">
                <h1 class="title is-4 pd-font uppercase spacing">
                  Transparancy is key
                </h1>
                <p>
                  <span class="content-intro">
                    {{TRANSPARANCY}}
                  </span>
                </p>
              </div>
              <div  class="tile is-child">
                <div class="container">
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { PD_TEXT, FOR_STUDENTS, TRANSPARANCY } from "@/constants/home";
export default {
  data: () => {
    return {
      TRANSPARANCY,
      FOR_STUDENTS,
      PD_TEXT
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  background-color: #fff;
  display: inline-block;
}
.content-intro {
  background-color: #fff;
}
</style>
