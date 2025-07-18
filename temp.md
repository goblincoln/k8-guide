apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dev-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
    - host: www.goblin.com
      http:
        paths:
          - path: /pgadmin(/|$)(.*)
            pathType: Prefix
            backend:
              service:
                name: pgadmin-service
                port:
                  number: 80
          - path: /nifi(/|$)(.*)
            pathType: Prefix
            backend:
              service:
                name: nifi-service
                port:
                  number: 8080
```
Based on Subdomain
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dev_ingress
spec:
  ingressClassName: nginx
  tls:
  - hosts:
      - app1.goblin.com
      - app2.goblin.com
    secretName: appname_tls_secret
  rules:
  - host: app1.goblin.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: appname_1_service
            port:
              number: 3030
  - host: app2.goblin.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: appname_2_service
            port:
              number: 4040
```