<template>
  <span>
    <HeroSmall :data="hero" />
    <div class="container section" >
      <DropDown :data="buttons" buttonText="Company Actions" />
    </div>
    <router-view></router-view>
  </span>
</template>
<script>
import HeroSmall from "@/components/HeroSmall";
import DropDown from "@/components/DropDown";
import NewCompany from "@/components/app/company/NewCompany";

export default {
  components: {
    HeroSmall,
    DropDown
  },
  computed: {
    hero() {
      return {
        title: "Companies",
        subtitle: "Edit companies and view them."
      };
    },
    buttons() {
      return [
        {
          type: "new",
          icon: "flare",
          text: "New company",
          subText: "Create a new company profile",
          method: this.newCompany
        }
      ];
    }
  },
  methods: {
    newCompany() {
      this.$modal.open({
        parent: this,
        component: NewCompany,
        hasModalCard: true
      });
    }
  }
};
</script>
