<template>
  <div class="w-full mx-[112px]">
    <!-- Custom UI drop zone that triggers Uppy functionality -->
    <div
      class="drop-zone border-[2px] border-dashed border-[#9e9e9e] rounded-[8px] px-[40px] py-[20px] cursor-pointer mb-[15px] transition-all duration-300 ease-in text-center hover:border-[#FD6A2A]"
      @click="openUppy"
      :class="{ 'border-[#FD6A2A]': isDragging }"
    >
      <div class="flex flex-col justify-center items-center">
        <div class="mb-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF6E31"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
            <line x1="10" y1="15" x2="10" y2="9"></line>
            <line x1="14" y1="15" x2="14" y2="9"></line>
            <line x1="7" y1="12" x2="17" y2="12"></line>
          </svg>
        </div>
        <p class="!text-[#FD6A2A] !text-[16px] m-0">
          Browse Video or Drag Here to Upload
        </p>
      </div>
    </div>

    <!-- Hidden Uppy Dashboard (used for file picking but not displayed) -->
    <div id="uppy-dashboard" style="display: none"></div>

    <!-- File progress display -->
    <div v-if="selectedFile" class="px-[8px] py-[12px] mb-[15px]">
      <div class="flex flex-row items-center mb-[6px]">
        <div class="mr-[10px]">
          <v-icon
            icon="mdi mdi-video-plus-outline"
            class="!text-[40px] max-sm:!text-[30px]"
          ></v-icon>
        </div>
        <span class="grow truncate">{{ selectedFile.name }}</span>
        <span class="ml-[10px] font-[14px]">{{
          formatFileSize(selectedFile.size)
        }}</span>
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
      :disabled="!selectedFile || isUploading"
      @click="startAnalysis"
    >
      {{ isUploading ? "Uploading..." : "Analyze" }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import Dashboard from "@uppy/dashboard";
import DropTarget from "@uppy/drop-target";

// Import required CSS
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

// State variables
const selectedFile = ref(null);
const isDragging = ref(false);
const uploadProgress = ref(0);
const isUploading = ref(false);
const uppy = ref(null);

// Initialize Uppy
onMounted(() => {
  uppy.value = new Uppy({
    id: "basketballUploader",
    autoProceed: true,
    restrictions: {
      maxFileSize: 1000000000, // 1GB
      allowedFileTypes: [".mp4", ".mov", ".avi", ".mkv"],
    },
  });

  // Add Dashboard plugin (hidden, but used for file selection)
  uppy.value.use(Dashboard, {
    inline: true,
    target: "#uppy-dashboard",
    hideUploadButton: true,
    showProgressDetails: true,
  });

  // Add XHR Upload plugin
  uppy.value.use(XHRUpload, {
    endpoint: "https://your-api-endpoint.com/upload",
    formData: true,
    fieldName: "video",
  });

  // Add drop target for the custom UI
  uppy.value.use(DropTarget, {
    target: document.querySelector(".drop-zone"),
  });

  // Listen for file selection
  uppy.value.on("file-added", (file) => {
    selectedFile.value = {
      id: file.id,
      name: file.name,
      size: file.size,
      type: file.type,
    };
    uploadProgress.value = 0;
  });

  // Listen for upload progress
  uppy.value.on("upload-progress", (file, progress) => {
    if (selectedFile.value && selectedFile.value.id === file.id) {
      const percent = Math.floor(
        (progress.bytesUploaded / progress.bytesTotal) * 100
      );
      uploadProgress.value = percent;
    }
  });

  // Listen for upload success
  uppy.value.on("upload-success", (file, response) => {
    isUploading.value = false;
    uploadProgress.value = 100;
    console.log("Upload successful:", response);
  });

  // Listen for upload error
  uppy.value.on("upload-error", (file, error) => {
    isUploading.value = false;
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

// Clean up Uppy when component is destroyed
onBeforeUnmount(() => {
  if (uppy.value) {
    uppy.value.close();
  }
});

// Methods
function openUppy() {
  const dashboard = uppy.value.getPlugin("Dashboard");
  if (dashboard) {
    dashboard.openModal();
    console.log("browse");
  }
}

function startAnalysis() {
  if (selectedFile.value) {
    isUploading.value = true;
    uppy.value.upload().then((result) => {
      if (result.failed.length === 0) {
        console.log("Analysis can start now!");
        // You can redirect to analysis page or trigger analysis here
      }
    });
  }
}

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
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
