# Make sure you point to the envar file for your aws config 
# kubectl create configmap gql-configmap --from-env-file=../envars/aws.env
kubectl create configmap gql-configmap --from-env-file=../envars/aws.env -o yaml --dry-run | kubectl replace -f -
kubectl apply -f ./deployment.yaml