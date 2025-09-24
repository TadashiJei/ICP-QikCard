# QikHub API – Task Tracker

Updated: 2025-08-22 03:02 (+08:00)

## Completed
- [x] Devices: POST /devices/:id/ping — update lastSeen, batteryLevel, signalStrength, isOnline, healthData
- [x] Devices: create() returns 409 on duplicate deviceId (unique constraint)
- [x] Notifications module (CRUD) wired into AppModule
- [x] Check-Ins module (check-in/out/list) wired into AppModule; updates participant status and emits notifications
- [x] Swagger/OpenAPI docs at /docs
- [x] E2E tests (devices): ping endpoint and duplicate deviceId conflict
- [x] CI: GitHub Actions workflow to install, lint, build, unit and e2e test (`.github/workflows/qikhub-api-ci.yml`)
- [x] Prisma seed script and npm scripts (db:push, db:seed) for local dev

## In Progress
- [ ] None (next items below)

## Next
- [ ] Enhance Swagger docs: add ApiProperty to DTOs and ApiResponse examples for key endpoints
- [ ] Add pagination and filters to notifications and check-ins endpoints (+ e2e tests)
- [ ] Rate-limit device ping endpoint (ThrottlerModule) to protect API
- [ ] Background heartbeat: mark devices offline if lastSeen exceeds threshold (cron)

## Notes
- Prisma models are aligned with features: QikPointDevice, Participant, CheckIn, Notification.
- Dist is not committed; only `src/` and docs are tracked for changes.

## How to update
- Edit this file directly and push.
- Or ask Cascade to update the list after a change and auto-push.
