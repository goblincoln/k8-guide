# 3.1 Helm: Kubernetes Package Manager

[Official Helm Documentation](https://helm.sh/)

Helm is the package manager for Kubernetes. It helps you define, install, and upgrade even the most complex Kubernetes applications using reusable templates called **charts**.

## Why Use Helm?

- **Simplifies deployments:** Manage complex apps with a single command.
- **Reusable templates:** Use charts to avoid repetitive YAML.
- **Centralized configuration:** Use `values.yaml` to manage app settings in one place.
- **Easy upgrades and rollbacks:** Helm tracks releases for easy version control.

## Key Concepts

- **Repository:** A server that stores and shares Helm charts. [Learn more](https://helm.sh/docs/topics/chart_repository/)
- **Chart:** A package of pre-configured Kubernetes resources. [Learn more](https://helm.sh/docs/topics/charts/)
- **Chart Hooks:** Scripts that run at certain points in a release lifecycle (e.g., before install). [Learn more](https://helm.sh/docs/topics/charts_hooks/)

## Common Helm Commands

| Command | Description |
|---------|-------------|
| `helm repo add <name> <url>` | Add a chart repository |
| `helm repo update` | Update information on available charts |
| `helm search repo <keyword>` | Search for charts in repositories |
| `helm install <release> <chart>` | Install a chart into Kubernetes |
| `helm upgrade <release> <chart>` | Upgrade a release to a new chart version |
| `helm uninstall <release>` | Remove a release from Kubernetes |
| `helm pull <chart> [--untar]` | Download a chart archive (optionally extract) |

## Example 1 (Easy): Installing Kubernetes Dashboard with Helm

You can deploy the Kubernetes Dashboard using Helm with just a few commands:

1. **Add the Kubernetes Dashboard Helm repository and update your local cache:**
  ```sh
  helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
  helm repo update
  ```

2. **Install the Dashboard chart:**
  ```sh
  helm install kdash kubernetes-dashboard/kubernetes-dashboard
  ```
  - This will create a release named `kdash` in your current namespace (typically `default`). To install in a specific namespace, add `--namespace <namespace> --create-namespace`.

3. **Accessing the Dashboard:**
  - The Dashboard is exposed via a Kong proxy pod. To access it locally, use port-forwarding:
    ```sh
    kubectl port-forward <kong-pod-name> 8443:8443 -n kubernetes-dashboard
    ```
    - Replace `<kong-pod-name>` with the actual name of the Kong pod, which you can find with:
4. **Authentication:**
  - Generate a bearer token to log in:
    ```sh
    kubectl -n kubernetes-dashboard create token kubernetes-dashboard-api
    ```
  - Copy the token and use it to authenticate in the Dashboard web UI.

> **Tip:** For more details or advanced configuration, refer to the [Kubernetes Dashboard Helm Chart documentation](https://artifacthub.io/packages/helm/k8s-dashboard/kubernetes-dashboard).

## Example 2 (Optional): Installing Longhorn with Helm

> **Note:** Longhorn does not work on WSL.

1. **Add the Longhorn repository:**
    ```sh
    helm repo add longhorn https://charts.longhorn.io
    helm repo update
    ```

2. **Install Longhorn:**
    ```sh
    helm install longhorn longhorn/longhorn \
      --namespace longhorn-system \
      --create-namespace \
      --version 1.9.0
    ```

    - To customize settings, download the chart and edit `values.yaml`:
      ```sh
      helm pull longhorn/longhorn --version 1.9.0 --untar
      # Edit longhorn/values.yaml as needed
      helm install longhorn ./longhorn \
        --namespace longhorn-system \
        --create-namespace \
        -f longhorn/values.yaml
      ```

3. **Troubleshooting:**
    - For single-node clusters, set `replicas: 1` in `values.yaml`.
    - Ensure required dependencies:
      ```sh
      sudo apt install open-iscsi
      sudo mount --make-shared /
      ```

## Additional Resources

- [Helm Quickstart Guide](https://helm.sh/docs/intro/quickstart/)
- [Longhorn Installation Guide](https://longhorn.io/docs/1.9.0/deploy/install/install-with-helm/)


### Next - [3.2a Templating Helm Files](../L2/a_exercise.md)