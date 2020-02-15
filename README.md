# Goal

A hobby project to proxy my emails and collect data on the types of junk I get.

## Tech

- React app (served from nginx).
- GraphQL to serve up data setup from Apollo
- DB to track email data. Haven't decided on a solution yet
- AWS SES to proxy emails
- Lambda to push email to s3 and notify a web hook
- Serverless to better streamline lambda and such
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
1. Architect how email rules will work. In the beginning, probably just `BLOCK`, `ALLOW`, `AUTO-RESPOND`, and `LIMIT`. Limit will monitor frequency and stop after a certain threshold.

## Project Structure

I'll get a diagram up here once things are further along

## Get it Running

Instructions to follow. This is a personal project and I am not really setting this up for generic set up and go. The instructions here will be mostly to remind myself in the event I leave it for some time
