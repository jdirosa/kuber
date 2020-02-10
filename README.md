# Goal

Create a k8s cluster that runs the following:

- React app (served from nginx).
- GraphQL to serve up data setup from Apollo
- Mongo DB with seeded data

### Notes

Some notes along the way. 1. to publish to a private docker registry, you have to tag with the local host and port.
`docker tag [APPNAME] localhost:5000/[APPNAME]`
`docker tag kuber-react localhost:5000/kuber-react`

## Next Steps

1. Explore k8s features (health endpoints)
1. GQL wired up to front end
1. Setup mongoDB to run in seperate k8 node
1. Switch from sqllite to mongo. Read [this](https://typeorm.io/#/mongodb)
1. Explore long term k8 storage
1. Explore prod deploy strategies
1. Explore pagination in gql
1. Explore sockets in gql
1. Explore auth in gql
