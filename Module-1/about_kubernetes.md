[Return Home](/README.md)



# Module 1: About Kubernetes

K8s (Kubernetes) is an open-source system for automating the deployment, scaling, and management of containerized applications. It allows you to run containers reliably across a cluster of machines.

A container is a bundle, or box, of code with all its necessary dependencies. Containers are portable, isolated, and lightweight. 

We like to use container management systems like Kubernetes so that we can swiftly stand up a stack of applications for different events the same way every time, with a single command, and little to no extra configuration.


## Key Terms

### Cluster
A **cluster** is the complete Kubernetes environment, consisting of:
- **Control Plane**: Manages and makes decisions about the cluster.
- **Worker Nodes**

### Node
A **node** is a machine (virtual or physical) in the cluster. There are two types:
- **Control Plane Node**: Runs components that manage the cluster.
- **Worker Node**: Runs the actual application workloads.

### Pod
A **pod** is the smallest deployable unit in Kubernetes. It can contain one or more containers that:
- Share the same network IP and storage.
- Always run together on the same node.

### Kubelet
The **kubelet** is an agent that runs on each node. It:
- Communicates with the control plane.
- Ensures the containers described in PodSpecs are running correctly.

### Kube-proxy
**kube-proxy** runs on each node. It:
- Handles network routing inside the cluster.
- Ensures traffic reaches the correct Pods.

For more information, read here:

- [GeeksForGeeks K8 Introduction](https://www.geeksforgeeks.org/devops/introduction-to-kubernetes-k8s/)
- [GeeksForGeeks K8 Architecture](https://www.geeksforgeeks.org/devops/kubernetes-architecture/)

---
### Next - [Setup RKE2 Single Node Cluster](./setup.md)
