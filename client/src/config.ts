// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'xbbu0k2hfl'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-m995nk3t.auth0.com',            // Auth0 domain
  clientId: 'III0JFYWpr1Ohu9VQO8ts60djVQ8XaVW',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
