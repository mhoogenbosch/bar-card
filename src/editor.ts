import { LitElement, html, customElement, property, TemplateResult, css, CSSResult } from 'lit-element';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';

import { BarCardConfig } from './types';

// Editor rebuilt on HA's native <ha-form> (2026): the previous editor was built
// on paper-elements that no longer exist in the HA frontend, which rendered a
// broken UI and froze the browser (upstream #175/#186/#190). It also fired
// config-changed from setConfig, causing an update loop.

const positionSelect = {
  select: { mode: 'dropdown', options: ['inside', 'outside', 'off'] },
};

const SCHEMA_ENTITY = { name: 'entity', selector: { entity: {} } };

const SCHEMA_MAIN = [
  {
    type: 'grid',
    name: '',
    schema: [
      { name: 'name', selector: { text: {} } },
      { name: 'icon', selector: { icon: {} } },
      { name: 'unit_of_measurement', selector: { text: {} } },
      {
        name: 'direction',
        selector: {
          select: {
            mode: 'dropdown',
            options: ['right', 'left', 'up', 'down', 'right-reverse', 'left-reverse', 'up-reverse', 'down-reverse'],
          },
        },
      },
    ],
  },
  {
    type: 'grid',
    name: '',
    schema: [
      { name: 'min', selector: { number: { mode: 'box', step: 'any' } } },
      { name: 'max', selector: { number: { mode: 'box', step: 'any' } } },
      { name: 'target', selector: { number: { mode: 'box', step: 'any' } } },
      { name: 'decimal', selector: { number: { mode: 'box', min: 0, max: 10 } } },
    ],
  },
  {
    type: 'grid',
    name: '',
    schema: [
      { name: 'height', selector: { text: {} } },
      { name: 'width', selector: { text: {} } },
      { name: 'columns', selector: { number: { mode: 'box', min: 1 } } },
      {
        name: 'stack',
        selector: { select: { mode: 'dropdown', options: ['vertical', 'horizontal'] } },
      },
    ],
  },
  {
    type: 'grid',
    name: '',
    schema: [
      { name: 'entity_row', selector: { boolean: {} } },
      { name: 'limit_value', selector: { boolean: {} } },
      { name: 'complementary', selector: { boolean: {} } },
    ],
  },
  {
    type: 'expandable',
    name: 'positions',
    title: 'Positions',
    schema: [
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'icon', selector: positionSelect },
          { name: 'indicator', selector: positionSelect },
          { name: 'name', selector: positionSelect },
          { name: 'minmax', selector: positionSelect },
          { name: 'value', selector: positionSelect },
        ],
      },
    ],
  },
  {
    type: 'expandable',
    name: 'animation',
    title: 'Animation',
    schema: [
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'state', selector: { select: { mode: 'dropdown', options: ['on', 'off'] } } },
          { name: 'speed', selector: { number: { mode: 'box', min: 0, step: 'any' } } },
        ],
      },
    ],
  },
];

const LABELS = {
  entity: 'Entity (required)',
  name: 'Name',
  icon: 'Icon',
  unit_of_measurement: 'Unit of measurement',
  direction: 'Direction',
  min: 'Min',
  max: 'Max',
  target: 'Target',
  decimal: 'Decimals',
  height: 'Height (e.g. 40px)',
  width: 'Width (e.g. 100%)',
  columns: 'Columns',
  stack: 'Stack',
  entity_row: 'Entity row',
  limit_value: 'Limit value to min/max',
  complementary: 'Show complementary value',
  positions: 'Positions',
  animation: 'Animation',
  state: 'State',
  speed: 'Speed',
  indicator: 'Indicator',
  minmax: 'Min/max',
  value: 'Value',
};

@customElement('bar-card-editor')
export class BarCardEditor extends LitElement implements LovelaceCardEditor {
  @property() public hass?: HomeAssistant;
  @property() private _config?: BarCardConfig;

  public setConfig(config: BarCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._config) {
      return html``;
    }

    const multiEntity = Array.isArray(this._config.entities);
    const schema = multiEntity ? SCHEMA_MAIN : [SCHEMA_ENTITY, ...SCHEMA_MAIN];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <p class="note">
        ${multiEntity
          ? html`This card uses an <code>entities</code> list; edit the entities and their per-entity options in the
              YAML editor.`
          : ''}
        Options such as <code>severity</code>, <code>tap_action</code> and per-entity overrides are configured in the
        YAML editor.
      </p>
    `;
  }

  private _computeLabel(schema: { name: string }): string {
    return LABELS[schema.name] || schema.name;
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const value = { ...ev.detail.value };

    // Drop empty values so the stored YAML stays clean.
    for (const key of Object.keys(value)) {
      if (value[key] === '' || value[key] === null || value[key] === undefined) {
        delete value[key];
      } else if (typeof value[key] === 'object' && !Array.isArray(value[key])) {
        const nested = { ...value[key] };
        for (const nestedKey of Object.keys(nested)) {
          if (nested[nestedKey] === '' || nested[nestedKey] === null || nested[nestedKey] === undefined) {
            delete nested[nestedKey];
          }
        }
        if (Object.keys(nested).length === 0) {
          delete value[key];
        } else {
          value[key] = nested;
        }
      }
    }

    fireEvent(this, 'config-changed', { config: value });
  }

  static get styles(): CSSResult {
    return css`
      .note {
        color: var(--secondary-text-color);
        font-size: 12px;
        margin: 12px 4px 0px;
      }
    `;
  }
}
