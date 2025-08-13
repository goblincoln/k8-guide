# Deploy

Now that you know how to use values and the helper function, we are going to deploy PostgreSQL and PgAdmin as one stack. This exercise assumes you are able to successfully deploy both apps separately.

1. Edit the `database-stack/Chart.yaml` and add the following section:
    ```yaml
    dependencies:
        - name: YOUR CHART NAME
        - version: IMAGE VERSION
        - repository: LOCATION OF HELM CHART
    ```
    The repository section is a reference to a Helm chart that can be hosted online or the one directly in your files. It will look like `https://url/chart` for online and `file://./charts/chartname` (or wherever you initialized your charts).

