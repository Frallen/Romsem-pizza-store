module.exports = ({ env }) => ({
  "vercel-deploy": {
    enabled: true, config: {
      deployHook:
        "https://api.vercel.com/v1/integrations/deploy/prj_DksXrDXMNxKLuXW8fYeYTPEfQWPD/xSA9AFuqKu",
      apiToken: "ioqQrNfMqxS64v1Ml4zHHk0y",
      appFilter: "romsemadmin",
      teamFilter: "your-team-id-on-vercel",
      roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
    },
  },
});
