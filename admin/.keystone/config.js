"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core4 = require("@keystone-6/core");

// schemas/Posts.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var import_access = require("@keystone-6/core/access");
var Post = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    title: (0, import_fields.text)(),
    status: (0, import_fields.select)({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" }
      ],
      defaultValue: "draft",
      ui: {
        displayMode: "segmented-control"
      }
    }),
    content: (0, import_fields_document.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    publishDate: (0, import_fields.timestamp)(),
    author: (0, import_fields.relationship)({
      ref: "User.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true
      }
    })
  }
});

// schemas/User.ts
var import_core2 = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");
var import_access2 = require("@keystone-6/core/access");
var User = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    email: (0, import_fields2.text)({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true
    }),
    // The password field takes care of hiding details and hashing values
    password: (0, import_fields2.password)({ validation: { isRequired: true } }),
    posts: (0, import_fields2.relationship)({ ref: "Post.author", many: true }),
    createdAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" }
    })
  },
  ui: {
    listView: {
      initialColumns: ["name", "posts"]
    }
  }
});

// schemas/Product.ts
var import_core3 = require("@keystone-6/core");
var import_fields3 = require("@keystone-6/core/fields");
var import_fields_document2 = require("@keystone-6/fields-document");
var import_access3 = require("@keystone-6/core/access");
var import_cloudinary = require("@keystone-6/cloudinary");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var Product = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    title: (0, import_fields3.text)({ validation: { isRequired: true } }),
    newProduct: (0, import_fields3.checkbox)(),
    cartTitle: (0, import_fields3.text)({
      validation: { isRequired: true },
      ui: { description: "Enter a short title of not more than 10 characters" }
    }),
    suggestionTitle: (0, import_fields3.text)({
      validation: { isRequired: true },
      ui: { description: "Enter a short suggestion title" }
    }),
    slug: (0, import_fields3.text)({
      validation: { isRequired: true }
    }),
    previewImage: (0, import_cloudinary.cloudinaryImage)({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER
      }
    }),
    cartImage: (0, import_cloudinary.cloudinaryImage)({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER
      }
    }),
    category: (0, import_fields3.select)({
      options: [
        { label: "Headphones", value: "headphones" },
        { label: "Speakers", value: "speakers" },
        { label: "Earphones", value: "earphones" }
      ],
      validation: { isRequired: true }
    }),
    description: (0, import_fields3.text)({
      validation: { isRequired: true },
      ui: { displayMode: "textarea" }
    }),
    price: (0, import_fields3.float)({ defaultValue: 0, validation: { isRequired: true } }),
    features: (0, import_fields_document2.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    boxContent: (0, import_fields3.json)(),
    galleryOne: (0, import_cloudinary.cloudinaryImage)({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER
      }
    }),
    galleryTwo: (0, import_cloudinary.cloudinaryImage)({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER
      }
    }),
    galleryThree: (0, import_cloudinary.cloudinaryImage)({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER
      }
    })
  },
  ui: {
    listView: {
      initialColumns: ["title", "previewImage", "price"]
    }
  }
});

// schemas/index.ts
var lists = {
  Post,
  User,
  Product
};

// keystone.ts
var import_dotenv2 = __toESM(require("dotenv"));

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
import_dotenv2.default.config();
var {
  S3_BUCKET_NAME: bucketName,
  S3_REGION: region,
  S3_ACCESS_KEY_ID: accessKeyId,
  S3_SECRET_ACCESS_KEY: secretAccessKey,
  ASSET_BASE_URL: baseURL
} = process.env;
var keystone_default = withAuth(
  // Using the config function helps typescript guide you to the available options.
  (0, import_core4.config)({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: "postgresql",
      url: "postgres://postgres:2251@localhost:5432/keystone"
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data
    },
    server: {
      cors: {
        origin: "*",
        methods: "*",
        credentials: true,
        allowedHeaders: "*",
        exposedHeaders: "*"
      },
      healthCheck: true,
      port: 8e3
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
        secretAccessKey: secretAccessKey ?? ""
      }
    }
  })
);
