---
title: "JWT (JSON Web Token) in Software Security"
date: "2025-02-14"
---

**JWT (JSON Web Token)** is a widely used mechanism in **REST APIs** and it is commonly found in standards like **OpenID Connect** and, at times **OAuth2**. It is adopted by both large enterprises and smaller organizations. It has extensive library support and a standard that boasts robust cryptographic mechanisms. <br>

Does this make JWT inherently secure? Let’s find out.

**Introduction to JWT** <br>

JSON Web Token (JWT) is a compact, URL-safe format for securely transmitting claims between two parties. These claims are encoded as a JSON object, serving as the payload in a JSON Web Signature (JWS) structure or as plaintext in a JSON Web Encryption (JWE) structure. (…)

In a simple term, a JWT is JSON format [www.json.org](https://www.json.org/) string encoded within a **JWS (JSON Web Signature)** or **JWE (JSON Web Encryption)** structure. Additionally, both formats must be serialized in a compact form (one of the two serialization methods in JWS and JWE) **JWS is the most commonly used format**, and it is often what people refer to as a JWT. A claim is essentially a straightforward "key": "value" pair, representing a specific piece of information within the token. <br>

**JSON Web Tokens (JWT)** JSON Web Tokens (JWT) have several key features that make them widely used for securely transmitting information between parties as a JSON object. Here are some of the main features:

- **Compact:** JWTs are compact in size, making them easy to transfer over HTTP as URL parameters, headers, or in request bodies. Their small size makes them efficient for mobile apps and web-based applications.
- **Self-Contained:** They are self-contained, meaning they include all the information needed to understand and verify the token's claims. This eliminates the need to store session data on the server.
- **JSON Format:** The payload of a JWT is a JSON object, which means the data is easy to parse and generate in various programming languages.
- **Signed Tokens:** They can be signed using a secret (with the HMAC algorithm) or a public/private key pair (with RSA or ECDSA). This ensures the integrity and authenticity of the token's content. If a token is tampered with, the signature will not match, and the token will be considered invalid.
- **Optional Encryption:** While JWTs are typically signed to ensure data integrity, they can also be encrypted to provide confidentiality. This makes the content of the token readable only by the intended recipient.
- **Standardized Claims:** JWTs support a set of predefined claims (such as `iss` for issuer, `exp` for expiration time, `sub` for subject, etc.), but they can also include custom claims to convey additional information as required by the application.

**An example of jwt token Encoded in `HS256` algorithm** <br>

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

**An example of jwt token Decoded from `HS256` algorithm** <br>

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
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

**Verify Signature** <br>

`HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
your-256-bit-secret
)`

**Security Concerns** <br>

When using JWTs, it's crucial to be aware of certain security concerns to ensure the integrity and safety of your applications. Here are some common security concerns and best practices:

- **Secret Management:**
  - **Concern:** If the secret key used to sign the JWTs is compromised, attackers can create their own valid tokens.
  - **Best Practice:** Use strong, complex secret keys and store them securely. Rotate secrets periodically and avoid hard-coding them in your source code.
- **Token Expiration:**
  - **Concern:** Long-lived tokens increase the risk of unauthorized access if a token is compromised.
  - **Best Practice:** Set reasonable expiration times for tokens. Use short-lived tokens and implement refresh tokens to maintain user sessions.
- **Signature Verification:**
  - **Concern:** If the application fails to properly verify the token's signature, attackers can forge or tamper with tokens.
  - **Best Practice:** Always verify the token's signature using the appropriate secret or public key before trusting the token's contents.
- **Algorithm Confusion:**
  - **Concern:** An attacker could try to exploit weak or deprecated algorithms for signing the token.
  - **Best Practice:** Use strong algorithms like RS256 or HS256. Explicitly specify the allowed algorithms in your application's configuration.
- **Token Revocation:**
  - **Concern:** Once a token is issued, there's no built-in mechanism to revoke it before its expiration time.
  - **Best Practice:** Implement token revocation lists or track active sessions on the server-side to invalidate tokens when necessary.
- **Storage and Transmission:**
  - **Concern:** Storing or transmitting tokens insecurely can lead to token theft.
  - **Best Practice:** Use secure storage mechanisms (e.g., HttpOnly cookies for web applications) and transmit tokens over HTTPS to prevent interception.

**JWT algorithm confusion vulnerability:**

- _Allowing algorithm switching_
- _Using the same key for both HMAC and RSA_
- _Exposing the public key_ <br>

**How an attacker can forge a JWT token?** <br>

1. The attacker obtains the public key (as its name suggests, it is often publicly accessible). In some cases, it is even embedded within the JWT itself.

2. They modify the token's payload and set the algorithm in the header to HS256 (HMAC instead of RSA). Then, they sign the token using the public RSA key—yes, you read that correctly. The attacker treats the public RSA key as a symmetric key for HMAC.

3. When the server receives the token, it checks the algorithm used for signing (HS256). Since the verification key is set to the public RSA key in the configuration...

4. The signature is successfully validated because the same public key was used both to sign and verify the token. The attacker effectively bypasses authentication by exploiting this misconfiguration.

**Fix:** Always enforce a specific algorithm (RS256 for RSA) and properly separate public/private key usage.

_Security is embedded in practice, the tools help us enforce it_

**_Resources_** <br>

[www.jwt.io](https://jwt.io/) <br>

[www.json.org](https://www.json.org/) <br>

[auth0.com on JWT(JWT Handbook)](https://auth0.com/resources/ebooks/jwt-handbook) <br>

[JWT Cheat Sheet for Java(OWASP)](<https://www.owasp.org/index.php/JSON_Web_Token_(JWT)_Cheat_Sheet_for_Java>) <br>
