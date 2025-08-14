import type { Smartphone, UserPreferences } from "@shared/schema";

export function calculateMatchScore(phone: Smartphone, preferences: UserPreferences): number {
  let score = 0;
  const weights = {
    camera: 20,
    battery: 20,
    performance: 15,
    display: 15,
    price: 15,
    durability: 15,
  };

  // Apply priority-based weighting
  preferences.priorities.forEach((priority, index) => {
    const weight = weights[priority] * (6 - index) / 6; // Higher weight for higher priority
    
    switch (priority) {
      case "camera":
        if (phone.specs.camera.dxomark) {
          score += (phone.specs.camera.dxomark / 150) * weight;
        }
        break;
      case "battery":
        score += Math.min(phone.specs.battery / 5000, 1) * weight;
        break;
      case "performance":
        // Simple processor scoring (would be more sophisticated in real app)
        const processorScore = phone.platform === "ios" ? 0.9 : 0.8;
        score += processorScore * weight;
        break;
      case "display":
        const displayScore = (phone.specs.display.refreshRate / 120) * 0.7 + 
                           (phone.specs.display.type === "OLED" || phone.specs.display.type === "AMOLED" ? 0.3 : 0);
        score += Math.min(displayScore, 1) * weight;
        break;
      case "price":
        // Inverse scoring for price (cheaper is better for this metric)
        const priceRange = preferences.budget.max - preferences.budget.min;
        const pricePosition = (preferences.budget.max - phone.price) / priceRange;
        score += Math.max(0, pricePosition) * weight;
        break;
      case "durability":
        const durabilityScore = phone.specs.features.waterResistance.includes("IP6") ? 1 : 0.5;
        score += durabilityScore * weight;
        break;
    }
  });

  // Use case bonus
  if (preferences.useCase) {
    switch (preferences.useCase) {
      case "gaming":
        if (phone.specs.display.refreshRate >= 120) score += 10;
        if (phone.specs.ram >= 8) score += 5;
        break;
      case "photography":
        if (phone.specs.camera.dxomark && phone.specs.camera.dxomark > 130) score += 15;
        break;
      case "battery":
        if (phone.specs.battery > 4500) score += 15;
        break;
      case "productivity":
        if (phone.specs.ram >= 8) score += 10;
        if (phone.specs.display.size >= 6.5) score += 5;
        break;
    }
  }

  return Math.min(score, 100); // Cap at 100
}

export function rankPhones(phones: Smartphone[], preferences: UserPreferences): Smartphone[] {
  return phones
    .map(phone => ({
      ...phone,
      matchScore: calculateMatchScore(phone, preferences),
    }))
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
}
