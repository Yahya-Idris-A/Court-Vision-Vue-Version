<template>
  <div class="upload-box">
    <p>Upload Your Video</p>
    <form action="">
      <input
        type="file"
        accept="video/*"
        class="video-input"
        name="video"
        ref="videoinput"
        hidden
        @change="uploadVideo"
      />
      <div class="icon" @click="$refs.videoinput.click()">
        <iconify-icon
          icon="ri:video-upload-fill"
          width="96"
          height="96"
          style="color: #1ba155"
        ></iconify-icon>
      </div>
      <p>Browse Video Or Drag Here To Upload</p>
    </form>
    <section class="loading-area" v-if="showProgress">
      <li class="row" v-for="(file, index) in files">
        <iconify-icon
          icon="mingcute:video-fill"
          width="40"
          height="40"
          style="color: #1ba155"
        ></iconify-icon>
        <div class="content">
          <div class="details">
            <span class="name">{{ file.name }}</span>
            <span class="percent">{{ file.loading }}</span>
          </div>
          <div class="loading-bar">
            <div class="loading" :style="{ width: file.loading + '%' }"></div>
          </div>
        </div>
      </li>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// Reactive variables
const files = ref([]);
const uploadedVideo = ref([]);
const showProgress = ref(false);

const uploadVideo = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const filename =
    file.name.length >= 12
      ? file.name.substring(0, 13) + "... ." + file.name.split(".")[1]
      : file.name;
  const formData = new FormData();
  formData.append("file", file);
  console.log(filename);

  files.value.push({ name: filename, loading: 0 });
  showProgress.value = true;

  // Upload file pake Axios
  axios
    .post("API", formData, {
      onUploadProgress: ({ loaded, total }) => {
        const progress = Math.floor((loaded / total) * 100);
        files.value[files.value.length - 1].loading = progress;

        if (loaded === total) {
          const fileSize =
            total < 1024
              ? `${total} KB`
              : `${(total / (1024 * 1024)).toFixed(2)} MB`;
          uploadedVideo.value.push({ name: filename, size: fileSize });

          // Reset files and progress state
          files.value = [];
          showProgress.value = false;
        }
      },
    })
    .catch((error) => {
      console.error("Upload failed:", error);
      showProgress.value = false;
    });
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  padding: 10px;
  background: #1aaa4c;
}

.upload-box > p {
  text-align: center;
  font-weight: 500;
  margin-top: 10px;
}

img {
  width: 100%;
}

/* .icon {
  width: 90px;
  height: 90px;
  background: green;
} */

.upload-box {
  width: 100vw;
  height: 100vh;
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0, 0%);
}

.upload-box form {
  height: 170px;
  display: flex;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed #29ba2a;
}

form :where(i, p) {
  color: #29ba2a;
}

form i {
  font-size: 50px;
}

form p {
  margin-top: 15px;
  font-size: 16px;
}

section .row {
  margin-bottom: 10px;
  background: #d0ffd3;
  list-style: none;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

section .row i {
  color: #1aaa4c;
  font-size: 30px;
}

section .details span {
  font-size: 12px;
}

.loading-area .row .content {
  width: 100%;
  margin-left: 15px;
  color: black;
}

.loading-area .details {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: space-between;
}

.loading-area .content .loading-bar {
  height: 10px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
}

.content .loading-bar .loading {
  height: 100;
  width: 20%;
  background: #1aaa4c;
  border-radius: inherit;
}
</style>
