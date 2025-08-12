# Exercise: Create Your Own Chart

If you have your own in-house application or an app that does not have a helm chart, you can create it yourself.

1. Create a chart:
    ```
    helm create database-stack
    ```

    This will generate a file structure like this:

- `Chart.yaml`: The metadata/entry point for your Helm chart.
- `values.yaml`: The centralized configuration of environmental variables and values.
- `templates/`: YAML files with values replaced by variables set within your values.yaml file. Ex: `image: {{.Values.image.repository}}` sets the image.
- `charts/`: A directory that contains subcharts, if you created them.

2. Since PGAdmin and Postgres go hand-in-hand, let's make a Helm chart with those as its subcharts. First remove all template files so we can use our own files.
    ```
    rm -rf ./templates/* 
    cd charts/
    helm create pgadmin
    rm -rf ./templates/*
    ```
    You should have a structure somewhat like this, now:
    ```
    database-stack
    |-
    ```