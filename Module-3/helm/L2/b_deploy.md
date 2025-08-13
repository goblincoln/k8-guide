# Deploying PostgreSQL and PgAdmin as a Stack

Now that you understand how to use values and helper functions in Helm, let's deploy PostgreSQL and PgAdmin together as a single stack. This exercise assumes you have already deployed both applications individually using Helm.

## Step 1: Add Dependencies to Your Chart

Open the `database-stack/Chart.yaml` file and add a `dependencies` section. This section tells Helm which charts your stack depends on. For example:

```yaml
dependencies:
    - name: postgresql
        version: VERSION
        repository: REPO
    - name: pgadmin
        version: VERSION
        repository: REPO
```

- **name**: The name of the dependent chart (e.g., `postgresql`, `pgadmin`).
- **version**: The version of the chart you want to use.
- **repository**: The URL of the Helm chart repository. For local charts, use `file://./charts/chartname`. For remote charts, just use the URL to the chart.

> **Tip:** You can find the latest chart versions and repository URLs on [Artifact Hub](https://artifacthub.io/).

## Step 2: Update Dependencies

After editing `Chart.yaml`, run the following command in your chart directory to update dependencies:

```sh
helm dependency update
```

This will download the required charts into your `charts/` directory if your charts are remote.

## Step 3: Deploy the Stack

Once dependencies are updated, you can deploy both PostgreSQL and PgAdmin together using your parent chart:

```sh
helm install my-database-stack .
```

Replace `my-database-stack` with your desired release name.

---

By managing dependencies in your parent chart, you can deploy and manage multiple applications as a single unit, making your Kubernetes deployments more modular and maintainable.