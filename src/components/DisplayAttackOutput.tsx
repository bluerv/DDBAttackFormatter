import { useRef } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

interface props {
    attackName: string;
    attackType: string;
    toHitBonus: number | null;
    reach: string;
    target: string;
    fixedDamage: number | null;
    randomDamage: string;
    damageType: string;
    hasRecharge: boolean;
    recharge: string;
}
export function DisplayAttackOutput({
    attackName,
    attackType,
    toHitBonus,
    reach,
    target,
    fixedDamage,
    randomDamage,
    damageType,
    hasRecharge,
    recharge,
}: props) {
    const outputRef = useRef<HTMLSpanElement>(null);

    const rechargeNotation = ` [rollable](Recharge ${recharge});{"diceNotation":"1d6","rollType":"recharge","rollAction":"${attackName}"}[/rollable]`;

    const damageNotation = `[rollable]+${toHitBonus};{"diceNotation":"1d20+${toHitBonus}","rollType":"to hit","rollAction":"${attackName}"}[/rollable] to hit, reach ${reach} ft., ${target} target. Hit: ${fixedDamage} [rollable](${randomDamage});{"diceNotation":"${randomDamage}","rollType":"damage","rollAction":"${attackName}","rollDamageType":"${damageType}"}[/rollable] ${damageType} damage.`;

    const handleCopy = async () => {
        if (!outputRef.current) return;
        const html = outputRef.current.innerHTML;
        const text = outputRef.current.innerText;
        await navigator.clipboard.write([
            new ClipboardItem({
                "text/html": new Blob([html], { type: "text/html" }),
                "text/plain": new Blob([text], { type: "text/plain" }),
            }),
        ]);
    };

    return (
        <Card title="Generated Output">
            <div>
                <Button
                    icon="pi pi-copy"
                    aria-label="Copy"
                    tooltip="Copy"
                    outlined
                    onClick={handleCopy}
                />
            </div>
            <span ref={outputRef}>
                <b>
                    {attackName}
                    {hasRecharge ? rechargeNotation : null}.{" "}
                </b>
                <i>{attackType}: </i>
                <span>{damageNotation}</span>
            </span>
        </Card>
    );
}
