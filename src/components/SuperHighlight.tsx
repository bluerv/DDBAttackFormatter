import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { HighlightSet, performHighlight, RulesSet } from "./performHighlight";
import SelectionCheck from "./SelectionCheck";

function SuperHighlight() {
    const [textToHighlight, setTextToHighlight] = useState("");
    const [showActions, setShowActions] = useState(true);
    const [showConditions, setShowConditions] = useState(true);
    const [showSkills, setShowSkills] = useState(true);
    const [showRules, setShowRules] = useState(true);
    const [showCombat, setShowCombat] = useState(true);
    const [showSpellArea, setShowSpellArea] = useState(true);
    const [showMovementAndExploration, setShowMovementAndExploration] =
        useState(true);
    const [showAttitude, setShowAttitude] = useState(true);

    let rulesClass = "";
    const work: HighlightSet = {
        actions: false,
        conditions: false,
        skills: false,
    };

    if (showActions) {
        work.actions = true;
    }
    if (showConditions) {
        work.conditions = true;
    }
    if (showSkills) {
        work.skills = true;
    }

    if (showRules) {
        const rulesSet: RulesSet = {
            combat: false,
            spellArea: false,
            movementAndExploration: false,
            attitude: false,
        };
        if (showCombat) {
            rulesSet.combat = true;
        }
        if (showSpellArea) {
            rulesSet.spellArea = true;
        }
        if (showMovementAndExploration) {
            rulesSet.movementAndExploration = true;
        }
        if (showAttitude) {
            rulesSet.attitude = true;
        }
        work.rules = rulesSet;
    } else {
        rulesClass = "container-disabled"; // defined in App.css
    }

    const result = performHighlight(textToHighlight, work);

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
                </div>
            </Card>

            <Card title="Output">
                <div>{result}</div>
            </Card>
        </>
    );
}

export default SuperHighlight;
