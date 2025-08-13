[Return Home](/README.md)

# 2.4a Understanding Ingress

After deploying PgAdmin4 and Postgres, you can access PgAdmin using port forwarding or a NodePort. However, the preferred way to expose web apps in Kubernetes is with an **Ingress**.

## What is Ingress?

An **Ingress** is a Kubernetes resource that manages external access to services in your cluster, typically HTTP/HTTPS. It lets you:

- Route traffic based on hostnames or URL paths
- Use custom domains
- Terminate TLS (HTTPS)
- Centralize routing for multiple apps

**Why use Ingress?**  
Instead of exposing apps on random ports and IPs, Ingress lets you define clear rules for routing traffic, improving security and manageability.

## Hostnames and Ingress

A **hostname** is a human-friendly name (like `www.example.com`) that maps to an IP address. For testing, you can define hostnames locally on your machine.

Ingress lets you access your apps using these hostnames, rather than raw IPs and ports.

---

## Step 1: Create an Ingress

Here’s a basic Ingress manifest with comments:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: pgadmin-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
    - host: www.k8s.com
      http:
        paths:
          - path: /k8(/|$)(.*)
            pathType: Prefix
            backend:
              service:
                name: pgadmin-service
                port:
                  number: 80
```

**Key fields:**
- `host`: Domain name to match (e.g., `www.k8s.com`)
- `path`: URL path to match (e.g., `/k8`)
- `backend.service.name`: Name of the service to route to
- `backend.service.port.number`: Service port

---

## More Examples

**Path-based Routing:**

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

**Subdomain-based Routing with TLS:**

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
*Note: For HTTPS, you need a Kubernetes Secret with your TLS certificate.*

---

## Step 2: Update Your Hosts File

Since your hostnames aren’t public, add them to your local hosts file:

**Linux:**
  ```bash
  sudo nano /etc/hosts
  ```
  Add:
  ```
  127.0.0.1   www.k8s.com
  ```

**Windows:**
- Open Notepad as Administrator
- Edit: `C:\Windows\System32\drivers\etc\hosts`
- Add:
  ```
  127.0.0.1   www.k8s.com
  ```

---

Now, you can access your app at `http://www.k8s.com/path` (or whatever hostname/path you set). The hosts file tells your computer to resolve the hostname to the correct IP, allowing your browser to reach your Ingress.

---
### Next - [2.4b Learn About Secrets](secret.md)
