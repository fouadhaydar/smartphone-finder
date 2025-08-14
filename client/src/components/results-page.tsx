import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, RotateCcw, Plus, Heart, Cpu, HardDrive, Battery, Monitor } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { UserPreferences, Smartphone } from "@shared/schema";

interface ResultsPageProps {
  preferences: UserPreferences;
  onRestart: () => void;
}

export default function ResultsPage({ preferences, onRestart }: ResultsPageProps) {
  const [sortBy, setSortBy] = useState("bestMatch");
  const [compareList, setCompareList] = useState<string[]>([]);

  const { data: smartphones, isLoading, error } = useQuery({
    queryKey: ["/api/smartphones/search", preferences],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/smartphones/search", preferences);
      return response.json();
    },
  });

  const handleCompareToggle = (phoneId: string) => {
    setCompareList(prev => {
      if (prev.includes(phoneId)) {
        return prev.filter(id => id !== phoneId);
      } else if (prev.length < 3) {
        return [...prev, phoneId];
      }
      return prev;
    });
  };

  const getMatchReasons = (phone: Smartphone): string[] => {
    const reasons: string[] = [];
    
    if (preferences.useCase === "photography" && phone.specs.camera.dxomark && phone.specs.camera.dxomark > 140) {
      reasons.push(`Excellent Camera (DXOMark ${phone.specs.camera.dxomark})`);
    }
    
    if (preferences.useCase === "battery" && phone.specs.battery > 4500) {
      reasons.push("Long Battery Life (2+ days usage)");
    }
    
    if (preferences.useCase === "gaming" && phone.specs.display.refreshRate >= 120) {
      reasons.push("Smooth Gaming (120Hz+ display)");
    }
    
    if (phone.platform === "ios") {
      reasons.push("iOS Ecosystem");
    }
    
    if (phone.specs.features.waterResistance === "IP68") {
      reasons.push("Premium Build Quality");
    }
    
    return reasons.length > 0 ? reasons : ["Matches your preferences"];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Finding your perfect phones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load results. Please try again.</p>
        <Button onClick={onRestart} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>
    );
  }

  const results = smartphones || [];

  return (
    <div className="space-y-8" data-testid="results-page">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Perfect Matches</h2>
            <p className="text-lg text-gray-600" data-testid="results-count">
              We found {results.length} phones that match your preferences
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" data-testid="button-adjust-filters">
              <Filter className="w-4 h-4 mr-2" />
              Adjust Filters
            </Button>
            <Button variant="outline" data-testid="button-compare">
              <Plus className="w-4 h-4 mr-2" />
              Compare ({compareList.length})
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Sort by</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bestMatch">Best Match</SelectItem>
                      <SelectItem value="priceLow">Price: Low to High</SelectItem>
                      <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Availability</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="inStock" defaultChecked />
                      <Label htmlFor="inStock" className="text-sm text-gray-700">In Stock</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="preOrder" />
                      <Label htmlFor="preOrder" className="text-sm text-gray-700">Pre-order</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Release Year</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="year2024" defaultChecked />
                      <Label htmlFor="year2024" className="text-sm text-gray-700">2024</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="year2023" defaultChecked />
                      <Label htmlFor="year2023" className="text-sm text-gray-700">2023</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="year2022" />
                      <Label htmlFor="year2022" className="text-sm text-gray-700">2022</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {results.map((phone: Smartphone) => {
              const matchReasons = getMatchReasons(phone);
              const isInCompareList = compareList.includes(phone.id);

              return (
                <Card key={phone.id} className="hover:shadow-lg transition-shadow" data-testid={`phone-card-${phone.id}`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Phone Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={phone.imageUrl}
                          alt={phone.name}
                          className="w-32 h-32 object-cover rounded-lg"
                          data-testid={`img-${phone.name.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                      </div>

                      {/* Phone Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900" data-testid={`text-${phone.name.toLowerCase().replace(/\s+/g, '-')}-name`}>
                              {phone.name}
                            </h3>
                            <p className="text-gray-600">{phone.brand} • {phone.specs.storage}GB</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900" data-testid={`text-price-${phone.id}`}>
                              ${phone.price}
                            </div>
                            <div className="text-sm text-green-600 font-medium">
                              {phone.inStock ? "✓ In Stock" : "Pre-order"}
                            </div>
                          </div>
                        </div>

                        {/* Match Reasons */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Why it matches:</h4>
                          <div className="flex flex-wrap gap-2">
                            {matchReasons.map((reason, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Key Specs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 text-sm">
                          <div className="text-gray-600 flex items-center">
                            <Cpu className="w-3 h-3 mr-1" />
                            {phone.specs.processor.split(' ').slice(0, 2).join(' ')}
                          </div>
                          <div className="text-gray-600 flex items-center">
                            <HardDrive className="w-3 h-3 mr-1" />
                            {phone.specs.ram}GB RAM
                          </div>
                          <div className="text-gray-600 flex items-center">
                            <Battery className="w-3 h-3 mr-1" />
                            {phone.specs.battery} mAh
                          </div>
                          <div className="text-gray-600 flex items-center">
                            <Monitor className="w-3 h-3 mr-1" />
                            {phone.specs.display.size}" {phone.specs.display.type}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Button className="flex-1" data-testid={`button-view-details-${phone.id}`}>
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleCompareToggle(phone.id)}
                            className={isInCompareList ? "bg-blue-50 border-blue-300" : ""}
                            data-testid={`button-compare-${phone.id}`}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Compare
                          </Button>
                          <Button variant="outline" data-testid={`button-favorite-${phone.id}`}>
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No phones match your current criteria.</p>
                <Button onClick={onRestart} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Adjust Your Preferences
                </Button>
              </div>
            )}

            {/* Load More */}
            {results.length > 0 && (
              <div className="text-center py-8">
                <Button variant="outline" data-testid="button-load-more">
                  <Plus className="w-4 h-4 mr-2" />
                  Load More Results
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Restart Button */}
      <div className="text-center mt-12">
        <Button variant="outline" onClick={onRestart} data-testid="button-restart-finder">
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
