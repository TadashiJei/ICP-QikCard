# QikHub API – Task Tracker

Updated: 2025-08-22 02:32 (+08:00)

## Completed
- [x] Devices: POST /devices/:id/ping — update lastSeen, batteryLevel, signalStrength, isOnline, healthData
- [x] Devices: create() returns 409 on duplicate deviceId (unique constraint)
- [x] Notifications module (CRUD) wired into AppModule
- [x] Check-Ins module (check-in/out/list) wired into AppModule; updates participant status and emits notifications
- [x] Swagger/OpenAPI docs at /docs
- [x] E2E tests (devices): ping endpoint and duplicate deviceId conflict

## In Progress
- [ ] None (next items below)

## Next
- [ ] Add e2e tests for check-ins flows
- [ ] Add e2e tests for notifications flows
- [ ] Device health: optional periodic telemetry aggregation (simple counters)

## Notes
- Prisma models are aligned with features: QikPointDevice, Participant, CheckIn, Notification.
- Dist is not committed; only `src/` and docs are tracked for changes.

## How to update
- Edit this file directly and push.
- Or ask Cascade to update the list after a change and auto-push.
