module.exports = {
    schema: [
        {
            'http://localhost:8080/v1/graphql': {
                headers: {
                    Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
                },
            },
        },
    ],
    overwrite: true,
    documents: ['./src/**/*.graphql'],
    generates: {
        './src/generated/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-graphql-request'
            ],
            config: {
                namingConvention: {
                    transformUnderscore: true,
                },
                skipTypename: true,
                rawRequest: true,
                importDocumentNodeExternallyFrom: 'near-operation-file'
            },
        }
    },
}
