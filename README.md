# Goal

A hobby project to proxy my emails and collect data on the types of junk I get.

## Tech

- React app (served from nginx).
- GraphQL to serve up data setup from Apollo
- DB to track email data. Haven't decided on a solution yet
- AWS SES to proxy emails
- Lambda to push email to s3 and notify a web hook
- nodejs web server to listen for webhook calls and process emails from s3 bucket
- K8s to do the things

### Notes

Some notes along the way. 1. to publish to a private docker registry, you have to tag with the local host and port.
`docker tag [APPNAME] localhost:5000/[APPNAME]`
`docker tag kuber-react localhost:5000/kuber-react`

## Next Steps

1. Once AWS removes my sandbox blocker, I'll test actually sending emails from s3
1. Delete s3 emails once they are sent
1. Cleanup lambda resources (I created some dummy onces to test stuff out)
1. Start saving data from emails
1. Build the front end that lets me manage the things
1. Architect how email rules will work. In the beginning, this might look like

- Block
- Allow
- Limit
  - This will watch the number of emails that come through and block after a certain threshhold.
- Autorespond
- Cat data somehow
