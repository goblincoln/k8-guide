[Return Home](/README.md)

# Understanding Ingress

After deploying PgAdmin4 and Postgres, you can access the PgAdmin UI by port forwarding or setting a NodePort. However, our preferred method for accessing web applications is through Ingress.

## What is an Ingress?

As described in the manifest documentation:
- **Purpose:** Route external HTTP/HTTPS traffic to services in your cluster.
- **Features:** 
  - Custom domains and paths.
  - TLS termination (HTTPS).
  - Centralized routing for multiple apps.
- **Example:** Serve multiple apps at different paths or subdomains.

### Why Use Ingress?

Instead of exposing your applications using IP addresses and ports, which can be insecure and difficult to manage, Ingress allows you to define rules for routing traffic based on hostnames or paths. This approach improves security by minimizing open ports and makes it easier to manage access to your applications.

### What is a Hostname?

A hostname is a human-readable name assigned to a device (host) on a network, often managed through the Domain Name System (DNS). While hostnames are typically managed externally, for testing purposes, we can define our own hostnames locally.

Ingress enables you to access your web applications using these hostnames, rather than exposing raw IP addresses and ports.

## Let's Begin
### Step 1: Create your Ingress

Below is a skeleton manifest for creating an Ingress resource. The comments below explain each section of the manifest:

- **apiVersion:** Specifies the API version for the Ingress resource (`networking.k8s.io/v1` is the stable version).
- **kind:** Declares the resource type as `Ingress`.
- **metadata.name:** The unique name for this Ingress resource (e.g., `pgadmin-ingress`).
- **metadata.annotations:** Extra instructions for the Ingress controller (e.g., NGINX). The example annotation rewrites the incoming URL path.
- **spec.rules:** Defines one or more rules for routing incoming requests.
    - **host:** The domain name this Ingress will respond to (e.g., `www.k8s.com`).
    - **http.paths:** Specifies the URL paths to route to your service.
        - **path:** The URL path to match (e.g., `/k8`).
        - **pathType:** How the path is matched (`Prefix` for any path that starts with this value, `Exact` for an exact match).
        - **backend.service.name:** The name of the Kubernetes Service to route traffic to.
        - **backend.service.port.number:** The port on the Service to send traffic to (e.g., 80 for HTTP).

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
name: # e.g., 'pgadmin-ingress'
annotations:
  nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
    - host: www.k8s.com
      http:
        paths:
          - path: /k8
            pathType: # Prefix or Exact
            backend:
              service:
                name: # your-service-name
                port:
                  number: # service-port-number
```









#### Detailed Example: Path-based Routing
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dev-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
    - host: www.example.com
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

#### Example: Subdomain-based Routing
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dev-ingress
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - app1.example.com
        - app2.example.com
      secretName: tls-secret
  rules:
    - host: app1.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app1-service
                port:
                  number: 3030
    - host: app2.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app2-service
                port:
                  number: 4040
```
*Note:* TLS is only needed for HTTPS. You’ll need a Kubernetes Secret for your certificate.