import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    phone: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false
    }
  },
  multifactor: {
    mode: 'OPTIONAL',
    totp: true,
    sms: true
  },
  groups: ["ADMINS", "RESULTVIEWERS"],
});
