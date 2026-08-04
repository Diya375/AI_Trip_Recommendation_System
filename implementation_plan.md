# Final Recommendation & Collaboration Workflow

This plan outlines the architecture and changes required to implement the end-to-end "Final Recommendation & Collaboration" workflow. This will introduce new group collaboration features, real-time-like notifications, AI-driven consensus building, and a premium UI to track the group's progress.

## User Review Required

> [!IMPORTANT]
> Since the terminal command tool is currently encountering permission errors, I will implement a self-executing database migration script or a temporary `/api/migrate-workflow` endpoint to apply the database schema changes. Please let me know if you have a preference.

## Proposed Changes

---

### Database Schema Migration
We will create a script `backend/migrate_workflow.js` to add the necessary columns and tables.

#### [NEW] backend/migrate_workflow.js
- **Alter `trips` Table**:
  - Add `status` column (VARCHAR, default `'planning'`). Valid states: `planning`, `ai_processing`, `recommendation_ready`, `destination_confirmed`.
  - Add `final_destination_data` column (JSONB) to store the rich AI recommendation output.
- **Alter `trip_members` Table**:
  - Add `has_accepted_recommendation` column (BOOLEAN DEFAULT false).
- **Create `trip_comments` Table**:
  - For group discussions on the trip. (`id`, `trip_id`, `user_id`, `content`, `created_at`).
- **Create `notifications` Table**:
  - To alert users of new events. (`id`, `user_id`, `trip_id`, `message`, `type`, `is_read`, `created_at`).

---

### Backend API Updates

#### [MODIFY] backend/server.js
- Mount new routes: `/api/notifications` and `/api/comments`.

#### [MODIFY] backend/routes/trips.js
- Fetch `status` and `final_destination_data` when retrieving a trip.
- Fetch `has_accepted_recommendation` in the members list.
- **New Endpoint**: `POST /:id/accept-recommendation` to mark a member as having accepted. If > 50% accept, automatically update trip `status` to `destination_confirmed`.

#### [MODIFY] backend/routes/preferences.js
- **Check Completion**: When saving a preference, compare total preferences with total members. If they match, create a notification for the trip admin: "All members have submitted their preferences!"

#### [MODIFY] backend/routes/ai.js
- **New Endpoint**: `POST /final-recommendation`
  - Gathers all preferences.
  - Sends a specialized prompt to Groq (Llama-3.3-70b-versatile) to generate a structured JSON containing: recommended destination, match scores for each member, why chosen, weather, budget estimate, itinerary, and alternative options.
  - Saves result to `trips.final_destination_data`.
  - Updates `status` to `recommendation_ready`.
  - Creates "Group Recommendation Ready" notifications for all members.

#### [NEW] backend/routes/notifications.js
- **New Endpoint**: `GET /` to fetch user's notifications.
- **New Endpoint**: `PUT /:id/read` to mark as read.

#### [NEW] backend/routes/comments.js
- **New Endpoints**: `GET /trips/:id/comments` and `POST /trips/:id/comments` for the discussion board.

---

### Frontend Features & UI Updates

#### [MODIFY] frontend/src/features/trip/Planner.js
- **Progress Tracker**: Add an animated progress bar at the top (Preferences Submitted → AI Processing → Recommendation Ready → Members Reviewing → Destination Confirmed).
- **Final Recommendation UI**: If `status === 'recommendation_ready'` or `destination_confirmed`, reveal a beautiful "Final Destination" section.
  - Display AI selected destination, explanation, match scores, budget, weather, and itinerary using premium glassmorphism and gradient styles.
- **Action Buttons**: Add Share (generates shareable view or copies link), Accept Recommendation, Start Discussion.
- **Admin Tools**: An admin button to trigger "Generate Final Recommendation" once all members submit.

#### [NEW] frontend/src/components/common/NotificationsBell.js
- A notification bell in the Navbar/DashboardLayout that fetches from `/api/notifications`.
- Triggers a beautiful "Group Recommendation Ready" modal if an unread notification of that type is detected.

#### [NEW] frontend/src/components/trip/DiscussionBoard.js
- A comment section where members can debate and chat about the AI's recommendation before voting to accept.

#### [MODIFY] frontend/src/layouts/DashboardLayout.js
- Integrate the `NotificationsBell` and handle showing global modals (like the Recommendation Ready celebration).

## Verification Plan

### Automated Tests
- N/A

### Manual Verification
1. Ensure the DB migration endpoint correctly creates tables and columns.
2. Complete preferences for multiple test users.
3. Verify admin receives the "All preferences submitted" notification.
4. Admin generates recommendation; verify AI response is structured, saved to DB, and trip status updates.
5. Verify members receive the festive "Group Recommendation Ready" modal.
6. Verify users can discuss in the comments section and vote to accept.
7. Verify trip status updates to "Destination Confirmed" upon majority vote.
