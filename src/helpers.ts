import { PropertyValues } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { BarCardConfig } from './types';

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation and filtering.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export function mergeDeep(...objects: any): any {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  return objects.reduce((prev: any, obj: any) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        /* eslint no-param-reassign: 0 */
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

/**
 * Resolve a min/max config value: a number, a numeric string, or an entity id
 * whose state supplies the value. Returns NaN when it cannot be resolved so
 * callers can guard explicitly (adopted from vogon1/bar-card, hardened).
 */
export function resolveMinMax(hass: HomeAssistant | undefined, value: number | string | undefined): number {
  if (typeof value === 'number') return value;
  if (value === undefined || value === null) return NaN;
  const direct = Number(value);
  if (!isNaN(direct)) return direct;
  if (hass && hass.states[value]) return Number(hass.states[value].state);
  return NaN;
}

/**
 * Merge a per-entity override onto the shared config. Unlike mergeDeep, arrays
 * (e.g. `severity`) from the override REPLACE the base array instead of being
 * concatenated onto it — a per-entity severity list should override the global
 * one, not stack on top of it.
 */
export function mergeEntityConfig(base: any, override: any): any {
  const isPlainObject = (o: any) => o && typeof o === 'object' && !Array.isArray(o);
  const out: any = { ...base };
  for (const key of Object.keys(override)) {
    const bVal = out[key];
    const oVal = override[key];
    out[key] = isPlainObject(bVal) && isPlainObject(oVal) ? mergeEntityConfig(bVal, oVal) : oVal;
  }
  return out;
}

// Check if config or Entity changed
export function hasConfigOrEntitiesChanged(element: any, changedProps: PropertyValues, forceUpdate: boolean): boolean {
  if (changedProps.has('config') || forceUpdate) {
    return true;
  }
  for (const config of element._configArray) {
    if (config.entity) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (oldHass) {
        if (oldHass.states[config.entity] !== element.hass!.states[config.entity]) {
          return true;
        } else {
          continue;
        }
      }
      return true;
    }
  }
  return false;
}

export function createConfigArray(config): BarCardConfig[] {
  const configArray: BarCardConfig[] = [];
  if (config.entities) {
    for (const entityConfig of config.entities) {
      const clonedObject = mergeDeep({}, config);
      delete clonedObject.entities;
      if (typeof entityConfig == 'string') {
        configArray.push(mergeEntityConfig(clonedObject, { entity: entityConfig }));
      } else if (typeof entityConfig == 'object') {
        configArray.push(mergeEntityConfig(clonedObject, entityConfig));
      }
    }
  } else {
    configArray.push(config);
  }
  return configArray;
}
