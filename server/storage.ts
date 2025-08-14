import { type Smartphone, type UserPreferences } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllSmartphones(): Promise<Smartphone[]>;
  getSmartphonesByFilters(preferences: UserPreferences): Promise<Smartphone[]>;
}

export class MemStorage implements IStorage {
  private smartphones: Map<string, Smartphone>;

  constructor() {
    this.smartphones = new Map();
    this.initializeSmartphones();
  }

  private initializeSmartphones() {
    const phones: Omit<Smartphone, 'id'>[] = [
      {
        name: "iPhone 15 Pro",
        brand: "Apple",
        platform: "ios",
        price: 999,
        specs: {
          display: {
            size: 6.1,
            type: "OLED",
            refreshRate: 120,
            resolution: "2556x1179",
          },
          processor: "A17 Pro",
          ram: 8,
          storage: 128,
          battery: 3274,
          camera: {
            main: 48,
            ultrawide: 12,
            telephoto: 12,
            dxomark: 146,
          },
          features: {
            fiveG: true,
            headphoneJack: false,
            wirelessCharging: true,
            expandableStorage: false,
            waterResistance: "IP68",
            fingerprintScanner: false,
          },
        },
        releaseYear: 2023,
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      },
      {
        name: "Galaxy S24 Ultra",
        brand: "Samsung",
        platform: "android",
        price: 1199,
        specs: {
          display: {
            size: 6.8,
            type: "AMOLED",
            refreshRate: 120,
            resolution: "3120x1440",
          },
          processor: "Snapdragon 8 Gen 3",
          ram: 12,
          storage: 256,
          battery: 5000,
          camera: {
            main: 200,
            ultrawide: 12,
            telephoto: 50,
            dxomark: 144,
          },
          features: {
            fiveG: true,
            headphoneJack: false,
            wirelessCharging: true,
            expandableStorage: false,
            waterResistance: "IP68",
            fingerprintScanner: true,
          },
        },
        releaseYear: 2024,
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      },
      {
        name: "Pixel 8 Pro",
        brand: "Google",
        platform: "android",
        price: 999,
        specs: {
          display: {
            size: 6.7,
            type: "OLED",
            refreshRate: 120,
            resolution: "2992x1344",
          },
          processor: "Tensor G3",
          ram: 12,
          storage: 128,
          battery: 5050,
          camera: {
            main: 50,
            ultrawide: 48,
            telephoto: 48,
            dxomark: 140,
          },
          features: {
            fiveG: true,
            headphoneJack: false,
            wirelessCharging: true,
            expandableStorage: false,
            waterResistance: "IP68",
            fingerprintScanner: true,
          },
        },
        releaseYear: 2023,
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      },
      {
        name: "OnePlus 12",
        brand: "OnePlus",
        platform: "android",
        price: 799,
        specs: {
          display: {
            size: 6.82,
            type: "AMOLED",
            refreshRate: 120,
            resolution: "3168x1440",
          },
          processor: "Snapdragon 8 Gen 3",
          ram: 12,
          storage: 256,
          battery: 5400,
          camera: {
            main: 50,
            ultrawide: 48,
            telephoto: 64,
            dxomark: 135,
          },
          features: {
            fiveG: true,
            headphoneJack: false,
            wirelessCharging: true,
            expandableStorage: false,
            waterResistance: "IP65",
            fingerprintScanner: true,
          },
        },
        releaseYear: 2024,
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      },
      {
        name: "iPhone 14",
        brand: "Apple",
        platform: "ios",
        price: 699,
        specs: {
          display: {
            size: 6.1,
            type: "OLED",
            refreshRate: 60,
            resolution: "2532x1170",
          },
          processor: "A15 Bionic",
          ram: 6,
          storage: 128,
          battery: 3279,
          camera: {
            main: 12,
            ultrawide: 12,
            dxomark: 130,
          },
          features: {
            fiveG: true,
            headphoneJack: false,
            wirelessCharging: true,
            expandableStorage: false,
            waterResistance: "IP68",
            fingerprintScanner: false,
          },
        },
        releaseYear: 2022,
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      },
      {
        name: "Xiaomi 14 Ultra",
        brand: "Xiaomi",
        platform: "android",
        price: 899,
        specs: {
          display: {
            size: 6.73,
            type: "AMOLED",
            refreshRate: 120,
            resolution: "3200x1440",
          },
          processor: "Snapdragon 8 Gen 3",
          ram: 12,
          storage: 512,
          battery: 5300,
          camera: {
            main: 50,
            ultrawide: 50,
            telephoto: 50,
            dxomark: 142,
          },
          features: {
            fiveG: true,
            headphoneJack: false,
            wirelessCharging: true,
            expandableStorage: false,
            waterResistance: "IP68",
            fingerprintScanner: true,
          },
        },
        releaseYear: 2024,
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      },
      {
        name: "Galaxy A54 5G",
        brand: "Samsung",
        platform: "android",
        price: 449,
        specs: {
          display: {
            size: 6.4,
            type: "AMOLED",
            refreshRate: 120,
            resolution: "2340x1080",
          },
          processor: "Exynos 1380",
          ram: 8,
          storage: 128,
          battery: 5000,
          camera: {
            main: 50,
            ultrawide: 12,
            telephoto: 5,
            dxomark: 110,
          },
          features: {
            fiveG: true,
            headphoneJack: false,
            wirelessCharging: false,
            expandableStorage: true,
            waterResistance: "IP67",
            fingerprintScanner: true,
          },
        },
        releaseYear: 2023,
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      },
      {
        name: "Nothing Phone (2)",
        brand: "Nothing",
        platform: "android",
        price: 599,
        specs: {
          display: {
            size: 6.7,
            type: "OLED",
            refreshRate: 120,
            resolution: "2412x1080",
          },
          processor: "Snapdragon 8+ Gen 1",
          ram: 8,
          storage: 256,
          battery: 4700,
          camera: {
            main: 50,
            ultrawide: 50,
            dxomark: 125,
          },
          features: {
            fiveG: true,
            headphoneJack: false,
            wirelessCharging: true,
            expandableStorage: false,
            waterResistance: "IP54",
            fingerprintScanner: true,
          },
        },
        releaseYear: 2023,
        inStock: true,
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      },
    ];

    phones.forEach(phone => {
      const id = randomUUID();
      this.smartphones.set(id, { ...phone, id });
    });
  }

  async getAllSmartphones(): Promise<Smartphone[]> {
    return Array.from(this.smartphones.values());
  }

  async getSmartphonesByFilters(preferences: UserPreferences): Promise<Smartphone[]> {
    const allPhones = Array.from(this.smartphones.values());
    
    return allPhones.filter(phone => {
      // Platform filter
      if (preferences.platform && preferences.platform !== "any" && phone.platform !== preferences.platform) {
        return false;
      }

      // Brand filter
      if (preferences.brands.length > 0 && !preferences.brands.includes(phone.brand.toLowerCase())) {
        return false;
      }

      // Budget filter
      if (phone.price < preferences.budget.min || phone.price > preferences.budget.max) {
        return false;
      }

      // Advanced filters
      const { advancedFilters } = preferences;
      
      if (advancedFilters.displayType && advancedFilters.displayType !== "Any" && 
          phone.specs.display.type !== advancedFilters.displayType) {
        return false;
      }

      if (advancedFilters.refreshRate && advancedFilters.refreshRate !== "Any") {
        const requiredRate = parseInt(advancedFilters.refreshRate);
        if (phone.specs.display.refreshRate < requiredRate) {
          return false;
        }
      }

      if (advancedFilters.ramSize && advancedFilters.ramSize !== "Any") {
        const requiredRam = parseInt(advancedFilters.ramSize);
        if (phone.specs.ram < requiredRam) {
          return false;
        }
      }

      if (advancedFilters.fiveG === true && !phone.specs.features.fiveG) {
        return false;
      }

      if (advancedFilters.headphoneJack === true && !phone.specs.features.headphoneJack) {
        return false;
      }

      if (advancedFilters.wirelessCharging === true && !phone.specs.features.wirelessCharging) {
        return false;
      }

      if (advancedFilters.expandableStorage === true && !phone.specs.features.expandableStorage) {
        return false;
      }

      if (advancedFilters.waterResistance === true && 
          !phone.specs.features.waterResistance.includes("IP6")) {
        return false;
      }

      if (advancedFilters.fingerprintScanner === true && !phone.specs.features.fingerprintScanner) {
        return false;
      }

      return true;
    });
  }
}

export const storage = new MemStorage();
