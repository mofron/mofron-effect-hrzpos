# mofron-effect-hrzpos
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

horizonal position effect for mofron component

the component is positioned specified parameter that is 'center' or 'left' and 'right'.


# Install
```
npm install mofron mofron-effect-hrzpos
```

# Sample
```html
<require>
    <tag load="mofron-comp-text">Text</tag>
    <tag load="mofron-effect-hrzpos">Hrzpos</tag>
</require>

<Text effect=Hrzpos("center")>Horizon Position Effect</Text>

```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| ◯  | type | string | position type ('center', 'left', 'right') |
| ◯  | offset | string (size) | position offset size |

