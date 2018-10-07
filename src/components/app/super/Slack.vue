<template>
  <div>
    <b-field label="Select message type">
            <b-select expanded v-model="messageType" placeholder="Select a name">
                <option
                    v-for="option in messageTypes"
                    :value="option.value"
                    :key="option.value">
                    {{ option.text }}
                </option>
            </b-select>
        </b-field>
        <Plain v-if="messageType === `plain`" />
        <Attachment v-if="messageType === `attachment`"/>
  </div>
</template>

<script>
import Plain from "./slack/Plain";
import Attachment from "./slack/Attachment";

export default {
  components: {
    Plain,
    Attachment
  },
  data: () => {
    return {
      messageTypes: {
        plain: {
          value: "plain",
          text: "Plain message"
        },
        attach: {
          value: "attachment",
          text: "Attachment"
        }
      },
      messageType: "plain"
    };
  }
};
</script>

<style lang="css">
</style>
