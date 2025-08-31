const actions = [
    "attack",
    "dash",
    "help",
    "grapple",
    "disengage",
    "use object",
    "shove",
    "use shield",
    "use class feature",
    "cast a spell",
    "escape",
    "hide",
    "improvise",
    "dodge",
    "search",
    "ready",
];

const conditions = [
    "blinded",
    "frightened",
    "paralyzed",
    "restrained",
    "charmed",
    "grappled",
    "petrified",
    "stunned",
    "deafened",
    "incapacitated",
    "poisoned",
    "unconscious",
    "exhaustion",
    "invisible",
    "prone",
];

const skills = [
    "Acrobatics",
    "Animal Handling",
    "Arcana",
    "Athletics",
    "Deception",
    "History",
    "Insight",
    "Intimidation",
    "Investigation",
    "Medicine",
    "Nature",
    "Perception",
    "Performance",
    "Persuasion",
    "Religion",
    "Sleight of Hand",
    "Stealth",
    "Survival",
];

const combatRules = [
    "Armor Class",
    "Bloodied",
    "Cover",
    "Half Cover",
    "Three-Quarters Cover",
    "Total Cover",
    "Critical Hit",
    "Healing",
    "Hit Point Dice",
    "Hit Points",
    "Immunity",
    "Improvised Weapons",
    "Initiative",
    "Resistance",
    "Spell Attack",
    "Stable",
    "Surprise",
    "Target",
    "Temporary Hit Points",
    "Unarmed Strike",
    "Vulnerability",
    "Weapon",
    "Weapon Attack",
];

const spellAreaRules = [
    "Cone",
    "Cube",
    "Cylinder",
    "Line",
    "Emanation",
    "Sphere",
];

const movementAndExplanationRules = [
    "Bright Light",
    "Climbing",
    "Crawling",
    "Darkness",
    "Difficult Terrain",
    "Dim Light",
    "Falling",
    "Flying",
    "Heavily Obscured",
    "High Jump",
    "Hover",
    "Jumping",
    "Lightly Obscured",
    "Long Jump",
    "Occupied Space",
    "Passive Perception",
    "Speed",
    "Swimming",
    "Unoccupied Space",
];

export interface RulesSet {
    combat: boolean;
    spellArea: boolean;
    movementAndExploration: boolean;

}

export interface HighlightSet {
    actions: boolean;
    conditions: boolean;
    skills: boolean;
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
    if (work.rules) {
        if (work.rules.combat) {
            working = swapForTooltip(working, "rules", combatRules);
        }
        if (work.rules.spellArea) {
            working = swapForTooltip(working, "rules", spellAreaRules);
        }
        if (work.rules.movementAndExploration) {
            working = swapForTooltip(working, "rules", movementAndExplanationRules);
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
