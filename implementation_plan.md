# Implementation Plan - Visual Polish and AI Map Integration

Enhance the YatraVerse collaborative travel recommendation system to look, feel, and function like a high-end, responsive web application.

This includes:
1. **Fixing Theme Bugs**: Correcting stylesheet class variables so the layout handles light/dark transitions smoothly without visual anomalies.
2. **Theme Switcher**: Adding a toggle widget in the dashboard layout to let users toggle between Light and Dark modes.
3. **AI Travel Assistant Map Integration**: Converting the AI Assistant page into a responsive split-pane layout with chat on the left and an interactive Google Map widget on the right. When the AI recommends destinations (bold text, e.g., `**Pokhara**`), clicking the text automatically pans the map and offers an "Add to Trip" option.

---

## User Review Required

> [!IMPORTANT]
> The application uses a custom-embedded Google Map iframe component (`MapComponent.js`) which does not require an active billing setup or Google Maps API token to load local maps. This keeps the deployment extremely lightweight.
>
> We will introduce a theme selector button (Sun/Moon icons) at the top right of the dashboard header.

---

## Proposed Changes

### 1. Global Layout & Theme Polish

#### [MODIFY] [index.css](file:///c:/Users/hp/Desktop/ai-trip-recommendation/frontend/src/index.css)
- Ensure basic styling classes are properly set up for body background color transition.

#### [MODIFY] [DashboardLayout.js](file:///c:/Users/hp/Desktop/ai-trip-recommendation/frontend/src/layouts/DashboardLayout.js)
- Use theme CSS variables (`var(--bg)`, `var(--bg-card)`, `var(--border)`, `var(--text)`) instead of hardcoded background colors (e.g. `#F8FAF9`, `rgba(255, 255, 255, 0.8)`).
- Implement a Dark/Light mode theme state.
- Add a Sun/Moon toggle button in the dashboard top navigation header.

#### [MODIFY] [Sidebar.js](file:///c:/Users/hp/Desktop/ai-trip-recommendation/frontend/src/layouts/components/Sidebar.js)
- Replace hardcoded background colors (`#ffffff`) and borders (`rgba(0,0,0,0.06)`) with CSS variables (`var(--bg-card)`, `var(--border)`).
- Replace hardcoded NavLink colors with `var(--text)` and `var(--text-dim)`.
- Use `var(--bg-subtle)` for the active navigation menu item background.

---

### 2. Login, Signup, and Joining Feature Polish

#### [MODIFY] [Verify.js](file:///c:/Users/hp/Desktop/ai-trip-recommendation/frontend/src/features/auth/Verify.js)
- Fix the bug on line 48: change `bg-[var(--card)]` to `bg-[var(--bg-card)]` to restore the card's background.

#### [MODIFY] [CreateTrip.js](file:///c:/Users/hp/Desktop/ai-trip-recommendation/frontend/src/features/trip/CreateTrip.js)
- Replace hardcoded Tailwind classes (`bg-white`, `border-gray-200`, `text-gray-900`) with theme-safe classes (`bg-[var(--bg-card)]`, `border-[var(--border)]`, `text-[var(--text)]`).

#### [MODIFY] [JoinTrip.js](file:///c:/Users/hp/Desktop/ai-trip-recommendation/frontend/src/features/trip/JoinTrip.js)
- Replace hardcoded background colors and gray text colors with appropriate CSS variables to make the invite portal responsive in dark mode.

#### [MODIFY] [DestinationPage.js](file:///c:/Users/hp/Desktop/ai-trip-recommendation/frontend/src/features/explore/DestinationPage.js)
- Update inline styles to use `var(--bg-card)`, `var(--bg-subtle)`, `var(--border)`, `var(--text)`, and `var(--text-dim)`.

---

### 3. AI Assistant Split-Screen & Click-to-Map Integration

#### [MODIFY] [Assistant.js](file:///c:/Users/hp/Desktop/ai-trip-recommendation/frontend/src/features/assistant/Assistant.js)
- Adjust layout: transform the general chat into a split screen (60% Chat, 40% Map) on desktop screens (`md:` sizes and up).
- Replace the raw HTML/dangerouslySetInnerHTML `renderText` parsing function with a safe React node parser:
  - Find all occurrences of bolded text (`**Pokhara**`, `**Lumbini**`, `**Everest Base Camp**`).
  - Render them as interactive badges/links that update a new `mapQuery` state on click.
- Import and render `<MapComponent selectedDestination={mapQuery} />` in the right panel.
- If a specific trip is active (`selectedId`), display an "Add to Trip" button in the map card to let users directly add the selected destination to their active trip.

---

## Verification Plan

### Automated Verification
- Run a static check/lint of all updated files to ensure no syntax errors.

### Manual Verification
1. **Theme Switcher**: Open the dashboard, click the theme selector (Sun/Moon). Verify the sidebar, dashboard background, buttons, and inputs transition smoothly between light and dark styling without color conflicts.
2. **Verification Page**: Open `/verify` and confirm the confirmation card has a clear card background instead of transparent.
3. **AI Assistant Map Link**:
   - Select a trip and click **Send to AI Planner**.
   - Generate a trip plan.
   - Click any bolded city/location in the chat bubbles (e.g. **Pokhara**).
   - Verify the Google Map on the right immediately updates to show that location.
   - Verify the "Add to Trip" button works to save that destination to the trip.
