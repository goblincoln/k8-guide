# Creating TLS Secrets

This tutorial will briefly step away from Kubernetes resources to focus on TLS certificates. If you plan to deploy a web application, enforcing HTTPS is essential. But how do you achieve that? Let's explore the basics of TLS certificates and how to generate them.

---

## Purpose of TLS/SSL Certificates

TLS/SSL certificates are used to:

- **Encrypt** data sent between your browser and the server.
- **Authenticate** the server to the client.
- **Establish Trust** between users and your application.

---

## Key Definitions
- **Certificate Authority (CA):**  
    An entity trusted to sign and issue digital certificates. Browsers and systems trust certificates signed by well-known CAs.

- **Private Key:**  
    A secret cryptographic key used to sign requests and decrypt data. Keep this file secure and never share it.

- **Certificate Signing Request (CSR):**  
    A digital message sent to a Certificate Authority (CA) to request a digital certificate, like an SSL/TLS certificate. It contains vital information about the entity requesting the certificate, including the public key, and is signed with the corresponding private key to prove authenticity.

---

## Generating a Self-Signed Certificate

> **Note:**  
> For development and testing, you can generate your own certificates. In production, always use certificates from a trusted CA.

### 1. Generate a Private Key for Your CA

```sh
openssl genrsa -out ca.key 2048
```
- This creates a 2048-bit RSA private key (`ca.key`) for your Certificate Authority.

---

### 2. Create a Self-Signed Root CA Certificate

```sh
openssl req -new -x509 -days 365 -key ca.key \
    -subj "/C=CN/ST=GD/L=SZ/O=USAF/CN=Test Root CA" \
    -out ca.crt
```
- This command generates a self-signed root CA certificate (`ca.crt`) valid for 365 days.

---

### 3. Create a Private Key and Certificate Signing Request (CSR) for Your Domain

```sh
openssl req -newkey rsa:2048 -nodes -keyout domain.key \
    -subj "/C=US/ST=GD/L=SZ/O=USAF/CN=*.domain.com" \
    -out domain.csr
```
- Generates a new private key (`domain.key`) and a CSR (`domain.csr`) for your domain.
- The `-nodes` flag means the private key will not be password protected (useful for automation).

---

### 4. Sign the CSR with Your CA to Generate a TLS Certificate

```sh
openssl x509 -req \
    -extfile <(printf "subjectAltName=DNS:domain,DNS:domain.com") \
    -days 365 \
    -in domain.csr \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -out domain.crt
```
- Signs the CSR using your CA, producing a TLS certificate (`domain.crt`) valid for 365 days.
- The `subjectAltName` extension allows the certificate to be valid for both `domain` and `domain.com`.
