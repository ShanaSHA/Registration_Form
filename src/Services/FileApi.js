import axios from "axios";

export const uploadFileApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("https://example.com/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, data: response.data };
  } catch (err) {
    console.error("Error uploading file:", err);
    return { success: false, error: err.response?.data?.message || "Upload failed." };
  }
};
