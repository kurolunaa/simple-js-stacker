# Sprint 1 - Setup and Planning (Roadmap Only)
**Goal**: Setup the repo and define what needs to be implemented to create this game. This includes the basics of what need to make the game function, as well as the polishing bits.

## Deliverables
- **Repo boots** (`index.html`, `assets/`, `scripts/`; run with `npx http-server` or equivalent)
- **MVP chosen** (the basics that need to be implemented for Sprint 2, the polishing bits for Sprint 3)
- **Roadmap** (`/docs/roadmap.md`): Includes MVP list + Full list + Top 3 Risks found during development
- **Project Board** created with **~8-12 Sprint 2 issues** (titles + brief AC + S/M + assignee) and columns: *Backlog, Sprint 2, Sprint 3, Done*. Link the board in the readme.md.

# MVP (Sprint 2)
**Goal 1**: Set up the repo, required programs, and dependencies needed to make the project possible.
**Goal 2**: Set up the basics of the game (board, pieces).
**Goal 3**: Get the pieces to spawn one at a time
**Goal 4**: Get the pieces to fall, and when they hit the ground "set" them in place.
**Goal 5**: Get the piece to be able to rotate.
**Goal 6**: When a row is completely filled out, clear the row and shift everything down.
**Goal 7**: When a piece touches the very top of the board, a game over should occur and restart the game.
**Goal 8**: Record score into a data structure of some kind, ordered from highest to lowest score.

# Full Version (Sprint 3)
- Add "Hold Piece" feature
- Allow piece to "kick" off the side of the wall so it can still rotate
- Use the "bag" randomizer system instead of completely random pieces
- Update the rotate feature so it rotates the piece based on it's center
- Add score
- Add "level up" feature that makes pieces fall faster and line clears give more points (start at level 1, max of level 20)
- Leaderboard system that uploads to cloud JSONbin, and occasionally pulls from JSONbin into local storage. 
- Change piece sprites/colors

# Risks & Mitigations
- Clearing 4 lines at a time would sometimes only remove 2 lines, fixed by moving the "checker" an extra row down to mitigate the extra added empty row at the top of the board.
