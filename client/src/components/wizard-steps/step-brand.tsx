import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, SkipForward } from "lucide-react";
import type { UserPreferences } from "@shared/schema";

interface StepBrandProps {
  state: UserPreferences;
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (count: string) => void;
  updateState: (state: UserPreferences) => void;
}

export default function StepBrand({ state, onNext, onPrevious, onUpdate, updateState }: StepBrandProps) {

  const brandData = {
    ios: [{ name: "Apple", icon: "fab fa-apple" }],
    android: [
      { name: "Samsung", icon: "fas fa-mobile-alt" },
      { name: "Google", icon: "fab fa-google" },
      { name: "OnePlus", icon: "fas fa-mobile-alt" },
      { name: "Xiaomi", icon: "fas fa-mobile-alt" },
      { name: "Oppo", icon: "fas fa-mobile-alt" },
      { name: "Vivo", icon: "fas fa-mobile-alt" },
    ],
    any: [
      { name: "Apple", icon: "fab fa-apple" },
      { name: "Samsung", icon: "fas fa-mobile-alt" },
      { name: "Google", icon: "fab fa-google" },
      { name: "OnePlus", icon: "fas fa-mobile-alt" },
      { name: "Xiaomi", icon: "fas fa-mobile-alt" },
      { name: "Oppo", icon: "fas fa-mobile-alt" },
      { name: "Vivo", icon: "fas fa-mobile-alt" },
      { name: "Nothing", icon: "fas fa-mobile-alt" },
    ],
  };

  const availableBrands = brandData[state.platform || "any"] || brandData.any;

  useEffect(() => {
    const count = state.brands.length > 0 ? Math.floor(Math.random() * 20) + 8 : Math.floor(Math.random() * 50) + 20;
    onUpdate(`Currently ${count} models match`);
  }, [state.brands, onUpdate]);

  const handleBrandToggle = (brandName: string) => {
    const brandLower = brandName.toLowerCase();
    const currentBrands = [...state.brands];
    const index = currentBrands.indexOf(brandLower);
    
    if (index > -1) {
      currentBrands.splice(index, 1);
    } else {
      currentBrands.push(brandLower);
    }
    
    updateState({ ...state, brands: currentBrands });
  };

  const handleSkip = () => {
    updateState({ ...state, brands: [] });
    onNext();
  };

  return (
    <div className="space-y-8" data-testid="step-brand">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Brand</h2>
        <p className="text-lg text-gray-600">Which brands do you prefer? (Optional)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {availableBrands.map((brand) => {
          const isSelected = state.brands.includes(brand.name.toLowerCase());
          
          return (
            <Card
              key={brand.name}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected ? "border-brand-blue bg-blue-50" : "border-gray-200 hover:border-brand-blue"
              }`}
              onClick={() => handleBrandToggle(brand.name)}
              data-testid={`brand-${brand.name.toLowerCase()}`}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className={`${brand.icon} text-xl text-gray-700`} />
                </div>
                <div className="text-sm font-medium text-gray-900">{brand.name}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mb-6">
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="text-brand-blue hover:text-brand-purple"
          data-testid="button-skip-brand"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Skip - No brand preference
        </Button>
      </div>

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
          data-testid="button-continue-budget"
        >
          Continue to Budget
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
