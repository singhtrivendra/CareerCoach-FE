
#!/bin/bash

# Create TurboRepo structure
mkdir -p career-coach
cd career-coach

# Initialize the monorepo with Turborepo
npm install -g turbo
npx create-turbo@latest . --use-npm

# Remove the default apps
rm -rf apps/web
rm -rf apps/docs

# Create frontend directory
mkdir -p apps/frontend
cp -r ../src apps/frontend/
cp -r ../public apps/frontend/
cp ../index.html apps/frontend/
cp ../package.json apps/frontend/
cp ../vite.config.ts apps/frontend/
cp ../tailwind.config.ts apps/frontend/
cp ../postcss.config.js apps/frontend/
cp ../tsconfig.json apps/frontend/

# Create backend directory and copy backend files
mkdir -p apps/backend/src
cd apps/backend

# Initialize backend package.json
cat > package.json << EOL
{
  "name": "backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.3"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/jsonwebtoken": "^9.0.1",
    "@types/node": "^18.15.11",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.4"
  }
}
EOL

# Create tsconfig.json
cat > tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "lib": ["es2017", "esnext.asynciterable"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
EOL

# Create .env file
cat > .env << EOL
PORT=3000
MONGO_URL=mongodb+srv://trivendra_07:fSK7sDCfhMbnXKa1@cluster0.1zrsr.mongodb.net/career_app
JWT_SECRET=your_jwt_secret_key_here
EOL

# Copy backend files
cd src
cp ../../../../backend/db.ts .
cp ../../../../backend/index.ts .
cp ../../../../backend/middleware.ts .
cp ../../../../backend/type.d.ts .

# Return to the root directory
cd ../../../..

echo "TurboRepo setup complete!"
echo "To use it:"
echo "1. cd career-coach"
echo "2. npm install"
echo "3. npm run dev"
