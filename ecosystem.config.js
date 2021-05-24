module.exports = {
  apps : [{
    script: 'index.js',
    log_file: 'combined.log',
    watch: './**/*.js',
    time: true,
    env: {
      NODE_ENV: 'development',
      BOT_TOKEN: '-',
      MONGO_DB_URI: '-'
    },
    env_teste: {
      NODE_ENV: 'teste',
      BOT_TOKEN: '-',
      MONGO_DB_URI: '-'
    }
  }]
};
