import { damageTypes } from "./damageTypes";

export interface ParsedAttack {
    attackName?: string;
    hasRecharge?: boolean;
    recharge?: string;
    attackType?: string;
    toHitBonus?: number | null;
    reach?: string;
    target?: string;
    fixedDamage?: number | null;
    randomDamage?: string;
    damageType?: string;
}

export function parseAttackText(text: string): ParsedAttack {
    const result: ParsedAttack = {};

    // Attack name and optional recharge — everything before the first period
    const nameMatch = text.match(/^(.+?)(?:\s*\(Recharge\s*([\d\-]+)\))?\s*\./);
    if (nameMatch) {
        result.attackName = nameMatch[1].trim();
        if (nameMatch[2]) {
            result.hasRecharge = true;
            result.recharge = nameMatch[2];
        } else {
            result.hasRecharge = false;
        }
    }

    // Attack type — order matters: check combined form first
    const attackTypeMatch = text.match(
        /(Melee or Ranged Weapon Attack|Melee Weapon Attack|Ranged Weapon Attack|Melee Spell Attack|Ranged Spell Attack)/
    );
    if (attackTypeMatch) {
        result.attackType = attackTypeMatch[1];
    }

    // To-hit bonus — handles both +5 and -1 forms
    const toHitMatch = text.match(/([+-]?\d+)\s+to\s+hit/);
    if (toHitMatch) {
        result.toHitBonus = parseInt(toHitMatch[1], 10);
    }

    // Reach (melee) or range (ranged) — store just the number(s)
    const reachMatch = text.match(/reach\s+(\d+)\s*ft/i);
    const rangeMatch = text.match(/range\s+(\d+(?:\/\d+)?)\s*ft/i);
    if (reachMatch) {
        result.reach = reachMatch[1];
    } else if (rangeMatch) {
        result.reach = rangeMatch[1];
    }

    // Target — text between ", " after the distance and " target"
    const targetMatch = text.match(/ft\.,\s+(.+?)\s+target/i);
    if (targetMatch) {
        result.target = targetMatch[1].trim();
    }

    // Hit: fixed (average) damage and dice expression
    const hitMatch = text.match(/Hit:\s+(\d+)\s+\(([^)]+)\)/);
    if (hitMatch) {
        result.fixedDamage = parseInt(hitMatch[1], 10);
        // Normalize spaces out of dice notation (DDB uses "1d6 + 4", we want "1d6+4")
        result.randomDamage = hitMatch[2].replace(/\s+/g, "");
    }

    // Damage type — match against known list
    const damageTypePattern = new RegExp(
        `(${damageTypes.join("|")})\\s+damage`,
        "i"
    );
    const damageTypeMatch = text.match(damageTypePattern);
    if (damageTypeMatch) {
        result.damageType = damageTypeMatch[1].toLowerCase();
    }

    return result;
}
