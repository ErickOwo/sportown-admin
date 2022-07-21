import useSWR from 'swr';
import endPoinst from 'services/api';
import { getData } from '@api/requests';
import Link from 'next/link';

const Users = () => {
  const { data } = useSWR(endPoinst.users.api, getData);

  return (
    <>
      <div className="bg-red-500 w-full  flex justify-end border-b-2 border-b-blue-600">
        <Link href="/dashboard">
          <button className="mr-auto ml-5 bg-slate-500 hover:bg-slate-400 h-min my-auto text-white px-5 py-2 ">Volver</button>
        </Link>
        <button className="w-[165px] bg-blue-600 hover:bg-blue-500 p-3 text-white font-semibold m-3 border-2 border-white rounded-lg">Agregar Usuario</button>
        <button className="w-[165px] bg-red-500 hover:bg-red-400 p-3 text-white font-semibold m-3 border-2 border-white rounded-lg">Enviar Email</button>
        <button className="w-[165px] bg-green-600 hover:bg-green-500 p-3 text-white font-semibold m-3 border-2 border-white rounded-lg">Enviar Whatsapp</button>
      </div>
      <div className="flex flex-wrap p-6 gap-4">
        {data?.data?.map((user, index) => (
          <div key={index} className="p-4 border border-blue-600 w-[335px]">
            <h3>
              <b>Nombre: </b>
              {user.name}
            </h3>
            <p>
              <b>Email: </b>
              {user.email}
            </p>
            <p>
              <b>Teléfono: </b>
              {user.phone}
            </p>
            <p>
              <b>¿Tiene subscripción?: </b>
              {user.member == false ? <span className="text-red-500">No</span> : <span className="text-blue-500">Sí</span>}
            </p>
            <p>
              <b>Último mes pagado: </b>
              {user.lastMonthPayed}
            </p>
            <p>
              <b>Fecha de cración de usuario: </b>
              {user.date.split('T')[0]}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
