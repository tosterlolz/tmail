import React from "react";

/**
 * FileUploader component.
 * Lets user pick files (images/docs/etc) for upload.
 * Shows a preview list of selected files.
 *
 * @param {Object} props
 * @param {File[]} props.files - array of selected File objects
 * @param {function} props.setFiles - function to set selected files
 */
export default function FileUploader({ files = [], setFiles }) {
  const inputRef = React.useRef();

  function handleInputChange(e) {
    setFiles(Array.from(e.target.files));
  }

  function handleRemove(index) {
    setFiles(files.filter((_, i) => i !== index));
  }

  function handleDrop(e) {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files));
  }

  return (
    <div
      className="mr-2 flex flex-col items-start"
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <button
        type="button"
        className="text-2xl px-2 py-1 rounded hover:bg-discord-accent/20 transition"
        title="Attach file"
        onClick={() => inputRef.current.click()}
      >
        📎
      </button>
      <input
        type="file"
        multiple
        ref={inputRef}
        className="hidden"
        onChange={handleInputChange}
      />
      {files.length > 0 && (
        <div className="mt-1 flex flex-col gap-1 max-w-[200px]">
          {files.map((file, idx) => (
            <div
              className="flex items-center gap-1 bg-gray-800 text-gray-100 rounded px-2 py-1 text-xs"
              key={idx}
            >
              <span className="truncate">{file.name}</span>
              <button
                className="ml-2 text-red-400 hover:underline"
                type="button"
                onClick={() => handleRemove(idx)}
                title="Remove"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}