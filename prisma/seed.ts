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

  console.log({ event });
  console.log(array)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
