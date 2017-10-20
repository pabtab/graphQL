const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
    # Curso en el sistema
    type Curso {
        id: ID!
        titulo: String!
        # Descripcion del curso
        descripcion: String!
        profesor: Profesor
        rating: Float
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

const schema = makeExecutableSchema({
    typeDefs
})

module.exports = schema