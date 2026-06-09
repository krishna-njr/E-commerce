import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main(){
  // const newUser = await prisma.user.create({
  //   data : {
  //     email: 'testing@gmail.com', 
  //     name: 'tester-2', 
  //   }, 
  // }); 

  // console.log('new user crated', newUser); 


  const allUser = await prisma.user.findMany(); 
  console.log(allUser); 
}

try{
  main(); 
}catch(err){
  console.log(err);
}


export { prisma };