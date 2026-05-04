import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SkillGroup } from "@/types/skills";

export const getSkillGroups = async (): Promise<SkillGroup[]> => {
    const q = query(collection(db, "skills"), orderBy("order", "asc"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
    })) as SkillGroup[];
};