<template>
  <div class="section">
    <h2 class="title uppercase is-5 spacing pd-font">Uploaded documents</h2>
    <span
    :key="document.name"
    v-if="document"
    class=""
    v-for="(document, id, index) in documents"
    >
    <article class="article list-item media">
      <figure class="media-left">
        <b-tooltip :label="`File type: ${document.contentType}`">
          <p class="image is-32x32">
              <img class="list-image" src="../assets/file_icon.png">
          </p>
        </b-tooltip>
      </figure>
      <div style="margin-top: -10px;" class="media-content">
        <div class="content">
          <p>
            <a class="is-pulled-right" @click="deleteDocument(document)">
              <b-tooltip label="Delete" type="is-danger">
                <i
                style="margin-top:10px; padding: 0 20px;"
                class=" has-text-danger material-icons">
                clear
              </i>
            </b-tooltip>
            </a>
            <a class="is-pulled-right" @click="preview(document)">
              <b-tooltip label="Preview" type="is-info">
                <i
                style="margin-top:10px; padding: 0 20px;"
                class="icon material-icons has-text-info ">note</i>
              </b-tooltip>
            </a>
            <a
            @click="download(document, index)"
            style="border: none;"
            class="button is-pulled-right"
            :class="isLoadingIndex === index ? `is-loading`:``">
              <b-tooltip label="Download">
                <i
                style="margin-top:10px"
                class="icon material-icons is-pulled-right">cloud_download</i>
              </b-tooltip>
            </a>
            <strong>{{document.name}}</strong>
            <br>
            <small>{{document.uploaded_by.first_name}} {{document.uploaded_by.last_name}} at {{getMoment(document.timeCreated)}}</small>
          </p>
        </div>
      </div>
    </article>
  </span>
  </div>
</template>

<script>
import moment from "moment";
import saveAs from "file-saver";

export default {
  props: {
    documents: Object
  },
  data: () => {
    return {
      blobs: {},
      isLoadingIndex: 10000
    };
  },
  methods: {
    preview(file) {
      window.open(file.url, "_blank");
    },
    deleteDocument(file) {
      this.$store.dispatch("document_handler/removeFile", {
        name: file.name,
        id: file.parent_id,
        documents: this.documents,
        type: "event_document",
        saveAction: "admin/events/removeDocument"
      });
    },
    getMoment(date) {
      return moment(date).format("D MMMM YY - HH:mm");
    },
    download(file, index) {
      this.isLoadingIndex = index;
      this.$http
        .get(file.url, { responseType: "blob" })
        .then(response => {
          return response.blob();
        })
        .then(blob => {
          saveAs(blob, file.name);
          this.isLoadingIndex = 1000;
        });
    }
  }
};
</script>

<style scoped lang="css">
.list-item {
  margin-top: 30px !important;
}
.icon {

}
.icon:hover {
  cursor: pointer;
}
.list-image {
  transition: transform 0.1s;
}

.list-image:hover {
  transform: scale(1.1);
}
</style>
