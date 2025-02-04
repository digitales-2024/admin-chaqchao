# Deploy con docker a VPS

### En la configuracion del proyecto en github

Agregar secretos:

- STAGE_SERVER_HOST
- STAGE_SSH_PRIVATE_KEY
- STAGE_SSH_USERNAME

- NEXT_PUBLIC_API_SUNAT_TOKEN
- NEXT_PUBLIC_LINK_API_SUNAT

Agregar variable:

- SERVICE_NAME : nombre del servicio en el docker-compose
- SERVICE_HOME : carpeta en el VPS donde esta el docker-compose

- NEXT_PUBLIC_BACKEND_URL : url final del backend. ejm: "https://api-chaqchao.acide.dev/api/v1"
- NEXT_PUBLIC_SOCKET_URL : url final de los websockets del backend. ejm: "https://api-chaqchao.acide.dev/ws"

