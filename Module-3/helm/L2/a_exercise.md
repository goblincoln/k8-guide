# 3.2 Exercise: Create Your Own Helm Chart

This exercise will guide you step-by-step through creating a Helm chart for an application stack (for example, PostgreSQL and PGAdmin). 

---

## 1. What Is a Helm Chart?

A **Helm chart** is a package of pre-configured Kubernetes resources. It allows you to define, install, and upgrade even the most complex Kubernetes applications. Helm charts help you:

- **Package** Kubernetes manifests into a single unit.
- **Parameterize** your deployments using variables.
- **Version** your application deployments.
- **Share** and **reuse** application configurations.

A typical Helm chart contains:

- `Chart.yaml`: Metadata about the chart (name, version, description).
- `values.yaml`: Default configuration values for your templates.
- `templates/`: Directory containing Kubernetes manifest templates.
- `charts/`: Directory for chart dependencies (subcharts).

---

## 2. Create a New Chart

Let’s start by creating a new chart called `database-stack`:

```sh
helm create database-stack
```

> **Tip:** The `helm create` command scaffolds a working chart with example templates and values. You can customize or remove these as needed.

---

## 3. Clean Up the Chart

Helm creates a lot of example files. For this exercise, let’s start fresh:

```sh
rm -rf database-stack/templates/*
```

Also, open `database-stack/values.yaml` and delete all its contents so you can add only what you need.

> **Why clean up?** Removing the default templates and values helps you focus on your specific application requirements and avoid confusion.

---

## 4. Add Subcharts for PGAdmin and PostgreSQL

Often, you’ll want to deploy multiple related apps together. Helm supports this with **subcharts**, which are charts nested inside your main chart.

**Steps:**

1. Go into the `charts` directory:
    ```sh
    cd database-stack/charts/
    ```
2. Create subcharts for PGAdmin and PostgreSQL:
    ```sh
    helm create pgadmin
    helm create postgresql
    ```
    This creates two new charts inside the `charts/` directory.
3. Clean up the subcharts of their example YAML files:
    ```sh
    rm -rf pgadmin/templates/*.yaml
    rm -rf postgresql/templates/*.yaml
    ```
4. Copy your existing PGAdmin and PostgreSQL YAML manifests into the appropriate `templates/` folders inside each subchart.

> **Note:** Subcharts are managed independently, but their values can be overridden from the parent chart’s `values.yaml`.

---

## 5. Parameterize Your Templates

Instead of hardcoding values (like image tags, resource limits, or environment variables), use variables in `values.yaml` and reference them in your templates. This makes your chart flexible and reusable.

**Example:**

In `database-stack/charts/postgresql/values.yaml`:

```yaml
postgres:
  # image configuration
  image: postgres:16.3
  imagePullPolicy: IfNotPresent

  # networking
  containerPort: 5432
  servicePort: 5432
  
  # database configuration
  db: postgresdb
  defaultUser: admin
  defaultPassword: admin

  # add more values...
```

Then, in your `postgresql_statefulset.yaml` template:

```yaml
    # continuation of the manifest...
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: {{ .Values.postgres.image }}
        imagePullPolicy: {{ .Values.postgres.imagePullPolicy }}
        ports:
        - name: postgres
          containerPort: {{ .Values.postgres.containerPort }}
        env:
        - name: POSTGRES_DB
          value: {{ .Values.postgres.db }}
        - name: POSTGRES_USER
          valueFrom:
            secretKeyRef:
              name: {{ include "postgres.fullname" . }}-secret
              key: postgres-user
    # continuation of the manifest...
```

> **Tip:** Use descriptive variable names and provide sensible defaults in `values.yaml`.

---

## 6. Use Helper Templates

Helm supports helper templates (in `_helpers.tpl`) to avoid repeating code and to generate names, labels, or selectors dynamically.

**Example helper function in `database-stack/charts/postgresql/templates/_helpers.tpl`:**

```yaml
{{- define "postgres.fullname" -}}
{{ printf "%s-%s" .Release.Name "postgres" }}
{{- end -}}
```

**Usage in a manifest:**

```yaml
metadata:
  name: {{ include "postgres.fullname" . }}-statefulset
```

> **Why use helpers?** They make your templates DRY (Don’t Repeat Yourself) and ensure consistency across resources.

---

## 7. Deploy and Test

Once you’ve templated your YAML files for both applications, you can deploy them with:

```sh
helm install myapp ./database-stack
```
*(Replace `myapp` with your app’s release name.)*

To uninstall:

```sh
helm uninstall myapp
```

**Testing tips:**

- Use `helm template ./database-stack` to render your manifests locally and check for errors.
- Use `kubectl get all` to verify resources are created as expected.
- Update values in `values.yaml` and use `helm upgrade` to apply changes.

---

## 8. Reference

You can look at the [templated files](./database-stack/charts/postgresql/templates/postgresql_statefulset.yaml) provided as examples.

- [Helm Official Docs](https://helm.sh/docs/)
- [Best Practices for Writing Helm Charts](https://helm.sh/docs/chart_best_practices/)

---

**Tip:** Helm charts can be as simple or as complex as you need. Start small, test often, and gradually add more features as you get comfortable!

### Next - [3.2b Deploy a Helm Stack](./deploy.md)