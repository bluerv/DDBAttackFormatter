import { describe, it, expect } from "vitest";
import { parseAttackText } from "./parseAttackText";

const LONGSWORD =
    "Longsword. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d8+5) slashing damage.";

const SHORTBOW =
    "Shortbow. Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6+2) piercing damage.";

const FIRE_BOLT =
    "Fire Bolt. Ranged Spell Attack: +6 to hit, range 120 ft., one target. Hit: 11 (2d10) fire damage.";

const RECHARGE =
    "Breath Weapon (Recharge 5-6). Melee Attack Roll: +3 to hit, reach 5 ft., one target. Hit: 7 (2d6) cold damage.";

const NEGATIVE_HIT =
    "Slam. Melee Weapon Attack: -1 to hit, reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage.";

const COLON_INSTEAD_OF_PERIOD = 
    "Claw: Melee Attack Roll: +6 to hit, reach 20 ft., one target. Hit: 8 (1d10+3) slashing damage.";

describe("parseAttackText", () => {
    describe("attack name", () => {
        it("parses a simple name", () => {
            expect(parseAttackText(LONGSWORD).attackName).toBe("Longsword");
        });

        it("parses a multi-word name", () => {
            expect(parseAttackText(RECHARGE).attackName).toBe("Breath Weapon");
        });
        
        it("parses a name with a colon", () => {
            expect(parseAttackText(COLON_INSTEAD_OF_PERIOD).attackName).toBe("Claw");
        })
    });

    describe("recharge", () => {
        it("sets hasRecharge false when absent", () => {
            expect(parseAttackText(LONGSWORD).hasRecharge).toBe(false);
        });

        it("sets hasRecharge true when present", () => {
            expect(parseAttackText(RECHARGE).hasRecharge).toBe(true);
        });

        it("captures the recharge range", () => {
            expect(parseAttackText(RECHARGE).recharge).toBe("5-6");
        });
    });

    describe("attack type", () => {
        it("parses Melee Weapon Attack", () => {
            expect(parseAttackText(LONGSWORD).attackType).toBe("Melee Weapon Attack");
        });

        it("parses Ranged Weapon Attack", () => {
            expect(parseAttackText(SHORTBOW).attackType).toBe("Ranged Weapon Attack");
        });

        it("parses Ranged Spell Attack", () => {
            expect(parseAttackText(FIRE_BOLT).attackType).toBe("Ranged Spell Attack");
        });

        it("parses Melee Attack Roll", () => {
            expect(parseAttackText(RECHARGE).attackType).toBe("Melee Attack Roll");
        });
    });

    describe("to-hit bonus", () => {
        it("parses a positive bonus", () => {
            expect(parseAttackText(LONGSWORD).toHitBonus).toBe(5);
        });

        it("parses a negative bonus", () => {
            expect(parseAttackText(NEGATIVE_HIT).toHitBonus).toBe(-1);
        });
    });

    describe("reach / range", () => {
        it("parses reach for melee attacks", () => {
            expect(parseAttackText(LONGSWORD).reach).toBe("5");
        });

        it("parses a ranged attack's range as reach", () => {
            expect(parseAttackText(SHORTBOW).reach).toBe("80/320");
        });
    });

    describe("target", () => {
        it("parses 'one target'", () => {
            expect(parseAttackText(LONGSWORD).target).toBe("one");
        });
    });

    describe("hit damage", () => {
        it("parses fixed damage", () => {
            expect(parseAttackText(LONGSWORD).fixedDamage).toBe(9);
        });

        it("parses dice expression and normalises spaces", () => {
            expect(parseAttackText(LONGSWORD).randomDamage).toBe("1d8+5");
        });

        it("parses a dice-only expression (no modifier)", () => {
            expect(parseAttackText(FIRE_BOLT).randomDamage).toBe("2d10");
        });
    });

    describe("damage type", () => {
        it("parses slashing", () => {
            expect(parseAttackText(LONGSWORD).damageType).toBe("slashing");
        });

        it("parses piercing", () => {
            expect(parseAttackText(SHORTBOW).damageType).toBe("piercing");
        });

        it("parses fire", () => {
            expect(parseAttackText(FIRE_BOLT).damageType).toBe("fire");
        });

        it("lowercases the damage type", () => {
            expect(parseAttackText(LONGSWORD).damageType).toBe(
                parseAttackText(LONGSWORD).damageType?.toLowerCase()
            );
        });
    });

    describe("edge cases", () => {
        it("returns an empty object for an empty string", () => {
            expect(parseAttackText("")).toEqual({});
        });

        it("returns no attack-specific fields for plain text with a period", () => {
            const result = parseAttackText("This is not an attack.");
            expect(result.attackType).toBeUndefined();
            expect(result.toHitBonus).toBeUndefined();
            expect(result.damageType).toBeUndefined();
        });
    });
});
