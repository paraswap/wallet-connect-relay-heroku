module.exports = {
  apps: [
    {
      script: "walletconnect-monorepo/servers/relay/dist",
      watch: '.',
      args: "start",
      instances: parseInt(process.env.NB_INSTANCES || 1),
      exec_mode: "cluster",
      env: {
        ...process.env,
        REDIS_URL: process.env.REDISCLOUD_URL || process.env.REDIS_URL,
      }
    },
  ],
};
