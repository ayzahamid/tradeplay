git clone <repository-url>
cd backend
npm install


Running Seeder Files

ts-node src/scripts/insertDummyData.ts
ts-node src/scripts/insertDummyProducts.ts

Run the backend server

npx nodemon src/app.ts

Then run the front end on another tab

cd frontend

npm run serve
