import { FormSection } from "@/components/forms/formGeneric";
import React from "react";

/**
 * Configurazione di struttura per una categoria di progetto.
 * Ogni categoria registra le sue sezioni form e un componente preview opzionale.
 */
export interface ProjectStructureConfig {
  sections: FormSection[];
  previewComponent?: React.ComponentType<{ config: Record<string, any> }>;
}

const registry: Record<number, ProjectStructureConfig> = {};

/**
 * Registra una struttura per una categoria.
 * Chiamato da ogni file di struttura (es. structureChatbot.ts)
 */
export function registerStructure(categoryId: number, config: ProjectStructureConfig) {
  registry[categoryId] = config;
}

/**
 * Recupera la struttura per una categoria.
 * Ritorna null se la categoria non ha una struttura registrata.
 */
export function getStructure(categoryId: number): ProjectStructureConfig | null {
  return registry[categoryId] || null;
}

/**
 * Calcola i valori di default dalla struttura di una categoria.
 * Utile per inizializzare il formData alla creazione di un nuovo progetto.
 */
export function getDefaults(categoryId: number): Record<string, any> {
  const config = registry[categoryId];
  if (!config) return {};

  const defaults: Record<string, any> = {};
  config.sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        defaults[field.attributeName] = field.defaultValue;
      }
    });
  });
  return defaults;
}

/**
 * Verifica se una categoria ha una struttura registrata.
 */
export function hasStructure(categoryId: number): boolean {
  return categoryId in registry;
}
