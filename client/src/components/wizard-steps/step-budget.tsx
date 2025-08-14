import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWizard } from "@/hooks/use-wizard";
import type { UserPreferences } from "@shared/schema";

interface StepBudgetProps {
  state: UserPreferences;
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (count: string) => void;
}

export default function StepBudget({ state, onNext, onPrevious, onUpdate }: StepBudgetProps) {
  const { updateState } = useWizard();
  const [currency, setCurrency] = useState("USD");

  const minRange = state.platform === "ios" ? 500 : 100;
  const maxRange = 2000;

  const popularRanges = [
    { label: "$100 - $300", min: 100, max: 300, disabled: state.platform === "ios" },
    { label: "$300 - $500", min: 300, max: 500, disabled: false },
    { label: "$500 - $1000", min: 500, max: 1000, disabled: false },
    { label: "$1000+", min: 1000, max: 2000, disabled: false },
  ];

  useEffect(() => {
    const count = Math.floor(Math.random() * 30) + 15;
    onUpdate(`Currently ${count} models match`);
  }, [state.budget, onUpdate]);

  const handleBudgetChange = (values: number[]) => {
    const [min, max] = values;
    updateState({ 
      ...state, 
      budget: { min: Math.max(min, minRange), max } 
    });
  };

  const handlePopularRangeClick = (min: number, max: number) => {
    const adjustedMin = Math.max(min, minRange);
    updateState({ 
      ...state, 
      budget: { min: adjustedMin, max } 
    });
  };

  return (
    <div className="space-y-8" data-testid="step-budget">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Set Your Budget</h2>
        <p className="text-lg text-gray-600">What's your price range?</p>
      </div>

      {/* Popular Ranges */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Ranges</h3>
        <div className="flex flex-wrap gap-3">
          {popularRanges.map((range) => (
            <Button
              key={range.label}
              variant="outline"
              className={`${
                range.disabled 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:border-brand-blue transition-colors"
              }`}
              disabled={range.disabled}
              onClick={() => !range.disabled && handlePopularRangeClick(range.min, range.max)}
              data-testid={`budget-chip-${range.min}-${range.max}`}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Range Slider */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg font-semibold text-gray-900">Custom Range</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              <Slider
                value={[state.budget.min, state.budget.max]}
                onValueChange={handleBudgetChange}
                min={minRange}
                max={maxRange}
                step={50}
                className="w-full"
                data-testid="budget-slider"
              />

              <div className="flex justify-between">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-blue" data-testid="min-price-display">
                    ${state.budget.min}
                  </div>
                  <div className="text-sm text-gray-600">Minimum</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-blue" data-testid="max-price-display">
                    ${state.budget.max}
                  </div>
                  <div className="text-sm text-gray-600">Maximum</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="px-6 py-3"
          data-testid="button-previous"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="px-8 py-3"
          data-testid="button-continue-usecase"
        >
          Continue to Use Case
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
