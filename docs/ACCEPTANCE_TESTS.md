# High-Level Acceptance Tests

- **WLK-001**: Character starts at (0,0,0), receives "move forward" input for 2 seconds, moves approximately 10m along +Z, and does not pass through a wall placed at (0,0,10).
- **FLY-010**: Plane takes off and maintains an altitude of 1000m ± 10m.
- **FLY-020**: Plane is flying level, throttle is reduced. Altitude begins to decrease once speed drops below stallSpeed.
- **CAM-005**: During a 30° roll, the plane's key points remain inside the logical camera frustum.