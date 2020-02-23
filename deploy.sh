# Make sure you point to the envar file for your aws config 
# kubectl create configmap gql-configmap --from-env-file=../envars/aws.env
echo "Updating config maps"
kubectl create configmap gql-configmap --from-env-file=../envars/aws.env -o yaml --dry-run | kubectl replace -f -
kubectl create configmap react-configmap --from-env-file=../envars/kuber-react.env -o yaml --dry-run | kubectl replace -f -
echo "----------"
echo "Deploying..."
kubectl apply -f ./deployment.yaml