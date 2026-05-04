"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  List,
  Paragraph,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

type CKEditorClientProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CKEditorClient({
  value,
  onChange,
}: CKEditorClientProps) {
  return (
    <div className="portfolio-editor rounded-xl overflow-hidden border border-white/10 bg-[#1f232b]">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Heading,
            Link,
            List,
            BlockQuote,
            Image,
            ImageUpload,
            ImageInsert,
            ImageToolbar,
            ImageCaption,
            ImageStyle,
            ImageResize,
            Base64UploadAdapter,
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "|",
            "insertImage",
          ],
          image: {
            toolbar: [
              "imageTextAlternative",
              "toggleImageCaption",
              "|",
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "resizeImage",
            ],
          },
        }}
        onChange={(_, editor) => {
          onChange(editor.getData());
        }}
      />
    </div>
  );
}