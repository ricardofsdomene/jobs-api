const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    min: [8, "Sua senha precisa conter pelo menos 8 digitos"],
  },
  apple: {
    authorizationCode: {
      type: String,
    },
    email: {
      type: String,
    },
    fullName: {
      familyName: {
        type: String,
      },
      givenName: {
        type: String,
      },
      middleName: {
        type: String,
      },
      namePrefix: {
        type: String,
      },
      nameSuffix: {
        type: String,
      },
      nickname: {
        type: String,
      },
    },
    identityToken: {
      type: String,
    },
    realUserStatus: {
      type: Number,
    },
    state: {
      type: String,
    },
    user: {
      type: String,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
    family_name: {
      type: String,
    },
    given_name: {
      type: String,
    },
    locale: {
      type: String,
    },
    name: {
      type: String,
    },
    picture: {
      type: String,
    },
    verified_email: {
      type: Boolean,
    },
  },
  permissions: {
    type: Array
  },
  roles: {
    type: Array
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);
