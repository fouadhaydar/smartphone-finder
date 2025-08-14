import { z } from "zod";

export const smartphoneSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  platform: z.enum(["ios", "android"]),
  price: z.number(),
  specs: z.object({
    display: z.object({
      size: z.number(),
      type: z.string(),
      refreshRate: z.number(),
      resolution: z.string(),
    }),
    processor: z.string(),
    ram: z.number(),
    storage: z.number(),
    battery: z.number(),
    camera: z.object({
      main: z.number(),
      ultrawide: z.number().optional(),
      telephoto: z.number().optional(),
      dxomark: z.number().optional(),
    }),
    features: z.object({
      fiveG: z.boolean(),
      headphoneJack: z.boolean(),
      wirelessCharging: z.boolean(),
      expandableStorage: z.boolean(),
      waterResistance: z.string(),
      fingerprintScanner: z.boolean(),
    }),
  }),
  releaseYear: z.number(),
  inStock: z.boolean(),
  imageUrl: z.string(),
  matchReasons: z.array(z.string()).optional(),
});

export const userPreferencesSchema = z.object({
  platform: z.enum(["ios", "android", "any"]).optional(),
  brands: z.array(z.string()).default([]),
  budget: z.object({
    min: z.number().default(100),
    max: z.number().default(2000),
  }),
  useCase: z.enum(["gaming", "photography", "battery", "everyday", "productivity", "content"]).optional(),
  priorities: z.array(z.enum(["camera", "battery", "performance", "display", "price", "durability"])).default([
    "camera", "battery", "performance", "display", "price", "durability"
  ]),
  advancedFilters: z.object({
    displayType: z.string().optional(),
    refreshRate: z.string().optional(),
    ramSize: z.string().optional(),
    batteryCapacity: z.string().optional(),
    fiveG: z.boolean().optional(),
    headphoneJack: z.boolean().optional(),
    wirelessCharging: z.boolean().optional(),
    expandableStorage: z.boolean().optional(),
    waterResistance: z.boolean().optional(),
    fingerprintScanner: z.boolean().optional(),
  }).default({}),
});

export type Smartphone = z.infer<typeof smartphoneSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;

export const insertSmartphoneSchema = smartphoneSchema.omit({ id: true });
export type InsertSmartphone = z.infer<typeof insertSmartphoneSchema>;
