import TroubleshootingGuide from "../models/TroubleshootingGuide";

export class InferenceEngine {
  static async run(resolved: any) {
    const { symptoms, matchedParts, matchedPrinciples, model } = resolved;

    const guides = await TroubleshootingGuide.find()
      .populate("relatedParts")
      .populate("relatedPrinciples")
      .populate("models");

    const scored = guides.map((guide) => {
      let score = 0;

      guide.keywords.forEach((keyword: string) => {
        if (symptoms.some((s: string) => s.includes(keyword.toLowerCase()))) {
          score += 2;
        }
      });

      matchedParts.forEach((part: any) => {
        if (guide.relatedParts.some((rp: any) => rp._id.equals(part._id))) {
          score += 3;
        }
      });

      matchedPrinciples.forEach((p: any) => {
        if (guide.relatedPrinciples.some((rp: any) => rp._id.equals(p._id))) {
          score += 3;
        }
      });

      if (model && guide.models.some((m: any) => m._id.equals(model._id))) {
        score += 2;
      }

      return { guide, score };
    });

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 3).map((item) => ({
      title: item.guide.title,
      steps: item.guide.steps,
      score: item.score
    }));
  }
}
