import { Card, CardBody, CardFooter, CardHeader, Divider, Link, Navbar, Image, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar } from "@nextui-org/react";;
export default function Home() {
  return (
    <div className="w-full h-screen">
      {/* <Image
        src="https://images.pexels.com/photos/745425/pexels-photo-745425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="NextUI hero Image"
         // Hace que la imagen ocupe todo el contenedor padre
         // Ajusta la imagen sin deformarla
        className="z-0 rounded-none h-screen w-full"
      /> */}
      <Card isFooterBlurred className="w-full h-auto col-span-12 sm:col-span-7 rounded-none">
        <CardHeader className="absolute z-10 top-1 flex-col items-center rounded-none pt-6">
          <Avatar src="/images/maiz/maiz.jpg" className="w-20 h-20 text-large" />
          <p className="text-2xl text-green-800 uppercase font-extrabold">SIMULADOR</p>
          <h4 className="text-orange-700 font-extrabold text-3xl">CRECIMIENTO DE MAIZ</h4>
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          <Link href="/probar">
            <Button className="mt-35 rounded-lg bg-orange-600 text-white font-extrabold">
              INICIAR SIMULADOR
            </Button>
          </Link>
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
