# Library-Nest Agent Guide

**Always answer in Russian**

## Essential Commands

### Setup

- Install dependencies: `npm install`
- Create `.env` file with:
  ```
  PORT=3050
  MONGO_DB_URL="mongodb://localhost:27017/library"
  SESSION_SECRET=your-super-secret-key-here-change-in-production
  ```

### Development

- Start dev server: `npm run start:dev`
- Lint and fix: `npm run lint`
- Format code: `npm run format`
- Build: `npm run build`

### Testing

- Unit tests: `npm run test`
- E2E tests: `npm run test:e2e`
- Test coverage: `npm run test:cov`
- Test watch: `npm run test:watch`
- Test debug: `npm run test:debug`

### Production

- Start production server: `npm run start:prod`

## Project Structure

- NestJS MongoDB/Mongoose book management API
- REST endpoints: `GET/POST/PUT/DELETE /books` and `/books/:id`
- Source code in `src/` directory
- Tests in `test/` directory
- Configuration via environment variables

## Key Details

- Uses NestJS framework with Mongoose ODM
- Book schema: title, description, authors, favorite, fileCover, fileName, fileBook
- Automatic ObjectId generation for new books
- TypeScript with nodenext module resolution
- ESLint with Prettier formatting (singleQuote: true, trailingComma: all)
- Jest testing framework
- MongoDB connection: mongodb://localhost:27017/library
- API runs on port 3050
