# Goals

The goal of this is to start with technology I am familiar with, and then reach into the uncomfortable. I will be creating a React app hosted in kubernetes. Using (this)[https://dev.to/rieckpil/deploy-a-react-application-to-kubernetes-in-5-easy-steps-516j]

### Notes

Some notes along the way. 1. to publish to a private docker registry, you have to tag with the local host and port.
`docker tag [APPNAME] localhost:5000/[APPNAME]`
`docker tag kuber-react localhost:5000/kuber-react`

## Next Steps

1. Create the API and containerize
1. Explore k8 features (health endpoints)
1. GQL wired up to front end
1. Setup mongoDB to run in seperate k8 node
1. Switch from sqllite to mongo. Read (this)[https://typeorm.io/#/mongodb]
