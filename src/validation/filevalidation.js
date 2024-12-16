import * as Yup from "yup";

export const fileValidationSchema = Yup.mixed()
  .test("fileRequired", "No file selected.", (value) => !!value)
  .test(
    "fileType",
    "Invalid file type. Allowed types: JPEG, PNG, PDF.",
    (value) => {
      if (!value) return true; // Skip this test if there's no file
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      return allowedTypes.includes(value.type);
    }
  )
  .test(
    "fileSize",
    "File size exceeds the maximum limit of 5 MB.",
    (value) => {
      if (!value) return true; // Skip this test if there's no file
      const maxSize = 5 * 1024 * 1024; // 5 MB
      return value.size <= maxSize;
    }
  );
