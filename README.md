# Goal

A hobby project to proxy my emails and collect data on the types of junk I get. I thought it would be fun to make my own email service. I could parse out the text of the emails and make this searchable.

## Tech

- React app (served from nginx).
- GraphQL to serve up data from an Apollo server
- RDS to track email metadata.
- AWS SES to handle SMTP
- Lambda to push email to s3 and notify a web hook
- Serverless to better streamline lambda and such
- nodejs (express) web server to listen for webhook calls and process emails from s3 bucket
- All running in kubernetes

### Notes

Some notes along the way.

1. to publish to a private docker registry, you have to tag with the local host and port.
   `docker tag [APPNAME] localhost:5000/[APPNAME]`
   `docker tag kuber-react localhost:5000/kuber-react`

## Next Steps

1. Cleanup lambda resources (I created some dummy onces to test stuff out)
1. Update webapi to work in kluster
1. Deploy all the k8es
1. Setup AWS sdk to work from k8es. Needs IAM roles if in prod, or envars for locals

## Project Structure

I'll get a diagram up here once things are further along

## Get it Running

Instructions to follow. This is a personal project and I am not really setting this up for generic set up and go. The instructions here will be mostly to remind myself in the event I leave it for some time
