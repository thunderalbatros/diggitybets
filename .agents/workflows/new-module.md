# Workflow: /new-module

1. Define module state machine and write Mermaid diagram in module specification.
2. Implement pure domain logic (parsers, state machine, calculations) with zero I/O dependencies.
3. Write comprehensive unit tests in Vitest covering edge cases, invalid inputs, and boundaries.
4. Wire input/output via WebSocket hub / Streamer.bot / Durable Object event handlers.
5. Create lightweight, transparent OBS overlay (1920x1080 / 1920x540) matching design system.
6. Build corresponding streamer control deck in admin panel with undo/redo capabilities.
