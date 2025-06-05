<template>
  <div class="flex flex-col items-center w-full">
    <img
      :src="selectedImage"
      alt=""
      class="size-[150px] mb-[20px] max-sm:size-[30px] max-sm:mt-[10px] rounded-full object-cover"
    />
    <!-- File name display -->
    <div
      v-if="selectedImageName"
      class="px-[8px] border-[2px] border-[#FD6A2A] rounded-[8px] items-center justify-center mb-[20px]"
    >
      <div class="flex flex-row items-center justify-center">
        <span class="grow truncate text-center text-[#9e9e9e]"
          >Selected image: {{ selectedImageName }}</span
        >
      </div>
    </div>
    <div
      class="drop-zone border-[2px] w-full border-dashed border-[#9e9e9e] rounded-[8px] px-[40px] py-[20px] cursor-pointer mb-[15px] transition-all duration-300 ease-in text-center hover:border-[#FD6A2A]"
      @click="triggerImageInput"
      :class="{ 'border-[#FD6A2A]': isDragging }"
    >
      <div class="flex flex-col justify-center items-center">
        <div class="mb-[10px]">
          <v-icon
            icon="mdi mdi-image-plus-outline"
            class="!text-[50px] !text-[#FD6A2A] max-sm:!text-[30px]"
          ></v-icon>
        </div>
        <p class="!text-[#FD6A2A] !text-[16px] m-0">
          Browse Image or Drag Here to Upload
        </p>
      </div>
    </div>
    <!-- Hidden file input to trigger native file selection -->
    <input
      type="file"
      ref="imageInput"
      @change="handleImageSelect"
      accept="image/*"
      style="display: none"
    />
    <!-- Hidden Uppy Dashboard (used for file picking but not displayed) -->
    <div id="uppy-dashboard" style="display: none"></div>

    <!-- File progress display -->
    <div v-if="selectedFile" class="px-[8px] py-[12px] mb-[15px] w-full">
      <div class="flex flex-row items-center mb-[6px]">
        <div class="mr-[10px]">
          <v-icon
            icon="mdi mdi-image-plus-outline"
            class="!text-[40px] max-sm:!text-[30px] !text-[#FD6A2A]"
          ></v-icon>
        </div>
        <span class="grow truncate">{{ selectedFile.name }}</span>
        <span class="ml-[10px] font-[14px]">{{ uploadProgress }}%</span>
      </div>
      <div
        class="overflow-hidden rounded-[10px] border-[1px] border-[#403D91] h-[10px]"
      >
        <div
          class="progress-fill"
          :style="{ width: `${uploadProgress}%` }"
        ></div>
      </div>
    </div>

    <!-- Form -->
    <div class="flex flex-col items-center mt-[40px] gap-[40px] w-full">
      <!-- Username -->
      <div class="w-full">
        <v-text-field
          label="Username"
          v-model="userName"
          variant="outlined"
          density="compact"
          hide-details="auto"
          required
          ><template #prepend-inner>
            <v-icon
              style="color: #667085 !important; font-size: 20px !important"
              icon="mdi mdi-account-outline"
            ></v-icon> </template
        ></v-text-field>
      </div>
      <!-- Email -->
      <div class="w-full">
        <v-text-field
          label="Email"
          v-model="userEmail"
          variant="outlined"
          type="email"
          density="compact"
          hide-details="auto"
          required
          ><template #prepend-inner>
            <v-icon
              style="color: #667085 !important; font-size: 20px !important"
              icon="mdi mdi-email-outline"
            ></v-icon> </template
        ></v-text-field>
      </div>
    </div>
    <!-- Button Save-->
    <div
      class="flex flex-row items-center justify-end gap-[15px] w-full mt-[40px]"
    >
      <button
        class="bg-[#FD6A2A] border-[#FD6A2A] border-[2px] px-[5%] py-[5px] rounded-[8px] text-white text-[16px] font-semibold cursor-pointer"
        @click="handleSave"
      >
        Save
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import * as authService from "@/services/authService";
import * as uploadService from "@/services/uploadService";
import * as utils from "@/plugins/utils";
import image from "@assets/img/user/user.svg";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import DropTarget from "@uppy/drop-target";
// Import required CSS
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const imageInput = ref(null);
const selectedImage = ref(image);
const selectedImageName = ref();
const uppy = ref(null);
const photo_url = ref("");
const selectedFile = ref(null);
const isDragging = ref(false);
const uploadProgress = ref(0);
const isUploading = ref(false);
const uploadSucces = ref(false);

// Initialize Uppy
onMounted(() => {
  uppy.value = new Uppy({
    autoProceed: true,
    restrictions: {
      maxFileSize: 10000000, // 10MB
      allowedFileTypes: [".jpg", ".jpeg", ".png", ".svg"],
      maxNumberOfFiles: 1,
    },
  });

  // Dropzone support
  uppy.value.use(DropTarget, {
    target: document.querySelector(".drop-zone"),
  });

  uppy.value.use(AwsS3, {
    shouldUseMultipart: false,
    async getUploadParameters(file, options) {
      const result = await uploadService.getSignedUrl(
        file.name,
        file.type,
        options.signal
      );

      console.log(options);
      const { method, url } = result.data;
      return {
        method,
        url,
        fields: {},
        headers: {
          "Content-Type": file.type,
        },
      };
    },
  });

  // Uppy events
  uppy.value.on("file-added", (file) => {
    selectedImage.value = URL.createObjectURL(file.data);
    selectedFile.value = {
      id: file.id,
      name: file.name,
      size: file.size,
      type: file.type,
    };
    uploadProgress.value = 0;
  });

  uppy.value.on("upload-progress", (file, progress) => {
    if (selectedFile.value && selectedFile.value.id === file.id) {
      isUploading.value = true;
      uploadProgress.value = Math.floor(
        (progress.bytesUploaded / progress.bytesTotal) * 100
      );
      console.log("Upload Progress: ", uploadProgress.value);
    }
  });

  uppy.value.on("upload-success", (file, response) => {
    isUploading.value = false;
    uploadSucces.value = true;
    uploadProgress.value = 100;
    photo_url.value = response.uploadURL || "";
    userData.value.photo_url = response.uploadURL || "";
    console.log("Sukses Upload");
  });

  // Listen for drag events
  const dropZone = document.querySelector(".drop-zone");
  if (dropZone) {
    dropZone.addEventListener("dragover", () => (isDragging.value = true));
    dropZone.addEventListener("dragleave", () => (isDragging.value = false));
    dropZone.addEventListener("drop", () => (isDragging.value = false));
  }
});

function triggerImageInput() {
  imageInput.value.click();
}

function handleImageSelect(event) {
  const files = event.target.files;

  if (files.length > 0) {
    const file = files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/svg+xml",
        "image/webp",
      ];
      if (allowedTypes.includes(file.type)) {
        selectedImage.value = URL.createObjectURL(file);
        selectedImageName.value = file.name;
        try {
          uppy.value?.addFile({
            name: file.name,
            type: file.type,
            data: file,
          });
        } catch (error) {
          console.error("Error saat addFile ke Uppy:", error);
        }
      } else {
        utils.callToaster("error", "File type not supported");
        uppy.value.removeFile(file.id);
      }
    }
  }
}

async function handleSave() {
  try {
    const response = await authService.updateUser(userData.value);
    console.log(response);

    if (response.statusCode == 200) {
      utils.callToaster("success", "Edit Profile Berhasil");
      getUserData();
    } else {
      utils.callToaster("error", response.message);
    }
  } catch (error) {
    utils.callToaster("error", error.response.data.message);
  }
}

// Hit API
const userData = ref({
  name: "",
  email: "",
  photo_url: "",
});
const userName = ref("");
const userEmail = ref("");

const getUserData = async () => {
  const response = await authService.getUser();
  userData.value.name = response.data.user.name;
  userData.value.email = response.data.user.email;
  userData.value.photo_url = response.data.user.photoUrl;
  userName.value = response.data.user.name;
  userEmail.value = response.data.user.email;
  selectedImage.value = response.data.user.photo_url || image;
};

watchEffect(async () => {
  await getUserData();
});

onMounted(async () => {
  await getUserData();
});
</script>
<style scoped>
.progress-fill {
  height: 100%;
  background-color: #403d91;
  transition: width 0.3s ease;
}
</style>
