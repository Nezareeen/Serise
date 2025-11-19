const app = require('./app');
const config = require('./config/env');
const connectDB = require('./config/db');

(async () =>{
  try{
    await connectDB(config.mongoUri);
    app.listen(config.port, () => console.log(`Server running on ${config.port}`));
  }catch(e){
    console.error('Failed to start', e);
    process.exit(1);
  }
})();
