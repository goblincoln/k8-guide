# Exercise: Create Your Own Helm Chart

If you have an in-house application or an app without a Helm chart, you can create one yourself. The files provided in this lesson are examples—try building your own for hands-on practice.

## 1. Create a Chart

```sh
helm create database-stack
```

This command generates the following structure:

- `Chart.yaml`: Chart metadata and entry point.
- `values.yaml`: Centralized configuration for variables and values.
- `templates/`: YAML templates with variables (e.g., `image: {{ .Values.image.repository }}`).
- `charts/`: Directory for subcharts.

## 2. Add Subcharts for PGAdmin and PostgreSQL

Since PGAdmin and PostgreSQL are often used together, let's add them as subcharts:

```sh
rm -rf ./templates/*
cd charts/
helm create pgadmin
helm create postgresql
rm -rf pgadmin/templates/*
rm -rf postgresql/templates/*
```

Copy the PgAdmin and PostgreSQL YAML files from L2 and L3 into their respective `chart/templates/` folders.

When the `values.yaml` file is created, it contains many default values. For this exercise, delete all content in `values.yaml` to start fresh.

## 3. Parameterize Values

We'll convert hard-coded values to variables in `values.yaml`. Open both `values.yaml` and your manifest files side by side for reference.

For example, to set the image tag for PostgreSQL, add to `values.yaml`:

```yaml
statefulset:
    image: postgres:16.3
```

Then, in your `postgresql_statefulset.yaml`, reference the value using Helm syntax:

```yaml
image: {{ .Values.statefulset.image }}
```