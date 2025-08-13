# Kubernetes Training Guide

This repository is a practical Kubernetes training resource.  
It walks through deploying, managing, and troubleshooting real-world containerized applications using Kubernetes.  
The focus is on hands-on, clear examples that work in both local and small cluster environments.

## Repository Structure

The project is organized into modules:

Module 1:
- [About Kubernetes](./Module-1/about_kubernetes.md)
- [Instructions for Single-node Cluster](./Module-1/setup.md)

Module 2:
- [Lesson 1: Intro to Resource Manifests](./Module-2/L1/manifests.md)
- [Lesson 2: Postgres - Your First App](./Module-2/L2/walkthrough.md)
- [Lesson 3: Pgadmin Exercise](./Module-2/L3/exercise.md)
- [Lesson 4: Ingress](./Module-2/L4/ingress.md)
- [Lesson 5: Deploy More Apps](./Module-2/L5/exercise.md)

Module 3:
- [Lesson 1: Intro to Helm](./Module-3/helm/L1/intro.md)
- [Lesson 2a: Templating & Deploying Chart](./Module-3/helm/L2/a_exercise.md)
- [Lesson 2b: Deploying Chart w/ Subcharts](./Module-3/helm/L2/b_deploy.md)

Each module contains:
- Step-by-step tasks and explanations
- Example manifests and Helm values
- Notes on key configurations and best practices
- Common troubleshooting guidance

## Topics Covered

- Kubernetes core resource types
- Stateless Deployments vs StatefulSets
- Persistent Volumes, StorageClasses, and dynamic storage
- Ingress controllers and routing
- Helm basics and package management
- Example applications: NiFi, JupyterLab, PostgreSQL, and others

## App-specific Notes

Applications with more complex configuration have their own subfolders in the appropriate module.  
Each application folder may include:
- A brief README with details and context
- Example manifest files
- Example Helm values files (where applicable)

Keeping these small, focused READMEs helps explain configuration choices without cluttering the main guide.

## Using CLI and k9s

The main instructions use the standard `kubectl` CLI.  
Where useful, optional tips for using `k9s` are included to help visualize resources more easily.  
This keeps the focus on building practical command-line skills while also introducing helpful tools.

## Contributing and Contact

This guide is maintained by [Ella Lincoln](https://www.linkedin.com/in/ella-lincoln-488a86238/).  
Feel free to reach out for feedback, ideas, or suggestions.

---

## Next Steps

- Ensure each module has a clear README explaining its purpose.
- Keep manifests clean and versioned.
- Document any known issues or common pitfalls.
- Use consistent file and folder naming.

