# Data Formats (JSON)

Note: All external data loaded into the simulation (aircraft, airports, keybindings) must be validated against a formal schema using a library like Zod.

## Aircraft

```json
{
  "id": "basic_plane", "mass": 1200, "wingArea": 16.2, "stallSpeed": 28, "maxThrust": 3500
}
```

## Airport

```json
{
  "runways": [{ "start":, "end": }],
  "hangars": [{ "pos":, "size": }]
}
```