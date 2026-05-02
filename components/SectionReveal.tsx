"use client";

import { motion } from "framer-motion";
import React from "react";

export default function SectionReveal({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.55,
                delay,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
}