import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  DEFAULT_RESUME_FILENAME,
  FALLBACK_RESUME_URL,
  RESUME_DOWNLOAD_API,
} from "@/lib/resume-constants";
import { ResumeSettings } from "@/types/resume";

const RESUME_SETTINGS_COLLECTION = "settings";
const RESUME_SETTINGS_DOC = "resume";

export { DEFAULT_RESUME_FILENAME, FALLBACK_RESUME_URL, RESUME_DOWNLOAD_API };

export async function getActiveResume() {
  const snapshot = await getDoc(
    doc(db, RESUME_SETTINGS_COLLECTION, RESUME_SETTINGS_DOC)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as ResumeSettings;
}

export const resumeSettingsDocPath = {
  collection: RESUME_SETTINGS_COLLECTION,
  document: RESUME_SETTINGS_DOC,
};

export async function getActiveResumeDownloadUrl() {
  const resume = await getActiveResume();

  if (!resume?.url) {
    return FALLBACK_RESUME_URL;
  }

  return resume.url;
}

export async function downloadActiveResume() {
  let href = FALLBACK_RESUME_URL;
  let objectUrl: string | null = null;

  try {
    const resume = await getActiveResume();

    if (resume?.url) {
      const response = await fetch(resume.url);

      if (!response.ok) {
        throw new Error(`Resume download failed with ${response.status}`);
      }

      const blob = await response.blob();
      objectUrl = URL.createObjectURL(blob);
      href = objectUrl;
    }
  } catch (error) {
    console.error("Failed to resolve active resume. Using fallback.", error);
  }

  const link = document.createElement("a");
  link.href = href;
  link.download = DEFAULT_RESUME_FILENAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (objectUrl) {
    const urlToRevoke = objectUrl;
    window.setTimeout(() => URL.revokeObjectURL(urlToRevoke), 1000);
  }
}
