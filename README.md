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

## Next Up

- Send Email should close and reset state on sent
- Need to be able to delete
- View for sent email

## Before Deploy

- Get a solid refactor in
- Make naming consistent
- Create shared model npm package or, at least, a script to pull them in before building

## Project Structure

I'll get a diagram up here once things are further along

## Get it Running

Instructions to follow. This is a personal project and I am not really setting this up for generic set up and go. The instructions here will be mostly to remind myself in the event I leave it for some time.

NEEDS WORK:

### Initial Setup

1. Create an envars file for aws creds and point the `deploy.sh` configmap to that file. Make sure the envar names match the `configMapKeyRef` name in the `deployment.yaml` file.
1. Run `deploy.sh`
1. Visit [localhost:32000](http://localhost:32000) for gql server
1. Visit [localhost:31000](http://localhost:31000) for React App

### Setup Auth

Will provide steps later

## Tips

- Don't leave clusters running as they are resource hogs. `kill-sh` should clean up anything.
