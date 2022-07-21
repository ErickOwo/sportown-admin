import { useRef, useState } from 'react';
import { postData } from '@api/requests';
import { useRouter } from "next/router";
import endPoints from '@api/index';

const FormUser = ({ signin = false }) => {
  const formRef = useRef(null);
  const [message, setMessage] = useState(null)
  const router = useRouter();
  
  const handleSubmit = e =>{
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
    }
    if(!signin && !/[a-záéíóú]{3,260}/i.test(data.name)){
      setMessage({
        text: 'El nombre es demasiado corto o contiene caracteres invalidos',
        type: 'error'
      });
      return
    }
    if(!/[\w\.]{3,30}\+?\w{0,10}@[\w\.\-]{3,}\.\w{2,3}/i.test(data.email)){
      setMessage({
        text: 'Usuario de email invalido',
        type: 'error'
      });
      return
    }
    if(!signin && !/\+?\d{0,3}\d{4,5}[.-]?\d{4,5}[.-]?\d{0,3}/i.test(data.phone)){
      setMessage({
        text: 'Número de teléfono invalido',
        type: 'error'
      });
      return
    }
    if(!/.{8,1024}/.test(data.password)){
      setMessage({
        text: 'La contraseña debe contener un minimo de 8 caracteres',
        type: 'error'
      });
      return
    }
    if(!signin){
      if(formData.get('confirmPassword') !== data.password){
        setMessage({
          text: 'Las contraseñas no coinciden',
          type: 'error'
        });
        return
      }
    }

    postData(endPoints.users, data).then(res=>{
      setMessage({text: res.message, type: 'message'});
      setTimeout(()=>{
        signin ? router.push('/signup') : router.push('/');
      },1300);
    }).catch(e=>{
      if(e?.response?.data?.error) setMessage({text: e?.response?.data?.error, type: 'error'})
      else setMessage({text: 'Error en la API', type: 'error'})
    })
  }

  return (
    <form 
      className='flex flex-col w-full max-w-[480px] bg-red-600 p-7 m-6 gap-4'
      ref={formRef}
      onSubmit={handleSubmit}  >
      {
        !signin ? <div className='flex flex-col gap-2'>
          <label 
            htmlFor='name'
            className='text-white font-semibold' >
              Nombre: 
          </label>
          <input 
            name='name'
            id='name'
            placeholder={true ? 'Ingrese su nombre' : null}
            className='max-w-[380px] bg-blue-600 py-1 px-2     placeholder:text-slate-300 text-white outline-none' />
        </div> : null
      }
      <div className='flex flex-col gap-2'>
        <label 
          htmlFor='email'
          className='text-white font-semibold' >
            Correo Electrónico: 
        </label>   
      <input 
        name='email'
        id='email'
        type='email'
        placeholder={true ? 'Ingrese su correo electrónico' : null}
        className='max-w-[380px] bg-blue-600 py-1 px-2 placeholder:text-slate-300 text-white outline-none' />
      </div>
      {
        !signin ? <div className='flex flex-col gap-2'>
          <label 
            htmlFor='phone'
            className='text-white font-semibold' >
              Teléfono: 
          </label>
          <input 
            name='phone'
            id='phone'
            type='number'
            placeholder={true ? 'Ingrese un número telefónico' : null}
            className='max-w-[380px] bg-blue-600 py-1 px-2     placeholder:text-slate-300 text-white outline-none' />
        </div> : null
      }
      <div className='flex flex-col gap-2'>
        <label 
          htmlFor='password'
          className='text-white font-semibold' >
            Contraseña: 
        </label>
        <input 
          name='password'
          id='password'
          type='password'
          placeholder={true ? 'Ingrese contraseña' : null}
          className='max-w-[380px] bg-blue-600 py-1 px-2 placeholder:text-slate-300 text-white outline-none' />
      </div>
      {
        !signin ? <div className='flex flex-col gap-2'>
          <label 
            htmlFor='confirmPassword'
            className='text-white font-semibold' >
              Confirmar contraseña: 
          </label>
          <input 
            name='confirmPassword'
            id='confirmPassword'
            type='password'
            placeholder={true ? 'Ingrese contraseña' : null}
            className='max-w-[380px] bg-blue-600 py-1 px-2 placeholder:text-slate-300 text-white outline-none' />
        </div> : null
      }
      {
        message ? <span className={`h-12 mb-2 ${message.type == 'error' ? 'text-yellow-400' : 'text-green-400'}`}>{ message.text }</span> : <span className='h-12 mb-2'></span> 
      }
      <button className='bg-white w-40 p-2 text-blue-800 font-semibold'>
        { signin ? 'Ingresar' : 'Crear cuenta' }
      </button>
    </form>
  )
}

export default FormUser