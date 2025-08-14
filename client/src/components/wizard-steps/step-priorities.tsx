import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, GripVertical, Camera, Battery, Cpu, Monitor, DollarSign, Shield } from "lucide-react";
import type { UserPreferences } from "@shared/schema";

interface StepPrioritiesProps {
  state: UserPreferences;
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (count: string) => void;
  updateState: (state: UserPreferences) => void;
}

export default function StepPriorities({ state, onNext, onPrevious, onUpdate, updateState }: StepPrioritiesProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const priorityIcons = {
    camera: { icon: Camera, color: "text-purple-600" },
    battery: { icon: Battery, color: "text-green-600" },
    performance: { icon: Cpu, color: "text-blue-600" },
    display: { icon: Monitor, color: "text-indigo-600" },
    price: { icon: DollarSign, color: "text-yellow-600" },
    durability: { icon: Shield, color: "text-red-600" },
  };

  const priorityLabels = {
    camera: "Camera Quality",
    battery: "Battery Life",
    performance: "Performance",
    display: "Display Quality",
    price: "Price",
    durability: "Durability",
  };

  useEffect(() => {
    const count = Math.floor(Math.random() * 20) + 12;
    onUpdate(`Currently ${count} models match`);
  }, [state.priorities, onUpdate]);

  const handleDragStart = (e: React.DragEvent, priority: string) => {
    setDraggedItem(priority);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetPriority: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetPriority) {
      setDraggedItem(null);
      return;
    }

    const newPriorities = [...state.priorities];
    const draggedIndex = newPriorities.indexOf(draggedItem as any);
    const targetIndex = newPriorities.indexOf(targetPriority as any);

    newPriorities.splice(draggedIndex, 1);
    newPriorities.splice(targetIndex, 0, draggedItem as any);

    updateState({ ...state, priorities: newPriorities });
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="space-y-8" data-testid="step-priorities">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Rank Your Priorities</h2>
        <p className="text-lg text-gray-600">Drag to reorder what matters most to you</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Priority Order</h3>
              <div className="text-sm text-gray-500">
                <GripVertical className="w-4 h-4 inline mr-1" />
                Drag to reorder
              </div>
            </div>
            <p className="text-sm text-gray-600">Most important at the top, least important at the bottom</p>
          </div>

          <div className="space-y-3" data-testid="priority-list">
            {state.priorities.map((priority, index) => {
              const { icon: Icon, color } = priorityIcons[priority];
              const isDragging = draggedItem === priority;

              return (
                <div
                  key={priority}
                  draggable
                  onDragStart={(e) => handleDragStart(e, priority)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, priority)}
                  onDragEnd={handleDragEnd}
                  className={`bg-gray-50 rounded-lg p-4 border border-gray-200 cursor-move transition-all duration-200 hover:shadow-md ${
                    isDragging ? "opacity-50 transform scale-105" : ""
                  }`}
                  data-testid={`priority-item-${priority}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                      <Icon className={`w-5 h-5 ${color}`} />
                      <span className="font-medium text-gray-900">{priorityLabels[priority]}</span>
                    </div>
                    <div className="text-sm text-gray-500">#{index + 1}</div>
                  </div>
                </div>
              );
            })}
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
          data-testid="button-continue-advanced"
        >
          Continue to Advanced
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
