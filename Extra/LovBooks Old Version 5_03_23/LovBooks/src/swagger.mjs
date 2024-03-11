import swaggerJSDoc from "swagger-jsdoc"; 
const options = {  
    definition: {    
        openapi: "3.0.0",    
        info: {      
            title: "API LovBooks",      
            version: "1.0.0",      
            description:        
            "API REST permettant de gérer l'application Lovbooks",    
        },    
        servers: [      
            {        
                url: "http://localhost:3420",      
            },    
        ],    
        components: {      
            securitySchemes: {        
                bearerAuth: {          
                    type: "http",          
                    scheme: "bearer",          
                    bearerFormat: "JWT",        
                },      
            },      
            schemas: {        
                Livre: {          
                    type: "object",          
                    required: ["title", "category", "number_of_pages", "year_of_publication","average_ratings", "cover_image", "extract_pdf","summary"],          
                    properties: {            
                        id: {              
                            type: "integer",              
                            description: "L'identifiant unique du produit.",            
                        },            
                        title: {              
                            type: "string",              
                            description: "Le title du livre.",            
                        },  
                        category: {              
                            type: "string",              
                            description: "Le catégorie du livre.",            
                        },           
                        number_of_pages: {              
                            type: "integer",              
                            description: "Le nombre de pages du livre.",            
                        },   
                        year_of_publication: {              
                            type: "integer",              
                            description: "L'année de publication du livre.",            
                        },      
                        average_ratings:{
                            type: "float",              
                            description: "Critiques de livres.",     
                        },
                        cover_image: {              
                            type: "string",              
                            description: "L'image du livre.",            
                        },   
                        extract_pdf: {              
                            type: "string",                   
                            description: "Le extract du livre.",           
                        },          
                        summary : {
                            type: "text",                   
                            description: "Le description du livre.",         
                        }
                    },        
                },        
                // Ajoutez d'autres schémas ici si nécessaire      
                Customer:{

                    type:"object",
                    required : ["pseudo", "date_enter", "password"],
                    properties:{
                        id: {              
                            type: "integer",              
                            description: "L'identifiant unique de l'utilisateur.",            
                        },            
                        pseudo: {              
                            type: "string",              
                            description: "Le nom de l'utilisateur.",            
                        },  
                        date_entre: {              
                            type: "date",              
                            description: "Le date de creation de l'utilisateur.",            
                        },           
                        password: {              
                            type: "string",              
                            description: "Le mot de passe de l'utilisateur.",            
                        },   
                    }

                }
            },    
        },    
        security: [      
            {        
                bearerAuth: [],      
            },    
        ],  
    },  
    apis: ["./src/routes/*.mjs"], 
    // Chemins vers vos fichiers de route 
}; 

const swaggerSpec = swaggerJSDoc(options); 
export { swaggerSpec };