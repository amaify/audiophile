/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from "@keystone-6/core";

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from "./schemas/index";
import dotenv from "dotenv";

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from "./auth";

dotenv.config();

const {
  S3_BUCKET_NAME: bucketName,
  S3_REGION: region,
  S3_ACCESS_KEY_ID: accessKeyId,
  S3_SECRET_ACCESS_KEY: secretAccessKey,
  ASSET_BASE_URL: baseURL,
} = process.env;

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: "postgresql",
      url: "postgres://postgres:2251@localhost:5432/keystone",
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
      publicPages: ["/signin"],
      getAdditionalFiles: [
        async () => [
          {
            mode: "write",
            src: `
            import SigninPage from '../../../admin/pages/signin'; 

            export default SigninPage
            `,
            outputPath: "pages/signin.js",
          },
        ],
      ],
    },
    server: {
      cors: {
        origin: "*",
        methods: "*",
        credentials: true,
        allowedHeaders: "*",
        exposedHeaders: "*",
      },
      healthCheck: true,
      port: 8000,
    },
    lists,
    session,
    storage: {
      product_images: {
        kind: "s3",
        type: "image",
        bucketName: bucketName ?? "",
        region: region ?? "",
        accessKeyId: accessKeyId ?? "",
        secretAccessKey: secretAccessKey ?? "",
      },
    },
  })
);
