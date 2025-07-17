# Helm

[Helm Docs](https://helm.sh/)

By now, you should be familiar with what a Kubernetes manifest file is. If you’re not, stop here and go back, and practice until you feel comfortable.

Raw YAML is perfect when you’re learning or building small, simple apps by hand. But they can get overly complicated VERY quickly, as you might have noticed with NiFi. 

## So what is it?
Basically, Helm is a package manager for K8 applications, but also allows you to customize it with your own values to fit into your environment. 

The part about Helm that I like to emphasize is the `values.yaml` file. This allows us to edit values/environment variables throughout the entire application with one file, instead of editing multiple locations in multiple yaml files. It is just one step closer to our optimal packaged and containerized environment. 

You just need to look out for official vs community helm "charts."

## Let's Begin!

You may also remember we discussed some other applications that exist within Kubernetes, but we don't have to actively manage. We will deploy them with Helm.


























### Longhorn

**LONGHORN WILL NOT WORK ON WSL!** BUT HERE'S HOW TO SET IT UP ANYWAY
[Longhorn Docs](https://longhorn.io/docs/1.9.0/deploy/install/install-with-helm/)

*Please familiarize yourself with the Helm commands*

1. `helm repo add`
    
    This command adds a Helm chart repository. They can contain multiple Helm charts. It just "saves" it there, allowing you to easily reference the chart you desire.
    ```
    helm repo add longhorn https://charts.longhorn.io
    ```
2. `helm repo update`

    This command runs an update to ensure that what you pulled/have is up to date.

3. `helm install`

    If you want to install it right now, without configuring the values file or anything, you run something like this:

    ```
    helm install longhorn longhorn/longhorn --namespace longhorn-system --create-namespace --version 1.9.0 
    ```

    *If you want to configure values, you need the chart's values.yaml file. Pass it in with -f values.yaml if you have it.*

4. `helm pull` 

    This command downloads a packaged .tgz tarball if you plan to air-gap your K8s cluster:
    ``` 
    helm pull longhorn/longhorn --version 1.9.0
    ```
    *add --untar to automatically extract the files from the tar*
    
     When extracted, you will receive the files:
    ```
    ./longhorn/
    |- Chart.yaml
    |- values.yaml
    |- templates/
    ```

5. `helm install`... again

    You now just have to run the install command again, but with your local directory. 
    ```
    helm install longhorn ./longhorn --namespace longhorn-system --create-namespace -f longhorn/values.yaml
    ```

    Youre gonna get some errors regarding your mounts. In the values file, we need to set replicas to 1, because we are currently only using a 1-node kubernetes cluster. 
    We also need to run `sudo mount --make-shared /` because that where longhorn will store its data
    `sudo apt install open-iscsi`


