import {
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/projects";

const PROJECTS_COLLECTION = "projects";

export const getPublishedProjects = async (): Promise<Project[]> => {
    const projectsQuery = query(
        collection(db, PROJECTS_COLLECTION),
        where("status", "==", "published"),
        orderBy("order", "asc")
    );

    const snapshot = await getDocs(projectsQuery);

    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
    })) as Project[];
};