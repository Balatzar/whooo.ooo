module.exports = {
  servers: {
    one: {
      host: "95.85.41.122",
      username: "root",
      pem: "/home/balthazar/.ssh/id_rsa",
    },
  },

  meteor: {
    name: "whoooooo",
    path: ".",
    servers: {
      one: {},
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: "http://whooo.ooo",
      MONGO_URL: "mongodb://127.0.0.1:27017/whoooooo",
    },

    dockerImage: "abernix/meteord:base",
    deployCheckWaitTime: 60,
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
