FROM node:alpine

COPY /dist /dist

# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl localhost:8080" ]

EXPOSE 8080

CMD ["node", "dist/server.js"]
