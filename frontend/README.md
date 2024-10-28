## Setting up

1. Run `pnpm install`
2. Copy the `.env.example` into `.env`. Fill the required environment variables correctly.
3. Run `pnpx openapi-typescript http://0.0.0.0:8005/openapi.json -o ./src/api/backend-schema.d.ts`. Replace `0.0.0.0` with the correct backend url. Rerun this command whenever the backend's api is updated.
4. Run `pnpm run dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
