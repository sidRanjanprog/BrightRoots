const generateRecommendations = ({
    screenTimeMinutes,
    sleepHours,
    outdoorMinutes,
  }) => {
    const recommendations = [];
  
    // Screen Time Rules
    if (screenTimeMinutes > 180) {
      recommendations.push(
        "Consider reducing screen time to less than 3 hours per day."
      );
    }
  
    // Sleep Rules
    if (sleepHours < 8) {
      recommendations.push(
        "Child may benefit from a more consistent sleep schedule."
      );
    }
  
    // Outdoor Activity Rules
    if (outdoorMinutes < 30) {
      recommendations.push(
        "Encourage at least 30 minutes of outdoor activity daily."
      );
    }
  
    // Combined Rule
    if (
      screenTimeMinutes > 180 &&
      outdoorMinutes < 30
    ) {
      recommendations.push(
        "High screen time combined with low outdoor activity may affect overall wellbeing."
      );
    }
  
    if (recommendations.length === 0) {
      recommendations.push(
        "Great job! Current habits appear balanced."
      );
    }
  
    return recommendations;
  };
  
  module.exports = {
    generateRecommendations,
  };