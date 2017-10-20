const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const casual = require('casual')

const typeDefs = `
    # Curso en el sistema
    type Curso {
        id: ID!
        titulo: String!
        # Descripcion del curso
        descripcion: String!
        profesor: Profesor
        rating: Float @deprecated(reason: "porque si")
        comentarios: [Comentario]
    }

    type Profesor {
        id: ID!
        nombre: String!
        nacionalidad: String!
        genero: Genero
        cursos: [Curso]
    }

    enum Genero {
        FEMENINO
        MASCULINO
    }

    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }

    type Query {
        cursos: [Curso]
        profesores: [Profesor]
        curso(id: Int): Curso
        profesor(id: Int): Profesor
    }
`

const resolvers = {
    Query: {
        cursos: () => {
            return [{
                id: 1,
                titulo: 'curso graphql',
                descripcion: 'goku gohan',
                profesor: {
                    nombre: 'pablo',
                    nacionalidad: 'usa'
                },
                comentarios: [{
                    nombre: 'picoro',
                    cuerpo: 'buena pelea'
                }]
            }, {
                id: 2,
                titulo: 'curso vue',
                descripcion: 'proximo a este',
                profesor: {
                    nombre: 'vegeta',
                    nacionalidad: 'saiyajin'
                },
                comentarios: [{
                    id: 2,
                    nombre: 'krilin',
                    cuerpo: 'master'
                }]
            }]
        } 
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

addMockFunctionsToSchema({
    schema,
    mocks: {
        Curso: () => {
            return {
                id: casual.uuid,
                titulo: casual._title,
                descripcion: casual.sentence
            }
        },
        Profesor: () => {
            return {
                nombre: casual.name
            }
        }
    },
    preserveResolvers: false
})

module.exports = schema