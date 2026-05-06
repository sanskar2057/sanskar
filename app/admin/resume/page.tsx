"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Download, FileText, UploadCloud } from "lucide-react";
import ProtectedRoute from "@/app/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import { db } from "@/lib/firebase";
import {
  DEFAULT_RESUME_FILENAME,
  RESUME_DOWNLOAD_API,
  downloadActiveResume,
  resumeSettingsDocPath,
} from "@/lib/resume";
import { useToast } from "@/hooks/use-toast";
import { ResumeSettings } from "@/types/resume";

const CLOUDINARY_CLOUD_NAME = "dhvjgdmc6";
const CLOUDINARY_UPLOAD_PRESET = "resume_upload";

export default function AdminResumePage() {
  return (
    <ProtectedRoute>
      <AdminResumeContent />
    </ProtectedRoute>
  );
}

function AdminResumeContent() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const [resume, setResume] = useState<ResumeSettings | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchResume = useCallback(async () => {
    try {
      setLoading(true);
      const snapshot = await getDoc(
        doc(db, resumeSettingsDocPath.collection, resumeSettingsDocPath.document)
      );
      setResume(snapshot.exists() ? (snapshot.data() as ResumeSettings) : null);
    } catch (error) {
      console.error(error);
      toast({
        title: "Load failed",
        description: "Could not load resume settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      toast({
        title: "PDF required",
        description: "Please upload your resume as a PDF file.",
        variant: "destructive",
      });
      event.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Choose a file",
        description: "Select a PDF resume before uploading.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      // Upload to Cloudinary via unsigned upload preset
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`;

      // Use XMLHttpRequest so we can track upload progress
      const url = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            resolve(data.secure_url);
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Upload failed")));

        xhr.open("POST", uploadUrl);
        xhr.send(formData);
      });

      // Save metadata to Firestore
      const updatedAt = new Date().toISOString();
      const nextResume: ResumeSettings = {
        url,
        fileName: DEFAULT_RESUME_FILENAME,
        storagePath: url, // Cloudinary URL used as path reference
        size: selectedFile.size,
        contentType: selectedFile.type,
        updatedAt,
      };

      await setDoc(
        doc(db, resumeSettingsDocPath.collection, resumeSettingsDocPath.document),
        nextResume
      );

      setResume(nextResume);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "Resume uploaded",
        description: "The public download button now uses this resume.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Upload failed",
        description: "Could not upload resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const formattedSize = resume
    ? `${(resume.size / 1024 / 1024).toFixed(2)} MB`
    : "";

  return (
    <main className="min-h-screen bg-portfolio text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminHeader />

        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-[#C778DD]/15 border border-[#C778DD]/25 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#C778DD]" />
            </div>
            <div>
              <p className="text-[#C778DD] text-sm">Admin CMS</p>
              <h1 className="text-3xl sm:text-4xl font-bold">Resume</h1>
            </div>
          </div>
          <p className="text-[#ABB2BF] max-w-2xl">
            Upload a PDF resume here. The hero, navbar, and footer download
            links will use the latest uploaded file through the resume download API.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
          <section className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Upload New Resume</h2>

            <label className="block rounded-2xl border border-dashed border-[#C778DD]/50 bg-[#C778DD]/10 p-6 text-center cursor-pointer hover:bg-[#C778DD]/15 transition">
              <UploadCloud className="w-10 h-10 text-[#C778DD] mx-auto mb-3" />
              <span className="block text-white font-semibold">
                {selectedFile ? selectedFile.name : "Choose PDF resume"}
              </span>
              <span className="block text-[#ABB2BF] text-sm mt-2">
                PDF only. This replaces the active public resume.
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {uploading && (
              <div className="mt-5">
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#C778DD] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[#ABB2BF] text-sm mt-2">
                  Uploading {progress}%
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading || !selectedFile}
              className="mt-5 w-full rounded-xl bg-[#C778DD] px-5 py-3 font-semibold hover:bg-[#b968cc] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </section>

          <section className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Active Resume</h2>

            {loading ? (
              <p className="text-[#ABB2BF]">Loading resume settings...</p>
            ) : resume ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-white font-semibold">{resume.fileName}</p>
                  <p className="text-[#ABB2BF] text-sm mt-2">
                    Size: {formattedSize}
                  </p>
                  <p className="text-[#ABB2BF] text-sm">
                    Updated: {new Date(resume.updatedAt).toLocaleString()}
                  </p>
                  <p className="text-[#ABB2BF] text-xs break-all mt-3">
                    Cloudinary URL: {resume.url}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={downloadActiveResume}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#C778DD]/50 px-5 py-3 text-[#C778DD] hover:bg-[#C778DD]/10 transition"
                  >
                    <Download className="w-4 h-4" />
                    Test Download
                  </button>

                  <Link
                    href={`${RESUME_DOWNLOAD_API}?debug=1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-[#ABB2BF] hover:border-[#C778DD]/50 transition"
                  >
                    Debug API
                  </Link>

                  <Link
                    href={resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-[#ABB2BF] hover:border-[#C778DD]/50 transition"
                  >
                    Open Cloudinary File
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
                <p className="text-yellow-200 font-semibold">
                  No resume uploaded yet.
                </p>
                <p className="text-[#ABB2BF] text-sm mt-2">
                  Public download links will fall back to the static
                  /resume.pdf file until you upload one.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
