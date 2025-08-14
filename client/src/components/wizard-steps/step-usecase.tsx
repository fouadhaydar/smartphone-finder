import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Gamepad2, Camera, Battery, Smartphone, Briefcase, Video } from "lucide-react";
import type { UserPreferences } from "@shared/schema";

interface StepUseCaseProps {
  state: UserPreferences;
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (count: string) => void;
  updateState: (state: UserPreferences) => void;
}

export default function StepUseCase({ state, onNext, onPrevious, onUpdate, updateState }: StepUseCaseProps) {

  const useCases = [
    {
      id: "gaming",
      name: "Gaming",
      description: "High-performance processing and smooth graphics",
      icon: Gamepad2,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "photography",
      name: "Photography",
      description: "Superior camera quality and photo editing",
      icon: Camera,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "battery",
      name: "Battery Life",
      description: "All-day usage without frequent charging",
      icon: Battery,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: "everyday",
      name: "Everyday Use",
      description: "Balanced performance for daily tasks",
      icon: Smartphone,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "productivity",
      name: "Work Productivity",
      description: "Business apps and multitasking capability",
      icon: Briefcase,
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      id: "content",
      name: "Content Creation",
      description: "Video recording and social media sharing",
      icon: Video,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  useEffect(() => {
    const count = state.useCase ? Math.floor(Math.random() * 25) + 10 : Math.floor(Math.random() * 40) + 20;
    onUpdate(`Currently ${count} models match`);
  }, [state.useCase, onUpdate]);

  const handleUseCaseSelect = (useCase: string) => {
    updateState({ ...state, useCase: useCase as any });
  };

  return (
    <div className="space-y-8" data-testid="step-usecase">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Primary Use Case</h2>
        <p className="text-lg text-gray-600">How will you primarily use your phone?</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {useCases.map((useCase) => {
          const Icon = useCase.icon;
          const isSelected = state.useCase === useCase.id;

          return (
            <Card
              key={useCase.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected ? "border-brand-blue bg-blue-50" : "border-gray-200 hover:border-brand-blue"
              }`}
              onClick={() => handleUseCaseSelect(useCase.id)}
              data-testid={`usecase-${useCase.id}`}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 ${useCase.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${useCase.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{useCase.name}</h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </CardContent>
            </Card>
          );
        })}
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
          disabled={!state.useCase}
          className="px-8 py-3"
          data-testid="button-continue-priorities"
        >
          Continue to Priorities
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
