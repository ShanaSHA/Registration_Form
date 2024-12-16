import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { uploadFileApi } from "../../Services/FileApi";
import { formatFileSize } from "../../File-Helper/fileUtils";

const fileValidationSchema = Yup.mixed()
  .required("Please select a file.")
  .test(
    "fileType",
    "Invalid file type. Allowed types: JPEG, PNG, PDF.",
    (value) => {
      if (!value) return true; // Skip if no file selected
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      return allowedTypes.includes(value.type);
    }
  )
  .test(
    "fileSize",
    "File size exceeds the maximum limit of 5 MB.",
    (value) => {
      if (!value) return true; // Skip if no file selected
      const maxSize = 5 * 1024 * 1024; // 5 MB
      return value.size <= maxSize;
    }
  );

function FileUploader() {
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file, resetForm) => {
    setLoading(true);
    setSuccess("");

    try {
      const response = await uploadFileApi(file);
      if (response.success) {
        setSuccess("File uploaded successfully!");
        resetForm();
      } else {
        throw new Error("Failed to upload file. Please try again.");
      }
    } catch (error) {
      alert(error.message || "Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Upload a File</h2>
        <Formik
          initialValues={{ file: null }}
          validationSchema={Yup.object().shape({
            file: fileValidationSchema,
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            handleUpload(values.file, resetForm);
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) =>
                    setFieldValue("file", event.target.files[0])
                  }
                  className="block w-full text-gray-700 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="file"
                  component="div"
                  className="text-red-600 mt-1"
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded ${
                  isSubmitting || loading
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={isSubmitting || loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </Form>
          )}
        </Formik>
        {success && <p className="text-green-600 mt-4">{success}</p>}
      </div>
    </div>
  );
}

export default FileUploader;
