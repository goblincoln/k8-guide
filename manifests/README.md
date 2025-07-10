# The K8 Manifest

If you want to learn more about what is within each manifest, this guide should help get your foot into the door. Manifests are extensive and can have different levels of complexity depending on what your application requires. 

I don't know anyone who will go out of their way to memorize how to set up a K8 manifest file. K8 engineers very often reference documentation. The official K8s documentation can be found [here](https://kubernetes.io/docs/home/), this guide will give you a more brief overview of the most relevant manifests that we may work with.

## Naming conventions
To follow our current K8 file structure we are going to split all resources into separate files. For an app called PostgreSQL, we will name our files like so: `postgresql_[resourceType].yaml`

## Resource Types

### Deployment
- **Stateless**; pods don't need persistent storage for that specific pod.
- However, persistence can still be enabled with a PVC to keep certain states present in case of pod restarts, if you only have a single replica. Replicas are usually necessary for high user traffic.
- Good for apps like web servers, frontends, or API services.
- Example: a website frontend with static files saved on a volume. 
### Statefulset
- Each pod has an identity that allows each to keep their own persistent storage. Like databases.
- Good for databases, clustered applications, or anything that needs each Pod to keep its own state separate.

*Further elaboration:*
- Each pod (1, 2, 3) has its own data directory. 
- One pod writes, the others sync.
- If you restart Pod 1, its disk must keep its local replica data. Otherwise, it has to resync the whole database from scratch.
- If each Pod shared the same storage, writes and replication would conflict and corrupt the data.

### Service 

- The service resource exists to **expose** your application that is running as one of more pods in your cluster.
- It makes it so that clients can interact with your pods without having to modify your application.
- Clients (other pods) connect to each other utilizing an IP created for that application by the service.
- An application with three pod replicas will be referenced under one service.

*Note:* You can expose your HTTP pods to access any web UIs that may be running in your cluster with port-forwarding or utilizing NodePorts. However, it is best practice to utilize Ingress to control web traffic.

### Ingress

- The ingress can be daunting when you first look at it, and even more so when you start to do custom configurations. 
- It allows you to make your HTTP/HTTPS service available externally. It exposes your routes from outside the cluster, to services within the cluster.
- While ingresses have many capabilities, we primarily use it to give services externally-reachable URLs with domain names, and enforce HTTP/HTTPS protocols using TLS certificates.
- Serve different applications at different endpoints/paths 
- Using one ingress file, you can enable HTTP/HTTPS entry into multiple different applications.

Route two apps based on path:
```
metadata:
  name: dev-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
    - host: www.goblin.com
      http:
        paths:
          - path: /pgadmin(/|$)(.*)
            pathType: Prefix
            backend:
              service:
                name: pgadmin-service
                port:
                  number: 80
          - path: /nifi(/|$)(.*)
            pathType: Prefix
            backend:
              service:
                name: nifi-service
                port:
                  number: 8080
```
Based on Subdomain
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dev_ingress
spec:
  ingressClassName: nginx
  tls:
  - hosts:
      - app1.goblin.com
      - app2.goblin.com
    secretName: appname_tls_secret
  rules:
  - host: app1.goblin.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: appname_1_service
            port:
              number: 3030
  - host: app2.goblin.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: appname_2_service
            port:
              number: 4040
```
*Note:* TLS is only necessary if you plan to use HTTPS. You will have to create a K8 secret resource.

### Secret
- Resource that holds a small amount of data, like passwords, tokens, and keys.
- By default, they are unencrypted and can be modified by anyone with API (kubectl) access.