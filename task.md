# Final Recommendation Workflow Tasks

- `[ ]` 1. Create DB Migration Script (`backend/migrate_workflow.js`) for trips, trip_members, trip_comments, and notifications tables.
- `[ ]` 2. Mount temporary migration endpoint in `backend/server.js`.
- `[ ]` 3. Update `trips.js` routes to include `status`, `final_destination_data`, and `has_accepted_recommendation`.
- `[ ]` 4. Update `preferences.js` to notify admin when all members submit.
- `[ ]` 5. Add `POST /final-recommendation` to `ai.js` to generate the recommendation, save it, and notify members.
- `[ ]` 6. Create `notifications.js` routes (GET /, PUT /read).
- `[ ]` 7. Create `comments.js` routes (GET /trips/:id/comments, POST /trips/:id/comments).
- `[ ]` 8. Create `frontend/src/components/common/NotificationsBell.js`.
- `[ ]` 9. Create `frontend/src/components/trip/DiscussionBoard.js`.
- `[ ]` 10. Update `Planner.js` UI with Progress Tracker, Action Buttons, and state management.
- `[ ]` 11. Create `FinalDestinationView` component inside Planner to show AI results.
- `[ ]` 12. Polish the UI (Glassmorphism, animations).
