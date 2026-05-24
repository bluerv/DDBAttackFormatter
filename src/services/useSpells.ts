import { useEffect, useState } from "react";

const CACHE_KEY = "open5e_spells";
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface SpellCache {
    timestamp: number;
    names: string[];
}

export function useSpells() {
    const [spells, setSpells] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const parsed: SpellCache = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
                setSpells(parsed.names);
                setLoading(false);
                return;
            }
        }

        fetch("https://api.open5e.com/v2/spells/?limit=2000&fields=name")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                const names: string[] = [
                    ...new Set<string>(data.results.map((s: { name: string }) => s.name)),
                ];
                const cache: SpellCache = { timestamp: Date.now(), names };
                localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
                setSpells(names);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { spells, loading, error };
}
