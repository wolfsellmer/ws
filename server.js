const express = require("express")
const server = express()

const db = require ("./db")
/* const ideias = [
     {
          img:"https://image.flaticon.com/icons/svg/2728/2728995.svg",
          title:"Cursp de programação",
          category:"Estudo",
          description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, atque! Delectus hic",
          url:"https://rocketseat.com.br",
     },
     {
          img:"https://image.flaticon.com/icons/svg/753/753024.svg",
          title:"Imagem de Exercícios",
          category:"Exercícios",
          description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, atque! Delectus hic",
          url:"https://rocketseat.com.br",
     },
     {
          img:"https://image.flaticon.com/icons/png/512/753/753016.png",
          title:"Imagem de Meditação",
          category:"Mentalidade",
          description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, atque! Delectus hic",
          url:"https://rocketseat.com.br",
     },
     {
          img:"https://image.flaticon.com/icons/svg/2729/2729032.svg",
          title:"Karaokê",
          category:"Diversão em Familía",
          description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, atque! Delectus hic",
          url:"https://rocketseat.com.br",
     },
     {
          img:"https://image.flaticon.com/icons/svg/2729/2729038.svg",
          title:"Pintura",
          category:"Criatividade",
          description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, atque! Delectus hic",
          url:"https://rocketseat.com.br",
     },
     {
          img:"https://image.flaticon.com/icons/svg/2729/2729034.svg",
          title:"Conversas",
          category:"Comunicação",
          description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, atque! Delectus hic",
          url:"https://rocketseat.com.br",
     },
] */


server.use(express.static("public"))

server.use(express.urlencoded({extended: true}))

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
     express: server,
     noCache: true,

})

server.get("/", function(req, res){

     db.all(` SELECT * FROM ideas`, function(err , rows) {
          if(err) {
               console.log(err)
               return res.send("Erro no banco de dados!")
          }
  
          const reversedIdeias = [...rows] .reverse()

          let lastIdeas= []
          for (let ideas of reversedIdeias){
               if (lastIdeas.length < 2){
                         lastIdeas.push(ideas)
               }
          }

           return res.render("index.html", {ideias: lastIdeas})
     })
})
server.get("/ideias", function(req, res){
     db.all(` SELECT * FROM ideas`, function(err , rows) {
          if(err) {
               console.log(err)
               return res.send("Erro no banco de dados!")
          }
          const reversedIdeias = [...rows] .reverse()

          return res.render("ideias.html", {ideias: reversedIdeias})
     })
})

server.post("/" , function(req,res) {
     const query =` 
     INSERT INTO ideas(
       image,
       title,
       category,
       description,
       link    
   ) VALUES (?,?,?,?,?);   
   `
   const values = [
       req.body.image,
       req.body.title,
       req.body.category,
       req.body.descrition,
       req.body.link,
   ]
   db.run(query,values, function(err){
     if(err) {
          console.log(err)
          return res.send("Erro no banco de dados!")
     }
       
      return res.redirect("/ideias")

   })


})

server.listen (3000)
