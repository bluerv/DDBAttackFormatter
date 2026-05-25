import { Card } from "primereact/card";
import { damageTypes } from "../services/damageTypes";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useClipboardCopy } from "../hooks/useClipboardCopy";

const savingThrowTypes = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
];

function RechargeAction() {
    const { ref: outputRef, handleCopy } = useClipboardCopy<HTMLSpanElement>();


    const [actionName, setActionName] = useState("Lightning Breath");
    const [damageType, setDamageType] = useState("lightning");
    const [fixedDamage, setFixedDamage] = useState<number | null>(66);
    const [rerollNumber, setRerollNumber] = useState<number | null>(5);
    const [actionDescription, setActionDescription] = useState(
        "The behir exhales a line of lightning that is 20 feet long and 5 feet wide.",
    );
    const [savingThrowPreamble, setSavingThrowPreamble] = useState(
        "Each creature in that line must make a",
    );
    const [diceDamage, setDiceDamage] = useState("12d6");
    const [savingThrow, setSavingThrow] = useState("Dexterity");
    const [savingThrowDc, setSavingThrowDc] = useState<number | null>(16);

    let recharge = "Recharge 6";
    if (rerollNumber == null) {
        recharge = "Recharge ???";
    } else if (rerollNumber < 6) {
        recharge = `Recharge ${rerollNumber}-6`;
    }
    const actionPreamble = `${actionName} [rollable](${recharge});{"diceNotation":"1d6", "rollType":"recharge", "rollAction":"${actionName}"}[/rollable]`;
    const effectOnFailure = `${fixedDamage} [rollable](${diceDamage});{"diceNotation":"${diceDamage}", "rollType":"damage", "rollAction":"${actionName}", "rollDamageType":"${damageType}"}[/rollable] ${damageType} damage`;
    const effectOnSuccess = "half as much damage on a successful one";

    return (
        <>
            <Card title="Scratch pad">
                <InputTextarea
                    autoResize
                    className="w-full h-5rem"
                    placeholder="Scratch pad for your use"
                />
            </Card>
            <Card title="Selections:">
                <div className="field grid">
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Action Name:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputText
                            value={actionName}
                            onChange={(e) => setActionName(e.target.value)}
                            className="w-4"
                        />
                    </div>{" "}
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Reroll:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputNumber
                            value={rerollNumber}
                            onChange={(e) => setRerollNumber(e.value)}
                            className="w-4"
                            min={1}
                            max={6}
                        />
                    </div>
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Description:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputTextarea
                            value={actionDescription}
                            onChange={(e) =>
                                setActionDescription(e.target.value)
                            }
                            className="w-12"
                            rows={5}
                        />
                    </div>{" "}
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Saving Throw Introduction:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputTextarea
                            value={savingThrowPreamble}
                            onChange={(e) =>
                                setSavingThrowPreamble(e.target.value)
                            }
                            className="w-12"
                            rows={5}
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
                        Damage Dice:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputText
                            value={diceDamage}
                            onChange={(e) => setDiceDamage(e.target.value)}
                            className="w-4"
                        />
                    </div>{" "}
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Saving Throw DC:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputNumber
                            value={savingThrowDc}
                            onChange={(e) => setSavingThrowDc(e.value)}
                            className="w-4"
                        />
                    </div>
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Saving Throw Type:
                    </label>
                    <div className="col-12 md:col-10">
                        <Dropdown
                            value={savingThrow}
                            onChange={(e) => setSavingThrow(e.value)}
                            onFocus={(e) => e.target.select()}
                            options={savingThrowTypes}
                            editable
                            optionLabel="damage type"
                            placeholder="Select a damage type"
                            className="w-4"
                        />
                    </div>
                </div>
            </Card>

            <Card title="Generated Output:">
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
                    <b>{actionPreamble}</b>.&nbsp;&nbsp;{actionDescription}
                    &nbsp;
                    {savingThrowPreamble}&nbsp;DC {savingThrowDc}&nbsp;
                    <i>{savingThrow} saving throw</i>, taking&nbsp;
                    {effectOnFailure}, or {effectOnSuccess}.
                </span>
            </Card>
        </>
    );
}

export default RechargeAction;
