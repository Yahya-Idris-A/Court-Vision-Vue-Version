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

    <!-- Form -->
    <div class="flex flex-col items-center mt-[40px] gap-[40px] w-full">
      <!-- Username -->
      <div class="w-full">
        <v-text-field
          label="Username"
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
      <div class="flex flex-row items-center w-full gap-[32px] justify-between">
        <!-- Phone Number -->
        <div class="w-full">
          <v-text-field
            label="Phone Number"
            variant="outlined"
            type=""
            density="compact"
            hide-details="auto"
            required
            ><template #prepend-inner>
              <v-icon
                style="color: #667085 !important; font-size: 20px !important"
                icon="mdi mdi-phone-outline"
              ></v-icon> </template
          ></v-text-field>
        </div>
        <!-- Date Picker -->
        <div class="w-full">
          <v-text-field
            v-model="formattedDate"
            label="Date of Birth"
            variant="outlined"
            density="compact"
            hide-details="auto"
            required
            readonly
            @click="menu = true"
            class="custom-icon"
            ><template #prepend-inner>
              <v-icon
                style="color: #667085 !important; font-size: 20px !important"
                icon="mdi mdi-calendar-blank-outline"
              ></v-icon> </template
          ></v-text-field>
          <v-dialog
            v-model="menu"
            max-width="400px"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <v-container>
              <v-row justify="space-around">
                <v-date-picker
                  color="primary"
                  @update:modelValue="saveDate"
                ></v-date-picker>
              </v-row>
            </v-container>
          </v-dialog>
        </div>
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
import { ref, computed, onMounted } from "vue";
import * as utils from "@/plugins/utils";
import image from "@assets/img/user/Avatar.png";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import Dashboard from "@uppy/dashboard";
import DropTarget from "@uppy/drop-target";
// Import required CSS
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const imageInput = ref(null);
const selectedImage = ref(image);
const selectedImageName = ref();
const isDragging = ref(false);
const uppy = ref(null);

// Initialize Uppy
onMounted(() => {
  uppy.value = new Uppy({
    autoProceed: false,
    restrictions: {
      maxFileSize: 5000000,
      allowedFileTypes: [".svg", ".png", ".jpg", ".jpeg", ".webp"],
    },
  });

  // Nambah Dashboard plugin tapi hidden
  uppy.value.use(Dashboard, {
    inline: true,
    target: "#uppy-dashboard",
    hideUploadButton: true,
    showProgressDetails: false,
  });

  // Nambah XHR Upload plugin
  uppy.value.use(XHRUpload, {
    endpoint: "https://your-api-endpoint.com/upload",
    formData: true,
    fieldName: "image",
  });

  // Nambah drop target
  uppy.value.use(DropTarget, {
    target: document.querySelector(".drop-zone"),
  });

  uppy.value.on("file-added", (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/svg+xml",
      "image/webp",
    ];
    if (allowedTypes.includes(file.type)) {
      selectedImage.value = URL.createObjectURL(file.data);
      selectedImageName.value = file.name;
    } else {
      utils.callToaster("error", "File type not supported");
      uppy.value.removeFile(file.id);
    }
  });

  // Listen for upload success
  uppy.value.on("upload-success", (file, response) => {
    console.log("Upload successful:", response);
  });

  // Listen for upload error
  uppy.value.on("upload-error", (file, error) => {
    console.error("Upload error:", error);
  });

  // Listen for drag events
  document.querySelector(".drop-zone").addEventListener("dragover", () => {
    isDragging.value = true;
  });

  document.querySelector(".drop-zone").addEventListener("dragleave", () => {
    isDragging.value = false;
  });

  document.querySelector(".drop-zone").addEventListener("drop", () => {
    isDragging.value = false;
  });
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
        if (uppy.value) {
          // Hapus semua file yang sudah ada
          const existingFiles = uppy.value.getFiles();
          existingFiles.forEach((f) => uppy.value.removeFile(f.id));

          // Tambahkan file baru ke Uppy
          uppy.value.addFile({
            source: "manual-input",
            name: file.name,
            type: file.type,
            data: file,
          });
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
    const result = await uppy.value.upload();
    if (result.failed.length === 0) {
      utils.callToaster("success", "Saved Successfully");
      // Lakukan logic lanjutan, misalnya simpan data user atau redirect
    } else {
      utils.callToaster("error", "Failed to Save");
    }
  } catch (err) {
    utils.callToaster("error", "Failed to Save");
  }
}

const date = ref(""); // Untuk nyimpan tanggal dalam format yang ditampilkan
const menu = ref(false); // Mengontrol tampilan modal date picker
const formattedDate = computed(() => {
  return date.value ? new Date(date.value).toLocaleDateString("id-ID") : "";
});

// Fungsi nyimpan tanggal dan menutup modal
const saveDate = (newDate) => {
  date.value = newDate; // Simpan tanggal yang dipilih
  menu.value = false; // Tutup modal
};
</script>
<style scoped></style>
