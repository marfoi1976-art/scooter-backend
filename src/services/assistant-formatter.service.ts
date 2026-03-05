export class AssistantFormatter {
  static format(results: any[]) {
    if (!results || results.length === 0) {
      return {
        summary: "No clear diagnostic result found.",
        recommendations: [],
        raw: []
      };
    }

    const top = results[0];

    return {
      summary: `Most likely issue: ${top.title}`,
      recommendations: top.steps,
      alternatives: results.slice(1).map((r) => ({
        title: r.title,
        score: r.score
      })),
      raw: results
    };
  }
}
