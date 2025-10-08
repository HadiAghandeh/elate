import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// models
const schema = a.schema({

  // Test Model
  Test: a
    .model({
      name: a.string(),
      json_path: a.string(),
      logo_path: a.string()
    })
    .authorization((allow) => [allow.guest().to(['read']), allow.authenticated()]),

  // Test Take Model
  TestTake: a.model({
    test_id: a.string(),
    user_id: a.string(),
    assigned_at: a.datetime(),
    started_at: a.datetime(),
    completed_at: a.datetime(),
    status: a.enum(['assigned', 'in_progress', 'completed', 'canceled', 'terminated']),
  }).authorization((allow) => [allow.guest().to(['read']), allow.authenticated()]),   
  
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
