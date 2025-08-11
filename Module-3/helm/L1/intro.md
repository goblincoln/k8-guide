# Helm: Kubernetes Package Manager

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

## Example: Installing Longhorn with Helm

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

