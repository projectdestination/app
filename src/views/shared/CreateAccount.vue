<template>
<div class="section">
  <div class="container content content-container">
    <h1>Create an account</h1>
    <p>
      To be able to create a user login, your email must be bound to a company mail, ex: me@[yourcompany].com. This will give you access to your company's status end event page where some of your products will be managable.
    </p>
    <Form />
    <h3>Does my company already have an account?</h3>
    <p>
      Could be so, however, by creating an account you will be able to view your company's status. This means that your personal login will not affect the company accout in any way. Signing up is a great way to find out if your company already has an account.
    </p>
  </div>
</div>

</template>

<script>
import Form from "@/components/Form";

export default {
  components: {
    Form
  }
};
</script>

<style scoped>
.content-container {
  max-width: 40%;
}
.form {
  margin: 10% 0;
}
</style>
