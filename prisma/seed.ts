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

  let room = await prisma.room.findFirst();
  let createRoom
  if(!room){

    createRoom = await prisma.room.createMany({
      data:[
        {name:"101", capacity: 1, hotelId: 1,},
        {name:"102", capacity: 2, hotelId: 1,},
        {name:"103", capacity: 3, hotelId: 1,},
        {name:"101", capacity: 2, hotelId: 2,},
        {name:"102", capacity: 2, hotelId: 2,},
        {name:"103", capacity: 3, hotelId: 2,},
        {name:"101", capacity: 1, hotelId: 3,},
        {name:"102", capacity: 1, hotelId: 3,},
        {name:"103", capacity: 2, hotelId: 3,},
      ]
    })
  }
  let location = await prisma.location.findFirst();
  if(!location){
    await prisma.location.createMany({
      data: [
        {name: "Auditório Principal"},
        {name: "Auditório Lateral"},
        {name: "Sala de Workshop"}
      ]
    })
  }
  let activity = await prisma.activity.findFirst();
  if(!activity){
    await prisma.activity.createMany({
      data:[
        {
          name:"Interfaces e Aplicações Front-end",
          capacity: 10,
          locationId: 1,
          startDateTime: new Date("2023-03-27T08:00:00Z"),
          endDateTime: new Date("2023-03-27T10:00:00Z"),
        },
        {
          name: "Single Page Applications",
          capacity: 10,
          locationId: 1,
          startDateTime: new Date("2023-03-27T10:00:00Z"),
          endDateTime: new Date("2023-03-27T12:00:00Z"),
        },
        {
          name: "Back-end (MongoDB)",
          capacity: 5,
          locationId: 2,
          startDateTime: new Date("2023-03-27T08:00:00Z"),
          endDateTime: new Date("2023-03-27T12:00:00Z")
        },
        {
          name: "SQL",
          capacity: 3,
          locationId: 3,
          startDateTime: new Date("2023-03-27T08:00:00Z"),
          endDateTime: new Date("2023-03-27T10:00:00Z")
        },
        {
          name: "Arquitetura e boas práticas",
          capacity: 3,
          locationId: 3,
          startDateTime: new Date("2023-03-27T10:00:00Z"),
          endDateTime: new Date("2023-03-27T12:00:00Z")
        },
        {
          name: "Introdução ao Python",
          capacity: 10,
          locationId: 1,
          startDateTime: new Date("2023-03-28T08:00:00Z"),
          endDateTime: new Date("2023-03-28T12:00:00Z")
        },
        {
          name: "Introdução ao Angular",
          capacity: 5,
          locationId: 2,
          startDateTime: new Date("2023-03-28T08:00:00Z"),
          endDateTime: new Date("2023-03-28T12:00:00Z")
        },
        {
          name: "Programação em Java",
          capacity: 10,
          locationId: 1,
          startDateTime: new Date("2023-03-29T08:00:00Z"),
          endDateTime: new Date("2023-03-29T12:00:00Z")
        },
        {
          name: "Aprenda a programar em PHP",
          capacity: 3,
          locationId: 3,
          startDateTime: new Date("2023-03-29T08:00:00Z"),
          endDateTime: new Date("2023-03-29T10:00:00Z")
        },
      ]
    })
  }

  console.log({ event });
  console.log(array);
  console.log(createHotel);
  console.log(createRoom);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
