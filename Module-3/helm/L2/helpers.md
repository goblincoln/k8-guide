# Helper Function

A helper is just a little reusable template function you put in _helpers.tpl so you don’t have to repeat the same chunk of YAML everywhere.

It’s like making variables or functions in code. Instead of hardcoding the same labels, names, or selectors in multiple manifests, you define them once and reuse them.

For example, you will use it to dynamically set your resource names based on the name you created while deploying your Helm chart. Rather than Postgres generating `postgres-statefulset` it will generate as `myapp-statefulset` where myapp is the name you provided. 

1. Within `/postgresql/templates` create a `_helpers.tpl` file. You might have to regenerate the file or just copy/paste the one I created. It looks like a lot of mumbo jumbo, but it has meaning. For example, look for something similar to `{{- define "postgres.fullname" -}}`. This is a default, fully qualified app name. 

2. Replace some values within `postgres_statefulset.yaml` with ones set by the helper function.
    ```yaml
    metadata:
      name: {{- include "postgres.fullname" . }}-statefulset
    ```
    *Notes: the `-` trims whitespace. `include "postgres.fullname" .` calls the Helm `include` function, which renders the template named `"postgres.fullname"` using the current context (`.`). This is often used to generate a consistent resource name based on chart values.*

