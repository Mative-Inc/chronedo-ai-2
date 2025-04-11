import React, { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/url";

// Custom Image Resize Module
class ImageResize {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.overlay = null;
    this.img = null;
    this.rect = null;
    this.dragHandle = null;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragStartWidth = 0;
    this.dragStartHeight = 0;

    this.quill.root.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    if (e.target && e.target.tagName && e.target.tagName.toUpperCase() === 'IMG') {
      if (this.img === e.target) return;
      this.hide();
      this.show(e.target);
    } else {
      this.hide();
    }
  }

  show(img) {
    this.img = img;
    this.showOverlay();
    this.quill.on('text-change', this.updateOverlay.bind(this));
  }

  hide() {
    this.hideOverlay();
    this.img = null;
    this.quill.off('text-change', this.updateOverlay);
  }

  showOverlay() {
    if (this.overlay) {
      this.hideOverlay();
    }

    this.rect = this.img.getBoundingClientRect();

    this.overlay = document.createElement('div');
    Object.assign(this.overlay.style, {
      position: 'absolute',
      boxSizing: 'border-box',
      border: '2px solid #4285f4',
      zIndex: '1000',
    });

    this.dragHandle = document.createElement('div');
    Object.assign(this.dragHandle.style, {
      position: 'absolute',
      height: '12px',
      width: '12px',
      backgroundColor: 'white',
      border: '2px solid #4285f4',
      boxSizing: 'border-box',
      bottom: '-6px',
      right: '-6px',
      cursor: 'se-resize',
    });

    this.overlay.appendChild(this.dragHandle);
    document.body.appendChild(this.overlay);

    this.updateOverlay();
    this.dragHandle.addEventListener('mousedown', this.handleMousedown.bind(this));
  }

  hideOverlay() {
    if (this.overlay) {
      document.body.removeChild(this.overlay);
      this.overlay = null;
    }
  }

  updateOverlay() {
    if (!this.img || !this.rect) return;

    const rect = this.img.getBoundingClientRect();
    const containerRect = this.quill.root.getBoundingClientRect();

    Object.assign(this.overlay.style, {
      left: `${rect.left - containerRect.left - 1 + this.quill.root.scrollLeft}px`,
      top: `${rect.top - containerRect.top - 1 + this.quill.root.scrollTop}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
  }

  handleMousedown(e) {
    e.preventDefault();
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.dragStartWidth = this.img.width;
    this.dragStartHeight = this.img.height;

    document.addEventListener('mousemove', this.handleDrag.bind(this));
    document.addEventListener('mouseup', this.handleMouseup.bind(this));
  }

  handleDrag(e) {
    const deltaX = e.clientX - this.dragStartX;
    const deltaY = e.clientY - this.dragStartY;
    const newWidth = Math.max(50, this.dragStartWidth + deltaX);
    const newHeight = Math.max(50, this.dragStartHeight + deltaY);

    this.img.width = newWidth;
    this.img.height = newHeight;
    this.updateOverlay();
  }

  handleMouseup() {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleMouseup);
  }
}

Quill.register('modules/imageResize', ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

// Toolbar configurations
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
    ["align"],
  ],
  imageResize: {
    displaySize: true
  },
  imageUploader: {
    upload: (file: any) => {
      toast.info("Uploading Image");
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        fetch(
          "https://api.imgbb.com/1/upload?key=055aee72cc2132ca184d425fba12b72a",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => resolve(result.data.url))
          .catch(() => reject("Upload failed"));
      });
    },
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "image",
  "align",
];

const EmailTemplateEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  const handleContentChange = (value: string) => setContent(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      title,
      description,
      content,
    };

    try {
      const response = await axios.post(`${BASE_URL}/email.test`, formData);
      console.log(response.data);
      toast.success("Email template sent successfully!");
      setTitle("");
      setDescription("");
      setContent("");
    } catch (error: any) {
      toast.error("Error, please try again.", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 py-28 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Write New Email Template
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title (Dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            >
              <option value="">Select a title</option>
              <option value="Donation Receipt to Donors">Donation Receipt to Donors</option>
              <option value="Donation Receipt to Campaigner">Donation Receipt to Campaigner</option>
              <option value="To Admin on Donation">To Admin on Donation</option>
              <option value="To Admin on New Campaign Creation">To Admin on New Campaign Creation</option>
              <option value="Campaigner on Campaign Status Change">Campaigner on Campaign Status Change</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter description"
            />
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <div className="bg-white rounded-md">
              <ReactQuill
                ref={quillRef}
                value={content}
                onChange={handleContentChange}
                className="h-96"
                theme="snow"
                placeholder="Write your content here..."
                modules={modules}
                formats={formats}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 mt-8 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Publishing..." : "Publish Email Template"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailTemplateEditor; 