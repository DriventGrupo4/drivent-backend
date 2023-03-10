import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }
  let ticketType = await prisma.ticketType.findFirst();
  let array
  if(!ticketType){

    array = await prisma.ticketType.createMany({
      data:[
        {name:"No Remote With Hotel", includesHotel:true, isRemote:false, price:600},
        {name:"No Remote Without Hotel", includesHotel:false, isRemote:false, price:250},
        {name:"Remote Without Hotel", includesHotel:false, isRemote:true, price:100}
      ]
    })
  }

  let hotel = await prisma.hotel.findFirst();
  let createHotel
  if(!hotel){

    createHotel = await prisma.hotel.createMany({
      data:[
        {name:"Driven Resort", image:"https://www.carpemundi.com.br/wp-content/uploads/2020/07/nannai-resort.jpg"},
        {name:"Driven Palace", image:"https://triplover.com.br/wp-content/uploads/2020/03/Melhor-Hotel-Luxo.jpg"},
        {name:"Driven World", image:"https://anaclaudiathorpe.ne10.uol.com.br/wp-content/uploads/2021/01/emiratespalace1-e1573771420434-1.jpg"}
      ]
    })
  }

  console.log({ event });
  console.log(array);
  console.log(createHotel);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
