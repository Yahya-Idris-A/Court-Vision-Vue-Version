import { createToaster } from "@meforma/vue-toaster";

export const callToaster = (type, message) => {
  const toaster = createToaster({});
  switch (type) {
    case "error":
      toaster.error(message, { position: "top" });
      break;
    case "success":
      toaster.success(message, { position: "top" });
      break;
    case "warning":
      toaster.warning(message, { position: "top" });
      break;
    case "info":
      toaster.info(message, { position: "top" });
      break;
    default:
      toaster.show(message, { position: "top" });
      break;
  }
};

// export const convertToRupiah = (angka, onlyNumber) => {
//   let options = {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 2,
//   };

//   if (isNaN(angka)) return "Rp. 0";
//   if (onlyNumber) {
//     return new Intl.NumberFormat("id-ID", options)
//       .format(angka)
//       .replace("Rp", "");
//   }

//   return new Intl.NumberFormat("id-ID", options).format(angka);
// };
