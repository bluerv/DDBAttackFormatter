import { SetStateAction, useState, Dispatch } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DisplayAttackOutput } from "./DisplayAttackOutput";
import { Card } from "primereact/card";
import { damageTypes } from "../services/damageTypes";
import { parseAttackText } from "../services/parseAttackText";

const attackTypes = ["Melee Weapon Attack", "Ranged Weapon Attack", "Melee Attack Roll", "Ranged Attack Roll"];

interface Props {
    recharge: Dispatch<SetStateAction<string>>;
}

function Recharge({ recharge }: Props) {
    const [rechargeOn, setRechargeOn] = useState("6");
    const setRecharge = recharge;

    setRecharge(rechargeOn);

    return (
        <>
            {" "}
            <label className="col-12 mb-2 md:col-2 md:mb-0">Recharge on:</label>
            <div className="col-12 md:col-10">
                <InputText
                    value={rechargeOn}
                    onChange={(e) => setRechargeOn(e.target.value)}
                    className="w-4"
                />
            </div>
        </>
    );
}

function MonsterAttack() {
    const [attackName, setAttackName] = useState("Claw");
    const [hasRecharge, setHasRecharge] = useState(false);
    const [attackType, setAttackType] = useState("Melee Weapon Attack");
    const [toHitBonus, setToHitBonus] = useState<number | null>(3);
    const [reach, setReach] = useState("10");
    const [target, setTarget] = useState("one");
    const [fixedDamage, setFixedDamage] = useState<number | null>(5);
    const [randomDamage, setRandomDamage] = useState("1d6+2");
    const [damageType, setDamageType] = useState("slashing");
    const [recharge, setRecharge] = useState<string>("");
    const [scratchPad, setScratchPad] = useState("");

    function handleParse() {
        const parsed = parseAttackText(scratchPad);
        if (parsed.attackName !== undefined) setAttackName(parsed.attackName);
        if (parsed.hasRecharge !== undefined) setHasRecharge(parsed.hasRecharge);
        if (parsed.recharge !== undefined) setRecharge(parsed.recharge);
        if (parsed.attackType !== undefined) setAttackType(parsed.attackType);
        if (parsed.toHitBonus !== undefined) setToHitBonus(parsed.toHitBonus);
        if (parsed.reach !== undefined) setReach(parsed.reach);
        if (parsed.target !== undefined) setTarget(parsed.target);
        if (parsed.fixedDamage !== undefined) setFixedDamage(parsed.fixedDamage);
        if (parsed.randomDamage !== undefined) setRandomDamage(parsed.randomDamage);
        if (parsed.damageType !== undefined) setDamageType(parsed.damageType);
    }

    return (
        <>
            <Card title="Scratch pad">
                <InputTextarea
                    autoResize
                    className="w-full h-5rem"
                    value={scratchPad}
                    onChange={(e) => setScratchPad(e.target.value)}
                    placeholder="Paste a DDB attack block here, then click Parse"
                />
                <Button
                    label="Parse"
                    className="mt-2"
                    onClick={handleParse}
                    disabled={!scratchPad.trim()}
                />
            </Card>
            <Card title="Selections:">
                <div className="field grid">
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Attack Name:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputText
                            value={attackName}
                            onChange={(e) => setAttackName(e.target.value)}
                            className="w-4"
                        />
                    </div>
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Has Recharge:
                    </label>
                    <div className="col-12 md:col-10">
                        <Checkbox
                            checked={hasRecharge}
                            onChange={(e) =>
                                setHasRecharge(e.checked ? true : false)
                            }
                            className="w-4"
                        />
                    </div>
                    {hasRecharge ? <Recharge recharge={setRecharge} /> : null}
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Attack Type:
                    </label>
                    <div className="col-12 md:col-10">
                        <Dropdown
                            value={attackType}
                            onChange={(e) => setAttackType(e.value)}
                            onFocus={(e) => e.target.select()}
                            options={attackTypes}
                            editable
                            optionLabel="attack type"
                            placeholder="Select an attack type"
                            className="w-4"
                        />
                    </div>
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        To Hit Bonus:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputNumber
                            value={toHitBonus}
                            onChange={(e) => setToHitBonus(e.value)}
                            className="w-4"
                        />
                    </div>
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Reach:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputText
                            value={reach}
                            onChange={(e) => setReach(e.target.value)}
                            className="w-4"
                        />
                    </div>
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Target:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputText
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            className="w-4"
                        />
                    </div>
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Fixed Damage:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputNumber
                            value={fixedDamage}
                            onChange={(e) => setFixedDamage(e.value)}
                            className="w-4"
                        />
                    </div>
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Random Damage:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputText
                            value={randomDamage}
                            onChange={(e) => setRandomDamage(e.target.value)}
                            className="w-4"
                        />
                    </div>
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Damage Type:
                    </label>
                    <div className="col-12 md:col-10">
                        <Dropdown
                            value={damageType}
                            onChange={(e) => setDamageType(e.value)}
                            onFocus={(e) => e.target.select()}
                            options={damageTypes}
                            editable
                            optionLabel="damage type"
                            placeholder="Select a damage type"
                            className="w-4"
                        />
                    </div>
                </div>
            </Card>
            <div className="card">
                <DisplayAttackOutput
                    attackName={attackName}
                    attackType={attackType}
                    toHitBonus={toHitBonus}
                    reach={reach}
                    target={target}
                    fixedDamage={fixedDamage}
                    randomDamage={randomDamage}
                    damageType={damageType}
                    hasRecharge={hasRecharge}
                    recharge={recharge}
                />
            </div>
        </>
    );
}

export default MonsterAttack;
