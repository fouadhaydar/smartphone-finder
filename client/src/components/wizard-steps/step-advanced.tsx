import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Search, SkipForward } from "lucide-react";
import { useWizard } from "@/hooks/use-wizard";
import type { UserPreferences } from "@shared/schema";

interface StepAdvancedProps {
  state: UserPreferences;
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (count: string) => void;
}

export default function StepAdvanced({ state, onNext, onPrevious, onUpdate }: StepAdvancedProps) {
  const { updateState } = useWizard();
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const count = Math.floor(Math.random() * 15) + 8;
    onUpdate(`Currently ${count} models match`);
  }, [state.advancedFilters, onUpdate]);

  const handleAdvancedToggle = (checked: boolean) => {
    setShowAdvanced(checked);
  };

  const handleFilterChange = (key: string, value: any) => {
    updateState({
      ...state,
      advancedFilters: {
        ...state.advancedFilters,
        [key]: value,
      },
    });
  };

  const handleSkip = () => {
    onNext();
  };

  return (
    <div className="space-y-8" data-testid="step-advanced">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Filters</h2>
        <p className="text-lg text-gray-600">Fine-tune your preferences (Optional)</p>
      </div>

      {/* Tech Enthusiast Toggle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">I'm a tech enthusiast</h3>
              <p className="text-sm text-gray-600">Show detailed technical specifications</p>
            </div>
            <Switch
              checked={showAdvanced}
              onCheckedChange={handleAdvancedToggle}
              data-testid="tech-toggle"
            />
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-6" data-testid="advanced-filters">
          {/* Display Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Specifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="display-type" className="text-sm font-medium text-gray-700 mb-2 block">
                    Display Type
                  </Label>
                  <Select
                    value={state.advancedFilters.displayType || "Any"}
                    onValueChange={(value) => handleFilterChange("displayType", value)}
                    data-testid="select-display-type"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="AMOLED">AMOLED</SelectItem>
                      <SelectItem value="OLED">OLED</SelectItem>
                      <SelectItem value="LCD">LCD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="refresh-rate" className="text-sm font-medium text-gray-700 mb-2 block">
                    Refresh Rate
                  </Label>
                  <Select
                    value={state.advancedFilters.refreshRate || "Any"}
                    onValueChange={(value) => handleFilterChange("refreshRate", value)}
                    data-testid="select-refresh-rate"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="60">60Hz</SelectItem>
                      <SelectItem value="90">90Hz</SelectItem>
                      <SelectItem value="120">120Hz</SelectItem>
                      <SelectItem value="144">144Hz+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Specifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ram-size" className="text-sm font-medium text-gray-700 mb-2 block">
                    RAM Size
                  </Label>
                  <Select
                    value={state.advancedFilters.ramSize || "Any"}
                    onValueChange={(value) => handleFilterChange("ramSize", value)}
                    data-testid="select-ram-size"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="4">4GB</SelectItem>
                      <SelectItem value="6">6GB</SelectItem>
                      <SelectItem value="8">8GB</SelectItem>
                      <SelectItem value="12">12GB+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="battery-capacity" className="text-sm font-medium text-gray-700 mb-2 block">
                    Battery Capacity
                  </Label>
                  <Select
                    value={state.advancedFilters.batteryCapacity || "Any"}
                    onValueChange={(value) => handleFilterChange("batteryCapacity", value)}
                    data-testid="select-battery-capacity"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="3000-4000">3000-4000 mAh</SelectItem>
                      <SelectItem value="4000-5000">4000-5000 mAh</SelectItem>
                      <SelectItem value="5000+">5000+ mAh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features & Connectivity */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features & Connectivity</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fiveG"
                      checked={state.advancedFilters.fiveG || false}
                      onCheckedChange={(checked) => handleFilterChange("fiveG", checked)}
                      data-testid="checkbox-5g"
                    />
                    <Label htmlFor="fiveG" className="text-sm text-gray-700">5G Support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="headphoneJack"
                      checked={state.advancedFilters.headphoneJack || false}
                      onCheckedChange={(checked) => handleFilterChange("headphoneJack", checked)}
                      data-testid="checkbox-headphone-jack"
                    />
                    <Label htmlFor="headphoneJack" className="text-sm text-gray-700">Headphone Jack</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wirelessCharging"
                      checked={state.advancedFilters.wirelessCharging || false}
                      onCheckedChange={(checked) => handleFilterChange("wirelessCharging", checked)}
                      data-testid="checkbox-wireless-charging"
                    />
                    <Label htmlFor="wirelessCharging" className="text-sm text-gray-700">Wireless Charging</Label>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="expandableStorage"
                      checked={state.advancedFilters.expandableStorage || false}
                      onCheckedChange={(checked) => handleFilterChange("expandableStorage", checked)}
                      data-testid="checkbox-expandable-storage"
                    />
                    <Label htmlFor="expandableStorage" className="text-sm text-gray-700">Expandable Storage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="waterResistance"
                      checked={state.advancedFilters.waterResistance || false}
                      onCheckedChange={(checked) => handleFilterChange("waterResistance", checked)}
                      data-testid="checkbox-water-resistance"
                    />
                    <Label htmlFor="waterResistance" className="text-sm text-gray-700">Water Resistance (IP67+)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fingerprintScanner"
                      checked={state.advancedFilters.fingerprintScanner || false}
                      onCheckedChange={(checked) => handleFilterChange("fingerprintScanner", checked)}
                      data-testid="checkbox-fingerprint-scanner"
                    />
                    <Label htmlFor="fingerprintScanner" className="text-sm text-gray-700">Fingerprint Scanner</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="text-center mb-6">
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="text-brand-blue hover:text-brand-purple"
          data-testid="button-skip-advanced"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Skip advanced filters
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
          className="px-8 py-3 bg-brand-success text-white hover:bg-green-600"
          data-testid="button-find-phone"
        >
          Find My Phone
          <Search className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
