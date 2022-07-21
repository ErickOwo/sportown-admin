import Link from 'next/link';

const index = () => {
  const pages = [
    {
      name: 'Usuarios',
      link: '/dashboard/users',
    },
  ];

  return (
    <div className="w-full max-w-none min-h-screen bg-white">
      <div className="flex flex-wrap m-8">
        {pages.map((page, index) => (
          <Link key={index} href={page.link}>
            <div className="p-4 w-72 h-40 border border-b-2 border-b-red-600 shadow-[0_0_28px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_28px_0px_rgba(0,0,0,0.3)]">
              <h3>{page.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default index;
