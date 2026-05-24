import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import { HighlightSet, performHighlight, RulesSet } from "../services/performHighlight";
import SelectionCheck from "./SelectionCheck";
import { useSpells } from "../services/useSpells";

function SuperHighlight() {
    const [textToHighlight, setTextToHighlight] = useState("");
    const [result, setResult] = useState("");
    const [showActions, setShowActions] = useState(true);
    const [showConditions, setShowConditions] = useState(true);
    const [showSkills, setShowSkills] = useState(true);
    const [showSpells, setShowSpells] = useState(true);
    const [showRules, setShowRules] = useState(true);
    const [showCombat, setShowCombat] = useState(true);
    const [showSpellArea, setShowSpellArea] = useState(true);
    const [showMovementAndExploration, setShowMovementAndExploration] =
        useState(true);
    const [showAttitude, setShowAttitude] = useState(true);
    const [showHazards, setShowHazards] = useState(true);
    const [showGeneral, setShowGeneral] = useState(true);

    const { spells, loading: spellsLoading, error: spellsError } = useSpells();

    const rulesClass = showRules ? "" : "container-disabled";

    function handleGo() {
        const rulesSet: RulesSet = {
            combat: showCombat,
            spellArea: showSpellArea,
            movementAndExploration: showMovementAndExploration,
            attitude: showAttitude,
            hazards: showHazards,
            general: showGeneral,
        };

        const work: HighlightSet = {
            actions: showActions,
            conditions: showConditions,
            skills: showSkills,
            spells: showSpells && !spellsLoading ? spells : undefined,
            rules: showRules ? rulesSet : undefined,
        };

        setResult(performHighlight(textToHighlight, work));
    }

    return (
        <>
            <Card title="Overview">
                <div>
                    This page allows you to input some text where you would like
                    the special words to be tagged. This tagging allows them to
                    show up in DDB with the appropriate tooltips. If you don't
                    want a category substituted, then merely uncheck that
                    category. For example, if the skills category is selected it
                    will detect in the text any instance of a skill like
                    'acrobatics' and wrap it in the [skill] tag. Note that the
                    rules section can be disabled entirely or selectively. The
                    result is at the bottom of the page.
                </div>
            </Card>
            <Card title="Selections:">
                <div className="field grid">
                    <SelectionCheck
                        display="Substitute for Actions"
                        isChecked={showActions}
                        setIsChecked={setShowActions}
                    />
                    <SelectionCheck
                        display="Substitute for Conditions"
                        isChecked={showConditions}
                        setIsChecked={setShowConditions}
                    />
                    <SelectionCheck
                        display="Substitute for Skills"
                        isChecked={showSkills}
                        setIsChecked={setShowSkills}
                    />
                    <div className="col-12 flex align-items-center gap-2">
                        <SelectionCheck
                            display="Substitute for Spells"
                            isChecked={showSpells}
                            setIsChecked={setShowSpells}
                        />
                        {spellsLoading && (
                            <span className="flex align-items-center gap-1">
                                <ProgressSpinner style={{ width: "1.25rem", height: "1.25rem" }} strokeWidth="6" />
                                <small>Loading spell list…</small>
                            </span>
                        )}
                        {spellsError && (
                            <small className="p-error">Could not load spells: {spellsError}</small>
                        )}
                        {!spellsLoading && !spellsError && (
                            <small className="text-color-secondary">{spells.length} spells loaded</small>
                        )}
                    </div>
                    <SelectionCheck
                        display="Substitute for Rules"
                        isChecked={showRules}
                        setIsChecked={setShowRules}
                    />
                    <div className="col-12">
                        <Card title="Rules" className={rulesClass}>
                            <div className="field grid">
                                <SelectionCheck
                                    display="Substitute for Combat Rules"
                                    isChecked={showCombat}
                                    setIsChecked={setShowCombat}
                                />
                                <SelectionCheck
                                    display="Substitute for Spell Area Rules"
                                    isChecked={showSpellArea}
                                    setIsChecked={setShowSpellArea}
                                />
                                <SelectionCheck
                                    display="Substitute for Movement and Exploration Rules"
                                    isChecked={showMovementAndExploration}
                                    setIsChecked={setShowMovementAndExploration}
                                />
                                <SelectionCheck
                                    display="Substitute for Attitude Rules"
                                    isChecked={showAttitude}
                                    setIsChecked={setShowAttitude}
                                />
                                <SelectionCheck
                                    display="Substitute for Hazard Rules"
                                    isChecked={showHazards}
                                    setIsChecked={setShowHazards}
                                />
                                <SelectionCheck
                                    display="Substitute for General Rules"
                                    isChecked={showGeneral}
                                    setIsChecked={setShowGeneral}
                                />
                            </div>
                        </Card>
                    </div>
                    <p></p>
                    <label className="col-12 mb-2 md:col-2 md:mb-0">
                        Text to Substitute:
                    </label>
                    <div className="col-12 md:col-10">
                        <InputTextarea
                            value={textToHighlight}
                            onChange={(e) => setTextToHighlight(e.target.value)}
                            className="w-12"
                            rows={20}
                        />
                    </div>
                    <div className="col-12 flex justify-content-end">
                        <Button
                            label="Go"
                            icon="pi pi-play"
                            onClick={handleGo}
                            disabled={spellsLoading}
                        />
                    </div>
                </div>
            </Card>

            <Card title="Output">
                <div>{result || <span className="text-color-secondary">Output will appear here after clicking Go.</span>}</div>
            </Card>
        </>
    );
}

export default SuperHighlight;
