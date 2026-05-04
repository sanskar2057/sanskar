import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Blog } from "@/types/blogs";

const BLOGS_COLLECTION = "blogs";

export const getPublishedBlogs = async (): Promise<Blog[]> => {
    const blogsQuery = query(
        collection(db, BLOGS_COLLECTION),
        where("status", "==", "published"),
        orderBy("publishedAt", "desc")
    );

    const snapshot = await getDocs(blogsQuery);

    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
    })) as Blog[];
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
    const blogsQuery = query(
        collection(db, BLOGS_COLLECTION),
        where("slug", "==", slug),
        where("status", "==", "published")
    );

    const snapshot = await getDocs(blogsQuery);

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];

    return {
        id: docSnap.id,
        ...docSnap.data(),
    } as Blog;
};

export const getBlogById = async (id: string): Promise<Blog | null> => {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
        id: docSnap.id,
        ...docSnap.data(),
    } as Blog;
};