# The K8 Manifest

If you want to learn more about what is within each manifest, this guide should help get your foot into the door. Manifests are extensive and can have different levels of complexity depending on what your application requires. 

I don't know anyone who will go out of their way to memorize how to set up a K8 manifest file. K8 engineers very often reference documentation. The official K8s documentation can be found here, this guide will give you a more brief overview of the most relevant manifests that we may work with.

## Naming conventions
To follow our current K8 file structure we are going to split all resources into separate files. For an app called PostgreSQL, we will name our files like so: `postgresql_[resourceType].yaml`

