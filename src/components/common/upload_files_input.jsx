import React, { useRef, useState } from "react";
import uploadImg from "/images/upload-img.jpg";
import { FiUpload } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineLink } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadFilesInput({ sectionState, setSectionState, formData }) {
  const fileRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const handleFileOpen = () => {
    fileRef.current?.click();
  };

  const handleFiles = (e) => {
    const allFiles = Array.from(e.target.files);
    const allURLs = allFiles.map((file) => URL.createObjectURL(file));

    if (Array.isArray(sectionState)) {
      setSectionState([...sectionState, ...allURLs]);
    } else if (typeof sectionState === "object" && sectionState !== null) {
      setSectionState({
        ...sectionState,
        file: [...(sectionState.file || []), ...allURLs],
      });
    }
  };

  const removeFiles = (index) => {
    if (Array.isArray(sectionState)) {
      const updatedFiles = sectionState.filter((_, i) => i !== index);
      setSectionState(updatedFiles);
    } else if (typeof sectionState === "object" && sectionState !== null) {
      const updatedFiles = (sectionState.file || []).filter((_, i) => i !== index);
      setSectionState({ ...sectionState, file: updatedFiles });
    }
  };

  const handleAddURL = () => {
    if (!imageURL) {
      toast.error("Please enter a URL."); // Notify user if the URL is empty
      return;
    }
  
    // Validate the URL format and ensure it's an image
    const urlPattern = /^(https?:\/\/.*\.(?:jpg|jpeg|png|gif|bmp|webp|svg))(?:\?.*)?$/i;

    if (!urlPattern.test(imageURL.trim())) {
      toast.error("Please enter a valid image URL (e.g., .jpg, .png).");
      return;
    }
  
    // Check for duplicates
    if (filesToDisplay.includes(imageURL)) {
      toast.error("This image URL has already been added.");
      return;
    }
  
    // Add the valid image URL
    const updatedURLs = [...filesToDisplay, imageURL];
  
    if (Array.isArray(sectionState)) {
      setSectionState(updatedURLs);
    } else if (typeof sectionState === "object" && sectionState !== null) {
      setSectionState({ ...sectionState, file: updatedURLs });
    }
  
    setImageURL(""); // Clear input field
    setIsModalOpen(false); // Close modal
  };
  
  

  const filesToDisplay = Array.isArray(sectionState)
    ? sectionState
    : sectionState?.file || [];

  return (
    <div className="w-full mt-2">
      <div className="border-dashed w-full min-h-[300px] border border-black rounded-md">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFiles}
          multiple
          className="hidden"
        />

        <div className="flex justify-end m-1 gap-2">
          <button
            onClick={handleFileOpen}
            className="p-2 border border-gray-300 rounded-sm hover:bg-gray-300 transition-colors duration-150 cursor-pointer"
          >
            <FiUpload /> 
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 border border-gray-300 rounded-sm hover:bg-gray-300 transition-colors duration-150 cursor-pointer"
          >
            <AiOutlineLink />
          </button>
        </div>

        {filesToDisplay.length > 0 ? (
          <div className="m-2 flex gap-2 w-full h-[300px] overflow-auto flex-wrap">
            {filesToDisplay.map((x, i) => (
              <div key={i} className="h-[100px] w-[100px] relative group">
                <div
                  className="border border-gray-600 h-full w-full rounded-sm bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${x})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm flex items-center justify-center">
                    <button
                      className="absolute top-1 right-1 text-red-500 bg-white"
                      onClick={() => removeFiles(i)}
                    >
                      <IoIosCloseCircle className="h-5 w-5" />
                      <span className="sr-only">Remove image</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="w-full h-[300px] flex justify-center items-center"
            onClick={handleFileOpen}
          >
            <img
              className={`opacity-50 ${
                formData.product_id === ""
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              src={uploadImg}
              height={100}
              width={150}
              alt="upload-images"
            />
          </div>
        )}
      </div>

      {/* Modal for Adding URL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Image URL</h2>
            <input
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="Enter image URL"
              className="border p-2 rounded-md w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddURL}
                disabled={!imageURL}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadFilesInput;
