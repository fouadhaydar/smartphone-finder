import { useState, useEffect } from "react";
import type { UserPreferences } from "@shared/schema";

const initialState: UserPreferences = {
  platform: undefined,
  brands: [],
  budget: { min: 300, max: 800 },
  useCase: undefined,
  priorities: ["camera", "battery", "performance", "display", "price", "durability"],
  advancedFilters: {},
};

export function useWizard() {
  const [state, setState] = useState<UserPreferences>(initialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  
  const totalSteps = 6;

  // Load saved state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("smartphoneFinderState");
    if (saved) {
      try {
        const savedState = JSON.parse(saved);
        setState(savedState.preferences || initialState);
        setCurrentStep(savedState.currentStep || 1);
        setShowResults(savedState.showResults || false);
      } catch (error) {
        console.error("Failed to load saved state:", error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      preferences: state,
      currentStep,
      showResults,
    };
    localStorage.setItem("smartphoneFinderState", JSON.stringify(stateToSave));
  }, [state, currentStep, showResults]);

  const updateState = (newState: UserPreferences) => {
    setState(newState);
  };

  const goToStep = (step: number | "results") => {
    if (step === "results") {
      setShowResults(true);
    } else {
      setCurrentStep(step);
      setShowResults(false);
    }
  };

  const goToNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const goToPrevious = () => {
    if (showResults) {
      setShowResults(false);
      setCurrentStep(totalSteps);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    state,
    currentStep,
    totalSteps,
    showResults,
    updateState,
    goToStep,
    goToNext,
    goToPrevious,
  };
}
