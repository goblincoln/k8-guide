[Return Home](/README.md)

# Kubernetes Manifests/Resource Types Guide

This section will help you understand the basics of Kubernetes manifests and how they relate to deploying applications. If you’re new to Kubernetes, don’t worry. This document breaks down the most important concepts and resources you’ll encounter.

A **Kubernetes Resource** is any object you define and manage in the cluster, like Pods, Services, or Ingresses, that tells Kubernetes what to run and how to run it.

## What is a Manifest?

A **Kubernetes manifest** is a YAML file that describes the desired state of a resource in your cluster, such as a deployment, service, or volume. You apply manifests using `kubectl apply -f <filename.yaml>`, and Kubernetes takes care of creating or updating the resources.

Other kubectl commands:
- `kubectl help`
- `kubectl delete, kubectl delete -f <filename.yaml>`
- `kubectl logs`
- `kubectl describe <resourceType> <resourceName>`

## Why Use Manifests?

- **Declarative:** You describe what you want, Kubernetes figures out how to make it happen.
- **Versioned:** Manifests can be stored in Git for easy tracking and collaboration.
- **Reusable:** You can share and reuse manifests across environments.

## Naming Conventions

For training purposes and to keep things organized, name your manifest files using the pattern:  
`<appname>_<resourcetype>.yaml`  
Example: `postgresql_deployment.yaml`, `nifi_service.yaml`

---

## Key Resource Types

### Deployment

- **Purpose:** Run stateless applications (no persistent data needed between pod restarts).
- **Use Cases:** Web servers, API backends, frontends.
- **Scaling:** Easily scale up/down with replicas.
- **Persistence:** Can use PVCs for shared data, but each pod is replaceable.

### StatefulSet

- **Purpose:** Run stateful applications (each pod keeps its own data).
- **Use Cases:** Databases, clustered apps, anything needing stable storage.
- **Identity:** Each pod gets a unique name and its own storage.
- **Persistence:** Uses `volumeClaimTemplates` for per-pod storage.

### Service

- **Purpose:** Expose your pods to other pods or external clients.
- **Types:**
  - **ClusterIP:** Internal-only (default).
  - **NodePort:** Opens a port on each node for external access.
  - **LoadBalancer:** Integrates with cloud load balancers.
- **Best Practice:** Use ClusterIP with Ingress for production HTTP/HTTPS traffic.

### Ingress

- **Purpose:** Route external HTTP/HTTPS traffic to services in your cluster.
- **Features:** 
  - Custom domains and paths.
  - TLS termination (HTTPS).
  - Centralized routing for multiple apps.
- **Example:** Serve multiple apps at different paths or subdomains.


---

### Secret

- **Purpose:** Store sensitive data (passwords, tokens, certificates).
- **Encoding:** Values are base64-encoded, not encrypted by default.
- **Usage:** Mount secrets as files or environment variables in your pods.

#### Example: Generic Secret
```sh
kubectl create secret generic my-db-secret \
  --from-literal=username=myuser \
  --from-literal=password=mypassword
```

#### Example: TLS Secret for Ingress
```sh
kubectl create secret tls my-tls-secret \
  --cert=path/to/tls.crt \
  --key=path/to/tls.key
```

---

### ConfigMap

- **Purpose:** Store non-sensitive configuration data (env vars, config files).
- **Usage:** Mount as files or inject as environment variables.
- **Note:** Not encrypted; don’t store secrets here.

---

### PersistentVolume (PV), PersistentVolumeClaim (PVC), & StorageClass

- **PV:** Represents a piece of storage in your cluster (local disk, NFS, cloud disk, etc.).
- **PVC:** A request for storage by a pod; binds to a matching PV.
- **StorageClass:** Defines types of storage (e.g., SSD, HDD, cloud provider) and controls how volumes are dynamically provisioned.
- **Dynamic Provisioning:** With solutions like Longhorn or cloud providers, PVCs automatically get a PV based on the specified StorageClass—no need to create PVs manually.

*Note:* Always specify a `storageClassName` in your PVC to select the desired storage backend and performance characteristics.

---

## Practical Tips

- **Don’t memorize YAML:** Use documentation and examples.
- **Apply manifests:** `kubectl apply -f <filename.yaml>`
- **Check resource status:** `kubectl get pods`, `kubectl describe <resource>`
- **Logs:** `kubectl logs <pod-name>`
- **Port-forward for web UIs:** `kubectl port-forward svc/<service-name> <local-port>:<service-port>`

---

## Further Reading

- [Kubernetes Official Docs](https://kubernetes.io/docs/home/)
- [Kubernetes Concepts Overview](https://kubernetes.io/docs/concepts/)

---

This guide should help you get started with the most common Kubernetes resources and how to use them in your manifests. If you’re ever stuck, check the official docs or ask for help!