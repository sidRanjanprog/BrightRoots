const generateRecommendations = ({
  screenTimeMinutes,
  sleepHours,
  outdoorMinutes,
  hasScreenData,
  hasSleepData,
  hasOutdoorData,
}) => {
  const recommendations = [];
  const dataWarnings = [];

  let wellnessScore = 100;

  // Missing Data Checks
  if (!hasScreenData) {
    dataWarnings.push("No screen time records available.");
  }

  if (!hasSleepData) {
    dataWarnings.push("No sleep records available.");
  }

  if (!hasOutdoorData) {
    dataWarnings.push("No outdoor activity records available.");
  }

  // Screen Time Rules
  if (hasScreenData && screenTimeMinutes > 180) {
    wellnessScore -= 20;

    recommendations.push(
      "Consider reducing screen time to less than 3 hours per day.",
    );
  }

  // Sleep Rules
  if (hasSleepData && sleepHours < 8) {
    wellnessScore -= 25;

    recommendations.push(
      "Child may benefit from a more consistent sleep schedule.",
    );
  }

  // Outdoor Rules
  if (hasOutdoorData && outdoorMinutes < 30) {
    wellnessScore -= 15;

    recommendations.push(
      "Encourage at least 30 minutes of outdoor activity daily.",
    );
  }

  // Combined Rule 1
  if (
    hasScreenData &&
    hasOutdoorData &&
    screenTimeMinutes > 180 &&
    outdoorMinutes < 30
  ) {
    wellnessScore -= 10;

    recommendations.push(
      "High screen time combined with low outdoor activity may affect overall wellbeing.",
    );
  }

  // Combined Rule 2
  if (
    hasScreenData &&
    hasOutdoorData &&
    hasSleepData &&
    screenTimeMinutes > 180 &&
    sleepHours < 8 &&
    outdoorMinutes < 30
  ) {
    wellnessScore -= 15;

    recommendations.push(
      "Multiple wellness indicators suggest an unhealthy lifestyle pattern. Consider improving sleep, reducing screen time, and increasing outdoor activity.",
    );
  }

  wellnessScore = Math.max(0, wellnessScore); // Score protection

  let riskLevel = "Low";

  if (wellnessScore < 80) {
    riskLevel = "Moderate";
  }

  if (wellnessScore < 50) {
    riskLevel = "High";
  }

  if (recommendations.length === 0 && dataWarnings.length === 0) {
    recommendations.push(
      "Screen time remains within a healthy range based on the available records."
    );
  
    recommendations.push(
      "Outdoor activity levels support physical development and active habits."
    );
  
    recommendations.push(
      "Sleep duration appears generally consistent and supports healthy growth."
    );
  
    recommendations.push(
      "Continue maintaining a balance between digital activities, physical play, and rest."
    );
  
    recommendations.push(
      "Consider regular screen-free family activities to encourage communication and connection."
    );
  }

  return {
    wellnessScore,
    riskLevel,
    dataWarnings,
    recommendations,
  };
};

module.exports = {
  generateRecommendations,
};
