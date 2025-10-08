import { defineStorage } from '@aws-amplify/backend';

export const defaultStorage = defineStorage({
  name: 'elateStorage',
  access: (allow) => ({
    'test/*': [
      allow.authenticated.to(['read','write', 'delete']),
    ]
  })
});

export const mediaStorage = defineStorage({
  name: 'media',
  access: (allow) => ({
    'media/*': [
      allow.authenticated.to(['read','write', 'delete']),
    ]
  })
});
