<template>
  <div class="w-full mx-[112px]">
    <!-- UI drop zone that triggers Uppy functionality -->
    <div
      class="drop-zone border-[2px] border-dashed border-[#9e9e9e] rounded-[8px] px-[40px] py-[20px] cursor-pointer mb-[15px] transition-all duration-300 ease-in text-center hover:border-[#FD6A2A]"
      @click="triggerFileInput"
      :class="{ 'border-[#FD6A2A]': isDragging }"
    >
      <div class="flex flex-col justify-center items-center">
        <div class="mb-[10px]">
          <v-icon
            icon="mdi mdi-video-plus-outline"
            class="!text-[80px] !text-[#FD6A2A] max-sm:!text-[30px]"
          ></v-icon>
        </div>
        <p class="!text-[#FD6A2A] !text-[16px] m-0">
          Browse Video or Drag Here to Upload
        </p>
      </div>
    </div>
    <!-- Hidden file input to trigger native file selection -->
    <input
      type="file"
      ref="fileInput"
      @change="handleFileSelect"
      accept="video/*"
      style="display: none"
    />
    <!-- Hidden Uppy Dashboard (used for file picking but not displayed) -->
    <div id="uppy-dashboard" style="display: none"></div>

    <!-- File progress display -->
    <div v-if="selectedFile" class="px-[8px] py-[12px] mb-[15px]">
      <div class="flex flex-row items-center mb-[6px]">
        <div class="mr-[10px]">
          <v-icon
            icon="mdi mdi-video-plus-outline"
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

    <!-- Analyze button -->
    <button
      class="analyze-button block w-full p-[12px] border-none rounded-[4px] bg-[#FD6A2A] text-[16px] font-medium text-white cursor-pointer"
      :disabled="!uploadSucces"
      @click="startAnalysis"
    >
      {{ isUploading ? "Uploading..." : "Analyze" }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as uploadService from "@/services/uploadService";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import Dashboard from "@uppy/dashboard";
import DropTarget from "@uppy/drop-target";

// Import required CSS
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

// State variables
const fileInput = ref(null);
const selectedFile = ref(null);
const isDragging = ref(false);
const uploadProgress = ref(0);
const isUploading = ref(false);
const uploadSucces = ref(false);
const uppy = ref(null);

// Uppy Initialization
onMounted(() => {
  uppy.value = new Uppy({
    id: "basketballUploader",
    autoProceed: true,
    restrictions: {
      maxFileSize: 1000000000, // 1GB
      allowedFileTypes: [".mp4", ".mov", ".avi", ".mkv"],
      maxNumberOfFiles: 1,
    },
  });

  // Dashboard UI
  uppy.value.use(Dashboard, {
    inline: true,
    target: "#uppy-dashboard",
    hideUploadButton: true,
    showProgressDetails: true,
  });

  // Dropzone support
  uppy.value.use(DropTarget, {
    target: document.querySelector(".drop-zone"),
  });

  // AWS S3
  uppy.value.use(AwsS3, {
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

    async createMultipartUpload(file) {
      const metadata = {};
      Object.keys(file.meta || {}).forEach((key) => {
        if (file.meta[key] != null) {
          metadata[key] = file.meta[key].toString();
        }
      });
      console.log("tes");
      return await uploadService.createMultipartUpload(
        file.name,
        file.type,
        metadata
      );
    },

    async signPart(_file, options) {
      console.log("tes");
      console.log(options);
      return await uploadService.signPart(
        options.uploadId,
        options.key,
        options.partNumber,
        options.signal
      );
    },

    async listParts(_file, options) {
      console.log("tes");
      console.log(options);
      return await uploadService.listParts(
        options.uploadId,
        options.key,
        options.signal
      );
    },

    async completeMultipartUpload(_file, options) {
      return await uploadService.completeMultipartUpload(
        options.uploadId,
        options.key,
        options.parts,
        options.signal
      );
    },

    async abortMultipartUpload(_file, options) {
      return await uploadService.abortMultipartUpload(
        options.uploadId,
        options.key,
        options.signal
      );
    },
  });

  // Uppy events
  uppy.value.on("file-added", (file) => {
    console.log("File added");

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
    }
  });

  uppy.value.on("upload-success", (file, response) => {
    isUploading.value = false;
    uploadSucces.value = true;
    uploadProgress.value = 100;
    console.log("Upload berhasil ke:", response.uploadURL);
  });

  // uppy.value.on("upload-error", (file, error) => {
  //   isUploading.value = false;
  //   console.error("Gagal upload:", error);
  // });

  const dropZone = document.querySelector(".drop-zone");
  if (dropZone) {
    dropZone.addEventListener("dragover", () => (isDragging.value = true));
    dropZone.addEventListener("dragleave", () => (isDragging.value = false));
    dropZone.addEventListener("drop", () => (isDragging.value = false));
  }
});

function triggerFileInput() {
  fileInput.value.click();
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    try {
      uppy.value?.addFile({
        name: file.name,
        type: file.type,
        data: file,
      });
    } catch (error) {
      console.error("Error saat addFile ke Uppy:", error);
    }
  }
}

function startAnalysis() {
  if (isUploading) {
    isUploading.value = false;
    window.location.href = "/profile/my-analyze";
  }
}
</script>

<style scoped>
.progress-fill {
  height: 100%;
  background-color: #403d91;
  transition: width 0.3s ease;
}

.analyze-button {
  transition: background-color 0.3s ease;
}

.analyze-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
