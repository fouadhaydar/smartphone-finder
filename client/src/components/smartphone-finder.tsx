import { useState } from "react";
import { useWizard } from "@/hooks/use-wizard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import StepPlatform from "./wizard-steps/step-platform";
import StepBrand from "./wizard-steps/step-brand";
import StepBudget from "./wizard-steps/step-budget";
import StepUseCase from "./wizard-steps/step-usecase";
import StepPriorities from "./wizard-steps/step-priorities";
import StepAdvanced from "./wizard-steps/step-advanced";
import ResultsPage from "./results-page";

export default function SmartphoneFinder() {
  const { state, currentStep, totalSteps, goToStep, goToNext, goToPrevious, showResults, updateState } = useWizard();
  const [resultCount, setResultCount] = useState("Analyzing options...");

  const progress = showResults ? 100 : (currentStep / totalSteps) * 100;

  const handleRestart = () => {
    localStorage.removeItem("smartphoneFinderState");
    window.location.reload();
  };

  const renderCurrentStep = () => {
    if (showResults) {
      return <ResultsPage preferences={state} onRestart={handleRestart} />;
    }

    switch (currentStep) {
      case 1:
        return <StepPlatform state={state} onNext={goToNext} onUpdate={setResultCount} updateState={updateState} />;
      case 2:
        return <StepBrand state={state} onNext={goToNext} onPrevious={goToPrevious} onUpdate={setResultCount} updateState={updateState} />;
      case 3:
        return <StepBudget state={state} onNext={goToNext} onPrevious={goToPrevious} onUpdate={setResultCount} updateState={updateState} />;
      case 4:
        return <StepUseCase state={state} onNext={goToNext} onPrevious={goToPrevious} onUpdate={setResultCount} updateState={updateState} />;
      case 5:
        return <StepPriorities state={state} onNext={goToNext} onPrevious={goToPrevious} onUpdate={setResultCount} updateState={updateState} />;
      case 6:
        return <StepAdvanced state={state} onNext={() => goToStep('results')} onPrevious={goToPrevious} onUpdate={setResultCount} updateState={updateState} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-brand-purple rounded-lg flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Smartphone Finder</h1>
            </div>

            {/* Progress Bar */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">
                  Step {showResults ? totalSteps : currentStep} of {totalSteps}
                </span>
                <div className="w-32">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
              <div className="text-sm text-gray-500">{resultCount}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentStep()}
      </main>
    </div>
  );
}
