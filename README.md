# bar-card (maintained fork)

Maintained fork of [custom-cards/bar-card](https://github.com/custom-cards/bar-card), which is no longer
maintained. All credit for the original card goes to its creator
[Lucas Bramlage](https://github.com/Gluwc) and the [custom-cards](https://github.com/custom-cards)
community — this fork only keeps the card working on current Home Assistant releases.

Onderhouden fork van [custom-cards/bar-card](https://github.com/custom-cards/bar-card), dat niet meer wordt
onderhouden. Alle eer voor de oorspronkelijke card gaat naar de maker
[Lucas Bramlage](https://github.com/Gluwc) en de [custom-cards](https://github.com/custom-cards)-community —
deze fork houdt de card alleen werkend op actuele Home Assistant-releases.

---

## Release notes

### v3.5.0 (2026-07-13)

**English**
- New: `min` and `max` accept an entity id (or numeric string) in addition to a number — the bar range then
  follows that entity's state (upstream #124, #163, #184, #141; adopted from the
  [vogon1/bar-card](https://github.com/vogon1/bar-card) fork, hardened with the NaN guard from v3.3.0).
- Fix: the `left`, `down` and all `-reverse` directions now actually render correctly — upstream documented
  eight directions but only implemented the layout for `right` and `up`.
- Fix: a configured `width` was silently overridden by the bar's `flex-grow: 1` (adopted from vogon1/bar-card).
- Improved: the change indicator (▲/▼) now fades out after 2 seconds instead of lingering until the next
  re-render (adopted from vogon1/bar-card).
- Fix: name/value line height no longer overflows the bar on themes with larger fonts.

**Nederlands**
- Nieuw: `min` en `max` accepteren naast een getal ook een entity-id (of numerieke string) — het balkbereik
  volgt dan de state van die entiteit (upstream #124, #163, #184, #141; overgenomen uit de
  [vogon1/bar-card](https://github.com/vogon1/bar-card)-fork, gehard met de NaN-guard uit v3.3.0).
- Fix: de richtingen `left`, `down` en alle `-reverse`-varianten renderen nu echt correct — upstream
  documenteerde acht richtingen maar implementeerde de layout alleen voor `right` en `up`.
- Fix: een geconfigureerde `width` werd stilletjes overschreven door `flex-grow: 1` van de balk (overgenomen
  uit vogon1/bar-card).
- Verbeterd: de verander-indicator (▲/▼) vervaagt nu na 2 seconden in plaats van te blijven staan tot de
  volgende re-render (overgenomen uit vogon1/bar-card).
- Fix: de regelhoogte van naam/waarde loopt niet meer uit de balk bij thema's met grotere fonts.

### v3.4.0 (2026-07-13)

**English**
- Fix: the visual (GUI) editor was rebuilt on Home Assistant's native `ha-form`. The old editor was built on
  `paper-*` elements that no longer exist in the HA frontend, rendering a broken UI and freezing the browser
  when toggling options (upstream #175, #186, #190). It also no longer modifies your config just by opening it.
- Fix: no more double border around the card when used with `entity_row: true` inside an entities card
  (HA 2022.11+ card border) (upstream #152).
- Fix: the up/down change indicator now compares values numerically — it misfired on negative values and on
  numbers of different lengths (string comparison: '9' > '10') (upstream #181).
- Fix: entity icons assigned via the entity registry (settings UI) are now used; the card no longer falls back
  to the generic domain icon (upstream #104).
- Fix: bars in a horizontal stack now get equal widths regardless of name length (upstream #76).
- Fix: rounded corners now actually work — the bar container clips its layers and honors
  `--bar-card-border-radius` (upstream #203, #156).
- Docs: options table corrected (`stack` documented, all `direction` values listed, wrong CSS variable name
  fixed, unimplemented `entity_config` removed) and installation instructions updated for this fork.

**Nederlands**
- Fix: de visuele (GUI) editor is herbouwd op Home Assistants eigen `ha-form`. De oude editor gebruikte
  `paper-*`-elementen die niet meer bestaan in de HA-frontend, waardoor de UI kapot was en de browser bevroor
  bij het omzetten van opties (upstream #175, #186, #190). De editor wijzigt je config ook niet meer door hem
  alleen maar te openen.
- Fix: geen dubbele rand meer om de card bij `entity_row: true` in een entities-card (HA 2022.11+ card-border)
  (upstream #152).
- Fix: de op/neer-indicator vergelijkt waarden nu numeriek — ging fout bij negatieve waarden en getallen van
  verschillende lengte (stringvergelijking: '9' > '10') (upstream #181).
- Fix: entiteit-iconen die via het register (instellingen-UI) zijn toegewezen worden nu gebruikt; de card valt
  niet meer terug op het generieke domein-icoon (upstream #104).
- Fix: balken in een horizontale stack krijgen nu gelijke breedtes, ongeacht de naamlengte (upstream #76).
- Fix: afgeronde hoeken werken nu echt — de balk-container knipt zijn lagen af en respecteert
  `--bar-card-border-radius` (upstream #203, #156).
- Docs: options-tabel gecorrigeerd (`stack` gedocumenteerd, alle `direction`-waardes vermeld, verkeerde
  CSS-variabelenaam gefixt, niet-geïmplementeerd `entity_config` verwijderd) en installatie-instructies
  bijgewerkt voor deze fork.

### v3.3.1 (2026-07-13)

**English**
- Fix: when no `decimal` option is set, the displayed value now honors the entity's *display precision*
  from the Home Assistant entity registry (matching what HA itself shows) instead of the raw
  full-precision state (upstream #198).

**Nederlands**
- Fix: zonder `decimal`-optie volgt de getoonde waarde nu de *weergaveprecisie* van de entiteit uit het
  Home Assistant-entiteitenregister (zoals HA zelf toont) in plaats van de ruwe state met volledige
  precisie (upstream #198).

### v3.3.0 (2026-07-13)

**English**
- Fix: a non-numeric `min`/`max` (e.g. a template evaluating to `NaN`, or a text sensor) broke the bar fill
  of the entire card (`--bar-percent: NaN%` invalidates the CSS gradient). Percentages are now validated
  and clamped to 0–100%.
- Fix: `tap_action`/`hold_action`/`double_tap_action` now support the HA 2024.8+ `perform-action` syntax
  (upstream #189).
- Fix: icon color fallback for HA 2025.5+ (`--paper-item-icon-color` no longer exists) (upstream #195);
  overridable via `--bar-card-icon-color`.
- New: background bar color overridable via `--bar-card-background-color` (upstream #197).
- Fix: console version string was still reporting 3.1.7 since the 3.2.0 release.

**Nederlands**
- Fix: een niet-numerieke `min`/`max` (bijv. een template dat `NaN` oplevert of een tekst-sensor) brak de
  balkvulling van de hele card (`--bar-percent: NaN%` maakt de CSS-gradient ongeldig). Percentages worden
  nu gevalideerd en geklemd op 0–100%.
- Fix: `tap_action`/`hold_action`/`double_tap_action` ondersteunen nu de HA 2024.8+ `perform-action`-syntax
  (upstream #189).
- Fix: icoonkleur-fallback voor HA 2025.5+ (`--paper-item-icon-color` bestaat niet meer) (upstream #195);
  overschrijfbaar via `--bar-card-icon-color`.
- Nieuw: achtergrondbalk-kleur overschrijfbaar via `--bar-card-background-color` (upstream #197).
- Fix: versiestring in de console klopt weer (stond sinds 3.2.0 nog op 3.1.7).

---

## [Examples](#examples-1)

![Default](https://github.com/custom-cards/bar-card/blob/master/images/default.gif?raw=true)

![Severity](https://github.com/custom-cards/bar-card/blob/master/images/severity.gif?raw=true)

![Entity Row](https://github.com/custom-cards/bar-card/blob/master/images/entity_row.gif?raw=true)

![Direction](https://github.com/custom-cards/bar-card/blob/master/images/direction.gif?raw=true)

![Old Layout](https://github.com/custom-cards/bar-card/blob/master/images/old_layout.gif?raw=true)

![Custom CSS](https://github.com/custom-cards/bar-card/blob/master/images/customcss.gif?raw=true)

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:bar-card`
| entity | string | **Required** | Entity State
| animation | object | none | Defines animation options. See [Animation Options](#animation-options).
| attribute | string | none | Displays a specific attribute instead of state value.
| color | string | var(--bar-card-color, var(--primary-color)) | Color of the bar.
| columns | number | none | Defines the amount of bars to be displayed on a single row when multiple entities are defined.
| complementary | boolean | false | Displays complementary value (max - state_value) instead state value.
| decimal | number | entity display precision | The amount of decimals to be displayed for the value. When unset, the entity's display precision from the HA entity registry is used.
| direction | string | right | Direction of the bar. `right`, `left`, `up`, `down`, `right-reverse`, `left-reverse`, `up-reverse`, `down-reverse`
| entities | array | none | A list of entities. Accepts individual config options per defined entity.
| entity_row | boolean | false | Removes the background card for use inside entities card.
| height | string | 40px | Defines the height of the bar.
| icon | string | entity icon | Defines the icon to be displayed. Defaults to the entity's icon (attribute or registry), otherwise the domain icon.
| limit_value | boolean | false | Limits value displayed to `min` and `max` value.
| max | number or entity | 100 | Defines maximum value of the bar. Accepts a number or an entity id whose state supplies the value.
| min | number or entity | 0 | Defines minimum value of the bar. Accepts a number or an entity id whose state supplies the value.
| name | string | none | Defines custom entity name.
| positions | object | none | Defines the positions of the card elements. See [Positions Options](#positions-options).
| severity | object | none | A list of severity values. See [Severity Options](#severity-options).
| stack | string | vertical | Stacks multiple entities `vertical` or `horizontal`.
| tap_action | object | none | See [home assistant documentation](https://www.home-assistant.io/lovelace/actions/).
| target | number | none | Defines and enables target marker value.
| title | string | none | Adds title header to the card.
| unit_of_measurement | string | attribute | Defines the unit of measurement to be displayed.
| width | string | 100% | Defines the width of the bar.

## Severity Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| from | number | **Required** | Defines from which value the color should be displayed.
| to | number | **Required** | Defines to which value the color should be displayed.
| color | string | **Required** | Defines the color to be displayed.
| icon | string | none | Defines the icon to be displayed.
| hide | boolean | false | Hides the bar if conditions are met.

## Animation Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| state | string | off | Enables or disables animation. `on`, `off`
| speed | number | 5 | Defines the speed of the bar animation in seconds.

## Positions Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| icon | string | outside | `inside`, `outside`, `off`
| indicator | string | outside | `inside`, `outside`, `off`
| name | string | inside | `inside`, `outside`, `off`
| minmax | string | off | `inside`, `outside`, `off`
| value | string | inside | `inside`, `outside`, `off`

## Theme Variables

| Name | Description
| ---- | ----
| bar-card-color | Defines the default bar color.
| bar-card-border-radius | Defines the default border radius of the bar.
| bar-card-disabled-color | Defines the bar color when state is `unavailable`.
| bar-card-background-color | Defines the background bar color (defaults to a dimmed bar color).
| bar-card-icon-color | Defines the icon color.

## CSS Elements

See [example](#200-default-layout-requires-card-mod). (**requires** [card-mod](https://github.com/thomasloven/lovelace-card-mod))

| Name | Description
| ---- | ----
| #states | HA states containing all rows.
| bar-card-card | The root bar of each defined entity containing all elements.
| bar-card-background | Contains bar and any elements `outside` of the bar.
| bar-card-backgroundbar | The background of the bar.
| bar-card-currentbar | The filled part of the bar.
| bar-card-contentbar | Contains all elements `inside` of the bar.
| ha-icon | Icon element.
| bar-card-iconbar | Contains ha-icon.
| bar-card-name | Name element.
| bar-card-min | Min value element.
| bar-card-divider | Min/Max divider element.
| bar-card-max | Max value element.
| bar-card-value | Value element.
| bar-card-animationbar | Animated part of the bar.
| bar-card-targetbar | Target bar element.
| bar-card-markerbar | Target marker element.
| bar-card-indicator | Indicator element.

## Installation

Install via [HACS](https://hacs.xyz/) as a **custom repository** (this fork is not in the HACS default store;
the default store entry points to the unmaintained upstream):

1. HACS → three-dots menu → *Custom repositories*
2. Repository: `mhoogenbosch/bar-card`, type: *Dashboard*
3. Install **Bar Card** — if you had the upstream `custom-cards/bar-card` installed, uninstall that one first
   (both use the same `/hacsfiles/bar-card/` path).

HACS registers the dashboard resource automatically. When adding the resource manually it's **required** to
load this card as `module`:

```yaml
- url: /hacsfiles/bar-card/bar-card.js
  type: module
```

## Examples

### Default

![Default](https://github.com/custom-cards/bar-card/blob/master/images/default.gif?raw=true)

```yaml
entity: sensor.example
title: Default
type: 'custom:bar-card'
```

### Severity

![Severity](https://github.com/custom-cards/bar-card/blob/master/images/severity.gif?raw=true)

```yaml
entity: sensor.example
title: Severity
type: 'custom:bar-card'
severity:
  - color: Red
    from: 0
    to: 25
  - color: Orange
    from: 26
    to: 50
  - color: Green
    from: 51
    to: 100
```

### Entity Row

![Entity Row](https://github.com/custom-cards/bar-card/blob/master/images/entity_row.gif?raw=true)

```yaml
entities:
  - sensor.example
  - entity: sensor.example
    positions:
      minmax: inside
    entity_row: true
    target: 50
    type: 'custom:bar-card'
  - entity: light.group_bedroom
    name: Example
title: Entity Row
type: entities
```

### Direction

![Direction](https://github.com/custom-cards/bar-card/blob/master/images/direction.gif?raw=true)

```yaml
entities:
  - sensor.example
  - sensor.example
  - sensor.example
title: Direction
direction: up
height: 200px
stack: horizontal
type: 'custom:bar-card'
```

### 2.0.0 Default Layout (**requires** [card-mod](https://github.com/thomasloven/lovelace-card-mod))

![Old Layout](https://github.com/custom-cards/bar-card/blob/master/images/old_layout.gif?raw=true)

```yaml
entity: sensor.example
positions:
  icon: 'off'
  indicator: inside
  name: outside
type: 'custom:bar-card'
width: 70%
title: 2.0.0 Default Layout
style: |-
  bar-card-value {
    margin-right: auto;
    font-size: 13px;
    font-weight: bold;
    text-shadow: 1px 1px #0005;
  }
```

### Custom CSS Layout (**requires** [card-mod](https://github.com/thomasloven/lovelace-card-mod))

![Custom CSS](https://github.com/custom-cards/bar-card/blob/master/images/customcss.gif?raw=true)

```yaml
entities:
  - entity: sensor.example
positions:
  icon: 'off'
  indicator: 'off'
  minmax: inside
  name: inside
  value: inside
style: |-
  .contentbar-direction-right {
   flex-direction: column;
  }
  .min-direction-right {
    margin: 0px;
    margin-left: 4px;
    margin-right: auto;
    margin-bottom: -20px;
    bottom: 10px;
  }
    bar-card-value {
    margin: 0px;
  }
  bar-card-name {
    margin: 0px;
  }
  bar-card-max {
    margin: 0px;
    margin-left: auto;
    margin-top: -20px;
    top: 10px;
  }
  bar-card-divider {
    display: none;
  }
title: Custom CSS Layout
type: 'custom:bar-card'
```

## Credits

Several v3.5.0 improvements (min/max as entity, direction and width fixes, indicator fade) were adopted from
the [vogon1/bar-card](https://github.com/vogon1/bar-card) fork.

Inspired by [Big Number Card](https://github.com/ciotlosm/custom-lovelace/tree/master/bignumber-card) by [ciotlosm](https://github.com/ciotlosm).

## Links

[Home Assistant Community Topic](https://community.home-assistant.io/t/lovelace-bar-card/87503)
