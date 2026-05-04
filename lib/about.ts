import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { QuickFact, WorkExperience } from "@/types/about";

export const getWorkExperiences = async (): Promise<WorkExperience[]> => {
    const q = query(collection(db, "workExperiences"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
    })) as WorkExperience[];
};

export const getQuickFacts = async (): Promise<QuickFact[]> => {
    const q = query(collection(db, "quickFacts"), orderBy("order", "asc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
    })) as QuickFact[];
};