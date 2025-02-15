---
title: "JWT (JSON Web Token) in Security"
date: "2025-02-14"
---

**JWT (JSON Web Token)** is a mechanism that is often used in **REST APIs**, it can be found in popular standards, such as OpenID Connect, but we will also encounter it sometimes using OAuth2. It is used both in large companies and smaller organisations. There are many libraries available that support JWT, and the standard itself has “rich support for cryptographic mechanisms”. Does all this mean JWT is inherently safe? Let’s see.

- **Introduction to JWT** JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure (…)

Simply put, JWT is a sequence of characters in JSON format (https://www.json.org/) encoded in JWS (JSON Web Signature) or JWE (JSON Web Encryption) structure. Besides, each of these options must be serialized in a compact way (one of the two serializations in JWS and JWE). **Most often you can see JWS, and it is this structure that is popularly called JWT**. In turn, “claim” is usually a simple pair of “key” : “value”.

**An example of jwt token undecoded** <br>

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.<br> eyJpYXQiOiIxNDE2OTI5MDYxIiwianRpIjoiODAyMDU3ZmY5YjViNGViN2ZiYjg4NTZiNmViMmNjNWIiLCJzY29wZXMiOnsidXNlcnMiOnsiYWN0aW9ucyI6WyJyZWFkIiwY3JlYXRlIl19LCJ1c2Vyc19hcHBfbWV0YWRhdGEiOnsiYWN0aW9ucyI6WyJyZWFkIiwiY3JlYXRlIl19fX0. <br> gll8YBKPLq6ZLkCPLoghaBZG_ojFLREyLQYx0l2BG3E

**An example of jwt token decoded** <br>

**Header** <br>

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload**

```json
{
  "iat": "1416929061",
  "jti": "802057ff9b5b4eb7fbb8856b6eb2cc5b",
  "scopes": {
    "users": {
      "actions": ["read", "create"]
    },
    "users_app_metadata": {
      "actions": ["read", "create"]
    }
  }
}
```

**Signature** <br>

Just binary content

**How an attacker can forge a JWT token?** <br>

1. He obtains a public key (its very name indicates that it might be available publicly). Sometimes, it is transmitted within the JWT itself.

2. Sends the token (with changed payload) with the HS256 algorithm set in the header (i.e. HMAC, not RSA) and signs the token with the public RSA key. Yes, there is no mistake here – we use the public RSA key (which we give in the form of a string) as a symmetric key to HMAC.

3. The server receives the token, checks which algorithm was used for the signature (HS256). The verification key was set in the configuration as the public RSA key, so…:

4. The signature is validated (because exactly the same verification key was used to create the signature, and the attacker set the signature algorithm to HS256).

_Since “algorithm” isn’t enforced in jwt.decode() in jwt-simple 0.3.0 and earlier, a malicious user could choose what algorithm is sent sent to the server._
