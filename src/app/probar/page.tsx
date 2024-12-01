'use client';
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Image,
  Button,
  Input,
  DateInput,
} from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

export default function MaizeGrowthSimulator() {
  // Estados para los valores ingresados y resultados
  const [birthDate, setBirthDate] = useState(new CalendarDate(1995, 11, 6));
  const [timeDays, setTimeDays] = useState<number>(0);
  const [averageTemp, setAverageTemp] = useState<number>(0);
  const [watering, setWatering] = useState<number>(0);
  const [targetDay, setTargetDay] = useState<number>(0);
  const [height, setHeight] = useState<number>(0.5); // Altura inicial
  const [message, setMessage] = useState<string>(
    "Simula el crecimiento de tu maíz."
  );
  const [image, setImage] = useState<string>("/images/maiz/1-10.png");

  // Función para calcular el crecimiento del maíz
  const calculateGrowth = () => {
    if (!birthDate || averageTemp <= 0 || watering <= 0 || targetDay <= 0) {
      setMessage("Por favor, completa todos los campos con valores válidos.");
      return;
    }

    const startDate = new Date(
      birthDate.year,
      birthDate.month - 1,
      birthDate.day
    );
    const today = new Date();
    const daysSincePlanting =
      Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) +
      targetDay;

    let growthRate = 0.05; // Crecimiento base (5% diario)
    let tempFactor = 0;

    if (averageTemp < 10 || averageTemp > 40) {
      tempFactor = 0; // Sin crecimiento en temperaturas extremas
    } else {
      tempFactor = averageTemp >= 18 && averageTemp <= 32 ? 1 : 0.8; // Temperatura ideal
    }

    const wateringFactor =
      watering === 1 ? 1 : watering === 2 ? 0.9 : 0.7; // Factor de riego

    let newHeight = 0.5; // Altura inicial

    for (let day = 0; day < daysSincePlanting; day++) {
      if (tempFactor === 0) {
        break; // Sin crecimiento si las condiciones no son adecuadas
      }
      if (day > 275) {
        newHeight -= 0.5; // Disminuye altura si el maíz se echó a perder
        if (newHeight < 0) newHeight = 0;
      } else if (day > 190 && newHeight >= 180) {
        break; // Detiene el crecimiento si se está secando
      } else {
        const factor = tempFactor * wateringFactor;
        newHeight *= 1 + growthRate * factor;
        if (newHeight > 220) {
          newHeight = 220;
          break;
        }
      }
    }

    setHeight(Math.round(newHeight * 100) / 100); // Altura redondeada

    // Seleccionar imagen y mensaje
    if (tempFactor === 0) {
      setImage("images/maiz/germinacion-fallida.png");
      setMessage("El maíz no logró germinar debido a condiciones adversas.");
    } else if (daysSincePlanting > 275) {
      setImage("/images/maiz/malo.png");
      setMessage("El maíz se echó a perder.");
    } else if (daysSincePlanting > 190 || newHeight >= 180) {
      setImage("/images/maiz/seco.png");
      setMessage("El maíz se está secando.");
    } else if (newHeight >= 180) {
      setImage("/images/maiz/listo.png");
      setMessage("El maíz está listo para cosecha.");
    } else if (newHeight >= 75 && newHeight <= 100) {
      setImage("/images/maiz/75-100.png");
      setMessage("El maíz está listo para cosechar elotes.");
    } else if (newHeight > 40 && newHeight < 75) {
      setImage("/images/maiz/40-75.png");
      setMessage("El maíz está en desarrollo.");
    } else if (newHeight > 25 && newHeight <= 40) {
      setImage("/images/maiz/25-40.png");
      setMessage("El maíz está creciendo.");
    } else if (newHeight > 10 && newHeight <= 25) {
      setImage("/images/maiz/10-25.png");
      setMessage("El maíz está creciendo.");
    } else {
      setImage("/images/maiz/1-10.png");
      setMessage("El maíz está germinando.");
    }
  };

  return (
    <div className="w-full h-screen">
      <Card isFooterBlurred className="w-full h-auto col-span-12 sm:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-center">
          <h4 className="text-orange-700 font-extrabold text-3xl uppercase mt-4">Registro de Datos</h4>
          <div className="flex flex-wrap gap-4 w-100 backdrop-blur-lg p-5 rounded-lg">
            <DateInput
              label="Fecha de siembra"
              labelPlacement="outside"
              placeholderValue={birthDate}
              value={birthDate}
              onChange={setBirthDate}
              className="w-full"
            />
            <Input
              type="number"
              label="Temperatura promedio (°C)"
              placeholder="0"
              value={averageTemp.toString()}
              onChange={(e) => setAverageTemp(Number(e.target.value))}
              labelPlacement="outside"
              className="w-full"
            />
            <Input
              type="number"
              label="Frecuencia de riego"
              placeholder="0"
              value={watering.toString()}
              onChange={(e) => setWatering(Number(e.target.value))}
              labelPlacement="outside"
              className="w-full"
            /> 
            <Input
              type="number"
              label="Día objetivo"
              placeholder="0"
              value={targetDay.toString()}
              onChange={(e) => setTargetDay(Number(e.target.value))}
              labelPlacement="outside"
              className="w-full"
            />
          </div>
          
          <Button
            className="rounded-lg bg-orange-600 text-white font-extrabold mt-5"
            onClick={calculateGrowth}
          >
            INICIAR SIMULACIÓN
          </Button>
          
          <h1 className="mt-2 text-white">Etapa de crecimiento:</h1>
          <h1 className="font-bold text-xl text-white">Altura del maíz: {height} cm</h1>
          <p className="font-semibold text-xl text-white">{message}</p>
          <Image
            className="rounded-none mt-2"
            src={image}
            width={100}
            height={100}
          />
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover rounded-none"
          src="https://images.pexels.com/photos/745425/pexels-photo-745425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </Card>
    </div>
  );
}
