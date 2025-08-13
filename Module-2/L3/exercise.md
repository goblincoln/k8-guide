[Return Home](/README.md)

# 2.3 Exercise: Your Turn

Below is a skeleton for a [PgAdmin manifest stack.](./pgadmin/) Complete the following exercises to fill it out:



## [1. Secret](./pgadmin/pgadmin_secret.yaml)

- **a.** Create a unique name for the secret and add it to the `metadata` section of the manifest.
- **b.** In the `data` section, add your secret data. Format each entry as `key: value`. Rename `key` to something meaningful for the value it represents.
- **c.** Remember that secrets must be base64 encoded. Use a Linux terminal or an online tool to encode your string, and replace `value` with the encoded string.
- **d.** Apply the secret to your cluster.



## [2. Deployment](./pgadmin/pgadmin_deployment.yaml)

- **a.** fsGroup specifies the group ID (GID) that will own the files and directories within volumes mounted by the pod. Find what PgAdmin needs it's policy set to and add that.
- **b.** Add an image for PgAdmin. You can find them on Dockerhub. Get a version that is more recent but not "latest" or "snapshot." It should look like dpage/pgadmin:x.x.x *(note: the official Docker image is created by dpage).*
- **c.** Add a name for the port assigned internally within the container. 
- **d.** Set an environment variable for a "PgAdmin default email." This is what you use to log in.
- **e.** Reference your secret using the name of the secret and the key of the item you want. 
- **f.** Apply the deployment to your cluster.


## [3. Service](./pgadmin/pgadmin_service.yaml)

- **a.** Create a unique name for the service and add it to the `metadata` section of the manifest.
- **b.** Create a name, a port number for the service. Recall what targetPort is by looking at the postgresql service. You can either use the port number itself or the name of the port that was created in 2c.
- **c.** Apply the service to your cluster.


---
### Next - [2.4a Learn about Ingresses](../L4/ingress.md)