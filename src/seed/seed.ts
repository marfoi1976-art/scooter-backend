import mongoose from "mongoose";
import { ENV } from "../config/env";
import Model from "../models/Model";
import Part from "../models/Part";
import Principle from "../models/Principle";
import TroubleshootingGuide from "../models/TroubleshootingGuide";

const seed = async () => {
  try {
    console.log("🌱 Connecting to database...");
    await mongoose.connect(ENV.MONGO_URI);

    console.log("🧹 Clearing existing data...");
    await Promise.all([
      Model.deleteMany({}),
      Part.deleteMany({}),
      Principle.deleteMany({}),
      TroubleshootingGuide.deleteMany({})
    ]);

    console.log("📦 Inserting seed data...");

    // ─── MODELS ───────────────────────────────────────────────────
    const m365 = await Model.create({
      name: "Xiaomi M365",
      manufacturer: "Xiaomi"
    });

    const ninebot = await Model.create({
      name: "Segway Ninebot Max",
      manufacturer: "Segway"
    });

    // ─── PARTS (with full safety layer) ───────────────────────────

    const brakePads = await Part.create({
      name: "Brake Pads",
      category: "Braking",
      description: "Friction material that contacts the rotor to slow the scooter.",
      models: [m365._id, ninebot._id],
      skillLevelRequired: "intermediate",
      toolsRequired: [
        "Hex key set (3mm, 4mm, 5mm)",
        "Torque wrench",
        "Clean cloth",
        "Caliper measurement tool"
      ],
      safetyWarnings: [
        "⚠️ CRITICAL: Verify pad dimensions match your caliper BEFORE ordering. Wrong size pads can shift inside the caliper at speed.",
        "⚠️ Never compress hydraulic pistons without proper tools — this can damage the brake system.",
        "⚠️ Always test brakes at low speed before riding normally.",
        "⚠️ Do not ride if brakes feel spongy or inconsistent after installation."
      ],
      installationRisk: "critical",
      wrongInstallConsequences: "Incorrectly sized or installed brake pads can shift inside the caliper under braking force. This causes partial or complete brake failure, especially at high speed. This is a life-threatening risk.",
      verificationSteps: [
        "Confirm pad width and thickness match caliper specifications exactly.",
        "After installation, squeeze brake lever 10 times to seat pads.",
        "Test at walking speed — brakes must engage smoothly and fully.",
        "Test at 10km/h before riding at normal speed.",
        "Inspect pad position in caliper — pads must sit flat against rotor, not at an angle."
      ],
      compatibilityNotes: "Brake pad dimensions vary by caliper brand and model. Do not rely on visual matching alone. Always check manufacturer part numbers and caliper specifications before ordering."
    });

    const battery = await Part.create({
      name: "Battery Pack",
      category: "Electrical",
      description: "Main lithium-ion battery that powers the entire scooter.",
      models: [m365._id, ninebot._id],
      skillLevelRequired: "expert",
      toolsRequired: [
        "Multimeter",
        "Insulated screwdrivers",
        "Hex key set",
        "Anti-static wrist strap"
      ],
      safetyWarnings: [
        "⚠️ Lithium-ion batteries can catch fire if punctured, short-circuited, or improperly connected.",
        "⚠️ Always disconnect battery before working on any electrical component.",
        "⚠️ Never use a battery with a damaged casing or swollen cells.",
        "⚠️ Match battery voltage exactly — wrong voltage will destroy the controller."
      ],
      installationRisk: "critical",
      wrongInstallConsequences: "Incorrect battery voltage or reversed polarity can destroy the motor controller instantly and may cause fire or explosion.",
      verificationSteps: [
        "Measure battery voltage with multimeter before connecting.",
        "Confirm polarity is correct before final connection.",
        "Check all connectors are fully seated.",
        "Power on and verify display shows correct battery level.",
        "Test ride at low speed and monitor for unusual heat."
      ],
      compatibilityNotes: "Battery voltage must match your scooter's specifications exactly. A 36V scooter requires a 36V battery. Do not substitute."
    });

    const throttle = await Part.create({
      name: "Throttle",
      category: "Control",
      description: "Handlebar control that sends acceleration signal to the controller.",
      models: [m365._id, ninebot._id],
      skillLevelRequired: "beginner",
      toolsRequired: [
        "Phillips screwdriver",
        "Hex key 3mm",
        "Cable ties"
      ],
      safetyWarnings: [
        "⚠️ A sticky or sticking throttle can cause unintended acceleration.",
        "⚠️ Ensure throttle returns to zero position when released before riding.",
        "⚠️ Route cables away from moving parts and sharp edges."
      ],
      installationRisk: "medium",
      wrongInstallConsequences: "A poorly installed throttle that sticks open causes uncontrolled acceleration. Combined with brake failure this is extremely dangerous.",
      verificationSteps: [
        "Confirm throttle snaps back to zero when released.",
        "Test at low speed — acceleration should be smooth and proportional.",
        "Check cable routing has no sharp bends or pinch points.",
        "Verify display responds correctly to throttle input."
      ],
      compatibilityNotes: "Check connector type (3-pin vs 4-pin) and voltage signal range before ordering. Not all throttles are compatible with all controllers."
    });

    const controller = await Part.create({
      name: "Motor Controller",
      category: "Electrical",
      description: "Regulates power flow between battery, throttle, and motor.",
      models: [m365._id, ninebot._id],
      skillLevelRequired: "expert",
      toolsRequired: [
        "Multimeter",
        "Insulated screwdrivers",
        "Hex key set",
        "Anti-static wrist strap",
        "Heat gun (for cable management)"
      ],
      safetyWarnings: [
        "⚠️ Always disconnect battery before replacing the controller.",
        "⚠️ Controller must match battery voltage AND motor specifications exactly.",
        "⚠️ Incorrect wiring can cause immediate fire."
      ],
      installationRisk: "critical",
      wrongInstallConsequences: "Wrong controller voltage destroys the unit immediately. Incorrect wiring can cause fire. A faulty controller can cause full power loss while riding or uncontrolled acceleration.",
      verificationSteps: [
        "Verify controller voltage matches battery voltage.",
        "Confirm all connectors are matched by color and pin count.",
        "Power on and test all functions: throttle, brakes, lights.",
        "Test ride at low speed monitoring for unusual behavior."
      ],
      compatibilityNotes: "Controllers are not universal. Must match your scooter's battery voltage, motor wattage, and connector configuration exactly."
    });

    // ─── PRINCIPLES ───────────────────────────────────────────────
    const powerPrinciple = await Principle.create({
      name: "Power Delivery Principle",
      keyword: "no power",
      description: "Energy must flow: battery → controller → motor. A break anywhere in this chain stops the scooter."
    });

    const signalPrinciple = await Principle.create({
      name: "Signal Flow Principle",
      keyword: "no throttle",
      description: "Control signals travel: throttle → controller → motor. No signal means no response."
    });

    const brakingPrinciple = await Principle.create({
      name: "Braking Safety Principle",
      keyword: "brake",
      description: "Brakes must engage fully and consistently. Partial contact, wrong pad size, or air in hydraulic lines all reduce stopping power. This is a critical safety system — never ride with brakes that feel wrong."
    });

    // ─── TROUBLESHOOTING GUIDES ───────────────────────────────────
    await TroubleshootingGuide.create({
      title: "Scooter Has No Power",
      keywords: ["no power", "dead", "won't turn on", "not turning on"],
      steps: [
        "Check battery charge level — connect to charger for 30 minutes and try again.",
        "Inspect the battery connector for loose, bent, or corroded pins.",
        "Check the main fuse — locate it near the battery and test with a multimeter.",
        "Verify the power button is functioning — hold for 3 seconds.",
        "Measure battery voltage at the terminals — should match rated voltage.",
        "If voltage is correct but scooter still won't start, the controller may be faulty."
      ],
      relatedParts: [battery._id, controller._id],
      relatedPrinciples: [powerPrinciple._id],
      models: [m365._id, ninebot._id]
    });

    await TroubleshootingGuide.create({
      title: "Throttle Not Responding",
      keywords: ["no throttle", "throttle stuck", "no acceleration", "won't accelerate"],
      steps: [
        "Check throttle connector at the controller — unplug and replug firmly.",
        "Inspect throttle cable for visible damage or pinching.",
        "Test throttle signal voltage with a multimeter — should vary 1V-4V as you twist.",
        "Check controller error codes on the display if available.",
        "Replace throttle if signal is absent or inconsistent."
      ],
      relatedParts: [throttle._id, controller._id],
      relatedPrinciples: [signalPrinciple._id],
      models: [m365._id, ninebot._id]
    });

    await TroubleshootingGuide.create({
      title: "Brakes Not Working Properly",
      keywords: ["brake", "brakes", "won't stop", "brake failure", "soft brakes", "spongy brakes"],
      steps: [
        "⚠️ STOP RIDING IMMEDIATELY if brakes feel unsafe.",
        "Check brake pad thickness — if less than 1mm, replace immediately.",
        "Verify brake pads are seated correctly and flush against rotor.",
        "For hydraulic brakes: check fluid level and inspect for leaks.",
        "Squeeze brake lever slowly — if spongy, hydraulic system may have air.",
        "Check brake cable tension for mechanical brakes — should have minimal slack.",
        "After any brake work, test at walking speed before riding normally."
      ],
      relatedParts: [brakePads._id],
      relatedPrinciples: [brakingPrinciple._id],
      models: [m365._id, ninebot._id]
    });

    console.log("✅ Seed data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seed();
