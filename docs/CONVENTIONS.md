# Critical Conventions (To Prevent Directional Confusion)

- **Coordinate System (RHS)**: X is right, Y is up, Z is forward (+Z).
- **Core**: We define forward = +Z for mathematical convenience.
- **Three.js Adapter**: This adapter is responsible for converting our logical +Z forward to Three.js's -Z forward.
- **Units**: Meters, seconds, radians, kilograms. Gravity g = 9.81 m/s^2.
- **Orientation**: Quaternions only.
- **Positive Yaw** -> Turn right (around +Y).
- **Positive Pitch** -> Nose up (around +X).
- **Positive Roll** -> Right wing down (around +Z).
- **Timing**: Fixed timestep dt = 1/60 (configurable).