import {
    actions,
    attitudeRules,
    combatRules,
    conditions,
    generalRules,
    hazardRules,
    movementAndExplanationRules,
    skills,
    spellAreaRules,
} from "./keywordList";

export interface RulesSet {
    combat: boolean;
    spellArea: boolean;
    movementAndExploration: boolean;
    attitude: boolean;
    hazards: boolean;
    general: boolean;
}

export interface HighlightSet {
    actions: boolean;
    conditions: boolean;
    skills: boolean;
    spells?: string[];
    rules?: RulesSet;
}

export function performHighlight(input: string, work: HighlightSet): string {
    console.log("performing sub for " + JSON.stringify(work));
    let working = input;
    if (work.actions) {
        working = swapForTooltip(working, "action", actions);
    }
    if (work.conditions) {
        working = swapForTooltip(working, "condition", conditions);
    }
    if (work.skills) {
        working = swapForTooltip(working, "skill", skills);
    }
    if (work.spells && work.spells.length > 0) {
        working = swapForTooltip(working, "spells", work.spells);
    }
    if (work.rules) {
        if (work.rules.combat) {
            working = swapForTooltip(working, "rules", combatRules);
        }
        if (work.rules.spellArea) {
            working = swapForTooltip(working, "rules", spellAreaRules);
        }
        if (work.rules.movementAndExploration) {
            working = swapForTooltip(
                working,
                "rules",
                movementAndExplanationRules,
            );
        }
        if (work.rules.attitude) {
            working = swapForTooltip(working, "rules", attitudeRules);
        }
        if (work.rules.hazards) {
            working = swapForTooltip(working, "rules", hazardRules)
        }
        if (work.rules.general) {
            working = swapForTooltip(working, "rules", generalRules)
        }
    }
    return working;
}

function swapForTooltip(input: string, tooltip: string, words: string[]) {
    words.forEach((e) => {
        const regex = new RegExp(`\\b(${e})\\b`, "gi");
        //console.log("Regex: ", regex);
        input = input.replace(regex, `[${tooltip}]$1[/${tooltip}]`);
    });
    return input;
}
