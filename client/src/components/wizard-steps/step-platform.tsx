import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Apple, Smartphone, HelpCircle } from "lucide-react";
import type { UserPreferences } from "@shared/schema";

interface StepPlatformProps {
  state: UserPreferences;
  onNext: () => void;
  onUpdate: (count: string) => void;
  updateState: (state: UserPreferences) => void;
}

export default function StepPlatform({ state, onNext, onUpdate, updateState }: StepPlatformProps) {

  useEffect(() => {
    onUpdate("Analyzing options...");
  }, [onUpdate]);

  const handlePlatformSelect = (platform: "ios" | "android" | "any") => {
    const newState = { ...state, platform };
    
    // Update budget constraints for iOS
    if (platform === "ios" && state.budget.min < 500) {
      newState.budget = { ...state.budget, min: 500, max: Math.max(500, state.budget.max) };
    }
    
    updateState(newState);
    
    // Mock result count update
    const count = platform === "ios" ? "12 models" : platform === "android" ? "45 models" : "57 models";
    onUpdate(`Currently ${count} match`);
  };

  const platforms = [
    {
      id: "ios",
      name: "iOS",
      description: "Apple's ecosystem with seamless integration",
      icon: Apple,
      note: "Starting from $500",
      noteColor: "bg-blue-50 text-blue-700",
    },
    {
      id: "android",
      name: "Android", 
      description: "Open platform with extensive customization",
      icon: Smartphone,
      note: "Wide price range available",
      noteColor: "bg-green-50 text-green-700",
    },
    {
      id: "any",
      name: "No Preference",
      description: "Show me all available options",
      icon: HelpCircle,
      note: "Best of both worlds",
      noteColor: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div className="space-y-8" data-testid="step-platform">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Platform</h2>
        <p className="text-lg text-gray-600">Which operating system do you prefer?</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = state.platform === platform.id;
          
          return (
            <Card
              key={platform.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected ? "border-brand-blue bg-blue-50" : "border-gray-200 hover:border-brand-blue"
              }`}
              onClick={() => handlePlatformSelect(platform.id as any)}
              data-testid={`platform-${platform.id}`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{platform.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{platform.description}</p>
                <div className={`p-2 rounded-lg ${platform.noteColor}`}>
                  <p className="text-xs font-medium">{platform.note}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={!state.platform}
          className="px-8 py-3"
          data-testid="button-continue-brands"
        >
          Continue to Brands
          <i className="fas fa-arrow-right ml-2" />
        </Button>
      </div>
    </div>
  );
}
