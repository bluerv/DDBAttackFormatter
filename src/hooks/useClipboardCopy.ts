import { useRef } from "react";

export function useClipboardCopy<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    const handleCopy = async () => {
        if (!ref.current) return;
        await navigator.clipboard.write([
            new ClipboardItem({
                "text/html": new Blob([ref.current.innerHTML], { type: "text/html" }),
                "text/plain": new Blob([ref.current.innerText], { type: "text/plain" }),
            }),
        ]);
    };

    return { ref, handleCopy };
}
