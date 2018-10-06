<template>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new contact</p>
      </header>
      <section class="modal-card-body">
        <b-field label="First Name">
          <b-input
          v-model="first_name"
          placeholder="First Name"
          required>
        </b-input>
      </b-field>
      <b-field label="Last Name">
        <b-input
        v-model="last_name"
        placeholder="Last Name"
        required>
      </b-input>
    </b-field>
    <b-field label="Email">
      <b-input
      type="email"
      v-model="email"
      placeholder="Email"
      required>
    </b-input>
  </b-field>
  <b-field label="Phone">
    <b-input
    v-model="phone"
    placeholder="Phone"
    required>
  </b-input>
</b-field>
<b-field label="Role">
  <b-input
  v-model="role"
  placeholder="Role"
  required>
</b-input>
</b-field>
</section>
<footer class="modal-card-foot">
  <button class="button" type="button" @click="$parent.close()">Close</button>
  <button class="button is-success" @click="handleAdd">Create</button>
</footer>
</div>
</template>

<script>
export default {
  data: () => {
    return {
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      phone: ""
    };
  },
  methods: {
    handleAdd() {
      const { first_name, last_name, email, role, phone } = this;
      const contact = {
        first_name,
        last_name,
        email,
        phone,
        role
      };
      this.$attrs.add(contact);
      this.$parent.close();
    }
  }
};
</script>
